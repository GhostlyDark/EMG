# EMG

EMG is a launcher for [mupen64plus](https://github.com/GhostlyDark/mupen64plus-core) using [Electron](https://github.com/electron/electron) that launches [mupen64plus-ui-console](https://github.com/GhostlyDark/mupen64plus-ui-console).

For configuring controller input, a custom build of [sdl2-jstest](https://github.com/GhostlyDark/sdl-jstest) is used.

A custom build of [macdylibbundler](https://github.com/GhostlyDark/macdylibbundler) bundles dependencies on macOS.

![](/emg.jpg)

**Bundled plugins:**

- **GFX:** [Angrylion Plus](https://github.com/GhostlyDark/angrylion-rdp-plus), [GLideN64](https://github.com/GhostlyDark/GLideN64), [Parallel RDP](https://github.com/GhostlyDark/parallel-rdp-standalone), [Rice](https://github.com/GhostlyDark/mupen64plus-video-rice), [Glide64 MK2](https://github.com/GhostlyDark/mupen64plus-video-glide64mk2)
- **Audio:** [Mupen64Plus Audio SDL](https://github.com/GhostlyDark/mupen64plus-audio-sdl)
- **Input:** [GameCube Adapter](https://github.com/GhostlyDark/mupen64plus-input-gca), [Mupen64Plus Input SDL](https://github.com/GhostlyDark/mupen64plus-input-sdl), [Raphnetraw](https://github.com/GhostlyDark/mupen64plus-input-raphnetraw)
- **RSP:** [Mupen64Plus HLE](https://github.com/GhostlyDark/mupen64plus-rsp-hle), [Static Interpreter](https://github.com/GhostlyDark/rsp), [Parallel RSP](https://github.com/GhostlyDark/parallel-rsp)

**System requirements:**

- **CPU:** SSE3 capable (Electron)
- **GPU:** OpenGL 2.1 (Rice), OpenGL 3.3 (Angrylion Plus, GLideN64), Vulkan 1.1 (Parallel RDP)
- **OS:** Windows 7 (64-bit), Linux, macOS 10.13 (10.15 for Glide64MK2)
- **Compilation:** CMake v3.15 (Ubuntu 20.04, Debian 11 or similar)

**GameCube adapter:**

Follow the [instructions](https://dolphin-emu.org/docs/guides/how-use-official-gc-controller-adapter-wii-u/#Installation) to set up the adapter. Third party adapters may fail to work.

**Shortcuts:**

- `Ctrl` + `I`: Toggle developer tools
- `Ctrl` + `L`: Launch mupen64plus
- `Ctrl` + `N`: Reset all settings
- `Ctrl` + `O`: Open ROM
- `Ctrl` + `R`: Reload
- `Ctrl` + `Numpad+`: Zoom in
- `Ctrl` + `Numpad-`: Zoom out
- `Ctrl` + `Numpad0`: Zoom reset

**Build files:**

Can be found in `build/EMG` after running `compile.sh`. See below for more details.


## Supported platforms

### Windows

Releases can be found [here](https://github.com/GhostlyDark/EMG/releases/latest).

To build EMG instead, download and install [MSYS2](https://www.msys2.org/). Run `MSYS2 MinGW x64` and install dependencies:
```
pacman -S --needed --noconfirm git make mingw-w64-x86_64-cmake mingw-w64-x86_64-freetype mingw-w64-x86_64-gcc mingw-w64-x86_64-glew mingw-w64-x86_64-hidapi mingw-w64-x86_64-libpng mingw-w64-x86_64-libsamplerate mingw-w64-x86_64-nasm mingw-w64-x86_64-ninja mingw-w64-x86_64-rust mingw-w64-x86_64-SDL2 mingw-w64-x86_64-speex mingw-w64-x86_64-vulkan-headers unzip
```

Clone repository:
```
git clone https://github.com/GhostlyDark/EMG
```

Change directory:
```
cd EMG
```

Run `compile.sh`:
```
./compile.sh
```


### Linux

Prebuilt binaries can be found [here](https://github.com/GhostlyDark/EMG/releases/latest). Cloning and compiling can be skipped this way, but dependencies must have been installed regardless.

Install dependencies (including rust):

- Ubuntu/Debian (apt):
  ```
  sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libgtk-3-dev libhidapi-dev libhidapi-hidraw0 libpng-dev libsamplerate0-dev libsdl2-dev libspeexdsp-dev libvulkan-dev make nasm ninja-build pkg-config unzip wget zlib1g-dev
  ```

  ```
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  ```

  ```
  source "$HOME/.cargo/env"
  ```

- Fedora (dnf):
  ```
  sudo dnf -y install cmake curl freeglut-devel freetype-devel gcc gcc-c++ git gtk3-devel hidapi-devel libpng-devel libsamplerate-devel make nasm ninja-build pkgconfig SDL2-devel speexdsp-devel unzip vulkan-devel wget zlib-ng-devel
  ```

  ```
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  ```

  ```
  source "$HOME/.cargo/env"
  ```

- Arch Linux (pacman):
  ```
  sudo pacman -S --needed --noconfirm cmake freetype2 gcc git glew hidapi libpng libsamplerate make nasm ninja pkgconf rust sdl2 speex unzip vulkan-headers wget
  ```

- openSUSE Tumbleweed (zypper):
  ```
  sudo zypper -n install SDL2-devel cmake freeglut-devel freetype2-devel gcc gcc-c++ git gtk3-devel libhidapi-devel libhidapi-hidraw0 libpng16-devel libsamplerate-devel make nasm ninja pkgconf-pkg-config rust speex-devel unzip vulkan-devel wget zlib-devel
  ```

Clone repository:
```
git clone https://github.com/GhostlyDark/EMG
```

Change directory:
```
cd EMG
```

Make `compile.sh` executable and run it:
```
chmod u+x compile.sh
```

```
./compile.sh
```


### macOS

Releases can be found [here](https://github.com/GhostlyDark/EMG/releases/latest).

To build EMG instead, install a compatible version of Xcode:

- macOS 10.13: Xcode 9.4.1
- macOS 10.14: Xcode 10.3
- macOS 10.15: Xcode 11.7
- macOS 11: Xcode 12.5.1

You may download Xcode from Apple (requires account) or from a third party site (like archive.org).

(Help) You may delete an existing installation in case you encounter an error message:
```
sudo rm -rf /Library/Developer/CommandLineTools
```

Once installed, run this command from the terminal:
```
xcode-select --install
```

Install [MacPorts](https://www.macports.org/install.php), reboot the system and install dependencies:
```
sudo port -N install cargo cmake coreutils freeglut freetype gcc11 gcc_select git glew gmake gtk3 hidapi libgcc libpng libsamplerate libsdl2 nasm ninja pkgconfig rust speex speexDSP vulkan-headers wget zlib
```

(Help) List available compilers:
```
sudo port select --summary
```

Configure gcc compiler (and restart terminal for it to take effect):
```
sudo port select gcc mp-gcc11
```

Clone repository:
```
git clone https://github.com/GhostlyDark/EMG
```

Change directory:
```
cd EMG
```

Make `compile.sh` executable and run it:
```
chmod u+x compile.sh
```

```
./compile.sh
```

(Optional) Bundle dependencies to make the application portable:
```
chmod u+x ./macdep.sh
```

```
./macdep.sh
```


## Additional info

### Build options

The build script `compile.sh` can be run with additional parameters:
```
./compile.sh [threads]
```

To limit the building process to one thread:
```
./compile.sh 1
```

Additionally, changing the boolean values from `ON` to `OFF` near the start of `compile.sh` disables building the corresponding plugins:
```
raphnetraw="ON"
gca="ON"     
angrylion="ON" 
parallel="ON" 
glide64mk2="ON"
```


### Custom plugins

Plugin files are stored in `resources/m64p/plugin`.

EMG does allow for unknown plugins to be added, as long as they follow the `mupen64plus-[type]-[name].[extension]` naming scheme.

Accepted plugin types are `audio`, `input`, `rsp` and `video`.


### Portable mode

By default, EMG stores its settings in: 

- Windows: `%appdata%/EMG`
- Linux: `$XDG_CONFIG_HOME/EMG` or `~/.config/EMG`
- macOS: `~/Library/Application Support/EMG`

To override the default location, create a folder `resources/data`.

If that directory exists, EMG settings are instead stored in `data/user`. At the same time, `data/n64` becomes the default directory for mupen64plus configuration, save files and various plugin data (like cache and textures).

The output folder for EMG settings cannot be reconfigured by other means, but the directories for mupen64plus data can still be changed individually, even if portable mode is active.

Delete or rename the `data` directory to restore the original behavior.


### Troubleshooting

Logging happens once a mupen64plus instance closes successfully. To view the log, open developer tools by pressing `Ctrl` + `I` and switch to the `Console` tab. Right click on the relevant log -> `Save as...` to save it as text file.
