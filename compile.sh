#!/usr/bin/env bash

set -ex



# Parameters

threads="${1:-$(nproc || getconf _NPROCESSORS_ONLN)}"
electron="v22.3.27"



# Paths

script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir" || grealpath "$script_dir")"
build_dir="$toplvl_dir/build"
cmake_dir="$build_dir/CMake"
emg_dir="$build_dir/EMG"
rsc_dir="$emg_dir/resources"
app_dir="$rsc_dir/app"
m64p_dir="$rsc_dir/m64p"
plugin_dir="$m64p_dir/plugin"
tools_dir="$toplvl_dir/tools"
ico_dir="$tools_dir/icon"
info_dir="$tools_dir/info"



# Platform specific settings

if [[ $(uname -s) = MINGW64* ]]; then

    exe=".exe"
    ext=".dll"
    gca_name="mupen64plus_input_gca.dll"
    platform="win32"

elif [[ $(uname -s) = Darwin* ]]; then

    exe=""
    ext=".dylib"
    gca_name="libmupen64plus_input_gca.dylib"
    platform="darwin"

    electron_dir="$emg_dir/Electron.app/Contents"
    electron_bin_dir="$electron_dir/MacOS"

    rsc_dir="$emg_dir/EMG.app/Contents/Resources"
    m64p_dir="$rsc_dir/m64p"
    plugin_dir="$m64p_dir/plugin"

else

    exe=""
    ext=".so"
    gca_name="libmupen64plus_input_gca.so"
    platform="linux"

fi



# Check if Electron was already extracted

if [[ ! $(uname -s) = Darwin* && -d "$emg_dir" && ! -f "$emg_dir"/EMG$exe ]] || [[ $(uname -s) = Darwin* && -d "$emg_dir" && ! -d "$emg_dir"/EMG.app ]]; then

    echo "EMG directory appears to be incomplete. Delete folder to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf "$emg_dir"; break;;
            Exit ) exit;;
        esac
    done

fi



# Remove files from previous build

if [[ -d "$cmake_dir" ]] || [[ -d "$app_dir" ]] || [[ -d "$m64p_dir" ]] ; then

    echo "One or more working directories (CMake, app, m64p) already exist. Delete folders to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf "$cmake_dir" "$app_dir" "$m64p_dir"; break;;
            Exit ) exit;;
        esac
    done

fi



# Make sure directories exist

mkdir -p "$build_dir" "$cmake_dir" "$emg_dir"



# Download and extract Electron

if [[ ! $(uname -s) = Darwin* && ! -f "$emg_dir"/EMG$exe ]] || [[ $(uname -s) = Darwin* && ! -d "$emg_dir"/EMG.app ]]; then

    if [[ ! -f "$build_dir"/electron-$electron-$platform-x64.zip ]]; then

        wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip -P "$build_dir"/

    fi

    if [[ $(uname -s) = MINGW64* ]] || [[ $(uname -s) = Linux* ]]; then

        unzip -o "$build_dir"/electron-$electron-$platform-x64.zip -d "$build_dir"/EMG -x LICENSE LICENSES.chromium.html version resources/default_app.asar 'locales/*.pak'
        unzip -o "$build_dir"/electron-$electron-$platform-x64.zip locales/en-US.pak -d "$build_dir"/EMG

        mv "$emg_dir"/electron$exe "$emg_dir"/EMG$exe

    fi

    if [[ $(uname -s) = Darwin* ]]; then

        unzip -o "$build_dir"/electron-$electron-$platform-x64.zip -d "$build_dir"/EMG -x LICENSE LICENSES.chromium.html version Electron.app/Contents/Resources/default_app.asar Electron.app/Contents/Resources/electron.icns

        cp "$info_dir"/EMG.plist "$electron_dir"/Info.plist

        mv "$electron_bin_dir"/Electron "$electron_bin_dir"/EMG
        mv "$emg_dir"/Electron.app "$emg_dir"/EMG.app

        cp "$ico_dir"/emg.icns "$rsc_dir"

    fi

    if [[ $(uname -s) = MINGW64* ]]; then

        "$tools_dir"/rcedit-x64 "$emg_dir"/EMG.exe --set-icon "$ico_dir"/emg.ico --set-version-string LegalCopyright "(C) 2025 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"

    fi

fi



# Copy files

mkdir -p "$rsc_dir"

cp -R "$toplvl_dir"/resources/* "$rsc_dir"



# Fix getRevision.sh file permissions

if [[ $(uname -s) = Linux* ]] || [[ $(uname -s) = Darwin* ]]; then

    chmod u+x "$toplvl_dir"/source/mupen64plus-video-GLideN64/src/getRevision.sh

fi



# Build

cmake -S "$toplvl_dir" -B "$cmake_dir" -G "Ninja"
cmake --build "$cmake_dir" --parallel "$threads"
cmake --install "$cmake_dir"

if [[ $(uname -s) = MINGW64* ]]; then

    cmake --build "$cmake_dir" --target=bundle_dependencies

fi



# Rename files

if [[ -f "$plugin_dir"/$gca_name ]]; then

    mv "$plugin_dir"/$gca_name "$plugin_dir"/mupen64plus-input-gca$ext

fi


# Add icon to mupen64plus.exe

if [[ $(uname -s) = MINGW64* ]]; then

    "$tools_dir"/rcedit-x64 "$m64p_dir"/mupen64plus.exe --set-icon "$ico_dir"/mupen64plus.ico

fi



# Fix executable file permissions

if [[ $(uname -s) = Linux* ]] || [[ $(uname -s) = Darwin* ]]; then

    chmod u+x "$m64p_dir"/mupen64plus
    chmod u+x "$m64p_dir"/sdl2-jstest

fi

if [[ $(uname -s) = Darwin* ]]; then

    chmod u+x "$m64p_dir"/dylibbundler

fi



# Strip binaries

if [[ $(uname -s) = MINGW64* ]] || [[ $(uname -s) = Linux* ]]; then

    for f in "$m64p_dir"/*$ext;   do strip --strip-unneeded $f; done
    for f in "$plugin_dir"/*$ext; do strip --strip-unneeded $f; done

fi
