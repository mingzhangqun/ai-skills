# rkaiq ipc 协议（unix 直连为主路，5543 桥）— 源码逆向文档

适用: RK3588 (ISP30) / RK3576 (ISP39) Linux SDK 的 `external/camera_engine_rkaiq`。
逆向来源（linux6.1 树）: `rkaiq_tool_server/rkaiq/rkaiq_protocol.cpp`（TCP 分发/转发）、`rkaiq/ipc_server/{MessageParser,socket_server}.cpp`（3A 侧解析/执行）、`rkaiq/uAPI2/rk_aiq_user_api2_helper.cpp`（uapi 路径表）。
linux6.12 树（AIQ v6.0x33 统一多 SoC）结构已变（2026-10-18 实核）：消息处理/转发主体 =
`rkaiq/rkaiq_online_protocol.cpp`（191KB，含 `g_domainTcpClient` 转发与收包 switch），新增
`rkaiq/rkaiq_raw_protocol.cpp`（离线 raw 处理），`rkaiq_tool_server.cpp` 持主循环与分发调用；
旧 `rkaiq_protocol.cpp`（73KB）已无 RKAiqProtocol 成员定义（遗留文件）。3A 侧两文件与 uAPI2
路径不变；包格式（§2）与透传语义实测逐项仍成立（magic=MessageParser.hpp:38、recv 整段一条
=tcp_socket.hpp:120、AIQ_MSGPARSER_CHECK_HASH 仍注释未启用）。

## 1. 链路（unix 直连为主路，5543 为可选桥）

```
客户端 ──ssh direct-streamlocal──> /tmp/UNIX.domain0 ──> 3A server 内 ipc_server
         （主路：webui ⚡Live 热应用即此；native 模式=本机 net 直连同一 socket，§9）

客户端 ──TCP 5543──> rkaiq_tool_server（可选桥，仅供官方 PC IQ Tool）──UNIX──> 同一 ipc_server
          （MessageForward: 原样转发，不解析不重封！两条路线上 3A 看到的字节完全一致）
```

关键结论（都在源码里钉死）：
- **tool server 对调参 JSON 是纯透传**：`HandlerTCPMessage` 的 else 分支 → `MessageForward` → `g_domainTcpClient.Send(buffer, size)` 原字节转发。
- 模式切换不可用（两树殊途同归）——不存在"切 tuning 模式"前置动作：6.1 树 `DoChangeAppMode()` 顶部 `return 0`；6.12 树只剩声明（rkaiq_protocol.h）与调用点，全树无定义体。
- **写（cmd_id=0）无回包**（`rkaiq_params_tuning` 的 WRITE 分支不 send）；**读（cmd_id=1）回一个同格式包**（`rkaiq_ipc_send`）。
- **两条路线上 3A 看到的字节完全一致**（直连= 透传的上游），帧格式/雷区无差别。

## 2. 协议帧（两条通道同一格式，一次 send 一包）

桥侧服务器 `recv(BUFFER_SIZE)` 整段当一条消息处理（`netserver/tcp_socket.hpp:120`），单包别超 ~64KB。

```
偏移  字段           类型      值
0     magic          4B        'R', 0xAA, 0xFF, 'K'
4     cmd_id         int32     0=WRITE(set) / 1=READ(get)
8     cmd_ret        int32     0
12    sequence       uint32    自增
16    payload_size   uint32    len(JSON)
20    packet_size    uint32    = payload_size（rkaiq_ipc_send 里两值相同）
24    payload        bytes     JSON 命令
24+n  data_hash      uint32    0 —— 服务端 AIQ_MSGPARSER_CHECK_HASH 未启用，不校验
```

全部小端 packed。回包同格式（magic 可能不在缓冲开头，按 magic 搜索）。

## 3. JSON 命令（payload）

```json
{"op": "replace", "path": "/uapi/0/awb_uapi/mode", "value": "{\"mode\": \"OP_MANUAL\"}"}
```

- `value` 是**字符串化的内层 JSON**（源码注释 rk_aiq_user_api2_helper.cpp:44 的官方示例如此）。
- 分发（socket_server.cpp `rkaiq_params_tuning`）：payload 含 `uapi/0/` → `rkaiq_uapi_unified_ctl`（现代统一 API，路径表见下）；否则走 `rk_aiq_uapi_sysctl_tuning`（旧 tuning 字符串，不推荐）。
- 枚举值用**名字字符串**（`"OP_MANUAL"`、`"RK_AIQ_OP_MODE_MANUAL"`）；整数值（OP_MANUAL=1, RK_AIQ_OP_MODE_MANUAL=2）也常见，不生效就换。
- 部分字段替换可用（JSON-PATCH 语义）；保险做法是 **get 全量 → 改字段 → set 回去**。

## 4. uapi 路径表（`rk_aiq_user_api2_helper.cpp` 的 `__RKAIQUAPI_DESC_DEF`；linux6.1 树 94 条、linux6.12 树 121 条，以板子 SDK 现场提取为准）

高频核心：

| 路径 | 用途 | 关键字段（已核对） |
|---|---|---|
| `/uapi/0/ae_uapi/expsw_attr` | AE 总开关/模式/手动曝光增益 ⚠本板 SEGV 雷(§8) | `Enable`、`AecOpType`(RK_AIQ_OP_MODE_MANUAL=2)、`stManual.LinearAE.{ManualTimeEn,ManualGainEn,TimeValue(秒,f32),GainValue(倍数,1~4096),IspDGainValue}` |
| `/uapi/0/ae_uapi/opmode` | AE 自动/手动模式切换 ⚠同上,协议层"可控"≠本板可写 | `opMode`(OP_AUTO/OP_MANUAL) |
| `/uapi/0/ae_uapi/expinfo` / `queryExpInfo` | 当前曝光实况（读）⚠读=uapi READ 包,本板禁(见本 skill SKILL §4) | — |
| `/uapi/0/awb_uapi/mode` | AWB 模式 | `mode`("OP_AUTO"/"OP_MANUAL"/"OP_SEMI_AUTO") |
| `/uapi/0/awb_uapi/wbgain` | 手动 WB 增益 | `rgain/grgain/gbgain/bgain` (f32, 0~8) |
| `/uapi/0/cp_uapi/attr` | 色彩处理（饱和/对比/色相） | `stMan.sta.hw_cpT_{sat,contrast...}_adjStrg`（128=中性） |
| `/uapi/0/accm_uapi/{mode,stManual}` | CCM | 版本相关 |
| `/uapi/0/asharp_uapi/manual` | 锐化手动参数 | `OPMode` + `manual_v4`(V30)/`manual_v34`(V39)…字段随 ISP 代际变 |
| `/uapi/0/abayer2dnr_uapi/manual` | Bayer 2D NR | 同上（manual_v2/manual_v23） |
| `/uapi/0/abayertnr_uapi/manual` | Bayer 3D NR | 同上 |
| `/uapi/0/agamma_uapi/stManual` | Gamma 手动曲线 | — |
| `/uapi/0/adrc_uapi/stManual`、`/uapi/0/adehaze_uapi/stManual` | DRC/去雾 | — |
| `/uapi/0/af_uapi/attr` | AF | — |
| `/uapi/0/system/work_mode` | 工作模式 NORMAL↔HDR（另有 `system/crop`、`system/scene`） | — |
| `/uapi/0/module_ctl_uapi/info` | 各 ISP 算法模块**总开关表**（关 3DNR/锐化…的正规入口） | — |
| `/uapi/0/measure_info/ae_hwstats` | 读硬件 AE 统计 | 读路径,按 uapi READ 风险对待 |

其余模块路径模式统一：`/uapi/0/<模块>_uapi/{attr,info,mode,manual,stManual,Info}`——全表可用 `grep '__RKAIQUAPI_DESC_DEF' rkaiq/uAPI2/rk_aiq_user_api2_helper.cpp` 现场提取（不同 SDK 版本略有差异，以板子对应 SDK 为准）。

## 5. 单位换算（三个口径别搞混）

| 参数 | uapi（本协议） | v4l2 ctrl | IQ 文件 |
|---|---|---|---|
| AE 模拟增益 | 倍数 f32（1~4096） | ×1024（1x=1024） | Gain2Reg 表（code=C1×G^M0−C0） |
| 曝光时间 | **秒** f32 | 行数 | — |
| WB 增益 | 倍数 f32（0~8） | ×256 | — |

## 6. 客户端实现注意

- 板不在直连网络（跳板/NAT 后）→ 两条路都经 ssh：tcp 通道用 forwardOut 到板 127.0.0.1:5543（等价 `ssh -N -L 45543:127.0.0.1:5543`），unix 通道用 ssh2 `openssh_forwardOutStreamLocal`（等价 `ssh -N -L 45543:/tmp/UNIX.domain0`，sshd≥6.7）；重建客户端时按此实现（退役的 js/aiq-client.js 在 git 历史）。
- 写后验证靠 get（写无回包）。读超时 3s 合理（3A server 没跑时 tool server 转发失败直接关连接 → 连接错误）。
- TCP 入站按帧头 8B `RKID` 字段路由（`HandlerTCPMessage`, rkaiq_protocol.cpp:1681）：
  `"ISP_ON"`(TAG_OL_PC_TO_DEVICE, online_protocol.h:12) → **在线协议通道**（HandlerOnLineMessage 大 switch, online_protocol.cpp ~4640：`CMD_TYPE_JSON_WRITE/READ`(0x10/0x11)、`CAPTURE`(0x02) 在线抓 YUV/RAW、`STATUS`(0x80) 状态/RTSP 起停）；`"ISP_OFF"`(TAG_PC_TO_DEVICE) → RAW 抓图通道；`SendFile`(IQ 落盘 /etc/iqfiles/)/`OffRAW`(离线回灌)/`GetAWBp`/`J2SFUNC`/`I2CFUNC`/`IGNORE` → 各专用 handler；**其余（含本协议 R,0xAA,0xFF,K 调参帧）→ MessageForward 纯转发给 3A**。v1 客户端未实现这些通道，需要时按同一方法逆向。
  ⚠ 名字陷阱：`ISP_ON`/`ISP_OFF`（rkaiq_common.h:55/56）不是"开关 ISP"的命令——`ISP_ON` 有双重身份：入站=在线协议通道路由标签，出站=DoAnswer 应答帧头部魔数（`strncpy` 填入）。
- 二进制透传 `CMD_TYPE_UAPI_SET/GET`（0x00/0x01）**已废弃**：执行体 `rkaiq_manager->IoCtrl()` 被 `#if 0` 注掉（online_protocol.cpp:497/521），收完参数直接丢弃。5543 上实际可用 = JSON 通道(0x10/0x11) + CAPTURE(0x02) + STATUS(0x80) + RKID 附加命令。
- **"停 3A 引擎"没有 5543 命令**：引擎事件驱动被动跟随（应用 STREAMON → 驱动广播 STREAM_START → 3A 才跑）。想停 3A 算法只能停流或停/杀 3A server（webui 全程 3A 零操作，不停也不起），绝不能流开着动 3A。
- **"免重装载载 IQ"同样没有通道命令**：`rk_aiq_uapi2_sysctl_updateIq`（FromFile 重解析 → `updateCalibDb()` 整体替换，运行中生效）**只能进程内调用**（需 sys_ctx，不支持 CamGroup）——unix/TCP 两条通道都够不到。经通道改 IQ 的生效路径只有：热 patch（webui ⚡Live）或写文件+重启 3A。
- 多相机时 tool_server 启动交互选 camIndex，被控对象是 `/tmp/UNIX.domainN` 对应的那路引擎（调参不生效先确认没调错相机）。
- Android 上 domain socket 路径是 `/dev/socket/camera_tool%d`，且实测常年 Permission denied（噪声）。

## 7. 官方文档对照（Rockchip IQ Tools Guide v3.0.2，ISP33/39）

官方对 ToolServer 的正式说明在 `Rockchip_IQ_Tools_Guide_ISP33_ISP39_CN_v3.0.2.pdf`（<文档库>/extracted/ISP39_Doc_250324/，索引见同目录 isp-docs-map.md）。与我们逆向结论互证的要点：

### 7.1 官方启动方式与参数

```
rkaiq_tool_server [-d 0] [-w 1920] [-h 1080] [-c /dev/video0] [-s /dev/video11]
  -d  sensor 选择（media-ctl -p 拓扑里 m00_b_xxx 的 NN，双摄 -d 1）
  -c  capture 节点（默认 stream_cif_mipi_id0 = /dev/video0）
  -s  stream/YUV 采集节点（默认 rkisp_mainpath = /dev/video11）
  -i  IQ 文件读取路径（-r=0 时可忽略）
  -w/-h  RTSP 预览输出分辨率（默认 1920x1080）
  -n  在线连续 Raw 采集缓存数（默认 4，大批量采集加大）
  -f  离线帧发送帧率（默认 10）
```

官方流程：**先起相机应用（rkipc/rkisp_demo），再起 tool_server**；启动脚本里建议相机应用后 `sleep 1` 再起。连接成功标志：`rkaiq_tool_server connect AIQ success`。

### 7.2 connect AIQ failed 官方排查（与我们实战互补）

1. `ps` 确认相机应用在跑（AIQ 由相机应用拉起——rkaiq-runtime 的 3A service 也一样）
2. **`cat /proc/rkisp*`**：官方钦定的 ISP 模块状态口——只打印头部几行（clk/Interrupt/Input）= AIQ 没运行；打印模块列表但大部分 OFF = **缺 IQ 文件或命名错**（这条比翻 journalctl 快）
3. tool_server 起得比 AIQ 初始化早 → 打 failed 无害，初始化完自动连上
4. 双摄时会提示 `Please select AIQ node to connect:` 输入 index

### 7.3 官方 FAQ：连接正常、写不报错、参数不生效

- **双摄调错对象**：调的不是预览的那颗（调 Gamma/手动 AE 这类明显参数验证通路）
- **内存耗尽**：ReadAll/WriteAll 大 JSON 时进程被杀（官方要求 ≥5MB 可用内存）——对应我们"CMA 太满导致 3A 重启"的同类经验
- **AIQ 状态异常**：预览偏绿=没加载 IQ；画面正常但遮镜头亮度不响应=AE 停摆（采完整 AIQ log 提 redmine）
- **应用 API 覆盖**：相机应用代码在调 AIQ API，把工具的写覆盖掉
- **ISO 档位不一致**（高频坑）：NR/Sharp 等参数按 ISO 分档，改的档位 ≠ 当前工作档位；先用 TunerAssistant 读当前 ISO 定档位再改

### 7.4 与逆向结论的差异/印证

- 官方确认 tool_server "仅传递数据，不含拉流推流预览"——与我们"纯透传"结论一致；官方预览走 rtsp_server demo 或用户自己的应用
- 官方 Tuner 的 AIQ 版本匹配机制（Get AIQ Version → 版本列表）解释了**协议/字段随 AIQ 版本变**的原因（asharp manual_v4/manual_v34 之类代际差异）——字段不生效先核 AIQ 版本
- `strings /oem/usr/lib/librkaiq.so | grep "AIQ v"` 可直接读板上 AIQ 版本号

## 8. SET 内部 readback 机理（linux6.12-sdk 源码分析，2026-09-29）

**每个 uapi SET 都隐含一次 GET**——`__rkaiq_uapi_common_call`（uAPI2/rk_aiq_user_api2_helper.cpp，
宏版在 rk_aiq_user_api2_helper.h `__RKAIQUAPI_CALLER`）的 SET 分支：

```
SET 请求 → 先内部 GET（arg_get 读当前参数 → j2s_struct_to_json dump）
        → cJSON patch 合并 → j2s_json_to_struct 反序列化 → arg_set 下发
```

对调参客户端的含义：

1. **"写无回包但写不是纯写"**——写命令把读路径的风险全继承了。某模块 READ 会崩（如 AE），
   它的 SET 同样可能崩（内部 readback 踩同一个雷）。
2. **AE 是高危模块的三重叠加**：getExpSwAttr 无就绪检查 + 直插闭源库读 mAlgoCtx（引擎
   reconfig 中读到坏上下文→SEGV）；setExpSwAttr 的 SYNC 模式 `waitSignal` 阻塞等算法线程消费，
   3A 停滞时写线程挂死（还持 mCfgMutex 连锁堵死）。手动 AE 封禁因此**不能只看成"写危险"，
   是 readback+同步等待+reconfig 的组合**。
3. **patch 语义的来源**：正因为 readback-merge，部分字段替换才能工作（我们只发变更字段，
   框架用旧值补全）——get→改→set 的官方建议同源于此。
4. `sync.sync_mode` 字段：请求里设 ASYNC 可绕过 waitSignal 阻塞，但 readback 依旧——不构成解禁理由。
5. 新版源码（USE_NEWSTRUCT）有 algo_handle 判空等修补，**readback-then-set 设计未变**——
   升级 AIQ 版本不消除该风险面。

**2026-10-12 devkit3588 实锤（不只理论）**：无 ISP 流的板子上 uapi SET 必崩——
awb wbgain（108B 包）与 cp attr（135B 包）两次写均 `SocketServer::Recvieve` 收包后
1-3s 内 `status=11/SEGV` core-dump；tcp（经 tool_server）与 unix（直连）两通道一致，
rkcif RAW 流跑着也救不了（引擎等的是 ISP 图 media1 的 stream 事件，rkcif 直采不算）。
机理即上文的 readback：ISP 流从未 STREAMON → algo ctx 未初始化 → GET 路径 NULL deref。
systemd 2-3s 自动拉起，RAW 预览不受影响。**推论：uapi 调参只在 ISP 出图正常
（mainpath/rkipc 真流）的板子上用；mainpath 零输出缺陷板的实时调参只剩 sensor 直写一条路。**

源码位置备忘：`linux6.12-sdk/external/camera_engine_rkaiq/rkaiq/`——
uAPI2/rk_aiq_user_api2_helper.{cpp,h}（分发/j2s）、uAPI2/rk_aiq_user_api2_ae.cpp（AE 入口，
set 带 CHECK_USER_API_ENABLE/get 不带）、aiq_core/algo_handlers/RkAiqAeHandle.cpp（waitSignal/
readback 深层）、ipc_server/command_process.cpp（旧二进制 RPC 路径，5543 JSON 不走它）。

## 9. 直连 unix 通道（2026-10-12 增补；退役客户端 aiq-client.js 的默认通道）

跳过 tool_server，ssh 直达 3A 的 ipc socket。**帧格式与 5543 完全一致**（§1 透传结论），
只是传输端点不同。板上实测一次通过（sshd `direct-streamlocal@openssh.com`）。

**通道对比**：

| | unix 直连 `/tmp/UNIX.domainN` | tcp 经 tool_server(5543) |
|---|---|---|
| 板上部署 | **零**（3A server 是引擎本体必然在跑） | 需部署/拉起 tool_server |
| 3A 重启后 | 直接重连（新进程重建 socket 文件） | tool_server 只在启动时连一次 unix 且无重连逻辑（`rkaiq_tool_server.cpp` Setup 无重试）→ **僵尸转发**，写"成功"实丢，必须重启 tool_server |
| 独家能力 | 无 | CAPTURE 在线抓 YUV/RAW、SendFile 推 IQ、OffRAW 回灌、GetAWBp、I2CFUNC、STATUS/RTSP（§6 在线协议通道）；官方 IQ Tools/redmine FAE 支持基线 |
| 多相机 | 自选 socket 文件（N=camid，非 sensor 序号） | 启动交互选 index |

**互斥（源码钉死）**：3A 侧 `SocketServer::Accepted()`（socket_server.cpp:378-401）是
`accept → Recvieve() 阻塞服务 → close` 的**单客户端串行**模型（listen backlog 5）。
tool_server 连着时直连会挂进 backlog"假成功"——connect 正常、写不报错、**全部静默丢**。
直连前必须 pgrep 确认 tool_server 没跑（重建客户端时记得内置此检查；注意 pgrep -f 的
`[r]kaiq_tool_server` 括号技巧防自匹配）。反向同理：直连连着时 tool_server 连不上。

socket 命名版本兼容（tool_server.cpp:542-555 同款逻辑）：`/tmp/UNIX.domain`（老）→
`/tmp/UNIX.domain0`（单摄）→ `/tmp/UNIX.domainN`（多摄取最小 N）；Android 是
`/dev/socket/camera_toolN` 且实测常年 Permission denied。`tool_mode_set` 只是
accept/close 翻的 flag（socket_server.cpp:390/398），无行为门控，两路等价。

**socket 生命周期（排障用）**：引擎 `sysctl_init` 创建 → stop/deinit 删除。**文件存在即心跳**
——`ls /tmp/UNIX.domain*` 即知 3A server 状态，几个文件 = 几个相机上下文在跑。坑：引擎被
`kill -9` 可能残留 socket 文件导致下次 bind 失败，`rm -f /tmp/UNIX.domain*` 后重启 3A 即自愈
（`S40rkaiq_3A` 启动脚本自带此清理）。另注意**版本配对**：tool_server 与板端 librkaiq 版本差一档
以上可能"连得上、命令解析失败"（ipc 协议随版本演进）——字段不生效先核两侧 AIQ 版本
（`strings /oem/usr/lib/librkaiq.so | grep "AIQ v"`）。
