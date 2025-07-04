#!/usr/bin/env bash

exe="$1"
bin_dir="$2"
path="/$MSYSTEM/bin"

function copyForOBJ() {
    local deps=`objdump.exe -p $1 | grep 'DLL Name:' | sed -e "s/\t*DLL Name: //g"`
    while read -r line
	do
        findAndCopyDLL $line
    done <<< "$deps"
}

function findAndCopyDLL() {
    local file="$path/$1"
	if [ -f $file ] && [ ! -f "$bin_dir/$1" ]
	then
		echo "==> Copying $1"
		cp "$file" "$bin_dir"
        copyForOBJ $file
		return 0
	fi
    return 0
}

for file in "$bin_dir"/*.exe "$bin_dir"/*.dll "$bin_dir"/*/*.dll
do
	echo "=> Finding dependencies for $file"
	copyForOBJ "$file"
done

exit 0
