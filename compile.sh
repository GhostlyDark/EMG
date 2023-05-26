#!/usr/bin/env bash
set -ex



# Parameters
threads="${1:-$(nproc)}"
electron="${2:-v22.3.11}"



# Paths
script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
build_dir="$toplvl_dir/build"
cmake_dir="$build_dir/CMake"
emg_dir="$build_dir/EMG"
app_dir="$emg_dir/resources/app"
ico_dir="$app_dir/ico"
install_dir="$app_dir/m64p"
plugin_dir="$install_dir/plugin"



# Platform specific settings
exe=""
ext=".so"
gca="libmupen64plus_input_gca.so"
platform="linux"
generator="Unix Makefiles"

if [[ "$OSTYPE" == "msys"* ]]; then
    exe=".exe"
    ext=".dll"
    gca="mupen64plus_input_gca.dll"
    platform="win32"
    generator="MSYS Makefiles"
fi



# Initial directories
mkdir -p "$build_dir" "$cmake_dir" "$emg_dir"

cp -R resources $emg_dir/resources



# Download binary files
pushd "$build_dir"

[ ! -f electron-$electron-$platform-x64.zip ] && wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip
7z x electron-$electron-$platform-x64.zip -oEMG '-x!LICENSE' '-x!LICENSES.chromium.html' '-x!version' '-x!resources/default_app.asar' -y

if [[ "$OSTYPE" == "msys"* ]]; then
    [ ! -f rcedit-x64.exe ] && wget https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe
fi



# Download additional repositories
pushd "$cmake_dir"

if [ ! -d "mupen64plus-rom" ]; then
    git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-rom mupen64plus-rom
fi

if [ ! -d "SDL_GameControllerDB" ]; then
    git clone --depth 1 https://github.com/GhostlyDark/SDL_GameControllerDB SDL_GameControllerDB
fi

cp mupen64plus-rom/mupen64plus.z64 $install_dir
cp SDL_GameControllerDB/gamecontrollerdb.txt $install_dir



# Build
cmake "$toplvl_dir" -G "$generator"
make install -j$threads

if [[ "$OSTYPE" == "msys"* ]]; then
    make bundle_dependencies
fi



# Rename files
pushd "$emg_dir"
mv electron$exe EMG$exe

pushd "$plugin_dir"
mv $gca mupen64plus-input-gca$ext



# Fix file permissions
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    pushd "$install_dir"
    chmod u+x mupen64plus
    chmod u+x sdl2-jstest
fi



# rcedit
pushd "$toplvl_dir"

if [[ "$OSTYPE" == "msys"* ]]; then
    cmd //c $build_dir/rcedit-x64 $install_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
    cmd //c $build_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2023 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"
fi



# Strip binaries
for f in $install_dir/*$ext; do strip --strip-unneeded $f; done
for f in $plugin_dir/*$ext; do strip --strip-unneeded $f; done
