# EMG

EMG is a launcher for [mupen64plus](https://github.com/GhostlyDark/mupen64plus-core) using [Electron](https://github.com/electron/electron). For Controller Input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest) is used.

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/GhostlyDark/angrylion-rdp-plus), [GLideN64](https://github.com/GhostlyDark/GLideN64), [Parallel](https://github.com/GhostlyDark/parallel-rdp-standalone), [Rice](https://github.com/GhostlyDark/mupen64plus-video-rice)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/GhostlyDark/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/GhostlyDark/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/GhostlyDark/mupen64plus-input-sdl), [Raphnetraw](https://github.com/GhostlyDark/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/GhostlyDark/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/GhostlyDark/rsp), [Parallel RSP](https://github.com/GhostlyDark/parallel-rsp)

**System Requirements:**

- **CPU:** SSE3 capable (Electron)
- **GPU:** OpenGL 2.1 (Rice), OpenGL 3.3 (Angrylion Plus, GLideN64), Vulkan 1.1 (Parallel)
- **OS:** Linux (64-bit) or Windows 7+ (64-bit)

**GameCube Adapter:**

Follow the [instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Third party adapters may fail to work.


## Linux

Install dependencies:
```
sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libhidapi-dev libhidapi-hidraw0 libpng-dev libsamplerate0-dev libsdl2-dev libspeexdsp-dev make nasm p7zip-full wget zlib1g-dev
```
Install Rust:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```
Download [CMakeLists.txt](https://raw.githubusercontent.com/GhostlyDark/EMG/master/assets/CMakeLists.txt) and [compile.sh](https://raw.githubusercontent.com/GhostlyDark/EMG/master/assets/compile.sh) into an empty folder and run `compile.sh`.
```
chmod u+x compile.sh && ./compile.sh
```


## Windows

Releases can be found [here](https://github.com/GhostlyDark/EMG/releases/latest).

To build EMG instead, download and install [MSYS2](https://www.msys2.org/). Run `MSYS2 MinGW x64` and install dependencies.
```
pacman -S git make mingw-w64-x86_64-cmake mingw-w64-x86_64-freetype mingw-w64-x86_64-gcc mingw-w64-x86_64-hidapi mingw-w64-x86_64-libpng mingw-w64-x86_64-libsamplerate mingw-w64-x86_64-nasm mingw-w64-x86_64-rust mingw-w64-x86_64-SDL2 mingw-w64-x86_64-speex p7zip
```
Download [CMakeLists.txt](https://raw.githubusercontent.com/GhostlyDark/EMG/master/assets/CMakeLists.txt), [compile.sh](https://raw.githubusercontent.com/GhostlyDark/EMG/master/assets/compile.sh) and [dependencies.sh](https://raw.githubusercontent.com/GhostlyDark/EMG/master/assets/dependencies.sh) into an empty folder and run `compile.sh`.
```
./compile.sh
```

## Developers

The build script `compile.sh` can be run with additional parameters:
```
./compile.sh [git tag] [electron version] [thread count]
```
Download EMG source from master branch and Electron v22.0.0 using 8 threads for the make building process:
```
./compile.sh master v22.0.0 8
```
Build using source from an EMG release while keeping the rest automated:
```
./compile.sh v0.9.6
```


## Troubleshooting

Logging happens once mupen64plus closes after pressing `Launch`. Open Developer Tools by pressing `CTRL + I` or by activating it via the menubar (unhide with `ALT`). To save a log file, click the `Console` tab, right click on the relevant log -> `Save as...` to save it as text file. Post the log file as part of an issue if applicable.
