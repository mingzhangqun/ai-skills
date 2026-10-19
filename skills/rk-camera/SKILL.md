---
name: rk-camera
description: >-
  Rockchip camera skill：sensor 点亮 bring-up（新 sensor 移植、camera DTS、MIPI CSI 链路验证、
  v4l2 抓 RAW）→ ISP 出图基本正常（rkaiq/3A server 启停、IQ 文件匹配、最小参数集）→
  按症状描述调画质（偏色/噪点/过曝…，web 实时预览量化 + IQ 文件固化）。
  自带 web 控制台（script/ 单文件，raw/ISP 双源 + sensor 直控 + IQ 编辑）。
  适用于"sensor 不出图/黑屏/花屏/无 media 节点/i2c 不通/probe 失败/点亮摄像头/bring-up/
  新 sensor 移植/MIPI 链路/帧中断为 0"与"调参/tuning/曝光不动/白平衡/CCM/3DNR/锐化/
  实时预览/web 看图/IQ 文件怎么改/rkaiq 起不来/3A server/iqfiles 不匹配/rkaiq 重编/
  点亮后正常出图/换 sensor 改 IQ"等场景。
  支持 RK3588 / RK3576 / RK3572 / RV1106 / RV1103B Linux SDK。
  English: rockchip sensor bring-up, MIPI CSI, v4l2 RAW, rkaiq, ISP tuning, IQ file.
---

# RK Camera：点亮 → 出图正常 → 调优

一颗新 sensor 从硬件上电到画质满意的完整旅程，三幕推进。**核心方法论：分层验证，每层拿到
确凿证据再进下一层**——I2C 通 → 驱动 probe → media 拓扑完整 → 帧中断涨 → RAW 有数据 →
ISP 出 NV12 → 画质可量化对比。绝不要跳层（sensor 层没通就开 3A server 排障 = 在错误楼层找钥匙）。

## 0. 环境与工具

```bash
# 板卡连接: <别名> = ~/.ssh/config 免密条目(跳板/端口/密钥全写 ssh config, 无注册表)
ssh <别名> 'uname -r; ls /dev/media*; pgrep -af rkaiq_3A_server'   # 连通 + camera 栈在位检查
```

- 路径占位约定（脱敏；加新板/换机不改文档）：SDK=`$SDK`（示例 RK3588=`~/sdk/rk3588-linux6.1`，RK3576=`~/sdk/rk3576`）；官方文档快照根=`<文档库>`；独立调参树=`<调参树>`。本机实际路径不写进 skill，自行记录在本地（本仓库记于 CLAUDE.md）。
- sensor 驱动目录：`$SDK/kernel/drivers/media/i2c/`（现成驱动数百个，6.12 树实测 300+——**先查有没有现成的**，别急着移植）。内核源码备选（SDK 不在手边时在线查 `github.com/linux-rockchip/linux-rockchip`，分支选择等注意见 `references/driver-porting.md` 开头）。

### webui 预览控制台（本 skill 自带，全程手眼）

```bash
cd script && npm install      # 首次（sharp 原生二进制 + ssh2；离线环境需联网装）
node rkcam-console.js         # 浏览器 http://localhost:8092（面板选板连接）
```

- **双源**，全程不碰 rkaiq（"3A 零操作"语义）：**Sensor 源** = rkcif bayer RAW（RG/BG/GB/GR × 8/10/12bit，
  非紧凑）half-res 直解（第一幕 sensor 层验证用）/ **ISP 源** = mainpath NV12 全分辨率直解（第二三幕画质判定用），
  radio 原地换源。
- 面板：**sensor 直控**（曝光/增益/翻转/测试图案…subdev 控件全枚举，白名单+读回校验——
  **唯一安全可用的实时调参通道**，不碰 uapi AE）/ 分辨率切换（raw=sensor 档位原地换档 /
  isp=输出梯子缩放出流）/ Focus（VCM）/ **IQ 编辑**（第三幕主场，见 §3）/ 快照（`/tmp/rkcam_*.jpg`，
  量化用）/ 镜像 / log 窗（分级着色）。
- 控制台 = `script/rkcam-console.js` 单文件产物（esbuild，index.html + iq-schema 内嵌；运行只要
  script/ 下 npm i 的 sharp/ssh2）。**板上原生运行（native）**：同一单文件拷到板上直跑——rockchip
  device-tree 自动识别 → 免 host ssh（启动自连、页面无 Connect；`--native` 强制 / `--ssh` 退回面板），
  板上只需 `npm i sharp`（ssh2 惰性）。**按需起、不建服务**（常驻服务上电即占 video 节点，抢
  抓流调试工具）：
  ```bash
  ssh <别名> 'cd <板上目录> && nohup node rkcam-console.js >/tmp/rkcam-console.log 2>&1 </dev/null &'  # 起
  ssh <别名> "pkill -f '[r]kcam-console'"   # 停([r] 括号技巧: pkill/pgrep -f 会匹配自身 sh -c 命令行)
  ```
  源码与构建器在开发仓库根 `webui/`（**skill 目录外，发布
  天然不含**）：开发态 `cd webui/js && node server.js` 直跑源码，改源码后 `node webui/dist.js`
  重建 script/ 产物。

## 1. 第一幕：点亮 sensor（八阶段）

### 阶段 1 — 硬件确认（上电/时钟/复位/I2C 物理层）
→ 细节读 `references/sensor-checklist.md`

供电三路（AVDD/DVDD/IOVDD）、MCLK（一般 24MHz，量频）、RESET/PWDN GPIO 极性与上电时序、I2C 上拉。**先量再猜**：万用表量电压、示波器/频率计量 MCLK，比看日志快。

### 阶段 2 — I2C 联通
```bash
ssh <别名> 'i2cdetect -y <bus>'        # 目标地址应答（UU = 驱动已绑定，正常）
ssh <别名> 'i2ctransfer -y <bus> w1@0x1a 0x00 r2'   # 直接读 sensor ID 寄存器
```
读出 chip ID 对照 datasheet（常见在 reg 0x0000~0x000F）。注意 sensor 处于 power-down 或没给 MCLK 时会 NACK。

### 阶段 3 — 驱动接入
- SDK 已有驱动：menuconfig/defconfig 打开 `CONFIG_VIDEO_<SENSOR>`，编进内核或模块。
- 新 sensor：**参考最近似型号移植**（同厂商同代优先，如 os04a10→os04c10）。
→ 移植模板与 RK 化驱动必备结构（rkmodule API、实体命名 `mNN_F_<name>`、`enum_frame_size` 必须实现等）读 `references/driver-porting.md`

### 阶段 4 — DTS 配置
sensor 节点（compatible/reg/clocks/reset-gpios/camera-module-*）+ MIPI 链（dphy→csi2→rkcif→rkisp virtual channel）。
→ 完整模板、逐字段含义、RK3588 mipi→isp 挂法表、常见错读 `references/dts-reference.md`

### 阶段 5 — 内核编译部署
单编 kernel/dtb（不重编整个 SDK）：
```bash
cd $SDK/kernel
make ARCH=arm64 CROSS_COMPILE=$SDK/prebuilts/.../aarch64-none-linux-gnu- <dtb>.dtb -j$(nproc)
# sensor 驱动若编模块: make ... modules && drivers/media/i2c/<sensor>.ko
scp arch/arm64/boot/dts/rockchip/<dtb>.dtb <别名>:/boot/      # 或按板启动方式放对位置
ssh <别名> 'reboot'
```

### 阶段 6 — pipeline 验证
```bash
ssh <别名> 'dmesg | grep -iE "imx|ov[0-9]|os[0-9]|sc[0-9]|camera|cif|dphy"'   # probe 结果 + chip ID
ssh <别名> 'media-ctl -d /dev/media0 -p | grep -oE "m[0-9]{2}_f_[a-z0-9_]+ [0-9]+-[0-9a-f]+"'   # 应出现 mNN_F_<sensor> 实体
ssh <别名> 'for m in /dev/media*; do echo "== $m"; media-ctl -d $m -p; done'   # 完整拓扑, 链路 sensor→dphy→csi2→rkcif→rkisp
ssh <别名> 'cat /proc/interrupts | grep -iE "cif|csi"'   # 记下基线
```
→ 排障树、常见报错速查、噪声日志清单读 `references/pipeline-debug.md`

### 阶段 7 — RAW 出图（验证 sensor 真在出数据）
**前置：先停 3A server**（它持有 media pipeline，手动配置会和它打架）：
`ssh <别名> 'killall rkaiq_3A_server rkaiq_tool_server 2>/dev/null'`
（systemd 镜像：`systemctl stop rkaiq_3A`——killall 后会被自动拉起，等于没停）
```bash
ssh <别名> 'media-ctl -d /dev/media0 --links "sensor:0->csi2:0[1],..."; \
  v4l2-ctl -d /dev/videoX --set-fmt-video=width=W,height=H,pixelformat=XXXX; \
  v4l2-ctl -d /dev/videoX --stream-mmap=3 --stream-count=1 --stream-to=/tmp/cap.raw'
```
帧中断计数应随抓取上涨；RAW 图有真实场景梯度 = sensor/MIPI/驱动全通。
人眼确认（webui Sensor 源即此链路）、停 3A 后全黑需先直写曝光、packed/stride 坑、
3A 开关时点总表 → **完整版在 `references/pipeline-debug.md` §2.5/§3**（本节只留骨架防跳步）。

### 阶段 8 — ISP 出图（进第二幕的门）
sensor 层全通后，起 rkaiq 拿 ISP 处理后的图：
- 确认 `/etc/iqfiles/` 有匹配 sensor 的 IQ 文件（无则先拷一个近似型号的顶上，见 §2.4）
- `ssh <别名> '/etc/init.d/S40rkaiq_3A start'`（systemd 镜像：`systemctl start rkaiq_3A`）
- 从 rkisp mainpath 节点抓 NV12，或直接用 webui ISP 源实时看图（推荐）

**到此点亮完成**；"出图基本正常"的判定与修法在第二幕，画质打磨在第三幕。

## 2. 第二幕：ISP 出图基本正常（rkaiq 运行时 + IQ 文件）

### 2.1 架构（先记这张图）

```
┌─ 板上 ────────────────────────────────────────────────┐
│ rkaiq_3A_server (S40rkaiq_3A 开机自启)                  │
│   └─ rkaiq core（3A 算法引擎，每个 /dev/mediaX 一个 ctx）│
│        └─ ipc_server ← UNIX socket /tmp/UNIX.domain0   │
└──────────┬─────────────────────────────────────────────┘
           │ ssh direct-streamlocal 直连（⚡Live 热应用走此路,
           │   协议 = references/aiq-ipc-protocol.md）
     host: webui /api/iq/apply

· 可选桥 rkaiq_tool_server（TCP 5543 ↔ 同一 unix socket，对调参 JSON 纯透传）
  仅供官方 PC IQ Tool 用；ipc_server 单客户端——它在跑就占住位，webui 热应用
  直接报错拒连（server.js 先 pgrep 检查），要用 webui ⚡Live 先停它
```

- **3A server** = rkaiq 宿主进程：枚举每个 `/dev/mediaX`，找齐 `rkisp-isp-subdev` + `rkisp-input-params` + `rkisp-statistics` + `rkisp_mainpath` 四个实体才算有效链，按绑定的 sensor 实体名从 `/etc/iqfiles/` 配 IQ，`sysctl_init→prepare→start`。
- **webui 不经任何桥**：ssh2 direct-streamlocal 直达 `/tmp/UNIX.domain0`，板上除 3A server 外零进程零依赖（tool_server 若在跑会互斥，先停）。
- Android 上**没有** 3A server——rkaiq 全量编成 librkaiq.so 链进 camera HAL provider 进程（本节 Linux 流程不适用 Android）。

### 2.2 常用操作

```bash
# 启停按板镜像二选一：buildroot（init.d）/ systemd（rk3588 Armbian 等）
ssh <别名> '/etc/init.d/S40rkaiq_3A start'    # buildroot 启动
ssh <别名> 'killall rkaiq_3A_server'          # buildroot 停止
ssh <别名> 'systemctl start rkaiq_3A'         # systemd 启动
ssh <别名> 'systemctl stop rkaiq_3A'          # systemd 停止（killall 后会被自动拉起，必须 stop）
ssh <别名> 'pgrep -af "[r]kaiq_3A_server"'    # 状态（[] 防自匹配：sh -c 包装时 -f 会匹配到自己）
ssh <别名> 'dmesg | grep rkaiq | tail -30'    # 日志（stdout 全部进 syslog）
```

**关键行为**：3A server 起来后**不会自己开流**——ISP 在应用打开 mainpath video 节点时才真正启动。所以"3A server 在跑但抓不到图"要先确认有人在开流（v4l2-ctl / rkisp_demo / webui ISP 源）。

**`/tmp/UNIX.domain*` 存在即心跳**：`ls` 一下即知 3A server 活着没（几个文件 = 几个相机上下文在跑）。引擎被 `kill -9` 可能残留 socket 文件致下次 bind 失败——`rm -f /tmp/UNIX.domain*` 后重启 3A 自愈（S40 脚本自带清理）。

### 2.3 日志级别（环境变量，hex 编码）

```bash
# Linux: persist_camera_engine_log（Android: persist.vendor.rkisp.log）
ssh <别名> 'export persist_camera_engine_log=0x4ff4 && /etc/init.d/S40rkaiq_3A start'
# systemd 镜像: ssh <别名> 'systemctl set-environment persist_camera_engine_log=0x4ff4 && systemctl restart rkaiq_3A'
```

格式（与 Android 一致）：**低 4bit=级别**（4=DEBUG）、**中 8bit=子模块**、**高位=模块掩码**。
常用值：全开 DEBUG `0x4ffffff`；CAMHW `0x4000000FF4`；AEC `0x1FF5`；AF `0x4FF4`。改级别必须重启 3A server 生效。

### 2.4 IQ 文件链路（最常见故障源）

源 → 板：
```
$SDK/external/camera_engine_rkaiq/rkaiq/iqfiles/<ispXX>/<sensor>_<module>_<lens-name>.xml|.json
        │ buildroot: conver_iqfiles（BR2_PACKAGE_CAMERA_ENGINE_RKAIQ_IQFILE_USE_BIN 时转 .bin）
        ▼
板上 /etc/iqfiles/   ← 3A server 按实体名匹配 <sensor>_<camera-module-name>_<lens-name>
```

- `ispXX` 目录按芯片：RK3588=**isp3x**（ISP30），RK3576=**isp39**，RK356x=isp21，RV1106=isp32/isp32_lite，RV1103B=isp33，RK3572=**isp351s**（目录名带 s；对应文档包名却是 ISP351）。
- **文件名三段必须与 DTS 四件套精确对应**（camera-module-name/lens-name 改了 DTS 就得改文件名）。
- ISP 代际错配 = 崩溃级故障：**isp39 的 json 给 ISP30 的板 → rkaiq init 段 null → SIGSEGV**（tombstone 栈在 CacAlgoAdaptor::Config）。反向（isp3x 给 RK3576）更隐蔽：场景键落空 → 全算法跑默认值"能跑但图废"，只报 Warning。跨代迁移正途 → `references/iqfile-guide.md` §8。无匹配文件时 rkaiq 有兜底默认（Warning 日志可见）。
- 更新板上 IQ：scp 到 /etc/iqfiles/ + 重启 3A（完整序列见 references/iqfile-guide.md §4）。
- host 侧验证/转换 IQ 文件：`rkisp_parser_demo`（buildroot HOST_DIR/bin/rkisp_parser，源码 `rkaiq_tool_server/rkisp_parser_demo/`）。

### 2.5 "基本正常"的最小集

- IQ 文件匹配对了 + 黑电平/AWB/Gamma 不离谱 → 通常**拷一个近似型号的 IQ 顶上就能出图**。
  只求出图不求画质：最小参数集 + 换 sensor 移植清单 → `references/iq-json-key-params.md`。
  板上无匹配文件的找法（SDK/GitHub 候选、部署重启验证）→ `references/iqfile-guide.md` §6。
- 出图了但画质差（偏色/噪点/过曝/拖影…）→ **第三幕**。

## 3. 第三幕：按描述调画质

**循环：用户描述症状 → webui 快照量化 → 定位模块与方向 → 改 → 快照对比验证。**

1. **量化**：webui 快照 + 数字化对比（亮度均值=曝光、拉普拉斯均值=清晰度、直方图两端=动态范围），别凭肉眼记忆。
2. **方向**：症状→参数方向速查表 → `references/tuning-cookbook.md`（"低照度太暗→提增益上限或拉 Gamma 暗部"式对症表；AEC 调优官方四步也在内）。
3. **改**——两条路：
   - **实时找手感**：webui sensor 直控面板（锁曝光/增益唯一安全通道；uapi 已退役，§4）。
   - **固化画质**：webui **IQ 编辑**（主区底部左列工作台，`/api/iq`：3A 日志四级回溯链
     （journalctl→dmesg→logread→/var/log/messages——systemd/buildroot 镜像通吃）定位当前加载文件 + cat 解析，
     **严格 json 结构镜像树**——全文件全模块可编辑（场景三级嵌套、多场景天然支持）；按值类型出控件
     （bool→chk/枚举→select/范围→slider/数组→逗号框锁长度/**曲线组自动识别为可拖拽曲线**（DySetpoint/BLC/伽马等，
     ISO 对数横轴）/真矩阵→网格），元数据来自 `iq-schema.json`（`iq-schema-gen.js` 从 iq_parser_v2 头文件
     M4 描述符生成））。改完 `Push` = 写回板上文件（.bak-月日 基线备份+滚动保留 3 份）+ **自动重启 3A 生效**
     （硬校验：新进程必须晚于写盘，否则红字报错；ISP 源走停流→重启→复流序列），`Pull` 重拉 / `Restore` 回最近备份；
     **⚡Live 模式**修改即热应用（500ms 防抖攒批，仅热前缀模块，通道出错自动关）。
     模块→路径→IQ 段映射、改→校验→推板全流程 → `references/iq-params-map.md`。
4. **验证**：再快照对比。**最终画质必须落 IQ 文件**（运行态改动重启即丢）。

GUI 标定（灰卡/色卡/灯光箱）用官方 PC IQ Tool，redmine 下载（redmine-issue skill）。

### 三条铁律

1. **先量化再调**：快照 + 数字化对比，别凭肉眼记忆。
2. **实时找手感、IQ 文件固化**：uapi 改的是运行态；最终画质要落 IQ 文件（防重启丢失）。
3. **单位三口径**（uapi 倍数/v4l2 ×1024/IQ Gain2Reg 表）换算错了参数差 3 个数量级。

## 4. uapi 实时调参（已退役，协议知识保留）

> 2026-10-13 随 webui raw-only 裁剪退役（客户端 aiq-client.js 在 git 历史）。
> 本板实锤（2026-10-14 复测维持）：**READ 必崩 3A**；**SET 包可送达但触发引擎重初始化**
> （AE 崩最小曝光/服务自重启出残废态）——本板 uapi 仍不可用。旧归因"ISP 流从未跑起
> → algo ctx 未初始化"已被推翻（流正常跑着复测仍如此），真因未明。ISP 出图正常的
> 板子按 `references/aiq-ipc-protocol.md`（封包/命令表/单位换算三口径/通道互斥/
> unix 直连通道）重建即可。锁曝光/增益一律走 sensor 直写。6.12 源码侧官方也已把 5543 的
> uapi 命令通道 `#if 0` 废弃（协议文档 §6）——板测崩溃 + 官方废弃，双实锤。

## 5. 何时读哪个 reference

| 症状/任务 | 读 |
|---|---|
| 选型：SoC 接口/分辨率/HDR/ISP 代际兼容 | `references/sensor-selection.md` |
| i2cdetect 无应答 / 疑供电时钟问题 | `references/sensor-checklist.md` |
| 写/改 camera dtsi | `references/dts-reference.md` |
| 新 sensor 移植、改驱动 | `references/driver-porting.md` |
| 拓扑不全/无中断/黑屏花屏/报错翻译 | `references/pipeline-debug.md` |
| IQ json 内部结构、"正常出图"最小参数集、换 sensor 移植清单 | `references/iq-json-key-params.md` |
| 模块→路径→IQ 段映射、改→校验→推板流程 | `references/iq-params-map.md` |
| 调参方向速查（症状→参数） | `references/tuning-cookbook.md` |
| IQ 文件格式、匹配规则、xml/json/bin 差异；板上无匹配文件怎么办 | `references/iqfile-guide.md` |
| 调参协议封包/命令表/单位换算/通道互斥（webui ⚡Live 直连即此协议；5543 桥仅 PC IQ Tool 用） | `references/aiq-ipc-protocol.md` |
| 3A server 启动流程源码级理解 / 为什么跳过某个 media 设备 | `references/aiq-architecture.md` |
| 改 rkaiq 源码后重编（buildroot 单包 / 独立树） | `references/rebuild.md` |
| 官方文档深查（Tuning Guide / VI 驱动指南 / MIPI FAQ / 模组信息表 / 3A Dev Guide） | `references/isp-docs-map.md` |
