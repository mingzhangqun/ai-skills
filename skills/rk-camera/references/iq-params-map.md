# IQ 参数地图（实时找手感 + IQ 文件固化两条通道）

## 1. 两条调参通道

| | 实时 | 静态（IQ 文件） |
|---|---|---|
| 生效 | 立即 | ⚡Live 免重启热应用 / Push 重启 3A 后 |
| 工具 | webui sensor 直写（曝光/增益）；⚡Live（IQ 模块热改） | webui IQ 编辑 / 手编 xml/json + `rkisp_parser` 校验 |
| 范围 | sensor 直写=曝光增益类；⚡Live=IQ 全模块 | IQ 文件全树（更细：按 ISO 段的曲线表） |
| 适合 | 调试、找手感 | 固化结果、按 ISO 分段精调 |
| 典型流 | 实时调到满意 → 记下参数 → 落到 IQ 文件 → Push 固化 | |

## 2. 模块 → uapi 路径（退役通道，供重建客户端参考） → IQ 文件段

| 模块 | uapi 路径 | IQ 文件里的段（V30 xml 段名示例） |
|---|---|---|
| AE | `/uapi/0/ae_uapi/expsw_attr` | `AEC`/`Aec`（含按场景的 target/ratio） |
| AWB | `/uapi/0/awb_uapi/{mode,wbgain,attr}` | `AWB`（白平衡范围/增益策略） |
| CCM 色彩矩阵 | `/uapi/0/accm_uapi/{mode,stManual}` | `CCM`（按色温段矩阵） |
| 饱和/对比/色相 | `/uapi/0/cp_uapi/attr` | `ColorCorrection`/CP |
| 2D NR (bayer) | `/uapi/0/abayer2dnr_uapi/manual` | `Bayer2dnr`（按 ISO 的强度表） |
| 3D NR (bayer) | `/uapi/0/abayertnr_uapi/manual` | `Bayertnr` |
| YUV NR | `/uapi/0/{aynr,acnr,cnr}_uapi/...` | `YNR`/`CNR` |
| MFNR | `/uapi/0/ayuvme_uapi/...` | `Yuv12me` |
| 锐化 | `/uapi/0/asharp_uapi/manual` | `Sharp`（按 ISO 的 radius/strength 表） |
| Gamma | `/uapi/0/agamma_uapi/stManual` | `Gamma`（分段曲线） |
| DRC/去雾 | `/uapi/0/{adrc,adehaze}_uapi/stManual` | `DRC`/`Dehaze` |
| HDR 合成 | `/uapi/0/amerge_uapi/stManual` | `Amerge` |
| BLC/DPCC | `/uapi/0/{ablc,adpcc}_uapi/...` | `BLC`/`DPCC` |
| FEC/LDCH | （IQ 文件 + IspFec 标定工具） | `FEC mesh`（独立文件） |
| 镜头阴影 | `alsc_uapi`（部分版本） | `LSC` |
| 3D LUT | `/uapi/0/a3dlut_uapi/manual` | `3DLUT` |

## 3. IQ 文件结构要点

- 源: `$SDK/external/camera_engine_rkaiq/rkaiq/iqfiles/<isp3x|isp39>/<sensor>_<module>_<lens>.xml|json`
- 结构（ISP30 xml）: 顶层按 `Version`/` SensorInfo` + 各模块段；每段常见三部分:
  `..._ctrl`（使能/模式）+ `normal`（正常光，可按 ISO 分段 `..._ratio`）+ `hdr`（HDR 分支）。
- **按 ISO 分段**是 IQ 文件的核心威力（实时 uapi 只有当前 ISO 档）: NR/Sharp 的强度表 `iso` 数组 + 参数数组一一对应。
- ISP39 json 是同构的 json 版（段名 `scene_isp39` 一代一个键——代际错配即崩，见同目录 iqfile-guide.md）。
- 改完必过 `rkisp_parser`（HOST_DIR/bin）校验再推板。
- json 顶层五段/模块分级/"只求正常出图"的最小参数集与移植清单 → 同目录 iq-json-key-params.md。

## 4. 单位与常见坑

- AE 增益三口径（uapi=倍数 / v4l2=×1024 / IQ Gain2Reg 表）——换算见 aiq-ipc-protocol.md §5。
- 曝光 uapi 用**秒**；v4l2 用**行**（行数×行周期=秒，行周期看 sensor 模式表）。
- WB 增益 uapi 范围 0~8（f32），1.0=单位增益。
- 锐化/NR 的 IQ 表是按 ISO 的数组——实时改只影响当前档；"画面噪"在低光（高 ISO 档）时要改高 ISO 段。
- HDR 模式下部分模块段在 `hdr` 分支，改 `normal` 不生效。

## 5. 静态调参工作流（推荐顺序）

1. `ssh <别名> 'dmesg | grep -i iq'` 确认当前加载的 IQ 文件名
2. `scp <别名>:/etc/iqfiles/<file> .` 拉到本地
3. 改段（模块/ISO 段/值）
4. `rkisp_parser <file>` 校验
5. 推回+重启（见同目录 iqfile-guide.md §4）
6. web 控制台看效果（预览+快照量化：拉普拉斯均值=清晰度、亮度均值=曝光）
