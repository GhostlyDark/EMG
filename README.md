# EMG

EMG is a launcher for [Mupen64Plus](https://github.com/mupen64plus/mupen64plus-core) using [Electron](https://github.com/electron/electron). For Controller Input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest/tree/emg) is used.

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/ata4/angrylion-rdp-plus), [GLideN64](https://github.com/gonetz/GLideN64), [Parallel](https://github.com/GhostlyDark/mupen64plus-video-parallel), [Glide64 MK2](https://github.com/mupen64plus/mupen64plus-video-glide64mk2), [Rice](https://github.com/mupen64plus/mupen64plus-video-rice)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/mupen64plus/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/amatho/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/mupen64plus/mupen64plus-input-sdl), [Raphnetraw](https://github.com/raphnet/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/mupen64plus/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/mupen64plus/mupen64plus-rsp-cxd4), [Parallel RSP](https://github.com/mupen64plus-ae/parallel-rsp)

*Glide64 MK2 and Rice are legacy video plugins. Performance may be slow and functionality broken. Only use them if you know what you are doing.*

**System Requirements:**

- **CPU:** SSE3 capable
- **GPU:** OpenGL 3.3 (GLideN64), Vulkan 1.1 (Parallel)
- **OS:** Linux (64-bit) or Windows 7+ (64-bit)

**GameCube Adapter:**

Follow the [Dolphin instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Knock off adapters may or may not work.

## Linux

**Launch:**
```
./emg
```

### Dependencies (Ubuntu)

**Minimum libc version:**

The core and most plugins require at least `GLIBC v2.27`. Check version:
```
ldd --version ldd
```

- GLideN64: GLIBC v2.29
- Parallel: GLIBC v2.30


**mupen64plus-core**
```
sudo apt-get install -y libsdl2-2.0-0 libminizip-dev
```

**Glide64 MK2**
```
sudo apt-get install -y libboost-filesystem-dev
```

**Parallel**

Needs an up-to-date graphics driver with Vulkan support. Reboot the system after updating.
```
sudo add-apt-repository ppa:kisak/kisak-mesa && sudo apt update && sudo apt full-upgrade
```

**Raphnetraw**

For Raphnetraw controller adapters.
```
sudo apt-get install -y libhidapi-hidraw0
```

## Troubleshooting

Open Developer Tools by pressing `CTRL + I` or by activating it via the menubar (unhide with `ALT`).
If no Mupen64Plus log appears, the emulator core is missing dependencies. If there is a log, check it out to find out what's wrong. Logging happens once Mupen64Plus closes after pressing `Launch`.