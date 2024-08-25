#!/usr/bin/env bash
set -ex



# Paths
script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir")"
build_dir="$toplvl_dir/build"
cmake_dir="$build_dir/CMake"
emg_dir="$build_dir/EMG"
rsc_dir="$emg_dir/resources"
m64p_dir="$rsc_dir/m64p"
plugin_dir="$m64p_dir/plugin"

rt64_dir="$cmake_dir/rt64"
rt64_build_dir="$rt64_dir/build"
rt64_release_dir="$rt64_build_dir/Release"



# Platform specific settings
ext=".so"

if [[ $(uname -s) = MINGW64* ]]; then
    ext=".dll"
fi



# Clone rt64 recursively
pushd "$cmake_dir"

if [ ! -d "$rt64_dir" ]; then
    git clone https://github.com/GhostlyDark/rt64 rt64 --recursive -b plugin --depth 1
fi



# Remove previous build files
pushd "$rt64_dir"

if [ -d "$rt64_build_dir" ]; then
    echo "Build directory for rt64 already exist. Delete folder to proceed?"
    select yn in "Continue" "Exit"; do
        case $yn in
            Continue ) rm -rf $rt64_build_dir; break;;
            Exit ) exit;;
        esac
    done
fi



# Build rt64
mkdir build
cd build

if [[ $(uname -s) = MINGW64* ]]; then
    cmake .. -G "Visual Studio 17 2022"
    cmake --build . --config Release
fi

if [[ $(uname -s) = Linux* ]]; then
    cmake .. -DCMAKE_BUILD_TYPE=Release
    cmake --build .
fi



# Copy files
pushd "$build_dir"

if [[ $(uname -s) = MINGW64* ]]; then
    cp $rt64_build_dir/dxcompiler.dll $rt64_build_dir/dxil.dll $m64p_dir
    cp $rt64_build_dir/dxcompiler.dll $rt64_build_dir/dxil.dll $rt64_release_dir/rt64$ext $plugin_dir
fi

if [[ $(uname -s) = Linux* ]]; then
    cp $rt64_build_dir/rt64$ext $plugin_dir
fi



# Rename rt64 to mupen64plus-video-rt64
pushd "$plugin_dir"

mv rt64$ext mupen64plus-video-rt64$ext
