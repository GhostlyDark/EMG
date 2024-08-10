# EMG

EMG is a launcher for [mupen64plus](https://github.com/GhostlyDark/mupen64plus-core) using [Electron](https://github.com/electron/electron). For controller input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest) is used.

![](/emg.jpg)

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/GhostlyDark/angrylion-rdp-plus), [GLideN64](https://github.com/GhostlyDark/GLideN64), [Parallel RDP](https://github.com/GhostlyDark/parallel-rdp-standalone), [Rice](https://github.com/GhostlyDark/mupen64plus-video-rice)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/GhostlyDark/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/GhostlyDark/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/GhostlyDark/mupen64plus-input-sdl), [Raphnetraw](https://github.com/GhostlyDark/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/GhostlyDark/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/GhostlyDark/rsp), [Parallel RSP](https://github.com/GhostlyDark/parallel-rsp)

**System requirements:**

- **CPU:** SSE3 capable (Electron)
- **GPU:** OpenGL 2.1 (Rice), OpenGL 3.3 (Angrylion Plus, GLideN64), Vulkan 1.1 (Parallel RDP)
- **OS:** Linux or Windows 7 (64-bit)
- **Compilation:** CMake v3.15 (Ubuntu 20.04, Debian 11 or similar)

**GameCube adapter:**

Follow the [instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Third party adapters may fail to work.

**Build files:**

Can be found in `build/EMG` after running `compile.sh`. See below for more details.


## Linux

Install dependencies:
```
sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libhidapi-dev libhidapi-hidraw0 libpng-dev libsamplerate0-dev libsdl2-dev libspeexdsp-dev libvulkan-dev make nasm ninja-build p7zip-full wget zlib1g-dev
```

Install Rust:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
```

Configure Rust:
```
source "$HOME/.cargo/env"
```

Clone repository:
```
git clone https://github.com/GhostlyDark/EMG EMG
```

Change directory:
```
cd EMG
```

Run `compile.sh`:
```
chmod u+x compile.sh && ./compile.sh
```


## Windows

Releases can be found [here](https://github.com/GhostlyDark/EMG/releases/latest).

To build EMG instead, download and install [MSYS2](https://www.msys2.org/). Run `MSYS2 MinGW x64` and install dependencies:
```
pacman -S --needed git make mingw-w64-x86_64-cmake mingw-w64-x86_64-freetype mingw-w64-x86_64-gcc mingw-w64-x86_64-hidapi mingw-w64-x86_64-libpng mingw-w64-x86_64-libsamplerate mingw-w64-x86_64-nasm mingw-w64-x86_64-ninja mingw-w64-x86_64-rust mingw-w64-x86_64-SDL2 mingw-w64-x86_64-speex mingw-w64-x86_64-vulkan p7zip
```

Clone repository:
```
git clone https://github.com/GhostlyDark/EMG EMG
```

Change directory:
```
cd EMG
```

Run `compile.sh`:
```
./compile.sh
```


## Building options

The build script `compile.sh` can be run with additional parameters:
```
./compile.sh [threads] [electron]
```

Limit the building process to one thread and grab Electron v22.3.27:
```
./compile.sh 1 v22.3.27
```


## Adding plugins

Plugin files are stored in `resources/m64p/plugin`. EMG does allow for plugins to be added, as long as they follow the `mupen64plus-[type]-[name].[extension]` naming scheme. Accepted plugin types are `audio`, `input`, `rsp` and `video`.


## Portable mode

By default, EMG stores its settings (userData) in `%appdata%/EMG` on Windows and either `$XDG_CONFIG_HOME/EMG` or `~/.config/EMG` on Linux. To override the default location, create a folder `resources/data`.

If that directory exists, userData is instead stored in `resources/data/user`. At the same time, `resources/data/n64` (n64Data) becomes the default directory for mupen64plus configuration, save files and various plugin data (like cache and textures). While userData cannot be reconfigured by other means, the locations for each of the n64Data can still be configured individually.

Delete or rename the `data` directory to restore original behavior.


## Shortcuts

- `Ctrl` + `I`: Toggle developer tools
- `Ctrl` + `L`: Launch mupen64plus
- `Ctrl` + `N`: Reset all settings
- `Ctrl` + `O`: Open ROM
- `Ctrl` + `R`: Reload
- `Ctrl` + `Numpad+`: Zoom in
- `Ctrl` + `Numpad-`: Zoom out
- `Ctrl` + `Numpad0`: Zoom reset


## Troubleshooting

Logging happens once mupen64plus closes after pressing `Launch`. To view the log, open developer tools and switch to the `Console` tab. Right click on the relevant log -> `Save as...` to save it as text file.
