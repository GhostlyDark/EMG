sdl2-jstest
===========

`sdl2-jstest` is a simple program that lets you find out how many joysticks SDL2 detected on your system, how many axes, buttons, hats and balls they have each. It also lets you test the joysticks by displaying the events they send or by displaying their current button, axis, hat or ball state.


EMG fork
--------

This version of `sdl2-jstest` has been modified and expanded for the [Electron Mupen64Plus GUI](https://github.com/GhostlyDark/EMG) with the following options being new:
```
-ls, --listsimple
-es, --eventsimple JOYNUM
-i,  --identifier JOYNUM
-m,  --mapping JOYNUM
```
The option to display a graphical representation of the current joystick state has been removed in favor of less dependencies.


Requirements
------------

`sdl2-jstest` requires the following packages to build:

* cmake
* libsdl2-dev

Optionally, put `gamecontrollerdb.txt` from [SDL_GameControllerDB](https://github.com/gabomdq/SDL_GameControllerDB) into the same folder as the binary to improve the joystick mapping function.


Compilation
-----------

To compile type:
```
mkdir build
cd build
cmake ..
make
```
If needed, run `cmake .. -G "MSYS Makefiles"` or `cmake .. -G "Unix Makefiles"` instead of `cmake ..` to change the generator.


Options
-------
```
-h,  --help                    Print this help
-v,  --version                 Print version number
-l,  --list                    Search for available joysticks and list their properties
-ls, --listsimple              Search for available joysticks and list their index and name
-g,  --gamecontroller JOYNUM   Test game controller
-e,  --event JOYNUM            Display the events that are received from the joystick
-es, --eventsimple JOYNUM      Display an event from the joystick and quit
-i,  --identifier JOYNUM       Print joystick GUID
-m,  --mapping JOYNUM          Print joystick mapping
-r,  --rumble JOYNUM           Test rumble effects on gamepad
```


Examples
--------
```
sdl2-jstest -ls
sdl2-jstest -es 1
```
