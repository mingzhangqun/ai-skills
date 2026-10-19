# rk-camera — Rockchip camera skill (bring-up → clean image → tuning)

A Claude skill: take a new sensor from power-on to a stable image, then **tune image quality from a plain-language description** — full-journey knowledge plus a bundled web preview console.

v0.1.0 (2026-10-18) · MIT License (see [LICENSE](LICENSE)) · [简体中文](README.zh-CN.md)

## What it does

- **Act 1 · Light up the sensor** — power/I2C checks → driver porting → DTS config → media pipeline verification → RAW capture. Layered-verification methodology (hard evidence at each layer before moving on) plus a complete troubleshooting tree.
- **Act 2 · Basically-normal ISP image** — rkaiq/3A-server runtime (start/stop, logs, architecture), IQ-file matching and deployment, the minimal parameter set for "it produces an image", and a porting checklist for sensor swaps.
- **Act 3 · Tune quality from a description** — you describe the symptom ("image leans green / too much noise at night / overexposed"), Claude runs the loop: **quantified snapshot → symptom→parameter direction → edit IQ in the console → compare and verify**.
- Deep dives on demand: reverse-engineered tuning-protocol docs (direct unix socket), source-level rkaiq architecture notes, a rkaiq rebuild guide, and a map of official documents.

![rk-camera workflow & architecture](img/diagram.svg)

## Requirements

| Side | Requirement |
|---|---|
| host | Linux / macOS + node ≥ 16 + npm; a passwordless ssh alias for the target board in `~/.ssh/config` |
| board | Rockchip Linux SDK image (buildroot or systemd), reachable over ssh |
| console | `npm install` under `script/` (sharp is a native binary — needs network; offline, pre-install on a networked machine and copy over) |

**Supported SoCs**: RK3588 / RK3576 / RK3572 / RV1106 / RV1103B.

Board ssh alias example (`~/.ssh/config`; skill docs use a `<alias>` placeholder throughout):

```
Host rk3588
    HostName 192.168.x.x        # board IP (static DHCP lease recommended)
    User root
    # Port 22 / ProxyJump / IdentityFile as needed
```

## Install

```bash
# Option 1: copy the whole directory in
cp -r rk-camera ~/.claude/skills/

# Option 2: clone the repo and symlink (tracks repo updates)
ln -sfn /path/to/rk-camera ~/.claude/skills/rk-camera
```

## 3-minute quick start

1. Start the console:

   ```bash
   cd rk-camera/script && npm install    # first run
   node rkcam-console.js              # open http://localhost:8092, pick the board in the panel
   ```

   The single file can also be copied onto the **board and run natively** (auto-detects the rockchip device-tree → no host ssh needed; the board only needs `npm i sharp`).

2. Talk to Claude (examples below).
3. Claude advances through the skill's three acts, uses console snapshots for quantified before/after comparison, and finally persists the changes to the board's IQ file.

### The console

Both preview sources switch in place via a radio toggle (no session rebuild):

**Sensor source** — rkcif RAW direct-decode preview + sensor/VCM direct control (exposure / gain / vblank / test-pattern sliders writing straight to the subdev); the AEC quick-tune five-step panel and log window sit at the bottom:

![Sensor source](img/raw.png)

**ISP source** — mainpath NV12 direct-decode preview + the IQ editing workbench: a strict JSON-mirror tree with every module editable, **green group headers = hot-updatable modules**; with ⚡Live on, edits hot-apply to the engine the moment you make them (each item logged as `old → new`), and Push persists to the board's IQ file once you're happy:

![ISP source](img/isp.png)

## Usage examples

Describe things to Claude in natural language; the skill picks the path — four typical scenarios:

| Scenario | You say | Claude does (skill-guided behavior) |
|---|---|---|
| **Light up a new sensor** | "bring up an os04c10 on an rk3588 board" | Walks the eight phases: check `$SDK` for an existing driver → verify the DTS four-piece → build & push just the dtb → validate topology and frame interrupts with `media-ctl` → stop 3A and grab RAW to confirm real data → start 3A for NV12; anything that goes wrong on the way (probe failure / no interrupt / garbled frame) drops into the troubleshooting tree for layer-by-layer localization |
| **Image not right** | "rkaiq is running, but the image leans green" | `ls /tmp/UNIX.domain*` for the 3A heartbeat → trace the logs for the IQ match line → finds a failed match running on default params → matches the filename three-parter against the DTS → finds a near-model IQ in the SDK, deploys and restarts → verifies the load log |
| **Tune by symptom** | "too much noise at night" | Quantifies with console snapshots (luma / sharpness) → locates the 3DNR module via the tuning cookbook → edits the low-light ISO-band denoise params in the IQ editor → ⚡Live hot-applies for live preview → Push persists (writes the board file + auto-restarts 3A) |
| **Port the IQ for a new sensor** | "swapped the sensor — what about the IQ file?" | Picks the `ispXX` directory by ISP generation → no ready file? gives search sources and a nearest-model ranking → deploys, restarts, verifies; cross-generation migration goes the sensor_calib transplant + target-platform template rebuild route (never hand-rename a file across generations) |

Troubleshooting and deep-dive questions ("3A server won't start", "how is a protocol packet framed", "what does this parameter mean") are fair game too — the skill's 13 references cover troubleshooting trees, the reverse-engineered protocol docs, parameter maps, and an index of official documents.

## Layout

```
SKILL.md       the main line Claude reads (three acts + index to all references)
references/    13 docs: bring-up side / runtime side / tuning side + protocol · architecture · rebuild deep dives
script/        console release: rkcam-console.js single file (esbuild, html+schema embedded)
               + package.json (sharp/ssh2 consumer deps)
img/           README artwork: architecture diagram + console dual-source screenshots (raw / isp)
```
