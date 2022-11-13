#!/usr/bin/env bash

set -ex
script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
bin_dir="$toplvl_dir/Bin"
build_dir="$toplvl_dir/Build"
source_dir="$build_dir/Source"
emg_dir="$toplvl_dir/EMG"
assets_dir="$emg_dir/assets"
ico_dir="$assets_dir/ico"
install_dir="$emg_dir/resources/app/m64p"
threads="${2:-$(nproc)}"

msys2="1"
generator="MSYS Makefiles"

ELECTRON="v21.2.2"
EMG="EMG/resources/app/m64p/"

pushd "$toplvl_dir"

mkdir -p "$build_dir"
mkdir -p "$bin_dir"

pushd "$bin_dir"

if [ ! -d "7z-binary" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/7z-binary 7z-binary
fi

cp 7z-binary/7z.dll $install_dir
cp 7z-binary/7z.exe $install_dir

[ ! -f electron-${ELECTRON}-win32-x64.zip ] && wget https://github.com/electron/electron/releases/download/${ELECTRON}/electron-${ELECTRON}-win32-x64.zip
7z x electron-${ELECTRON}-win32-x64.zip -o../EMG '-x!LICENSE' -y

[ ! -f rcedit-x64.exe ] && wget https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe

pushd "$emg_dir"

mv electron.exe EMG.exe

pushd "$build_dir"

cmake -S "$toplvl_dir" -B "$build_dir" -DCMAKE_BUILD_TYPE="Release" -DPORTABLE_INSTALL=ON -G "$generator"

make install DESTDIR="$toplvl_dir" -j$threads
make bundle_dependencies

pushd "$source_dir"

if [ ! -d "mupen64plus-rom" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-rom mupen64plus-rom
fi

if [ ! -d "SDL_GameControllerDB" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/SDL_GameControllerDB SDL_GameControllerDB
fi

cp mupen64plus-rom/m64p_test_rom.v64 $install_dir
cp SDL_GameControllerDB/gamecontrollerdb.txt $install_dir

pushd "$toplvl_dir"

cmd //c $bin_dir/rcedit-x64 $install_dir/mupen64plus.exe --set-icon $ico_dir/mupen64plus.ico
cmd //c $bin_dir/rcedit-x64 $emg_dir/EMG.exe --set-icon $ico_dir/emg.ico --set-version-string LegalCopyright "(C) 2022 EvilGames.eu" --set-version-string  OriginalFilename "electron.exe" --set-version-string FileDescription "EMG" --set-version-string ProductName "EMG" --set-version-string CompanyName "EvilGames.eu"

pushd "$install_dir"

mv mupen64plus_input_gca.dll mupen64plus-input-gca.dll

for f in $install_dir/*.dll; do strip -s $f; done

popd
