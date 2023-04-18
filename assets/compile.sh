#!/usr/bin/env bash
set -ex



# Variables
tag="${1:-master}"
electron="${2:-v22.3.6}"
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



# Initial directories
mkdir -p "$bin_dir" "$build_dir" 

if [ ! -d "EMG" ]; then
    git clone --depth 1 --branch $tag https://github.com/GhostlyDark/EMG EMG
fi




# Download executables
pushd "$bin_dir"

[ ! -f electron-$electron-$platform-x64.zip ] && wget https://github.com/electron/electron/releases/download/$electron/electron-$electron-$platform-x64.zip
7z x electron-$electron-$platform-x64.zip -o../EMG '-x!LICENSE' '-x!LICENSES.chromium.html' '-x!resources/default_app.asar' -y

if [[ "$OSTYPE" == "msys"* ]]; then
    [ ! -f rcedit-x64.exe ] && wget https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe
fi



# Download additional files
pushd "$build_dir"

if [ ! -d "mupen64plus-rom" ]; then
    git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-rom mupen64plus-rom
fi

if [ ! -d "SDL_GameControllerDB" ]; then
    git clone --depth 1 https://github.com/GhostlyDark/SDL_GameControllerDB SDL_GameControllerDB
fi

cp mupen64plus-rom/m64p_test_rom.v64 $install_dir
cp SDL_GameControllerDB/gamecontrollerdb.txt $install_dir



# Build
pushd "$build_dir"

cmake "$toplvl_dir" -G "$generator"

make install DESTDIR="$toplvl_dir" -j$threads

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
    cmd //c $bin_dir/rcedit-x64 $install_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
    cmd //c $bin_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2023 EvilGames.eu" --set-version-string OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"
fi



# Strip binaries
if [[ "$OSTYPE" == "msys"* ]]; then
    for f in $install_dir/*$ext; do strip -s $f; done
fi
for f in $core_dir/*$ext; do strip -s $f; done
for f in $plugin_dir/*$ext; do strip -s $f; done



# Remove unused git files
rm -rf $emg_dir/.git
rm -f $emg_dir/.gitattributes
rm -f $emg_dir/LICENSE



# Run
EMG/EMG
