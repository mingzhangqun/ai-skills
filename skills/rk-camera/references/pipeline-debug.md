# Pipeline 验证与排障树

阶段 6~7 用。方法论来自实战沉淀：**分层拿证据、判定性实验绕过用户态、成功/失败日志做 diff**。

## 1. 验证命令速查

```bash
ssh <别名> 'dmesg | grep -iE "<sensor>|cif|dphy|csi2"'   # probe 状态（chip ID/err 码）
ssh <别名> 'dmesg | grep Async'                          # 全部 camera 注册完成标志（官方）:
                                                       #   "RKISP: Async subdev notifier completed"
                                                       #   没有这行 = 某 sensor probe 挂了，先查 I2C
ssh <别名> 'grep "" /sys/class/video4linux/video*/name'  # video 节点归属（官方推荐，比 list-devices 轻）
ssh <别名> 'v4l2-ctl --list-devices'                      # video/subdev 归属
ssh <别名> 'media-ctl -d /dev/media0 -p'                  # 拓扑+链路使能状态
ssh <别名> 'media-ctl -d /dev/media0 -p | grep -oE "m[0-9]{2}_f_[a-z0-9_]+ [0-9]+-[0-9a-f]+"'   # sensor 实体在不在
ssh <别名> 'cat /proc/interrupts | grep -iE "cif|csi"'     # 帧中断计数（抓流前后各看一次）
ssh <别名> 'cat /proc/interrupts | grep rkcif'             # rk3588: rkcifhw 是总中断
ssh <别名> 'ls /dev/v4l-subdev*; v4l2-ctl -d /dev/v4l-subdevX -l'   # sensor ctrl 实况
ssh <别名> 'cat /proc/rkisp* /proc/rkcif*'                # ISP/VICAP 实时状态+帧输入输出统计（官方，多 cat 几次看帧号走不走）
```

**拓扑健康标准**：media-ctl -p 输出里 sensor 实体名形如 `m00_b_imx415 4-001a`，到 rkcif/rkisp 每段 link 都列在 `enabled` 状态，链尾有 video node。

## 2. 排障树（从上到下查，命中的层修完再往下）

```
无 /dev/media*
 └→ 驱动没编/没 probe：dmesg 找 sensor probe 行
     └→ probe 失败码：
         -ENXIO/-ETIMEDOUT → i2c 不通（回 sensor-checklist）
         -EINVAL → 寄存器/模式表问题
         id 读出但值不对 → compatible/地址错 或 换错驱动
sensor 实体在，但 link 段缺失/无 ENABLED
 └→ DTS endpoint 断链（回 dts-reference §2/§4）
链路全 ENABLED，帧中断 = 0（抓流前后不变）
 └→ MIPI 物理层没数据：
     · data-lanes 数与实际不符（2/4 lane）
     · link_freq 错（dphy 速率配错）
     · MCLK 幅度/频率漂（量）
     · sensor 模式表寄存器没写全（FAE init 表漏 delay/关流）
     · 分辨率超 dphy/csi 带宽（4K HDR 上 2-lane dphy 之类）
中断涨，但 v4l2-ctl 抓不到帧 / 图全黑全白
 └→ 格式/分辨率不匹配：--set-fmt-video 的 width/height/pixelformat 必须与 sensor 模式一致
     · 花屏/绿屏 → bayer 序列与实际不符（SRGGB10 vs SBGGR10）
     · 图错位/撕裂 → stride/位宽（RAW10 packed vs unpacked）
RAW 图 OK（阶段 7 过），ISP 不出图
 └→ 转本 skill SKILL §2（第二幕）：3A server 起没起、IQ 文件匹配、
    TX 节点 open 失败（见 §4 报错表）
```

## 2.5 RAW 直读坑（2026-09~10 实战沉淀，devkit3588/imx708，增至 6 条）

1. **set-fmt 小于 sensor 档 = 左上 1:1 裁剪，不是缩放（2026-10-13 相关性实验定论，推翻本条旧结论）**：
   请求 960x540/480x270（sensor@1920x1080）实测 = crop 矩形 (0,0,W,H) 的**左上 1:1 窗口**——
   与全幅帧同尺度对齐相关 r=0.9996/0.93，RGGB 四色平面签名完整保留（Gr≈GB > B > R），
   bayer 完好可正常 demosaic。**FOV 变窄（等效数字变焦），分辨率/细节不缩**。
   旧结论"行混合缩放毁 bayer（四排列色度统计完全相同）"系**暗帧误判**：曝光在驱动默认低位时
   四平面全压在黑电平附近 → 统计天然全同；拉亮（sensor 直写 exposure/gain）即现出差异。
   判别法：连拍两帧互相关（静态场景应 r>0.99）排除噪声，再对全幅帧做块均值偏移搜索定几何。
   ⚠ 驱动怪癖（2026-10-13）：**set-fmt 只缩 crop 不放 crop**——残留小 crop 时后续更大的
   set-fmt 进入矛盾态（get-fmt 报请求尺寸，BpL/sizeimage 按 crop 宽算，如 1920 宽报
   BpL 1920/sizeimage 960x540×2）；**协商永远显式 `--set-selection=target=crop` 全幅/目标窗**。
   （真要"全画面小分辨率"：host 端缩；sensor 原生带宽参考——4608x2592@10bit ≈ 15.3MB/帧，
   ssh 拉流 ~32MB/s → 约 2fps 预览）
2. **stride 两种模式规则不同（2026-10-13 实测矩阵）**：**紧凑(RG10 packed) = 256 字节对齐**
   （960 宽 1200→1280；2304 宽 2880→3072；4608 宽 5760→5888）；**非紧凑(RG10U/RG12U) = 精确 w×2 无对齐(8bit = w×1)**
   （456→912、960→1920、1280→2560、1920→3840 实测）。`v4l2-ctl --get-fmt-video` 的 Bytes per Line
   是权威，别算错。**BpL 同时是布局判别器**：紧凑与 w×2 两值恒不相等，一条 get-fmt 即知当前
   compact/unpacked（比信 sysfs 状态可靠——**compact_test 重启后回 compact 默认**，若解码侧
   不知情就是错位花屏；webui 连接期已用 BpL 核验拦截，media.js probeBpl）。
   姊妹坑：**set-fmt 超过 sensor 当前档会被静默钳位**（请求 3840x2160 实给 1920x1080，流照跑
   fps 不变，v4l2-ctl 不打印调整）——以为在测 4K 其实测的 1080p；验证靠 get-fmt 或
   `帧文件字节数÷帧数`。sensor 档以内向下任意（左上 1:1 裁剪，坑 1）。
3. **CFA 排列以 sensor pad 的 mbus code 为准**（media-ctl -p 里 sensor 实体的 fmt，驱动默认值），
   video 节点的 fourcc 是我们 set-fmt 给的只能参考；crop Left/Top 若为奇数会平移 bayer 相位。
   验证方法：四排列纯 demosaic 对比（灰度版干净=解包对；某排列颜色像实景=CFA 对）。
   ⚠ 例外：驱动不做 flip→mbus 同步时（imx708 实证，见 driver-porting 红线 HFLIP 条），flip 后
   mbus 不可信，按 hflip=左移1像素/vflip=上移1行 人工换算。
4. **线性 raw 直出必暗**：无 gamma 的 10bit 线性映射中位亮度只有 ~25%。判颜色用纯 demosaic，
   看效果挂 tone 链（灰世界 AWB → 0.5/99.5 限幅 → γ2.2，host 端离线处理）。
5. **RAW 存储格式三态可切（官方 sysfs，仅调试用）**：rkcif 的 compact/非 compact、低/高对齐
   可现场切换（每数字对应一个通道）：
   `echo 0 0 0 0 > /sys/devices/platform/rkcif-mipi-lvds2/compact_test`（切非紧凑）
   `echo 0 0 0 0 > /sys/devices/platform/rkcif-mipi-lvds2/is_high_align`（0=低对齐 1=高对齐）。
   **注意节点名**：RK3588 是 `rkcif-mipi-lvds2`（连字符，实测 devkit3588）；官方文档写的
   `rkcif_mipi_lvds`（下划线）是 rv1126/rk356x 旧平台命名， rk3588 上不存在。
   紧凑↔非紧凑切换后 stride 完全不同，host 端解码参数要跟着改（与坑 2 呼应）。
   注意 **ISP mainpath 输入 Raw10/12 时统一输出 Raw12 非紧凑**（官方明示），从 mainpath 抓 raw
   的解码别按 10bit 算。
6. **曝光设不上去 = vts 顶格**（官方 FAQ，devkit3588 实测验证）：exposure 上限被 sensor vts 限制。
   `vts = height_out + vertical_blanking`，扩 vblank 即扩曝光上限——实测 vblank 58→2058 后
   exposure max 精确从 2602 涨到 4602（+2000）。跨帧率换算：`vts_30fps × 30 = vts_25fps × 25`，
   `v4l2-ctl -c vertical_blanking=<新vts-height>`（副作用：帧率同步降低，测完改回）。

## 3. 判定性实验：驱动层直抓（绕过所有用户态）

media-ctl 手动使能全链 + v4l2-ctl 直抓。**成功 = 内核/DTS/供电/sensor 全部无辜，问题在用户态（rkaiq/HAL/应用）**；失败 = 问题在下面的层。

**前置：停 3A server**（`S40rkaiq_3A` 开机自启，别默认它没跑）：
`ssh <别名> 'killall rkaiq_3A_server rkaiq_tool_server 2>/dev/null'`
（systemd 镜像：`systemctl stop rkaiq_3A`——killall 后会被自动拉起，等于没停）。
它跑着会抢手动 link/subdev 格式配置（ISP 通路归它管——webui ISP 源下 sensor 换档被 409 拦截即此语义；rkcif 直采路径无此冲突），新 sensor 无 IQ 文件时还可能半配置挂死 pipeline，dmesg 亦被其噪声刷屏（§6 清单全是它打的）。tool server 单向依赖 3A（domain socket），顺手一起停。

3A/tool server 全程开关时点（"何时该停、何时该起"总表）：

| 阶段 | 3A server | 理由 |
|---|---|---|
| 1~5 硬件/I2C/驱动/DTS/编译 | 无所谓（停了日志更干净） | 不碰 pipeline |
| 6 拓扑验证 | 停 | dmesg diff 判读要干净 |
| 7 RAW 判定性实验 | **必须停** | 手动配链 + 绕用户态的实验纯净性 |
| 8 ISP 出图 | 起（阶段 8 本身） | — |
| 8 之后调参/预览（webui 控制台） | 保持跑 | rkcif bypass(video0) 与 ISP 通路设计上共存，3A 活着才有人管曝光 |

停 3A 的副作用：无 AE，sensor 曝光是驱动默认值——RAW 全黑/全白不一定是故障，手动直写再抓
（sensor 直写是安全红线内唯一手动曝光路径）：`v4l2-ctl -d /dev/v4l-subdevX -c exposure=1000,analogue_gain=4096`。

```bash
ssh <别名> '
# 1. 看拓扑里各 pad 名（示例是 rk3588 单链；以 media-ctl -p 实际输出为准）
media-ctl -d /dev/media0 -p
# 2. 使能链路（把 sensor→dphy→csi2→rkcif 每段 [1]）
media-ctl -d /dev/media0 --links "\"m00_b_imx415\" 0->\"rockchip-csi2-dphy0\" 0[1]"
media-ctl -d /dev/media0 --links "\"rockchip-csi2-dphy0\" 1->\"rockchip-mipi-csi2\" 0[1]"
# 3. 配 sensor subdev 格式 + video 节点格式
media-ctl -d /dev/media0 --set-v4l2 "\"m00_b_imx415\":0[fmt:SRGGB10_1X10/3840x2160]"
v4l2-ctl -d /dev/video0 --set-fmt-video=width=3840,height=2160,pixelformat=RG10
# 4. 抓 1 帧
v4l2-ctl -d /dev/video0 --stream-mmap=3 --stream-count=1 --stream-to=/tmp/cap.raw
cat /proc/interrupts | grep rkcifhw'
# 人眼确认: webui 控制台连板(Sensor 源即此链路, 快照落 host /tmp/rkcam_*.jpg)
```

v4l2 直抓的 RAW10 是 MIPI packed（4 像素 5 字节）；rkcif 直采还有 **256 字节对齐 stride** 的坑
（2304 宽 packed 本应 2880 B/行实际 3072——`bytesused/height` 一除便知）。web 控制台走
compact_test 强制非紧凑避开两者；离线 dump 转换脚本已退役（git 历史找 raw2png.sh，两坑都处理过）。
**看图要点**：有真实场景梯度 = sensor 真出数据；全黑=无数据；均匀灰=读到的 dummy；条纹=lane 相位错。

## 4. 报错速查表（含实测踩过的坑）

| 报错/现象 | 含义 | 动作 |
|---|---|---|
| `start failed on VIDIOC_STREAMON, fd=-1` | 节点 open 曾失败且从未重试 | 查 open 失败原因（多在 link 未使能） |
| `update sensor info failed -19` | rkcif 找不到 remote sensor（link 断/未使能）| media-ctl 查链路使能 |
| `[CAMHW]:E:mipi tx:-9 prepare err:` | TX 节点 prepare 失败（ret=-9） | 注意源码日志格式串本身有 bug，"-9"后的数字是垃圾，别采信 |
| `selectSensorOutputFormat: size()==0` | HAL 枚举不到 sensor 格式 | 驱动缺 `enum_frame_size`（RK 化必做项） |
| `open /dev/video0/1/2 failed`、`Could not retrieve media entity rkisp-isp-subdev` | **成功路径也打的噪声** | 别顺着它查（见 §5 噪声清单） |
| `video23 poll timeout` + `rkcifhw 中断=0` | ISP 无输入，sensor 从未出流 | 回排障树上三楼：MIPI 物理层 |
| `force to 2 readback` | 分辨率超两虚拟 ISP 共享上限 → ISP 从 DDR 读 RAW | **正常工作模式，不是错**（在线模式 TX 只是 3A 拷贝路径） |
| dmesg sensor probe 无任何输出 | 驱动没编/节点没开 | defconfig + DTS status |
| i2cdetect 显示普通数字而非 UU | 驱动没绑定 | `ls /sys/bus/i2c/devices/<bus>-<addr>/driver` 判定 |

## 5. 官方 MIPI 错误分类与处理顺序（Camera External FAQ v2.1 提炼）

提炼自 RK 官方 `Camera_Exteranl_FAQ_v2.1.pdf`（§2，全文见 `<文档库>/`，索引见 isp-docs-map.md）。
MIPI 通路 = **DPHY → CSI-2 Controller → VICAP/ISP**，错误也按这三段分层。**处理顺序固定：从物理层往上修——底层错误会派生上层症状，跳层修必翻车**：

```
① D-PHY Level（ErrSotHS/ErrSotSyncHS/False Control）
② CSI-2 Controller（ErrCsiFifoOverflow）
③ CSI-2 Packet（ErrEccDouble/ErrEccCorrected/ErrorCrc）
④ CSI-2 Protocol（ErrFrameSync/ErrFrameData）
⑤ VICAP/ISP 接收级（ErrPicSize/ErrDataLoss/ErrViFifoOverflow）
```

### 5.1 dmesg 关键字 → 错误层映射（RV1126/RK356x/RK3588 一代驱动）

| dmesg 打印 | 层 |
|---|---|
| `ERR1: start of transmission error(no synchronization...)` / `ERR2: ...synchronization can still be achieved` / `MIPI error: phy: 0x...` | ① D-PHY |
| `ERR1: at least one crc error` / `ERR2: header error detected and corrected` / `MIPI error: packet: 0x...` | ③ Packet |
| `ERR1: error matching frame start with frame end` / `incorrect frame sequence` / `ERR2: unrecognized data type` | ④ Protocol |
| `MIPI error: size: 0x...`（ErrPicSize） | ⑤ VICAP |
| `MIPI error: overflow: 0x...` | ⑤ VICAP |

（寄存器值→bit 释义对照表在 FAQ 附录 C/G，RK3588 直接看 `mipi error` 前缀即可分层。）

### 5.2 各层错误：含义 → 动作

| 错误 | 含义 | 动作 |
|---|---|---|
| **ErrSotHS/ErrSotSyncHS** | SOT 时序不满足（settle 窗口错） | 核对三式：`Ths-settle > Ths-prepare`、`Ths-settle < Ths-prepare+Ths-zero`、`Tclk-settle > Tclk-prepare`；再查 HS sync 序列 `00011101`。settle 由 **link_freq 决定**（驱动 `link_freq_menu_items` 声明 bitrate，DPHY 按 FAQ §2.4 表配 Ths-settle）——配错 link_freq 是第一嫌疑 |
| **False Control Error** | LP 状态序列非法 | 首查 **Dn/Dp 差分线接反**（接反后 LP-01 被认成 LP-10，HS 请求整个被误判）；上电瞬间 AVDD 时序引发的 LP11→LP00→LP11 也会触发（示波器抓上电波形） |
| **ErrCsiFifoOverflow** | ISP 吞吐 < MIPI 速率 | 按保守式验算：`isp_clk(Hz) × 80% > (mipi_bitrate × lanes) / 12`；满足则查多 lane 间走线等长（不同步会同时报 ECC/CRC）。注意此检测仅 RK3288/3368/3399 支持 |
| **ErrEccCorrected/EccDouble/CRC** | 包头/载荷校验错 | 先核对 lane 映射（DTS `data-lanes` 与硬件 lane0→lane0 一一对应）。**仅 ECC1/CRC**：PH 仍可靠 → 信号质量问题（幅度/阻抗/走线）；**ECC2**：PH 不可靠 → 会连锁触发 PicSize/DataLoss |
| **ErrFrameSync** | FE 没配到同 VC 的 FS | 多为 ① 层错误的下游症状，先修 SOT |
| **ErrPicSize/ErrDataLoss** | 采集数据量与设定分辨率不符 | 排查顺序放最后；上游 ①~④ 修干净再回来查 sensor 输出宽高/模式表 |

### 5.3 无报错但采不到数据（FAQ §2.2 官方流程）

I2C 正常、无任何 MIPI 报错、VICAP 说没数据 → 查 **MIPI DPHY Status 寄存器**（debugfs/`io -4`，地址表在 FAQ 附录 F/G）。状态位解读（高速传输正常时）：

- `RxClkActiveHS=1`：Clk lane 收到高速时钟。**=0 → 示波器量 Clk lane**：无信号查 stream-on/连接/DPHY 电源；有信号再分 continue 模式（`StopstateClk` 应恒 0）与非 continue 模式（应 0/1 交替）
- `StopstateData`：每条用到的 data lane 都应 **0/1 交替**（LP11 与 HS 交替）。某条不变 → 该 lane 信号幅度/接线问题；全交替但无数据 → 查 SOT 序列与 Ths-settle（回 §5.2 第一行）
- `UlpsActiveNotClk=0`：Clk lane 进了 ULPS → 抓上电全程波形找异常 LP10

### 5.4 sensor 侧实战条目（FAQ §1 精选，与排障树互补）

- **曝光/增益生效帧差导致的闪烁**（FAQ 1.2）：曝光时间 N 帧写 N+2 生效、增益 N+1 生效 → AE 同时调两者时趋势错位闪烁。解法：驱动按 `exposure_valid_frame` 间隔设置，或 **group hold 让寄存器同帧生效**
- **多寄存器曝光/增益写引起随机条纹**（FAQ 1.10，SC8220 实例）：同一时刻分多次写多个寄存器打乱时序 → **group hold 包住整组写**（驱动移植 checklist 项）
- **双摄帧同步**（FAQ 0.2）：选型时就要挑支持硬件同步的 sensor（OV=FSIN 脚，Sony=XVS/XHS 脚）；内容同步由曝光时刻决定，单 ISP 分时处理双摄不碍事，应用按帧号配对
- HDR 类型平台支持表（FAQ 0.1）已在 sensor-selection.md §4

## 6. 噪声日志清单（出现≠故障，别被带偏）

- 相机相关 `resetLinks start!`（每次 open 都出现，正常）
- `IPCSERVER: cid[0] Error get socket Permission denied`（rkaiq 调试通道，源码注释自认 "will always failed"）
- `open /dev/video0/1/2 failed`（无 camera 场景的探测）
- `Pre allocate buffers failed wxh(0,0)`（未配置时的预分配尝试）
- sensor 驱动 probe 时 `dummy regulator` 警告（电源由 PMIC/常供，正常）
- `vana2/vdig/vddl dummy regulator`（dtsi 只给了部分供电的常见组合）

## 7. 方法论备忘

- **决定性证据用"成功 vs 失败同时段日志 diff"**，别单看失败日志。
- 画面量化：截图 → 拉普拉斯均值=清晰度、均值=曝光；`v4l2-ctl -C focus_absolute` 看镜头位置——**位置相同清晰度不同 = ISP 链差异而非对焦差异**。
- rkaiq 模块日志级别（Android 侧经验，Linux 同理可查 rkisp log 参数）：低 4bit 级别、中 8bit 子模块、高位模块掩码。
- 板上长时观测：`nohup <抓流/日志命令> > /tmp/xx.log 2>&1 &`，别在交互里盯。
