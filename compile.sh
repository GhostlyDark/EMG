#!/usr/bin/env bash
set -ex



# Parameters
threads="${1:-$(nproc)}"
electron="${2:-v22.3.27}"



# Paths
script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
build_dir="$toplvl_dir/build"
cmake_dir="$build_dir/CMake"
emg_dir="$build_dir/EMG"
rsc_dir="$emg_dir/resources"
ico_dir="$rsc_dir/icon"
m64p_dir="$rsc_dir/m64p"
plugin_dir="$m64p_dir/plugin"



# Platform specific settings
exe=""
ext=".so"
gca="libmupen64plus_input_gca.so"
platform="linux"

if [[ $(uname -s) = MINGW64* ]]; then
    exe=".exe"
    ext=".dll"
    gca="mupen64plus_input_gca.dll"
    platform="win32"
fi



# Remove previous build files
if [ -d "$cmake_dir" ] || [ -d "$emg_dir" ] ; then
    echo "Build directories (CMake, EMG) already exist. Delete folders to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf $cmake_dir $emg_dir; break;;
            Exit ) exit;;
        esac
    done
fi



# Initial directories
mkdir -p "$build_dir" "$cmake_dir" "$emg_dir"

cp -R resources $emg_dir/resources
cp -R source/* $cmake_dir



# Fix script file permissions
if [[ $(uname -s) = Linux* ]]; then
    pushd "$cmake_dir"
    chmod u+x mupen64plus-video-GLideN64/src/getRevision.sh
fi



# Download binary files
pushd "$build_dir"

[ ! -f electron-$electron-$platform-x64.zip ] && wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip
7z x electron-$electron-$platform-x64.zip -oEMG '-x!LICENSE' '-x!LICENSES.chromium.html' '-x!version' '-x!resources/default_app.asar' '-x!locales/*.pak' -y
7z x electron-$electron-$platform-x64.zip -oEMG '-i!locales/en-US.pak' -y

if [[ $(uname -s) = MINGW64* ]]; then
    [ ! -f rcedit-x64.exe ] && wget https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe
fi



# Build
pushd "$cmake_dir"

cmake "$toplvl_dir" -G "Ninja"
cmake --build "$cmake_dir" --parallel "$threads"
cmake --install "$cmake_dir"

if [[ $(uname -s) = MINGW64* ]]; then
    cmake --build "$cmake_dir" --target=bundle_dependencies
fi



# Rename files
pushd "$emg_dir"
mv electron$exe EMG$exe

pushd "$plugin_dir"
mv $gca mupen64plus-input-gca$ext



# Fix executable file permissions
if [[ $(uname -s) = Linux* ]]; then
    pushd "$m64p_dir"
    chmod u+x mupen64plus
    chmod u+x sdl2-jstest
fi



# rcedit
pushd "$toplvl_dir"

if [[ $(uname -s) = MINGW64* ]]; then
    cmd //c $build_dir/rcedit-x64 $m64p_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
    cmd //c $build_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2024 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"
fi



# Strip binaries
for f in $m64p_dir/*$ext; do strip --strip-unneeded $f; done
for f in $plugin_dir/*$ext; do strip --strip-unneeded $f; done
