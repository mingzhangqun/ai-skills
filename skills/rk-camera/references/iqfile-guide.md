# IQ 文件指南（匹配 / 格式 / 更新）

## 1. 命名与匹配规则

文件名三段式：`<sensor驱动名>_<camera-module-name>_<camera-module-lens-name>.xml|.json|.bin`

- 三段**全部来自 DTS**：sensor 驱动名来自 compatible 对应的实体名（如 imx415），后两段来自 sensor 节点的 `rockchip,camera-module-name` / `rockchip,camera-module-lens-name`。
- 3A server `sysctl_init(sensor_entity_name, "/etc/iqfiles/")` 时按此拼名匹配；**匹配不上时 rkaiq 打 Warning 并用默认参数**（能出图但画质差）——日志里搜 "not found" / "iqfiles"。
- 模组名惯用大写（`CMK-OT1948-PG1`），没定制的模组常见 `default` / `NC`。

## 2. ISP 代际 → 文件目录与格式

| 芯片 | ISP | iqfiles 子目录 | 主格式 |
|---|---|---|---|
| RK3588 | ISP30 | `isp3x` | xml（isp30 场景）也有 json |
| RK3576 | ISP39 | `isp39` | json |
| RK356x | ISP21 | `isp21` | xml |
| RV1106 | ISP32 | `isp32` / `isp32_lite` | json |
| RV1103B | ISP33 | `isp33` | json |
| RK3572 | ISP3.51 | `isp351s`（目录名带 s，注意） | json |

源目录：`$SDK/external/camera_engine_rkaiq/rkaiq/iqfiles/`（还有 FEC/LDCH 网格、AIISP 模型、`camera_profile.ini`）。

**代际错配会崩**：json 里的场景键如 `scene_isp30` / `scene_isp39`，用错代际的文件 → rkaiq 解析出 null 段 → SIGSEGV（典型栈：`rk_aiq_uapi_sysctl_init → RkAiqCore::init → CacAlgoAdaptor::Config fault 0x0`）。**先把芯片的 ISP 代对上再谈内容**（反向错配更隐蔽，见 §8）。

## 3. buildroot 安装链（camera-engine-rkaiq.mk）

- `BR2_PACKAGE_CAMERA_ENGINE_RKAIQ_IQFILE_USE_BIN=y` 时 xml/json 在构建时**转 .bin**（`conver_iqfiles`，运行时加载更快）；=n 时原样装。
- 装到 `$(TARGET_DIR)/etc/iqfiles/`，FakeCamera 三格式也会装（给无 sensor 的测试）。
- 选装哪些：`BR2_PACKAGE_CAMERA_ENGINE_RKAIQ_NORMAL_IQFILE` / `HDR_IQFILE` 等变量圈选（mk 144-208 行）。

## 4. 更新板上 IQ 文件的正确姿势

```bash
scp imx415_XXX.xml <别名>:/etc/iqfiles/
ssh <别名> 'systemctl restart rkaiq_3A || { killall rkaiq_3A_server; /etc/init.d/S40rkaiq_3A start; }'
ssh <别名> 'pgrep -af rkaiq_3A_server && dmesg | grep -iE "iq|rkaiq" | tail -10'   # 起来没+匹配日志一起看
```

注意：
- **文件名三段要和板上 DTS 一致**——推上去前先 `ssh <别名> 'media-ctl -p | grep sensor'` 看实体名核对。
- bin 模式的板子上放 xml 未必被读（看 mk 配置）；保险做法是同名 xml+json 都放，rkaiq 按代际挑。
- 全量刷机/重刷 rootfs 会覆盖手推文件——**最终要落回 SDK 源码树再出镜像**（Android 侧实测教训：`./build.sh -Ku` 不重打 vendor，必须 `-A`；Linux buildroot 侧同理别依赖手推）。

## 5. host 侧校验/编辑

- `rkisp_parser_demo`（装在 buildroot HOST_DIR/bin/rkisp_parser；源码 `rkaiq_tool_server/rkisp_parser_demo/`）：
  `./rkisp_parser ../../iqfiles/imx347_xxx.xml` — 解析并 dump 结构，改完文件先过它验证。
- json 用 `jq . < old > new` 重序列化（实测踩过：某些原始 json 文本里有解析器断掉的 token，重序列化后稳定）。
- xml 直接编辑后跑 parser 校验。

## 6. 没有 IQ 文件时（新 sensor 第一天）：搜索源与部署

搜索源按优先级：

1. **SDK 源码树**（用户给了 $SDK 路径就优先）：`$SDK/external/camera_engine_rkaiq/rkaiq/iqfiles/<ispXX>/`——与板上 rkaiq 版本同源，最权威。
2. **GitHub Seeed 仓库**：`https://github.com/Seeed-Studio/seeed_armbian_extension`，分支 **`feat/linux6.12-rkaiq`**（注意是分支名；2026-10 实测分支列表：deb_source/dev/feat/linux6.12-rkaiq/main），两个 iqfiles 目录：
   - `camera_engine_rkaiq_linux6.12/rkaiq/iqfiles/` — **全量** ~365 个 json（isp20/21/32/33/35/351s/39/3x）
   - `camera_engine_rkaiq/rkaiq/iqfiles/` — Seeed 精选 34 个（isp21/3x/39）
   - 直下单个文件：`https://raw.githubusercontent.com/Seeed-Studio/seeed_armbian_extension/feat/linux6.12-rkaiq/<目录>/rkaiq/iqfiles/<ispXX>/<file>`
   - 列远程候选（免翻网页，2026-10 实测）：
     ```bash
     git clone -q --depth 1 --branch feat/linux6.12-rkaiq --filter=blob:none --no-checkout \
       https://github.com/Seeed-Studio/seeed_armbian_extension /tmp/seeed-ext
     git -C /tmp/seeed-ext ls-tree -r --name-only HEAD | grep -E 'iqfiles/isp3x/[^/]*\.json$'
     ```

选文件：先按 **ISP 代际**定目录（RK3588=isp3x、RK3576=isp39，见 §2），再按**相似型号**排序（同名 > 同家族前缀如 imx415≈imx464 > 同分辨率档）。

部署（序列同 §4；**目标文件名** = 当前已加载文件名原地覆盖，或新 sensor 三段式）+ 验证：

```bash
# 验证加载(systemd 镜像; buildroot 用 logread 或 tail /var/log/messages)
ssh <别名> 'journalctl -b 0 --no-pager | grep rk_aiq_uapi_sysctl_init | tail -2'
# → "rk_aiq_uapi_sysctl_init success. iq:/etc/iqfiles//<目标名>.json"
```

画质会偏但整条 3A 链能跑通——先把出图链路验证完，再向模组厂/FAE 要正式 IQ（拿哪个文件顶、
改哪些参数 → 同目录 iq-json-key-params.md §6）。`FakeCamera` 文件也可用于纯软件验证。

## 7. camera_profile.ini

同目录的 `camera_profile.ini` 定义 rkisp 拓扑 profile（如多个 video 节点的角色映射），改出流节点时留意它是否需要同步（ rk3588 上 TX 节点分配错常和它有关）。

## 8. 跨 ISP 代际：兼容边界与迁移（换平台 ≠ 换 sensor）

> 提炼自 linux6.12 SDK 自带 `docs/IQ文件调试流程.md` §6（源码 + isp3x/isp39 实测），深查回原典。

**结论：骨架兼容、算法参数完全不兼容。** 分层：

| 层 | 兼容性 | 说明 |
|---|---|---|
| 顶层骨架 | ✅ 各代相同 | `sensor_calib / module_calib / main_scene / uapi / sys_static_cfg` |
| `sensor_calib` | ✅ 基本可平移 | sensor 物理属性（增益/曝光映射、HDR 能力）与 ISP 代无关；注意分辨率/HDR 配置差异 |
| 算法容器键名 | ❌ 按代命名 | `sub_scene` 内是 `scene_isp21 / scene_isp30 / scene_isp39`——引擎按 `ISP_HW_Vxx` 只查本代的键 |
| 模块集合与命名 | ❌ 几乎完全不同 | isp30 vs isp39 的 31 个模块**交集仅 6 个**：isp30 走 C++ 路径带版本号（`sharp_v4`/`bayertnr_v2`/`amerge_calib_v11`），isp39 走纯 C newStruct（`sharp`/`bayertnr`/`mge`）——两套实现树 |

**错配两个方向、两种死法**：

- 新代 json 给老平台（isp39 → ISP30 板）：解析出 null 段 → **SIGSEGV 崩溃**（§2 的坑，报错响亮）
- 老代 json 给新平台（isp3x → RK3576）：文件名可匹配、顶层可解析，但引擎查 `scene_isp39` 键落空 →
  **全部算法模块跑默认值，只报 Warning 不报错——"能跑但图废"，更隐蔽**

**迁移正途**（不要手工改名跨代用）：

1. `sensor_calib` 从旧文件平移起底；
2. 算法部分用**目标平台模板/默认 json** 重建，按 Tuning Guide / tuning-cookbook 重调；
3. 工具：`tools/iqUpdateRule/<SoC>/`（RK3576/RV1103B 各一套，json-path 级升级规则：枚举改名、字段迁移、模块拆并）。
