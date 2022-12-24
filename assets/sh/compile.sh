#!/usr/bin/env bash

set -ex


# Variables
tag="${1:-v0.9.2}"
electron="${2:-v22.0.0}"
threads="${3:-$(nproc)}"

script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
bin_dir="$toplvl_dir/Bin"
build_dir="$toplvl_dir/Build"
emg_dir="$toplvl_dir/EMG"
ico_dir="$emg_dir/assets/ico"
install_dir="$emg_dir/resources/app/m64p"
core_dir="$install_dir/core"
plugin_dir="$install_dir/plugin"

exe=""
ext=".so"
gca="libmupen64plus_input_gca.so"
generator="Unix Makefiles"
platform="linux"

if [[ "$OSTYPE" == "msys"* ]]; then
    exe=".exe"
    ext=".dll"
    gca="mupen64plus_input_gca.dll"
    generator="MSYS Makefiles"
    platform="win32"
fi



# Help message

if [ "$1" = "--help" ] || [ "$1" = "-h" ]
then
    echo "$0 [git tag] [electron version] [thread count]"
    exit
fi



# Initial directories
mkdir -p "$bin_dir" "$build_dir" 

if [ ! -d "EMG" ] ; then
    git clone --depth 1 --branch $tag https://github.com/GhostlyDark/EMG EMG
fi




# Download binary files
pushd "$bin_dir"

[ ! -f electron-$electron-$platform-x64.zip ] && wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip
7z x electron-$electron-$platform-x64.zip -o../EMG '-x!LICENSE' -y

if [[ "$OSTYPE" == "msys"* ]]; then
    [ ! -f rcedit-x64.exe ] && wget https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe
fi



# Build
pushd "$build_dir"

cmake -S "$toplvl_dir" -B "$build_dir" -DCMAKE_BUILD_TYPE="Release" -G "$generator"

make install DESTDIR="$toplvl_dir" -j$threads

if [[ "$OSTYPE" == "msys"* ]]; then
    make bundle_dependencies
fi



# Download and copy additional sources
if [ ! -d "mupen64plus-rom" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-rom mupen64plus-rom
fi

if [ ! -d "SDL_GameControllerDB" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/SDL_GameControllerDB SDL_GameControllerDB
fi

cp mupen64plus-rom/m64p_test_rom.v64 $install_dir
cp SDL_GameControllerDB/gamecontrollerdb.txt $install_dir



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
    cmd //c $bin_dir/rcedit-x64 $install_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
    cmd //c $bin_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2022 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"
fi



# Strip binaries
if [[ "$OSTYPE" == "msys"* ]]; then
    for f in $install_dir/*$ext; do strip -s $f; done
fi
for f in $core_dir/*$ext; do strip -s $f; done
for f in $plugin_dir/*$ext; do strip -s $f; done



# Run
EMG/EMG
