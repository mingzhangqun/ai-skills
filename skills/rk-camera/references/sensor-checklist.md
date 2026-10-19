# Sensor 硬件与 I2C 检查清单

阶段 1~2 用。原则：**先量再猜**——万用表/示波器 5 分钟能排除的问题，别用日志猜半小时。

## 0. 模组资料清单（bring-up 第 0 步：向模组厂/SI 要齐）

来自 RK 官方《摄像头模组调试项目信息表》（`<文档库>/RockChip摄像头模组调试项目信息表.xlsx`，
给 RK FAE 提调试需求时也是按这张表填）。**资料不齐就开调 = 排障时拿不到基准**：

| 资料 | 用途 |
|---|---|
| 模组规格书（datasheet） | 供电三路/上电时序/I2C 地址/chip ID/输出模式表 |
| **镜头规格书 + 光学设计资料** | LSC 标定、FEC 畸变、IR-cut 是否带通 |
| **马达驱动 IC 规格书 + 马达规格书** | AF/VCM（I2C 地址、电流-code 曲线、RK 私有 ioctl 兼容性判断） |
| **典型模组 / 边缘模组样品** | 标定用典型模组、极限验证用边缘模组 |
| **OTP 数据是否烧录 + 挑选数据报告** | 有 OTP 才能做 LSC/AWB/CCM 个体校正（OTP 标定流程见文档地图 ISP 包内 OTP Calibration Guide） |
| sensor 初始化寄存器表（FAE 提供，各模式） | 驱动移植的模式表来源 |

另附项目管理字段（给 FAE 提单）：芯片平台/OS/负责人三方（自己、模组厂、RK）联系方式、期望完成时间。

## 供电

典型三路（具体电压看 sensor datasheet 的 power sequence 章节）：

| 电源 | 典型值 | 来源 |
|---|---|---|
| AVDD (VANA) | 2.8V | PMIC LDO / 板载 DCDC / sensor 模组自带 |
| DVDD (VDIG) | 1.05~1.2V | 同上（**最敏感**，超压直接损坏）|
| IOVDD (VIF/DOVDD) | 1.8V | 同上 |

板上量测：找到 sensor 连接器/模组的电源引脚直接量。注意：

- DTS 里 sensor 节点没写 `xxx-supply` 时驱动会用 dummy regulator，**dmesg 会打 "dummy regulator" 警告**——这不代表真有电，只代表驱动没管它，实际由 fixed-regulator/PMIC 常供（参考 devkit 的 cam_pwr fixed-regulator 模式：无 status 字段=开机即拉高）。
- 上电顺序要求：一般 AVDD→DVDD→IOVDD 间隔 0~t ms（datasheet 有图）；顺序错通常表现为 ID 能读但不出流。

## MCLK

- 常见 24MHz（部分 sensor 19.2/26/27MHz，看 datasheet）。**无 MCLK = sensor 完全静默，I2C 也可能 NACK**。
- 软件链路：`cru` 输出（`CLK_MIPI_CAMARAOUT_Mx`）→ pinctrl（`mipimX_cameraY_clk` 复用脚）→ sensor xvclk 引脚。
- 量测：示波器/频率计量 sensor 的 CLK 引脚。没有仪器时可用逻辑分析仪或先量 GPIO 复用是否正确。
- 确认 DTS `clocks = <&cru CLK_MIPI_CAMARAOUT_M1>` + `pinctrl-0 = <&mipim1_camera1_clk>` 的脚位与硬件原理图一致（M1/M2/M3 是不同物理引脚组，**配错=时钟到不了 sensor**）。

## RESET / PWDN

- 看驱动 `reset-gpios = <&gpioX RK_PY_Z GPIO_ACTIVE_LOW>` 的 ACTIVE_HIGH/LOW 必须匹配 sensor 的 XCLR/XPWDN 有效电平。
- 上电时序：PWDN 拉低 → 稳定 t1 → XCLR 拉高 → 稳 t2 → 首次 I2C。驱动 `power_on()` 里的 usleep 范围已含，但 GPIO 极性配反时序就全乱。
- 量测：复位瞬间示波器看 XCLR 波形；万用表静态看稳态电平（正常工作态 XCLR=高、PWDN=低——以 datasheet 为准）。

## I2C

```bash
# 总线扫描（总线号从 DTS &i2cN 节点来；rk3588 evb 相机常用 i2c3/i2c4/i2c6/i2c7）
ssh <别名> 'i2cdetect -y <bus>'
```

结果解读：
- `UU` = 该地址被内核驱动占用 = **驱动已 probe 成功**（这是好消息）
- 数字 = 有应答但无驱动绑定（probe 失败或驱动没编）
- 空 = 无应答：查供电/MCLK/复位/地址/上拉
- 多个意外地址 = 总线干扰或上拉弱

直接读寄存器（驱动没绑时也能读）：

```bash
# 读 2 字节（常见 chip ID 寄存器 0x0000~0x000F，见 datasheet）
ssh <别名> 'i2ctransfer -y <bus> w1@<addr> 0x00 r2'
# 16-bit 寄存器地址（部分 sensor 用 16bit reg addr）
ssh <别名> 'i2ctransfer -y <bus> w2@<addr> 0x30 0x0a r1'
```

常见 chip ID 位置示例（以 datasheet 为准）：

| Sensor | ID 寄存器 | 期望值 |
|---|---|---|
| imx219 | 0x0000-0x0001 | 0x0219 |
| imx415 | 0x3000-0x3001 (sample) | datasheet |
| imx708 | 0x0000 (module ID) | 0x0301 (模组) |
| os04a10 | 0x3000 | 0x5304 |
| sc 系列 | 0x3100+ | datasheet |

**注意**：部分 sensor 进入 low-power/power-down 时 ID 读不出；MIPI 模组带 EEPROM（常见 0x50）时可先读 EEPROM 确认模组在线：

```bash
ssh <别名> 'i2cdetect -y <bus>'         # 0x50 有应答 = 模组供电/连接 OK，sensor 本体问题另行查
```

## 无示波器时的软件旁证

- `cat /sys/kernel/debug/clk/clk_summary | grep -i cam` — camera 时钟树（需内核 config 开 debugfs）
- `cat /sys/kernel/debug/gpio | grep -iE "cam|reset"` — GPIO 实际方向与电平（确认复位脚没被别的驱动抢）
- 温度手感知 sensor 是否发热（短路/超压信号）
