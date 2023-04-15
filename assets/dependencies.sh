#!/usr/bin/env bash

exe="$1"
bin_dir="$2"
path="$3"

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
		cp "$file" "$bin_dir"
        copyForOBJ $file
		return 0
	fi

    return 0
}


for ext in dll exe
do
	while read -r file_line
	do
		echo "=> Copying dependencies for $file_line"
		copyForOBJ "$file_line"
	done < <(find "$bin_dir" -name "*.$ext")
done

windeployqt "$exe"

exit 0
