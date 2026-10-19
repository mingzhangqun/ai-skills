# IQ json 结构与关键参数（"正常出图"最小集）

目标场景：**sensor 驱动点亮后，ISP 正常出图即可，不纠结画质细节**。本文回答"IQ json 里
哪些参数是这个阶段的关键参数"，以及拿现成文件移植时必改什么。画质精调（噪点/锐化/HDR）
走 tuning-cookbook，不在这里。

实例文件：`$SDK/external/camera_engine_rkaiq/rkaiq/iqfiles/isp3x/imx415_CMK-OT2022-PX1_IR0147-50IRC-8M-F20.json`
（754KB；Rockchip_Tuning_Guide_ISP30_CN_v1.2.0 §3.1.1/§4.1/§4.7 为语义依据）

## 1. "正常出图"的判据（先定义达标，再谈参数）

Tuning Guide §3.1.1 给 sensor 对接定的完成标准：**通路正常 + AE 基本功能正常 + 可以正常拍
RAW**。落到可观察项：

| 检查 | 方法 |
|---|---|
| mainpath NV12 有流、画面完整不花屏 | web 控制台 isp 源 / `v4l2-ctl --stream-mmap` |
| AE 在动且收敛（亮度随环境变化） | `v4l2-ctl -l` 看 exposure/gain 读数变化；开关灯观察 |
| 颜色不怪（不整体偏绿/偏紫/灰雾感） | web 控制台快照看 |
| raw 可拍 | web 控制台 raw 源（rkcif） |

⚠ 达标前先确认加载了**正确的 IQ 文件**（命名三段匹配 + isp 代际正确）——这是最常见的
"出图不正常"根因，排查走 iqfile-guide §1/§4，与参数无关。

## 2. json 顶层五段

| 段 | 内容 | 来源 |
|---|---|---|
| `product_info` | chip_name=RK3588、iq 版本号 | 生成工具 |
| `sensor_calib` | **sensorinfo：曝光相关 CIS 参数**（Gain2Reg/Time2Reg/CISGainSet/CISTimeSet/CISHdrSet/CISDcgSet/CISExpUpdate/CISMinFps/CISFlip/resolution） | **sensor datasheet**（换 sensor 必改，§3.1） |
| `module_calib` | moduleinfo：镜头 FNumber/EFL/透过率（imx415 例：F1.6/EFL5.2） | 模组 datasheet，官方注明**暂无效** |
| `sys_static_cfg` | 算法开关（imx415 例：`disable_algos=["DISABLE_AF"]`——定焦头关 AF） | 按产品 |
| `main_scene` | 场景树 → 模块参数（见下） | 标定+调参产物 |

场景树：`main_scene[]`（normal / hdr）→ `sub_scene[]`（day）→ `scene_isp30`（**33 个模块**，
两场景模块清单完全同构，各自一套值）。段名一代一个键（isp3x=`scene_isp30`，isp39=
`scene_isp39`）——代际错配即崩（iqfile-guide §2）。`uapi`/`uapi_len` 为空占位。

## 3. 33 个模块按"出图阶段"分级

| 级 | 模块（json 段名） | 出错症状 |
|---|---|---|
| **① 亮度链**（决定能不能看） | `ae_calib` + 顶层 `sensor_calib` | 黑图/过曝/曝光闪烁不收敛 |
| **② 颜色链**（决定像不像真的） | `ablc_calib`(黑电平) / `wb_v21`(白平衡) / `ccm_calib`(色彩矩阵) / `agamma_calib_v11`(伽马) | 偏色/灰雾/观感过暗过亮 |
| **③ 精调项**（出图阶段全部不用动） | `lsc_v2` `ynr_v3` `bayertnr_v2` `bayer2dnr_v2` `sharp_v4` `cnr_v2` `lut3d_calib` `adpcc_calib`(坏点) `adehaze_calib_v11` `adrc_calib_v11` `amerge_calib_v11`(HDR 合成) `agic_calib_v21` `cac_v10`/`cac_v03`(色差) `debayer` `aldch`(畸变) `afec` `gain_v2`(数字增益) `cpsl` `csm` `cgc` `cproc` `colorAsGrey` `ie` `af_v30`(对焦) `adegamma_calib_v11` | 各类画质细节 |

③ 类占 json 字节量的 ~90%（lsc_v2 一个段 98KB），但它们只影响"好不好看"，不影响"能不能
看"。用现成文件出图阶段**一个都不用碰**。

## 4. 一级：亮度链关键参数

### 4.1 sensor_calib（= 官方 sensorinfo，Tuning Guide §4.1.2.5）

> 官方定位："由驱动人员或 tuning 人员填写……要求 tuning 之前需确认该模块参数与 sensor
> datasheet 一致，否则可能导致**曝光闪烁、HDR 效果出错**"。这是换 sensor 移植 IQ 的
> **第一修改点**。

| 参数 | 含义 | imx415 实例 | 错了会 |
|---|---|---|---|
| `resolution` | 输出分辨率 | 3840x2160 | 统计窗/标定表错位 |
| `Gain2Reg.GainMode` | 增益→寄存器公式模式：`NONLINEAR_DB`(Sony 系，公式固定 reg=20×log10(gain)×10/3) / `LINEAR`(分段线性 7 列：区间/C1/C0/M0/reg 起止) | NONLINEAR_DB | 增益设置错误→亮度乱跳 |
| `CISGainSet.CISAgainRange` | 模拟增益范围 | 1~31.6x | 增益上限不对（夜里不够亮/上限虚高） |
| `CISGainSet.CISDgainRange` | 数字增益范围 | 1~125.9x | 同上（总增益=again×dgain） |
| `CISExpUpdate` | 曝光时间/增益生效延迟帧数（linear 与 hdr 分开填） | time/gain 均 2 帧 | **曝光闪烁**（与实际生效节奏不符） |
| `CISTimeSet.Linear.CISTimeRegMin` | 最小曝光行 | 8 行 | 低曝越界 |
| `Time2Reg.fCoeff` | 时间↔行数公式系数（line=C0×VTS+C1+C2×(time×pclk/HTS+C3)） | [0,0,1,0.5]（通用默认，一般不改） | 曝光时间换算错 |
| `CISMinFps` | 自动降帧下限 | 10 fps | 低照帧率过低/拖影 |
| `CISHdrSet` / `CISDcgSet` | HDR 帧模式(line/frame)与 DCG 支持 | 2-line STAGGER；DCG 不支持(support_en=0) | HDR 模式异常 |
| `CISFlip` | 镜像/翻转 bit0=mirror bit1=flip | 0 | 方向不对 |

### 4.2 ae_calib（AEC，Tuning Guide §4.1.2.1/4.1.2.2）

路径前缀：`main_scene[0].sub_scene[0].scene_isp30.ae_calib`

| 参数 | 含义 | imx415 实例 | 备注 |
|---|---|---|---|
| `CommCtrl.Enable` / `AecOpType` | AE 总开关 / AUTO vs MANUAL | 1 / AUTO | 出图阶段保持 AUTO |
| `CommCtrl.AecAntiFlicker` | 抗工频闪 | enable=1, 50Hz, AUTO 模式 | AUTO 模式高亮防过曝但抗闪弱；NORMAL 反之 |
| `CommCtrl.AecSpeed` | 收敛阻尼（DampOver/Under 等 [0,1]） | 0.15/0.45，官方建议区间 [0.4,0.7] 下方 | 越大越慢越平滑 |
| `LinearAeCtrl.Route` | **曝光分解**：TimeDot[]+GainDot[] 节点表（时间优先 vs 增益优先） | 时间 0→10ms(1x)→增益 1→4x→时间 10→30ms→增益 4→512x | 抓拍场景限短曝光、夜低照优先时间保 SNR；节点曝光量必须单调递增 |
| `LinearAeCtrl.DySetpoint` | 动态目标亮度：ExpLevel[]→DySetpoint[] | 曝光量 0~1.344 → 目标 45→30（越暗目标越低，压夜间噪声） | 画面整体偏暗/偏亮的第一调节点 |
| `LinearAeCtrl.InitExp` | 起流初始曝光 | 3ms / 1x | 只影响首帧收敛起点 |
| `LinearAeCtrl.ToleranceIn/Out` | 收敛容忍度 % | 10/15（In<Out 防灵敏抖动） | 亮度微调不生效时先看它 |

HDR 曝光参数在 `main_scene[1]`（hdr 场景）的 `HdrAeCtrl`（ExpRatioCtrl 曝光比/LframeCtrl
等）——不出 HDR 不用管。

### 4.3 症状速查（亮度）

| 症状 | 先查 |
|---|---|
| 全黑/全白且 exposure/gain 读数不动 | IQ 文件根本没加载（iqfile-guide §1）或 `CommCtrl.Enable=0` |
| 亮度到了但闪烁 | `CISExpUpdate` 延迟帧数与 datasheet 不符；`AecSpeed` 过快 |
| 夜里不够亮 | `CISGainSet` 增益上限 + `Route` 最高节点 |
| 整体偏暗/偏亮 | `DySetpoint`（次选 gamma） |
| 画面忽明忽暗 | `AecSpeed` damp / `ToleranceIn` |

## 5. 二级：颜色链关键参数（够用即可，精调走 tuning-cookbook §2）

| 段 | 关键点 | imx415 实例 |
|---|---|---|
| `ablc_calib` | `BlcTuningPara.BLC_Data`：R/Gr/Gb/B 四通道黑电平，按 ISO 表 | ~200 各通道（**sensor 标定值**，错→整体发灰/偏色，是"灰雾感"第一嫌疑） |
| `wb_v21` | `control.mode`=AUTO（出图用自动）；`manualPara.cfg.mwbGain`=[R,Gr,Gb,B] 手动白平衡增益 | [1.327, 1, 1, 3.314]（日光 5000K：蓝通道 3.3x 补 IR-cut） |
| `ccm_calib` | `TuningPara.matrixAll` 按色温段的 3x3 矩阵 | 标定产物，**别手搓**，偏色先查 AWB/BLC |
| `agamma_calib_v11` | `GammaTuningPara.Gamma_curve`：49 点 Y 值 [0,4095]（X 轴 49 点固定）；`Gamma_out_offset` 曲线整体修正 | 默认 gamma2.2 附近即可出图 |

调色顺序铁律（Tuning Guide §3.1.1 色彩维度）：**BLC 准 → LSC 完 → AWB/CCM 标定**，前置
不满足调后面白调。

## 6. 换 sensor 移植：拿现成 json 顶上的最小修改清单

场景：新 sensor 点亮，等正式 IQ 期间先用最接近的现成文件（搜索源与部署流程见
iqfile-guide §6——SDK 优先，GitHub seeed_armbian_extension 分支 feat/linux6.12-rkaiq 备选）。
按顺序改（② 起全部来自新 sensor 的 datasheet）：

1. **文件名三段**改成新 DTS 对应（iqfile-guide §1）
2. `sensor_calib.resolution` → 新 sensor 模式分辨率
3. `Gain2Reg`：原厂增益公式模式（Sony dB 系 vs 线性 7 列表）
4. `CISGainSet`：again/dgain 范围（决定增益上限）
5. `CISTimeSet.Linear`：最小曝光行 + 系数
6. `CISExpUpdate`：生效延迟帧数
7. `CISHdrSet`/`CISDcgSet`：HDR 与 DCG 实际支持情况
8. `sys_static_cfg.algoSwitch`：定焦头关 AF（DISABLE_AF）
9. `ablc_calib` 黑电平 → datasheet OB 值（拿不到先沿用，出图会略灰）

NR/Sharp/Gamma/WB/CCM 等标定表**原样沿用**——偏色/偏亮属预期，出图链路验证完再向模组
厂/FAE 要正式 IQ 或走标定流程（tuning-cookbook §5）。

改完 `jq . < old > new` 重序列化 + `rkisp_parser` 校验 + 推板重启（iqfile-guide §4/§5）。

## 7. 与其它文档的分工

| 文档 | 管什么 |
|---|---|
| iqfile-guide | 文件级：命名匹配/格式代际/更新推板 |
| **本文档** | json 内部：结构 + 正常出图最小参数集 + 移植清单 |
| iq-params-map | 调参通道总览：uapi 路径 ↔ IQ 段名映射、静态调参流程 |
| tuning-cookbook | 画质精调：症状→方向（NR/Sharp/HDR/色彩标定） |
