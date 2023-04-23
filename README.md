# EMG

EMG is a launcher for [mupen64plus](https://github.com/GhostlyDark/mupen64plus-core) using [Electron](https://github.com/electron/electron). For controller input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest) is used.

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/GhostlyDark/angrylion-rdp-plus), [GLideN64](https://github.com/GhostlyDark/GLideN64), [Parallel](https://github.com/GhostlyDark/parallel-rdp-standalone), [Rice](https://github.com/GhostlyDark/mupen64plus-video-rice)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/GhostlyDark/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/GhostlyDark/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/GhostlyDark/mupen64plus-input-sdl), [Raphnetraw](https://github.com/GhostlyDark/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/GhostlyDark/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/GhostlyDark/rsp), [Parallel RSP](https://github.com/GhostlyDark/parallel-rsp)

**System requirements:**

- **CPU:** SSE3 capable (Electron)
- **GPU:** OpenGL 2.1 (Rice), OpenGL 3.3 (Angrylion Plus, GLideN64), Vulkan 1.1 (Parallel)
- **OS:** Linux (64-bit) or Windows 7+ (64-bit)

**GameCube adapter:**

Follow the [instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Third party adapters may fail to work.

**Build files:**

Can be found in `build/EMG` after running `compile.sh`. See below for more details.


## Linux

Install dependencies:

```
sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libhidapi-dev libhidapi-hidraw0 libpng-dev libsamplerate0-dev libsdl2-dev libspeexdsp-dev make nasm ninja-build p7zip-full wget zlib1g-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"
```

Clone repository, change directory and run `compile.sh`:

```
git clone https://github.com/GhostlyDark/EMG EMG
cd EMG
chmod u+x compile.sh && ./compile.sh
```


## Windows

Releases can be found [here](https://github.com/GhostlyDark/EMG/releases/latest).

To build EMG instead, download and install [MSYS2](https://www.msys2.org/). Run `MSYS2 MinGW x64` and install dependencies.

```
pacman -S git make mingw-w64-x86_64-cmake mingw-w64-x86_64-freetype mingw-w64-x86_64-gcc mingw-w64-x86_64-hidapi mingw-w64-x86_64-libpng mingw-w64-x86_64-libsamplerate mingw-w64-x86_64-nasm mingw-w64-x86_64-ninja mingw-w64-x86_64-rust mingw-w64-x86_64-SDL2 mingw-w64-x86_64-speex p7zip
```

Clone repository, change directory and run `compile.sh`:

```
git clone https://github.com/GhostlyDark/EMG EMG
cd EMG
./compile.sh
```


## Developers

The build script `compile.sh` can be run with additional parameters:

```
./compile.sh [generator] [threads] [electron]
```

Defaults are:

```
./compile.sh "make" "logical cores" "see compile.sh"
```

Use make, download Electron v22.3.6 and use 8 threads for the building process:

```
./compile.sh make 8 v22.3.6
```

Use ninja for building instead:

```
./compile.sh ninja
```

Other generators are not supported. Latter parameters may be omitted.


## Troubleshooting

Logging happens once mupen64plus closes after pressing `Launch`. Open developer tools by pressing `CTRL + I` or by activating it via the menubar (unhide with `ALT`). To save a log file, click the `Console` tab, right click on the relevant log -> `Save as...` to save it as text file. Post the log file as part of an issue if applicable.
