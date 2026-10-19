# ISP 调参 Cookbook（症状 → 参数方向）

先定位再调参：**用 web 控制台快照做量化**（亮度均值=曝光、拉普拉斯均值=清晰度、看直方图两端=动态范围），别凭感觉。

## 1. 曝光类

| 症状 | 方向 |
|---|---|
| 过曝/欠曝（AE 仍自动） | AE target/ratio（IQ 文件 AEC 段）——先确认 AE 真的在调（`v4l2-ctl -l` 看 gain/exp 变不变；imx708 实测过 AEC 反馈恒 0 的闭源库 bug） |
| 要锁曝光 | sensor 直写（v4l2-ctl exposure/analogue_gain 或 webui 直控面板；**手动 AE 的 uapi 写会打死 rkaiq+内核 Oops**，风险语义见本 skill SKILL §4） |
| 低照度太暗 | 提增益上限（AE range / sensor Gain2Reg 段覆盖），代价是噪点；或拉 Gamma 暗部 |
| 强光死白 | AE target 降 / 启用 DRC / HDR |
| 画面忽明忽暗 | AE 收敛太快: AEC 段 damp/收敛系数放缓 |

### 1.1 AEC 调优官方四步（Tuning Guide §3.1.1，顺序不能乱）

前提（缺一样 AE 就调不准）：黑电平标定对、Shading 标定完、AWB/CCM 标定对、各模式预设一组 Gamma。

1. **AE 权重表**（测光感兴趣区域）——IPC 场景主体在中央，中央权重高于周边
2. **AE Route**（曝光量在时间/增益间的分配）——抓拍快速运动→限曝光时间优先增益；车牌白天→曝光限 2~4ms；夜晚低照→优先时间保噪声
3. **AE SetPoint/DynamicSetpoint**（目标亮度）——实验室静物标准：中心高光区（纹理卡/陶瓷）不过曝、边角枯叶图/玫瑰亮度合理
4. **收敛速度与平滑性**（一对平衡点）——防震荡前提下提收敛；行车/DV 场景需要快收敛。验证法：实验室开关灯测收敛

## 2. 色彩类

| 症状 | 方向 |
|---|---|
| 整体偏色（偏绿/偏红） | 先 AWB: 锁手动 WB `awb.gainR/gainB` 找平衡 → 固化到 IQ `AWB` 段; 还偏就是 CCM（IQ `CCM` 段按色温矩阵，需灰卡/色卡标定） |
| 饱和度低/过高 | 实时 `ccm.saturation`（hw_cpT_sat_adjStrg，128=中性）；固化改 IQ CP 段 |
| 暗角 | LSC（IQ `LSC` 段） |
| 夜间偏色 | AWB 低光白点/范围段（色温扩展） |
| 偏紫（IR 串扰） | 查 IR-cut 硬件 + AWB/CCM 夜间段 |

## 3. 噪点/清晰度

| 症状 | 方向 |
|---|---|
| 低光噪点重 | 3D NR（`abayertnr`，时间域）优先于 2D——运动拖尾再收 3D 提 2D；高 ISO 段是重点（IQ 文件按 ISO 数组） |
| NR 后画面糊 | 降 NR 强度 + 提 Sharp；或 MFNR（ayuvme）替代纯 3D |
| 边缘振铃/白边 | Sharp 的 edge/overshoot 参数（IQ `Sharp` 段 radius/strength 按 ISO） |
| 细节涂抹感 | YNR 太强（`aynr`）；check 分频段曲线 |
| 运动拖影 | 3D NR 运动自适应（motion adj）或降 3D 权重 |
| 坏点（固定位置异色点） | DPCC：Fast_mode（Single/Double/Triple level 三档，Double 会增强 Single、Triple 增强 Double）→ Expert（RK/LC/PG/RND/RG/RO 六类坏点分别设）→ sensor_dpcc（需 sensor 自带去坏点+驱动已配） |

### 3.1 NR pipeline 调试顺序论（官方 Tuning Guide §4.2）

去噪四模块按 pipeline 顺序 **bayernr2d → bayernr3d → ynr → cnr**，调试**必须单开对比**，每个模块的效果都要明确归因：
- 看 bayernr2d 效果：对比【未去噪原图】vs【只开 bayernr2d】
- 看 ynr 效果：对比【bayernr3d 输出】vs【经 ynr 但 sharp 关闭】——以此类推

各模块参数方向（Tuning Guide 调试步骤原文提炼）：

| 模块 | 关键参数 | 方向 |
|---|---|---|
| Bayer2dnr | `filter_strength` / `weight` | 低 ISO 调小（保细节）、高 ISO 逐步加大；力度大→噪声颗粒低频化、细节变少 |
| BayerTnr(3D) | `filter_strength` / `lo_clipwgt` / `hi_clipwgt` | 平衡去噪与拖影；多帧叠加本身不改噪声形态，**软阈值处理**才会（越强颗粒越低频） |
| YNR | low: `low_bf/thred_adj/weight/bi_weight`；high: `high_weight/thred_adj`；`rnr_strength`（边角）| 平衡去噪与细节；`ynr_adjust_thresh/scale` 管运动区域 |
| CNR | 各层 `denoise_strength / denoise_alpha / color_sat` | 权衡色噪去除 vs 色度侵染/饱和度下降 |
| Sharp | 力度: `sharp_ratio / local_sharp_strength / hf_clip`；抑噪: `gaus_ratio / pbf_ratio/gain/add / bf_ratio/gain/add` | 力度组提清晰度，抑噪组压锐化带来的噪声——两组对拉 |

## 4. 动态范围/HDR

| 症状 | 方向 |
|---|---|
| 逆光人脸黑 | DRC / Amerge（HDR 合成强度）；HDR 模式下改 `hdr` 分支段 |
| 高光细节丢失 | 启 HDR X2/X3（sensor 模式要支持, 见 driver-porting）或提短曝权重 |
| 高光区死白但不想上 HDR | DRC：`DrcGain`（[1,8] 整体/局部亮度增益）+ `Alpha`（[0,1]）+ `Clip`（[0,64]）三参数构成 DrcGain 曲线，按 Envlv 分档调 |
| HDR 合成鬼影/过曝溢出 | Merge 过曝曲线 `OECurve`（smooth 斜率 + offset，按环境亮度分档）+ 运动曲线（长帧模式/短帧模式各一组）|
| 画面雾感重 | Dehaze：`cfg_wt`（力度，**勿超 0.9**，超了多数场景发糊）+ `cfg_air`（大气光幕）+ `cfg_tmax`（上限）；调试时先把 `cfg_alpha` 置 1 隔离软件配置 |

## 5. 标定类（一次性）

**标定顺序**（官方流程图，Tuning Guide 图 3-2——顺序错则后续标定白做）：
黑电平 → RawNR/YUVNR/3DNR → 静态坏点(DPCC) → 镜头 Shading(LSC) → AWB → CCM → 畸变(FEC)。
**AWB 标定的前置是 BLC + LSC 标定完成。**

| 任务 | 工具 |
|---|---|
| CCM 标定 | 24 色卡 + PC IQ Tool（闭源，redmine 下载）或手算矩阵 |
| LSC 标定 | 均匀光源拍 raw → IQ Tool |
| FEC 镜头畸变 | SDK 自带 `IspFec` 工具（rkaiq 树） |
| AWB 标定 | 灰卡 + IQ Tool AWB 标定流程 |
| 模组 OTP 个体校正 | OTP Calibration Guide（文档地图 ISP30/35/351 包内） |

**AWB 标定实操**（Color Optimization Guide §2.3）：x-rite 24 色卡 + 灯箱，曝光使最亮白块峰值落在 **[150,240]**（越亮越好）、色卡占画面 ≥1/9；依次在 **A/CWF/D50/D65/D75/HZ/TL84 七光源**下拍 raw → 工具 Load → Find Chart（依次点色卡**第 1、6、19、20 块**批量识别）→ 调 UV/XY 域白点区间（拖四角改大小、拖空白平移）→ AWB Simulation 验证白点检出与 R/B Gain。

**CCM 标定实操**（同文档 §3.3）：同套七光源 raw（CCM 与 AWB 共用采集），工具按色块回归 3x3 矩阵；偏色残留优先查 AWB（CCM 之前），CCM 管"彩色物体色准"不管白平衡。

## 6. 调到满意后的固化

1. 记下实时参数（webui sensor 直控/面板读回；AE target 类实时参数不一定能直接落 IQ）
2. 对应改 IQ 文件段（iq-params-map.md §2 的映射）+ `rkisp_parser` 校验
3. 推板重启验证（命令序列见同目录 iqfile-guide.md §4）
4. 长期固化: 文件放回 SDK 源码树 `rkaiq/iqfiles/<ispXX>/` 再出镜像（防全刷回退——实测教训见同目录 iqfile-guide.md §4）

## 7. 上游文档（深入）

**完整官方文档地图：`isp-docs-map.md`（同目录）**（<文档库>/ 全量索引，按 ISP 代际/问题类型查）。高频：

- `Rockchip_Tuning_Guide_ISP30/ISP39`（各代参数语义权威：AEC 公共/线性/HDR 曝光参数、sensorinfo/moduleinfo、NR/Sharp 关键参数+名词解释）
- `Rockchip_IQ_Tools_Guide_ISP33_ISP39_CN_v3.0.2`（官方 Tuner 用法、ToolServer 参数、在线调试 FAQ）
- `Rockchip_Color_Optimization_Guide`（各代，色彩精调：AWB/CCM 标定光源数、工具版本配套）
- `Rockchip_Development_Guide_ISP30`（369 页，全模块 uapi API 结构体——iq-params-map 的权威版）
- RK3588/RK3576 最新文档索引: `$SDK/docs/cn/Common/ISP/The-Latest-Camera-Documents-Link.txt`（指到 redmine.rock-chips.com/documents/53）
- 官方 PC 端 IQ Tool 下载: redmine（用 redmine-issue skill 问 FAE 或搜文档库）
