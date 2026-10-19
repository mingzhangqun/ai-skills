# Camera DTS 参考（RK3588 / RK3576，kernel 6.1）

阶段 4 用。完整链 = **sensor 节点 → csi2 dphy/dcphy → mipiX_csi2 → rkcif_mipi_lvdsX → rkisp_virX**。任何一环 remote-endpoint 断链，media 拓扑就不完整（`media-ctl -p` 能直接看到断点）。

真实范例：`$SDK/kernel/arch/arm64/boot/dts/rockchip/rk3588s-evb1-lp4x-v10-camera.dtsi`（单链 4-lane + VCM + EEPROM）、`rk3588-evb1-cam-6x.dtsi`（六摄，**挂法对照表来源**）、RK3576 看 `rk3576-evb1-cam-dcphy0.dtsi` / `rk3576-evb1-dual-cam.dtsi`。

## 1. sensor 节点模板（照抄改字段）

```dts
&i2c4 {
    status = "okay";
    pinctrl-names = "default";
    pinctrl-0 = <&i2c4m1_xfer>;          /* 引脚复用对照原理图 */

    imx415_1: imx415@1a {                 /* 节点名@地址；i2c 地址来自 datasheet */
        compatible = "sony,imx415";
        status = "okay";
        reg = <0x1a>;
        clocks = <&cru CLK_MIPI_CAMARAOUT_M2>;   /* MCLK 时钟源，脚位组 M1/M2/M3 必须对上 pinctrl */
        clock-names = "xvclk";
        power-domains = <&power RK3588_PD_VI>;
        pinctrl-names = "default";
        pinctrl-0 = <&mipim1_camera2_clk>;       /* 与上面 MCLK 同一物理脚 */
        rockchip,grf = <&sys_grf>;
        reset-gpios = <&gpio4 RK_PB2 GPIO_ACTIVE_LOW>;
        pwdn-gpios  = <&gpio4 RK_PB3 GPIO_ACTIVE_LOW>;   /* 没有 pwdn 脚就删这行 */
        /* 模组身份四件套 —— rkaiq/IQ 文件/HAL 都靠它拼实体名和文件名，不能省 */
        rockchip,camera-module-index = <0>;      /* 0 → 实体名 m00 */
        rockchip,camera-module-facing = "back";  /* back→_b / front→_f */
        rockchip,camera-module-name = "MODULE-NAME";    /* IQ 文件名第二段 */
        rockchip,camera-module-lens-name = "NC";        /* IQ 文件名第三段 */
        /* 可选：eeprom-ctrl = <&otp_eeprom>;  lens-focus = <&vcm节点>; */

        port {
            imx415_1_out: endpoint {
                remote-endpoint = <&mipi_in_dcphy0>;   /* 指向 dphy 的收端，见 §2 */
                data-lanes = <1 2 3 4>;                /* 2-lane 用 <1 2> */
            };
        };
    };
};
```

字段要害：

| 字段 | 错了会怎样 |
|---|---|
| `reg` | i2cdetect 不应答 |
| `clocks` + `pinctrl-0` | MCLK 到不了 sensor → ID 读不到 |
| `reset-gpios` 极性 | 时序乱 → 不出流或间歇出流 |
| `camera-module-index/facing` | 实体名不是 `mNN_F_<sensor>` → rkaiq/HAL 匹配不到（HAL 直接 UNKNOWN_ERROR）|
| `camera-module-name/lens-name` | IQ 文件匹配失败（文件名 = `<sensor>_<module-name>_<lens-name>.xml/json`）|
| `data-lanes` | 拓扑能建但无帧中断 |

## 2. MIPI 链路（dphy → csi2 → cif → isp）

RK3588 有两类物理层：**csi2_dphyX**（MIPI D-PHY，多数 sensor）与 **csi2_dcphyX**（C-PHY/D-PHY combo，4-lane 高带宽）。链路节点（在板级 dts 里 enable 并连 endpoint）：

```dts
/* ① dphy 层 */
&csi2_dphy0 {
    status = "okay";
    ports {
        #address-cells = <1>; #size-cells = <0>;
        port@0 {
            reg = <0>;
            #address-cells = <1>; #size-cells = <0>;
            mipi_in_ep0: endpoint@0 {
                reg = <0>;
                remote-endpoint = <&imx415_1_out>;   /* ← sensor 的 endpoint */
                data-lanes = <1 2 3 4>;
            };
        };
        port@1 {
            reg = <1>;
            #address-cells = <1>; #size-cells = <0>;
            dphy0_out: endpoint@0 {
                reg = <0>;
                remote-endpoint = <&mipi0_csi2_input>;
            };
        };
    };
};

/* ② csi2 协议层 */
&mipi0_csi2 {
    status = "okay";
    ports {
        #address-cells = <1>; #size-cells = <0>;
        port@0 {
            reg = <0>;
            #address-cells = <1>; #size-cells = <0>;
            mipi0_csi2_input: endpoint@1 {
                reg = <1>;
                remote-endpoint = <&dphy0_out>;
            };
        };
        port@1 {
            reg = <1>;
            #address-cells = <1>; #size-cells = <0>;
            mipi0_csi2_output: endpoint@0 {
                reg = <0>;
                remote-endpoint = <&cif_mipi_in0>;   /* ← rkcif 收端 */
            };
        };
    };
};

/* ③ rkcif 层（node 名以内核 rk3588.dtsi 为准，ls kernel/arch/arm64/boot/dts/rockchip/rk3588*.dtsi | grep cif 核对） */
&rkcif_mipi_lvds {
    status = "okay";
    port {
        cif_mipi_in0: endpoint {
            remote-endpoint = <&mipi0_csi2_output>;
        };
    };
};
/* ④ isp 层 —— 挂到哪个 rkisp_virX 见 §3 映射表 */
&rkisp0_vir0 {
    status = "okay";
    port {
        isp0_in: endpoint {
            remote-endpoint = <&cif_mipi_out0>;
        };
    };
};
```

**DCPHY 版本**（`csi2_dcphy0`）结构相同，只是 sensor endpoint 直连 dcphy 的 port@0，dcphy port@1 出去接 `mipi0_csi2_input`。

**RK3588 DPHY 双模式**（官方 VI Driver Guide）：2 个 dphy 硬件（dphy0_hw/dphy1_hw）各自可配——
- **full mode**：节点 `csi2_dphy0`/`csi2_dphy3`，最多 4 lane
- **split mode**：拆成 `csi2_dphy1`（lane 0/1）+ `csi2_dphy2`（lane 2/3），各 2 lane
- dphy0_hw 处于 full 时链路按 csi2_dphy0 配；split 时按 dphy1/dphy2 两条链各配。
- 带宽上限：DPHY 2.5Gbps/lane；DCPHY 2.5Gsps/lane（C-PHY 2×3 trios）。HDR 3 帧合成双 ISP 最大 8192x6144，四摄 3840x2160，>四摄 2560x1536——超带宽先查这里的硬件上限。

## 3. RK3588 mipi → isp 挂法表（官方 rk3588-evb1-cam-6x.dtsi 惯例）

| MIPI 口 | csi2 节点 | 挂 isp | 说明 |
|---|---|---|---|
| mipi0 | mipi0_csi2 | rkisp0_vir0 | |
| mipi1 | mipi1_csi2 | rkisp1_vir0 | |
| mipi2 | mipi2_csi2 | rkisp0_vir1 | |
| mipi3 | mipi3_csi2 | rkisp1_vir1 | |
| mipi4 | mipi4_csi2 | rkisp0_vir2 | |
| mipi5 | mipi5_csi2 | rkisp1_vir2 | |
| dcphy0 | mipi0_csi2（经 dcphy） | 同 mipi0 槽位 | |
| dcphy1 | mipi1_csi2（经 dcphy） | 同 mipi1 槽位 | |

**实测教训**（devkit 双摄）：挂错虚拟 ISP 会在 HAL 层节点分配冲突（`open /dev/video0/1/2 failed`、model 名冲突）。多摄严格按上表；RK3576 看 `rk3576-evb1-dual-cam.dtsi` 同理。

RK3588 上 sensor 全部挂在 CIF media 下、ISP 是虚拟节点直连——`media-ctl -p` 会看到 rkcif_mipi_lvds 的 stream 节点（/dev/video0/1/2 之类是 **CIF TX 节点**，不是 ISP 输出，抓 RAW 用它们）。mainpath（NV12 输出）是 rkisp_virX 对应的 video 节点。

## 4. 常见 DTS 错误速查

| 现象 | 原因 |
|---|---|
| dmesg 无 sensor probe 日志 | 节点 status 没开 / i2c 总线节点没 okay / compatible 拼错 |
| probe 报 -ENXIO / -ETIMEDOUT | reg 地址错 / 供电时钟复位问题（回 sensor-checklist）|
| media 拓扑里 sensor 实体缺失 | probe 失败（看 dmesg），不是 dts endpoint 问题 |
| 拓扑里某段链路 0 条 | remote-endpoint 互相没指向 / 双方节点 status 不对 |
| `rkisp0_vir0` 找不到 | 内核没编 rkisp（defconfig 查 CONFIG_VIDEO_ROCKCHIP_ISP）|
| 实体名不是 `mNN_F_xxx` | RK 化驱动才有该命名（主线驱动 `imx219 3-0010` 式命名 → HAL 看不见）；见 driver-porting.md |
| VCM 不进 media graph | `lens-focus = <&vcm>` phandle 没写（v4l2_async_register_subdev_sensor 解析它）|

## 5. 编译部署

```bash
cd $SDK/kernel
# defconfig 已配好时直接编 dtb；dtb 名从 device/rockchip/<chip>_xxx_Board_defconfig 的 DTS 变量取
make ARCH=arm64 CROSS_COMPILE=$TOOLCHAIN <板名>.dtb -j$(nproc)
```

替换板上 dtb 的位置依板而定（/boot 下、或 dtbo overlay、或 boot.img 里——Seeed 系常用 /boot/dtbo/ overlay）。验证生效：

```bash
ssh <别名> 'cat /proc/device-tree/model; ls /sys/firmware/devicetree/base/i2c*/ | grep -i <sensor>'
```
