# RK 官方 ISP 文档地图（<文档库>）

Rockchip redmine 官方 ISP 文档库快照：**9 个代际包 + 3 个专题包（分卷 zip）+ 根目录 9 个散装 PDF/xlsx + `legacy/` 13 个旧平台归档**，约 3.2G。
本工作站：`extracted/` **12 个包全部已解压**（双层目录 `extracted/<包>/<包>/...`）；`zip/` 分卷原件；`dl/` 下载清单与脚本。

- 重新解压某包：`cat zip/<包名>.zip.* > /tmp/p.zip && unzip /tmp/p.zip -d extracted/ && rm /tmp/p.zip`
- **内核源码备选在线查**（首选 $SDK/kernel）：`https://github.com/linux-rockchip/linux-rockchip`——分支选择等注意见 driver-porting.md 开头。

## 1. 代际包索引（按芯片选包）

| 包（zip/ 下） | 芯片 | ISP 代 | 特色内容（CN/EN 双语除注明） |
|---|---|---|---|
| `ISP30_Doc_250902` | **RK3588** | ISP30 | Tuning Guide v1.2.0（125p，AEC→NR→Sharp 全模块参数语义）/ ISP Dev Guide v1.2.5（369p，全模块 uapi）/ **3A Dev Guide v1.1.0（自定义 AE/AWB/AF 算法注册 API）** / VI Driver v1.1.5 / Color Opt v3.0.2 / OTP Calibration v1.0.34 / FEC |
| `ISP39_Doc_250324` | **RK3576** | ISP39 | Tuning Guide v2.0 / ISP Dev Guide **alpha** / 3A Dev Guide / IQ Tools Guide v3.0.2（ISP33/39 通用，ToolServer+Tuner）/ Color Opt v1.2.0（ISP39/33）。VI 驱动文档用散装 v1.2.0 |
| `ISP21_20221027` | RK3566/RK3568 | ISP21 | Tuning v2.1.1 / Dev v2.1.1 / VI v1.1.3 / Color Opt v2.0.1 |
| `ISP20_20221027` | RV1109/RV1126 | ISP20 | Tuning v1.6.7 / Dev v1.7.2 / VI v1.1.3 / Color Opt v1.2.8 / IQ Tools v2.0.6 |
| `ISP32_20231201` | RV1103/RV1106 | ISP32 | Tuning v0.1.3 / Dev v0.1.2 / 3A v0.1.0 / VI v1.1.3 / Color Opt v3.1.3 |
| `ISP32-lite_20230302` | RK3562 | ISP3.2lite | Tuning v1.0.0 / Dev v1.0.0 / VI v1.1.4 / Color Opt v3.1.0 / IQ Tools v2.0.7 |
| `ISP33_Doc_250211` | RV1103B | ISP33 | Tuning v1.3.3 / Dev v1.1.0 / 3A / VI v1.1.8 / IQ Tools v3.0.2（ISP33/39） |
| `ISP35_Doc_260819` | RV1126B | ISP35 | **内容最全**：Tuning v1.0.5 / Dev v1.0.3 / 3A v1.2.0 / VI v1.2.1 / Color Opt v1.3.0（39/33/35）/ IQ Tools / OTP v1.1.4 / FEC / IRFPA v0.1.3 / Thunder Boot |
| `ISP351_Doc_260819` | RK3572 | ISP3.51 | Tuning v1.0.0 / Dev v1.0.0 / 3A v1.2.0 / VI v1.2.1 / Color Opt v1.4.3（39/33/35/351）/ IQ Tools v3.0.8 / OTP v1.1.4 |

## 2. 专题包

| 包 | 内容 |
|---|---|
| `Rockchip_Development_Guide_PDAF_v1.1.3` | PDAF 相位对焦开发（CN/EN） |
| `Rockchip_Development_Guide_IRFPA_CN_V0.4.1` | 红外热成像（IRFPA）开发 |
| `Rockchip_Development_Guide_SmartIR_CN_V1.0.4` | SmartIR 补光 |

## 3. 散装文档（根目录）

**现役平台相关（高价值）**：

| 文件 | 定位 |
|---|---|
| `Rockchip_Driver_Guide_VI_CN_v1.2.0.pdf`（231p） | **VI/vicap 驱动权威**（2025 最新，覆盖 rk3576/RV1126B/RV1103B + kernel 6.1）：DTS 节点/多摄注册/focus-zoom-iris-ircut 马达/抓 RAW 命令/时延优化 |
| `Camera_Exteranl_FAQ_v2.1.pdf`（67p） | **MIPI/sensor 排障 FAQ**：错误五层分类+处理顺序、Ths-settle 计算、DPHY status 位解读、I2C 不通、HDR 类型表（已提炼进本 skill references/pipeline-debug.md §5） |
| `RockChip摄像头模组调试项目信息表.xlsx` | bring-up 需求信息表（已提炼进 sensor-checklist.md §0） |
| `RK平台MIPI FAQ_v1.0.xlsx` | MIPI FAQ 表格版（与上面 FAQ 互补） |
| `Rockchip_ISP_Tuning_Guide_for_Thunder_Boot_CN_v0.1.0.pdf` | 雷电靴（快速启动）ISP 调参 |

**邻域参考（低频）**：`Rockchip_Trouble_Shooting_Android_CameraHAL3` / `CameraHa3`（Android HAL 排障）、`Android_Camera_Of_Multichannel`（多摄）、`HDMI_IN_开发指南` ×2（HDMI 输入走 VI）。

**旧平台归档（`legacy/` 子目录，ISP1.x 时代，基本不查）**：`RK312x_Camera_User_Manual`(3288/3368)、`RK_ISP10_Camera_User_Manual` v2.2/v2.3、`CIF_ISP10/11_Driver_User_Manual` ×4、`Camera_Engine_Cifisp` v1.2、`camera_engine_rkisp_user_manual` v2.0、`RKISP1_IQ_Parameters` v1.0、`RKISP_Driver_User_Manual` v1.3、`SOFIA 3G-R Camera Module AVL`(2016 Marvell 平台)。

**SDK 自带中文文档**（`camera_engine_rkaiq/docs/`，linux6.12 树实测 8 篇）：`RKAIQ版本对应关系`（版本号语义 + 芯片↔ISP 宏/IQ_STRUCT_MARK 全表）、`源码目录说明`、`rkaiq控制通道清单`、`IQ文件调试流程`、`IQ调参指南`、`AE参数结构`、`rkaiq_3A_server源码分析`、`rkisp_demo源码分析`。查架构/版本/通道优先看这层，比 redmine PDF 近。

## 4. 什么问题查哪本（速查）

| 问题 | 文档 | 章节 |
|---|---|---|
| sensor 不出图/花屏/MIPI 报错 | Camera_Exteranl_FAQ（散装） | §2 MIPI（pipeline-debug.md §5 有提炼版） |
| I2C NACK / 供电 / MCLK | Camera_Exteranl_FAQ §1.1 + sensor-checklist.md | — |
| DTS/vicap 节点、多摄、马达 | Rockchip_Driver_Guide_VI_CN_v1.2.0（散装） | — |
| 驱动移植参考 | Driver_Guide_VI「CIS 驱动说明/驱动移植步骤」 | — |
| AEC/AWB/NR/Sharp 参数语义 | 各代 Tuning Guide（包内） | §3 调优流程 / §4 模块介绍 |
| uapi 结构体字段（5543 调参） | 各代 ISP Development Guide（包内） | 模块章节 |
| 官方 Tuner/ToolServer 用法 | IQ Tools Guide（ISP33/39/351 包或 ISP32-lite） | §2 快速入门 / §4 FAQ |
| 自定义 3A 算法 | 3A Development Guide（ISP30/32/33/35/351/39 包） | §2 算法注册 |
| CCM/AWB 标定流程 | Color Optimization Guide（各代） | — |
| 模组 OTP 个体校正 | OTP Calibration Guide（ISP30/35/351 包） | — |
| IQ 代际兼容（互不兼容规则） | sensor-selection.md §5 + 各包版本号 | — |
| 跨 ISP 代 IQ 迁移（兼容分层/模块命名对照/迁移工具） | SDK 自带 `camera_engine_rkaiq/docs/IQ文件调试流程.md` §6 | 全章 |
| 控制通道能力总表（5543/unix 各能控什么、uapi 路径全表、控制不了的清单） | SDK 自带 `camera_engine_rkaiq/docs/rkaiq控制通道清单.md` | 全文 |

## 5. 与本 skill 各 reference 的交叉引用（找提炼内容）

- 点亮侧：pipeline-debug.md §5（FAQ 提炼）、sensor-checklist.md §0（信息表提炼）、dts-reference/driver-porting（查 VI Driver Guide）
- 运行时侧：aiq-architecture/rebuild（查 3A Dev Guide）
- 调参侧：aiq-ipc-protocol.md §7（IQ Tools Guide 提炼）、tuning-cookbook.md §1.1/§5/§7（Tuning Guide 提炼）、iq-params-map（查 ISP Dev Guide）
- 芯片→包名映射见本文各条目的包名字段
