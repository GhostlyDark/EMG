# sdl-jstest - Joystick Test Program for SDL
# Copyright (C) 2015 Ingo Ruhnke <grumbel@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

cmake_minimum_required(VERSION 3.10)
project(sdl-jstest)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

find_package(SDL2 REQUIRED)

add_executable(sdl2-jstest sdl2-jstest.c)
target_link_libraries(sdl2-jstest ${SDL2_LIBRARIES})
target_include_directories(sdl2-jstest PUBLIC ${SDL2_INCLUDE_DIRS})
target_compile_definitions(sdl2-jstest PUBLIC ${SDL2_CFLAGS_OTHER})

# EOF #
