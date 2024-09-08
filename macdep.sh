#!/usr/bin/env bash

set -x



# Paths

script_dir="$(dirname "$0")"
toplvl_dir="$(realpath "$script_dir" || grealpath "$script_dir")"
build_dir="$toplvl_dir/build"
emg_dir="$build_dir/EMG"
rsc_dir="$emg_dir/EMG.app/Contents/Resources"
m64p_dir="$rsc_dir/m64p"
plugin_dir="$m64p_dir/plugin"



# Abort if directories are missing

if [[ ! -d "$m64p_dir" ]] || [[ ! -d "$plugin_dir" ]] ; then

    echo "Directories are missing. Please run compile.sh first."
    exit 1

fi



# Bundle dependencies

pushd "$m64p_dir"

mkdir -p lib

for f in *.dylib;        do ./dylibbundler -x $f -b -d ./lib -p ./lib -of; done
for f in plugin/*.dylib; do ./dylibbundler -x $f -b -d ./lib -p ./lib -of; done

./dylibbundler -x ./mupen64plus -b -d ./lib -p ./lib -of
./dylibbundler -x ./sdl2-jstest -b -d ./lib -p ./lib -of
