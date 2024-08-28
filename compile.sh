#!/usr/bin/env bash

set -ex



# Parameters

threads="${1:-$(nproc)}"
electron="v22.3.27"



# Paths

script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
build_dir="$toplvl_dir/build"
cmake_dir="$build_dir/CMake"
emg_dir="$build_dir/EMG"
rsc_dir="$emg_dir/resources"
m64p_dir="$rsc_dir/m64p"
plugin_dir="$m64p_dir/plugin"
tools_dir="$toplvl_dir/tools"
ico_dir="$tools_dir/icon"



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



# Check if Electron was already extracted

if [[ -d $emg_dir ]] && [[ ! -f $emg_dir/EMG$exe ]]; then

    echo "EMG directory appears to be incomplete. Delete folder to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf $emg_dir; break;;
            Exit ) exit;;
        esac
    done

fi



# Remove files from previous build

if [[ -d $cmake_dir ]] || [[ -d $rsc_dir ]] ; then
    echo "Working directories (CMake, EMG/resources) already exist. Delete folders to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf $cmake_dir $rsc_dir; break;;
            Exit ) exit;;
        esac
    done
fi



# Make sure directories exist

mkdir -p "$build_dir" "$cmake_dir" "$emg_dir"



# Download and extract Electron

if [[ ! -f $emg_dir/EMG$exe ]]; then

    [ ! -f $build_dir/electron-$electron-$platform-x64.zip ] && wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip -P $build_dir/

    7z x $build_dir/electron-$electron-$platform-x64.zip -o$build_dir/EMG '-x!LICENSE' '-x!LICENSES.chromium.html' '-x!version' '-x!resources/default_app.asar' '-x!locales/*.pak' -y
    7z x $build_dir/electron-$electron-$platform-x64.zip -o$build_dir/EMG '-i!locales/en-US.pak' -y

    mv $emg_dir/electron$exe $emg_dir/EMG$exe

    if [[ $(uname -s) = MINGW64* ]]; then
        cmd //c $tools_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2024 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"

    fi
fi



# Copy files

cp -R $toplvl_dir/resources $rsc_dir



# Fix getRevision.sh file permissions

if [[ $(uname -s) = Linux* ]]; then
    chmod u+x $toplvl_dir/source/mupen64plus-video-GLideN64/src/getRevision.sh
fi



# Build

cmake -S "$toplvl_dir" -B "$cmake_dir" -G "Ninja"
cmake --build "$cmake_dir" --parallel "$threads"
cmake --install "$cmake_dir"

if [[ $(uname -s) = MINGW64* ]]; then
    cmake --build "$cmake_dir" --target=bundle_dependencies
fi



# Rename files

mv $plugin_dir/$gca $plugin_dir/mupen64plus-input-gca$ext



# Add icon to mupen64plus.exe

if [[ $(uname -s) = MINGW64* ]]; then
    cmd //c $tools_dir/rcedit-x64 $m64p_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
fi



# Fix executable file permissions

if [[ $(uname -s) = Linux* ]]; then
    chmod u+x $m64p_dir/mupen64plus
    chmod u+x $m64p_dir/sdl2-jstest
fi



# Strip binaries

for f in $m64p_dir/*$ext; do strip --strip-unneeded $f; done
for f in $plugin_dir/*$ext; do strip --strip-unneeded $f; done
