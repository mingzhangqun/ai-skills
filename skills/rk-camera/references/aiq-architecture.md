# rkaiq 架构源码级说明

源码位置（两个板通用，结构一致）：
- RK3588: `$SDK/external/camera_engine_rkaiq/`
- RK3576: 同上 + 独立调参树 `<调参树>`（branch `linux-6.1-stan-rkr6`，已有 build_test/ 配 ISP39/rk3576）
- linux6.12 SDK（AIQ v6.0x33）：**一棵统一树编所有 SoC**（`RKAIQ_TARGET_SOC`/`ISP_HW_V*` 选路径，RK3588 与 RV1126B 构建报同一版本号）。版本号语义（AIQ `v6.0xAB` ↔ rkisp 驱动 `vA.B`，与内核版本无直接对应）与芯片↔ISP 宏全表见 SDK 自带 `docs/RKAIQ版本对应关系.md`（另有 源码目录说明/rkaiq控制通道清单 等 8 篇中文 md）。顶层较 6.1 树多：`IspFec/`（FEC 鱼眼/畸变校正）、`irfpa_isp/`（红外热成像）、`smart_ir/`、`rk_stream/`、`media_enquiry/`。

## 1. 目录地图

| 目录 | 内容 |
|---|---|
| `rkaiq/` | core：`aiq_core`（引擎）、`algos/`（各算法模块）、`hwi/`（ISP 硬件抽象）、`ipc_server/`（UNIX socket 服务端）、`uAPI2/`（对外 C API，rk_aiq_user_api2_*）、`iqfiles/`（IQ 文件源）、`xcore/`（日志等基础库）|
| `rkaiq_3A_server/` | 3A 守护进程（单 cpp 364 行）+ `S40rkaiq_3A` init 脚本 |
| `rkaiq_tool_server/` | PC 调参桥（TCP 5543 ↔ UNIX domain）+ `netserver/` + `camera/`（抓图能力）+ `rkaiq/`（协议实现 rkaiq_online_protocol.cpp，4807 行）|
| `rkisp_demo/` | V4L2 取流 demo（DRM 显示 + 3A server 配合出 NV12）|
| `rkisp_parser_demo/` | host 侧 IQ 文件解析/校验 |
| `media_enquiry/` | media 拓扑查询小工具 |
| `IspFec/` `smart_ir/` `irfpa_isp/` | FEC 标定 / 智能 IR / 红外热成像辅助 |

## 2. 3A server 启动流程（rkaiq_3A_server.cpp，行号按 rk3588 版）

```
main (313)
 ├ parse_args (235)            # -s 静默；无关键参数
 ├ 枚举 /dev/media0..N
 │   └ rkaiq_get_media_info (96)
 │       ├ media_device_enumerate
 │       ├ 找 4 个实体: "rkisp-isp-subdev" / "rkisp-input-params"
 │       │   / "rkisp-statistics" / "rkisp_mainpath"
 │       │   └ 找不齐 → "Cound not find rkisp dev names, skipped <mdev>"  ← 该 media 设备被跳过（CIF-only 的 media 常态，非错误）
 │       └ sensor_name = rk_aiq_uapi2_sysctl_getBindedSnsEntNmByVd(mainpath)
 │           └ NULL → "ERR: No sensor attached to <mdev>" ← sensor 未绑定，回 bringup
 ├ init_engine (140)
 │   ├ aiq_ctx = rk_aiq_uapi2_sysctl_init(sensor_entity_name, IQ_PATH="/etc/iqfiles/", NULL, NULL)
 │   ├ rk_aiq_uapi2_sysctl_setListenStrmStatus(ctx, false)   # 不自动开流
 │   └ rk_aiq_uapi2_sysctl_prepare(ctx, width, height, RK_AIQ_WORKING_MODE_NORMAL)
 │       └ 失败 → "rkaiq engine prepare failed !" + exit(-1)  ← 大概率 IQ 文件问题
 └ start_engine (161): rk_aiq_uapi2_sysctl_start(ctx)
```

之后常驻循环，**等待应用开流**：应用 `open(mainpath video node)` → rkaiq 收到 stream 事件 → ISP start → 3A 开始跑。

## 3. tool server 协议栈

```
PC IQ Tool ──TCP 5543──> rkaiq_tool_server (main:560)
  Bind(5543) → onNewConnection → RKAiqProtocol::HandlerTCPMessage
    rkaiq_tool_server/rkaiq/rkaiq_online_protocol.cpp
      ├ TCP 报文: magic "#&#^ToolServerMsg#&#^" + 长度 + JSON + 尾 "#&#^@`#`@`#`"
      ├ 命令分发: CMD_TYPE_JSON_WRITE / JSON_READ / 文件传输 / 抓图回调
      └ DoAnswer*() 组响应包
  转发: netserver/domain_tcp_client ──UNIX /tmp/UNIX.domain0──> 3A server 内 ipc_server
      rkaiq/ipc_server/{socket_server, MessageParser, command_process}.cpp
      └ 分发到 rkaiq_tool_{ae,awb,anr,sharp,imgproc,sysctl}.cpp
```

Android 差异：UNIX domain 路径换成 `/dev/socket/camera_tool%d`（CSI.md 实测该 socket 常年 "Permission denied" 打不开——源码注释自认 "will always failed"，无害噪声）。

## 4. 自定义重编时的关键 CMake 变量

- `RKAIQ_TARGET_SOC`：rk3588 / rk3576 / rv1126b / rk356x / rk3562
- `ISP_HW_VERSION`：`-DISP_HW_V30`（rk3588）/ `-DISP_HW_V39`（rk3576）/ `-DISP_HW_V35`（rv1126b）/ `-DISP_HW_V21`（rk356x）
- 独立树已有 build_test/ 缓存（rk3576+V39+`/usr/bin/aarch64-linux-gnu-gcc`）——重编前核对编译器存在。

## 5. 板上相关节点速查

| 节点 | 作用 |
|---|---|
| `/dev/mediaX` | media 控制器（sensor→dphy→csi2→cif→isp 拓扑）|
| `/dev/v4l-subdev*` | subdev（sensor/isp/dphy）|
| rkisp mainpath video 节点 | NV12/YUV 输出（应用取流口）|
| rkisp-input-params video 节点 | 写 ISP 参数（3A 用）|
| rkisp-statistics video 节点 | 读 ISP 统计（3A 用）|
| CIF TX 节点（rk3588 的 video0/1/2 等）| RAW 透传/3A 拷贝路径 |
| `/etc/iqfiles/` | IQ 文件 |
| `/tmp/UNIX.domain0` | tool server ↔ 3A server 通道 |
| TCP 5543 | PC 调参工具入口 |

## 6. AIQ 内部模型与自定义 3A 算法（官方 3A Development Guide ISP30 提炼）

### 库的构成（为什么 AE 行为改不了源码）

librkaiq.so = 一堆**静态库链接而成**：`librkaiq_ae.a / librkaiq_awb.a / librkaiq_af.a`（3A 核心，**闭源不提供源码**）+ HDR/去雾等基础库（开源）。所以改 AE/AWB 行为不能改源码，只能换 IQ 参数或**注册自定义算法**。

### 内部四线程（解释调参时序与死锁机理）

1. **统计获取线程**：不断从 ISP 驱动读 3A 统计 → 发给计算线程
2. **3A 计算线程**：收到统计 → 调各算法（含第三方回调）算新参数 → 分发给下两级
3. **ISP 参数设置线程**：在合适时机下发新 ISP 参数
4. **SOF 线程**：响应 sensor 帧头事件，从队列取新曝光参数写给 sensor 驱动

（AEC 冷启动死锁=第1环 stats 全黑 → 第2环 InputExp==0 循环；sensor 直写曝光是绕过第4环直接喂 sensor——机理吻合）

### 自定义 3A 算法（三种开发模式）

- 全 RK 库 / 混合（AE 自定义+AWB 用 RK）/ **同时跑**（先 RK 后自定义，自定义结果覆盖——自定义库无需输出全部框架结果）
- 注册：`rk_aiq_uapi2_customAE_register(ctx, &cbs)`（cbs = init/run/ctrl/exit 四回调）→ `customAE_enable(ctx, true)`；默认 RK 与第三方算法都跑，`rk_aiq_uapi2_sysctl_enableAxlib` 可强关 RK AE。AWB/AF 同型 API。
- 多摄环视走 camgroup：`rk_aiq_uapi2_camgroup_create(&cfg)`（sns_ent_nm_array 挂多 sensor + overlap_map_file）代替单摄 sysctl_init。
- 场景预选（ IQ 文件内多场景参数选择）：`rk_aiq_uapi2_sysctl_preInit_scene(sns, "normal"|"hdr", "day")`。

### AWB 问题定位的官方 log 口径（Color Optimization Guide §2.4）

```bash
export persist_camera_engine_log=0x2ff4    # 控制与模式级：hdr_working_mode/byPass/mode/最终 wbgain
export persist_camera_engine_log=0x2ff2    # 一般定位：LVValue/WPType/白点数/收敛标志/平滑系数/frameChoose
export persist_camera_engine_log=0x2ff3    # 白点条件与策略：type0 gain → s1 → clip → adjust → s5 全链
```
读法要点：`awbConverged` 0/1=未收敛/收敛；`frameChoose` 0/1/2=短/中/长帧做统计；增益链
`type0:gain ⇒ strategy_result ⇒ s1 ⇒ s3(Clip) ⇒ s4(Adjust) ⇒ s5(damp) ⇒ 最终 awb_gain_algo`——哪一环跳变，问题就在哪一环。
