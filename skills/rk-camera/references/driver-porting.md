# Sensor 驱动移植指南（RK 化驱动）

阶段 3 用。**第一步永远是查现成驱动**：`ls $SDK/kernel/drivers/media/i2c/ | grep -i <型号前缀>`（现成驱动数百个）。SDK 不在手边时在线查：`https://github.com/linux-rockchip/linux-rockchip`（Rockchip vendor 内核 git——`drivers/media/i2c/` 现成驱动与 rkmodule API 头文件可直接在线 grep；**切到与板内核对应的 vendor 分支，默认分支停在 3.x 老线**；编译仍以 `$SDK/kernel` 为准）。有 → 只需 menuconfig + DTS；型号近似（同厂同代）→ 复制改寄存器表；全新 → 按 §2 模板移植。

## 1. 启用现成驱动

```bash
# 1. Kconfig/Makefile 里确认驱动已登记（现成驱动都有）
grep -n "imx415" $SDK/kernel/drivers/media/i2c/{Kconfig,Makefile}
# 2. 打开 config（两个入口选一）
echo "CONFIG_VIDEO_IMX415=y" >> $SDK/kernel/arch/arm64/configs/rk3588.config   # RK SDK 用追加 fragment
make ARCH=arm64 CROSS_COMPILE=$TOOLCHAIN <defconfig> && make ARCH=arm64 CROSS_COMPILE=$TOOLCHAIN rk3588.config ...
# 或 menuconfig: Device Drivers → Multimedia support → Media ancillary drivers → Camera sensor devices
```

典型 config 名 = `CONFIG_VIDEO_` + 大写型号（imx415→IMX415、os04a10→OS04A10、sc850sl→SC850SL）。编模块时配 `=m`，产物 `drivers/media/i2c/<sensor>.ko`，`insmod` 前先确认依赖（v4l2 core 已编进内核时无需 modprobe）。

## 2. RK 化驱动结构（移植模板）

RK SDK 的 sensor 驱动 = **主线 v4l2 subdev + RK 私有 rkmodule API**。两套 API 的区别是移植成败的关键：

- 主线式驱动（`imx219 3-0010` 实体名）→ Linux 下 rkaiq 仍可能工作，但** HAL 按实体名匹配会直接 UNKNOWN_ERROR**。**统一用 RK 化驱动**。
- RK 化标志：include `<media/v4l2-subdev.h>` 之外还有 `#include <linux/rk-module.h>`、probe 里 `v4l2_i2c_subdev_init` 后设 `sd->flags`、实体命名走 `m%02d_%c_%s`（module-index/facing/名字来自 DTS `rockchip,camera-module-*`）。

### 骨架（以 SDK 里最近似型号为底稿，逐块替换）

```c
// 结构块 ① 模式表 —— 每个 分辨率/帧率/HDR 档 一项
static const struct imx415_mode supported_modes[] = {
    {
        .width = 3840, .height = 2160,
        .hdr_mode = NO_HDR,               /* rkaiq 按它配 HDR；带 HDR 的 sensor 加 X2/X3 模式 */
        .fps = 30,
        .pixelformat = V4L2_PIX_FMT_SRGGB10,      /* bayer 序列+位宽，必须与出图一致 */
        .bus_fmt = MEDIA_BUS_FMT_SRGGB10_1X10,
        .reg_list = imx415_4lane_3840x2160_30fps_regs,  /* 寄存器初始化表：sensor 厂商 FAE 提供 */
    },
};

// 结构块 ② 寄存器表 —— CCI 宏写法（16bit reg addr + 8bit value）
static const struct cci_reg_sequence imx415_4lane_3840x2160_30fps_regs[] = {
    { CCI_REG16(0x3000), 0x0001 }, /* 用厂商参考流 init 表，替换 delay 行为 RK_REG_DELAY */
    ...
    { CCI_REG16(0x30xx), 0x0001 },
};

// 结构块 ③ 电源时序（极性/时序对照 datasheet 与原理图）
static int __imx415_power_on(...) {
    /* 典型顺序: regulator enable → clk prepare → reset 复位脉冲(低有效: gpiod 低→高) → 稳定 usleep */
}

// 结构块 ④ v4l2 ctrl（rkaiq/工具看到的参数就来自这里）
static int imx415_initialize_controls(...) {
    /* 增益单位: ×1024 = 1x（imx708: 1024~16384 = 1x~16x）——与 IQ json 的 Gain2Reg 表配套 */
    v4l2_ctrl_new_std(..., V4L2_CID_ANALOGUE_GAIN, ...);
    v4l2_ctrl_new_std(..., V4L2_CID_EXPOSURE, ...);       /* 单位=行 */
    v4l2_ctrl_new_int_menu(..., V4L2_CID_LINK_FREQ, ...); /* 必须有：dphy 按 it 算速率 */
}

// 结构块 ⑤ subdev pad ops —— enum_frame_size 必须实现！
static int imx415_enum_frame_size(...) { /* 从 supported_modes 里返回；缺它=HAL 枚举空→一条 link 都不使能 */ }

// 结构块 ⑥ rkmodule ioctl（core ioctl table）
static long imx415_ioctl(struct v4l2_subdev *sd, unsigned int cmd, void *arg) {
    /* 按 RKMODULE_* cmd 分发: get_inf / get_module_inf / get_hdr_cfg / get_channel_info /
       get_csi_dphy_param / get/exp_delay / get_exp_info / set_hdr_cfg ... */
}
```

### RK 私有 ioctl 语义表（VI Driver Guide v1.1.5「CIS 驱动说明」提炼）

| ioctl | 作用 | 不实现的后果 |
|---|---|---|
| `RKMODULE_GET_MODULE_INFO` | 上传 DTS 模组信息（module-index/facing/name/lens-name）给 camera_engine，用于设备匹配与 IQ 文件匹配 | rkaiq/HAL 配对失败 |
| `RKMODULE_AWB_CFG` / `RKMODULE_LSC_CFG` | 模组 OTP 使能时，camera_engine 下发典型模组 AWB/LSC 标定值，驱动比较后生成 R/B gain | OTP 个体校正不生效 |
| `RKMODULE_GET/SET_HDR_CFG` | HDR↔normal 模式切换 | **HDR sensor 必须实现**，否则无法切换模式 |
| `PREISP_CMD_SET_HDRAE_EXP` | HDR 模式曝光设置（线性模式走标准 V4L2_CID_EXPOSURE/GAIN，HDR 切到它） | HDR 曝光失控 |
| `RKMODULE_SET_QUICK_STREAM` | 只写 stream on/off 寄存器——异常复位用；RK3588 多摄同步也靠它统一开流 | 复位恢复/同步异常 |
| `RKMODULE_GET_CHANNEL_INFO` | RK3588 新增：配置 vc 通道（默认 id0~id3↔vc0~vc3）、SPD/EBD 数据采集 | 特殊通道需求不满足 |
| `RKMODULE_GET/SET_SYNC_MODE` | RK3588 多摄同步模式 | 同步不工作 |
| `RKMODULE_SET_CONVERSION_GAIN` | 线性模式 DCG 切换（HCG 低照 SNR 更好）；sensor 不支持可不实现 | — |

### 实现细节红线（官方要求 + 实测印证）

- **s_stream 时机**：MIPI clk 为 continuous 模式的 sensor，**必须在 .s_stream 回调内开数据流**——提前开会识别不到 MIPI LP 状态（对应排障树"无报错但无数据"一类）。
- **s_power 拆表**：寄存器数组长的 sensor，把公共部分归纳到上电（s_power）执行，s_stream 只配当前模式差异寄存器——加速分辨率切换。
- **get_selection**：ISP 输入宽度要求 **16 对齐、高度 8 对齐**——裁剪参数不齐会导致后级 PicSize 类错误。
- **曝光公式链**（camera_engine 按此算曝光，ctrl 报错值会让 AE 全盘算错）：
  `line_time = HTS/PIXEL_RATE`；`PIXEL_RATE = HTS×VTS×FPS`（MIPI 等价式 `pixel_rate = link_freq × 2 × lanes / bits_per_sample`）；`HTS = width_out + HBLANK`，`VTS = height_out + VBLANK`
- **V4L2_CID_ANALOGUE_GAIN 是 total gain**（analog×digital，单位寄存器值）——RK 惯例把 dgain 混进 again 下发，驱动内分解成两段寄存器。
- **HFLIP/VFLIP**：ISP **不带镜像功能**，镜像需求必须用 sensor 自身镜像机制实现（web 预览的 mirror/flip 只能算显示层方案）。且 flip 改的是**读出顺序**、滤色阵列不动 → bayer 相位必然平移：hflip 左移 1 像素（RGGB→GRBG）、vflip 上移 1 行（→BGGR）、双开 180°（→GBRG）。**驱动必须在 flip 时同步改报 mbus code**（`modify-layout` 的语义）——imx708 SDK 驱动只翻读出不改申报（2026-10-12 devkit3588 实证：`horizontal_flip=1` 读回生效，mbus 恒 SRGGB10_1X10），后果是 ISP demosaic 相位错一位出伪彩、host 端 RAW 分析的 CFA 排列要按上表人工换算（pipeline-debug §2.5 坑 3 的 mbus 依据在此场景失效）。
- **HDR 曝光首帧**：`PREISP_CMD_SET_HDRAE_EXP` 要能缓存参数，start_stream 写完 init 表后把初始曝光重新写进 sensor 覆盖默认值；init 表里**不能**含开流寄存器——否则第一帧亮度与曝光不匹配，AE 收敛变慢。
- **黑白 sensor**：get_fmt/enum_mbus_code 返回 `MEDIA_BUS_FMT_Y8/Y10/Y12_1X*`；应用层要 Y8 输出只能走 SP path。

### Sensor Info 填写（调参侧 sensorinfo 参数的驱动来源）

IQ 文件 `[SectionName]` 段的 `CISAgainRange/CISDgainRange/...` 来自 datasheet 换算（VI Driver Guide「Sensor Info 填写指南」，imx290 全算例）：`reg_gain = 20×log10(增益倍数)×10/3`；`CISExtraAgainRange` = again×DCG ratio（无 HCG/LCG 填 [1 1]）；HDR 短帧最大曝光行受限的 sensor（如 imx290 上限 8 行）要如实填 `CISHdrTimeRegMax`，否则 AE 会下发出界值。驱动写完用 AEC 的 SyncTest（循环设 N 组曝光）验证线性度与生效帧数。

### 顶层匹配

```c
static const struct of_device_id imx415_of_match[] = {
    { .compatible = "sony,imx415" },   /* 与 DTS 一致 */
    {},
};
MODULE_DEVICE_TABLE(of, imx415_of_match);
```

## 3. 移植步骤（从参考驱动到新驱动）

1. 选底稿：同厂商优先（寄存器风格/V4L2 ctrl 单位一致），如 os04c10 参考 os04a10。
2. 复制重命名（文件、函数、结构体前缀）。
3. 替换：模式表 + 寄存器 init 表（厂商 FAE 的 `xxx_modes_setting.h` 直接贴入转 `cci_reg_sequence`）。
4. 核对：i2c 地址（DTS reg）、MCLK 频率（`IMX415_XVCLK_FREQ` 常量）、link_freq 值（= pixclk×bits/lane 总和，错了 dphy 速率配错 → 无帧）。
5. 保留不动：rkmodule ioctl 分发骨架、实体命名逻辑、probe 里 module-info 解析（来自 DTS 四件套）。
6. 注册：`drivers/media/i2c/{Kconfig,Makefile}` + `arch/arm64/configs/<chip>.config` 加 CONFIG。
7. 编译部署 → 按 SKILL.md 阶段 2 重新验证 I2C（UU）→ 阶段 6 拓扑。

## 4. HDR/多 lane 细节

- HDR 模式（`hdr_mode = HDR_X2/X3`）在模式表里成对出现，rkaiq 会通过 `RKMODULE_GET_HDR_CFG` 取通道信息（X2: 长短曝两帧同链路时分）。
- `rockchip,camera-module-index` 多摄各不相同（0/1/2...），实体名 m00/m01/m02 必须唯一。
- 带 VCM：DTS `lens-focus = <&dw9807_1>`；VCM 驱动要有 RK 私有 ioctl（`RK_VIDIOC_VCM_TIMEINFO/GET_SET_VCM_CFG/SET_VCM_MAX_LOGICALPOS/FOCUS_SET_POSITION`，参考 `dw9807-vcm.c`——DW9817 与 DW9807 寄存器兼容加个 compatible 即可）+ 实体名 `mNN_F_dw9817` 与所属 sensor 的 index/facing 一致，否则 rkaiq 配对不到 LENS。
- **VCM 电流三参数**（官方 VI Guide「VCM驱动」，配错=镜头推不满或抖振）：
  `rockchip,vcm-start-current` = 启动电流（刚好推动镜头离开远焦端）；`rockchip,vcm-rated-current` = 额定电流（推到近焦最远端）；`rockchip,vcm-step-mode` = 电流输出模式（决定到达目标电流的时间，影响振荡）。VCM 节点也要有 module-index/facing 四件套。
- EEPROM/OTP：DTS `eeprom-ctrl = <&otp_eeprom>` + `rk,otp_eeprom` 兼容节点。

## 5. 驱动层调试钩子

```bash
# 实时看 sensor ctrl（增益/曝光当前值——3A 生效的直观证据）
ssh <别名> 'v4l2-ctl -d /dev/v4l-subdevX -l'
# 手动改（绕过 3A 测试 sensor 响应）
ssh <别名> 'v4l2-ctl -d /dev/v4l-subdevX -c analogue_gain=2048 -c exposure=1000'
# 驱动 debug 日志开关
ssh <别名> 'echo 7 > /proc/sys/kernel/printk; dmesg | grep <sensor>'
```

坑：**上游 VCM 驱动 probe 成功是静默的**（无 dmesg 日志），判绑定看 `/sys/bus/i2c/devices/<bus>-<addr>/driver` 符号链接是否存在。
