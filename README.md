# EMG

EMG is a launcher for [Mupen64Plus](https://github.com/mupen64plus/mupen64plus-core) using [Electron](https://github.com/electron/electron). For Controller Input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest/tree/emg) is used.

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/ata4/angrylion-rdp-plus), [GLideN64](https://github.com/gonetz/GLideN64), [Parallel](https://github.com/GhostlyDark/mupen64plus-video-parallel), [Glide64 MK2](https://github.com/mupen64plus/mupen64plus-video-glide64mk2), [Rice](https://github.com/mupen64plus/mupen64plus-video-rice)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/mupen64plus/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/amatho/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/mupen64plus/mupen64plus-input-sdl), [Raphnetraw](https://github.com/raphnet/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/mupen64plus/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/mupen64plus/mupen64plus-rsp-cxd4), [Parallel RSP](https://github.com/mupen64plus-ae/parallel-rsp)

*Glide64 MK2 and Rice are legacy video plugins. Performance may be slow and functionality broken. Only use them if you know what you are doing.*

**System Requirements:**

- **CPU:** SSE3 capable (GUI)
- **GPU:** OpenGL 3.3 (Angrylion Plus, GLideN64), Vulkan 1.1 (Parallel)
- **OS:** Linux (64-bit) or Windows 7+ (64-bit)

**GameCube Adapter:**

Follow the [Dolphin instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Knock off adapters may or may not work.


## Linux

**Install script:**

Download [install.sh](https://raw.githubusercontent.com/GhostlyDark/EMG/master/install.sh) into an empty folder and run it. It uses `apt` as package manager to install required dependencies. Files are downloaded and built as necessary.
```
chmod u+x ./install.sh
./install.sh
```

**Launch:**
```
./emg
```

**Minimum libc version:**

`GLIBC v2.30` or higher is required by some plugins. Check version:
```
ldd --version ldd
```


## Troubleshooting

Logging happens once Mupen64Plus closes after pressing `Launch`. Open Developer Tools by pressing `CTRL + I` or by activating it via the menubar (unhide with `ALT`). To save a log file, click the `Console` tab, right click on the relevant log -> `Save as...` to save it as text file. Post the log file as part of an issue if applicable.
