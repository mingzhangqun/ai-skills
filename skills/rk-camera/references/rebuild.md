# rkaiq 重编与部署

## 1. buildroot 单包重编（改 rkaiq 源码后最常用）

```bash
cd $SDK
# 单独重编 rkaiq 包（不动其他组件）:
./build.sh device  # 或直接进 buildroot:
cd $SDK/buildroot
# RK SDK buildroot 用 O= 指向 output 目录；查当前板的 output 目录名:
ls $SDK/output/          # 如 rk3588-buildroot 或 rk3576-buildroot
make O=$SDK/output/<板>-buildroot camera-engine-rkaiq-rebuild -j$(nproc)
# 产物在 output/<板>-buildroot/target/usr/bin/... 与 target/usr/lib/
```

推到板（比出镜像快，调试期用）：
```bash
scp $SDK/output/<板>-buildroot/target/usr/bin/rkaiq_3A_server <别名>:/usr/bin/
scp $SDK/output/<板>-buildroot/target/usr/lib/librkaiq.so <别名>:/usr/lib/   # 有 so 更新时
ssh <别名> 'killall rkaiq_3A_server; /etc/init.d/S40rkaiq_3A start'   # systemd 镜像: systemctl restart rkaiq_3A
```

注意事项：
- so 与 3A server 二进制要**同次构建**配套推（API 版本不匹配会起不来）。
- 共享构建服务器上：**起后台构建前 `ps aux | grep make` 看有没有别人的构建**在跑同一棵树。
- 网络拉取失败按全局规则自动换代理重试。

## 2. 独立树编译（rk3576 调参工作区）

独立树 `<调参树>`（remote 为内网 gerrit，branch `linux-6.1-stan-rkr6`）：

```bash
cd <调参树>
mkdir -p build_test && cd build_test   # 树里已有 build_test（配好 rk3576/ISP39），可直接 make
cmake -D CMAKE_C_COMPILER=<交叉gcc> -D CMAKE_CXX_COMPILER=<交叉g++> \
      -D RKAIQ_TARGET_SOC=rk3576 -D ISP_HW_VERSION=-DISP_HW_V39 ..
make -j$(nproc) rkaiq_3A_server
```

已有 build_test 缓存核对（CMakeCache.txt）：`ISP_HW_VERSION=-DISP_HW_V39`、`RKAIQ_TARGET_SOC=rk3576`、编译器 `/usr/bin/aarch64-linux-gnu-gcc`（缺则换 SDK 工具链：`$SDK/prebuilts/gcc/linux-x86/aarch64/gcc-arm-10.3-2021.07-x86_64-aarch64-none-linux-gnu/bin/aarch64-rockchip1031-linux-gnu-`）。

## 3. 顶 CMakeLists 编出来什么

```
camera_engine (顶层)
 ├ rkaiq/            → librkaiq.so
 ├ rkaiq_3A_server/  → rkaiq_3A_server
 ├ rkaiq_tool_server/→ rkaiq_tool_server
 ├ rkisp_demo/       → rkisp_demo（板上取流 demo）
 ├ IspFec/ smart_ir/ media_enquiry/ rk_stream/
```

改动验证顺序：编 → 推 3A server + so → 重启 3A → `dmesg | grep rkaiq` 无 prepare failed → 开流验证。

## 4. 改驱动侧（sensor .c）时

不用动 rkaiq：单编 kernel 模块推 `.ko`（见本 skill SKILL.md §1 阶段 5）。VCM/驱动改动只影响实体名与 ctrl，rkaiq 侧自动适配。

## 5. 常见编译坑

| 现象 | 原因 |
|---|---|
| 找不到 rk_aiq 头文件 | 在树外目录编（必须用顶层 CMake 或进 buildroot 包）|
| ISP 代际宏没传 | `ISP_HW_VERSION` 格式是 `-DISP_HW_VXX`（带 -D）|
| buildroot rebuild 没生效 | 包目录 hash 没变；`camera-engine-rkaiq-dirclean` 后重编 |
