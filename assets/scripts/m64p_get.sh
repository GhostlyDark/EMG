#!/bin/sh
#/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
# *   Mupen64plus - m64p_get.sh                                           *
# *   Mupen64Plus homepage: http://code.google.com/p/mupen64plus/           *
# *   Copyright (C) 2009 Richard Goedeken                                   *
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

echo "************************************ Creating directories"
rm -rf source
mkdir source

if [ -z "$M64P_COMPONENTS" ]; then
	M64P_COMPONENTS="mupen64plus-core mupen64plus-rom mupen64plus-ui-console mupen64plus-audio-sdl mupen64plus-input-sdl mupen64plus-rsp-hle rsp mupen64plus-video-rice mupen64plus-video-glide64mk2"
fi

for component in ${M64P_COMPONENTS}; do
	if [ "${component}" = "mupen64plus-core" ]; then
		component_type="library"
	elif  [ "${component}" = "mupen64plus-rom" ]; then
		component_type=""
	elif  [ "${component}" = "mupen64plus-ui-console" ]; then
		component_type="front-end"
	else
		component_type="plugin"
	fi

	echo "************************************ Downloading ${component} ${component_type}"
	git clone https://github.com/ghostlydark/${component}.git source/${component} $@
done
