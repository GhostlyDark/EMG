#!/bin/sh
#/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
# *   Mupen64plus - m64p_build.sh                                           *
# *   Mupen64Plus homepage: http://code.google.com/p/mupen64plus/           *
# *   Copyright (C) 2009-2014 Richard Goedeken                              *
# *                                                                         *
# *   This program is free software; you can redistribute it and/or modify  *
# *   it under the terms of the GNU General Public License as published by  *
# *   the Free Software Foundation; either version 2 of the License, or     *
# *   (at your option) any later version.                                   *
# *                                                                         *
# *   This program is distributed in the hope that it will be useful,       *
# *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
# *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
# *   GNU General Public License for more details.                          *
# *                                                                         *
# *   You should have received a copy of the GNU General Public License     *
# *   along with this program; if not, write to the                         *
# *   Free Software Foundation, Inc.,                                       *
# *   51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.          *
# * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

# terminate the script if any commands return a non-zero error code
set -e

if [ -z "$MAKE" ]; then
	MAKE=make
fi
if [ -z "$M64P_COMPONENTS" ]; then
	M64P_COMPONENTS="mupen64plus-core mupen64plus-rom mupen64plus-ui-console mupen64plus-audio-sdl mupen64plus-input-sdl mupen64plus-rsp-hle rsp mupen64plus-video-rice mupen64plus-video-glide64mk2"
fi

mkdir -p ./m64p-build/
MAKE_INSTALL="PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR=icons INCDIR=api LDCONFIG=true "

for component in ${M64P_COMPONENTS}; do
	if [ "${component}" = "mupen64plus-core" ]; then
		component_type="library"
	elif  [ "${component}" = "mupen64plus-rom" ]; then
		echo "************************************ Building test ROM"
		mkdir -p ./m64p-build/
		cp source/mupen64plus-rom/m64p_test_rom.v64 ./m64p-build/
		continue
	elif  [ "${component}" = "mupen64plus-ui-console" ]; then
		component_type="front-end"
	else
		component_type="plugin"
	fi

	echo "************************************ Building ${component} ${component_type}"
	"$MAKE" -C source/${component}/projects/unix clean $@
	"$MAKE" -C source/${component}/projects/unix all $@
	"$MAKE" -C source/${component}/projects/unix install $@ ${MAKE_INSTALL} DESTDIR="$(pwd)/m64p-build/"

	mkdir -p ./m64p-build/doc
	for doc in LICENSES README RELEASE; do
		if [ -e "source/${component}/${doc}" ]; then
			cp "source/${component}/${doc}" "./m64p-build/doc/${doc}-${component}"
		fi
	done
	for subdoc in gpl-license font-license lgpl-license module-api-versions.txt; do
		if [ -e "source/${component}/doc/${subdoc}" ]; then
			cp "source/${component}/doc/${subdoc}" ./m64p-build/doc/
		fi
	done
done
