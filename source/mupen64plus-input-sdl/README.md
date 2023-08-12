![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mupen64plus.svg/127px-Mupen64plus.svg.png)

# https://mupen64plus.org/wiki/index.php/ControllerSetup
# Mupen64plus-input-sdl README                                               v2.0

The latest documentation for this plugin can be found in wiki format at:

https://mupen64plus.org/wiki/index.php/KeyboardSetup
https://mupen64plus.org/wiki/index.php/ControllerSetup

The format and usage of this plugin's "mupen64plus.cfg" configuration options
can be found at:

https://mupen64plus.org/wiki/index.php/Mupen64Plus_Plugin_Parameters#Input-SDL

## Notes about usage of SDL input plugin:

 - If one of the enabled controllers has the "mouse" general-purpose config parameters set
   to True, the plugin will hide the mouse cursor and 'grab' the mouse pointer.  The user
   may press the Left Control and Alt keys together to toggle the mouse cursor on and off.
 - If X/Y analog axes are mapped to keys, a plain keypress will simulate the joystick
   being pressed all the way to the edge.  To decrease the amount of simulated joystick
   deflection, the user may press Right Control, Right Shift, or Right Ctrl+Right Shift.

## Default Keyboard interface:

```
Analog Pad is "Arrow Keys"
C Up/Left/Down/Right are "I", "J", "K", "L"
DPad Up/Left/Down/Right are "W", "A", "S", "D"
Z trig is "z" key
L and R trigs are "x" and "c"
Start is "Enter" ("Return")
A is "left shift"
B is "left control"
Select Mempack = ","
Select Rumblepack = "."
```

## Special modifier keys

 - Right-shift key: reduce amplitude of analog joystick X/Y axes by 25%
 - Right-control key: reduce amplitude of analog joystick X/Y axes by 50%
 - Left-Control + Left-Alt keys: grab or un-grab the mouse cursor (only if mouse control is enabled)
 - Left-Windows key: do not auto-center joystick X/Y axes (only when mouse control is enabled)

## Notes for supported joysticks for auto-configuration:

1) Jess Tech Rumble Pad (Saitek Rumble)
The left D-pad is mapped to the D-pad; The joystick is mapped to the left joystick of the gamepad; the C buttons are mapped to the gampad's right joystick. Start button is mapped to start; the A-button is mapped to the lowest button on the gamepad's right front; the B-button to the left button (buttons marked 3 and 1 on my gamepad). The L and R buttons are mapped to the lower left and right rear triggers; the Z button is mapped to the left upper rear trigger. All other buttons are unused. 

2) Logitech Dual Action gamepad, Logitech Cordless Rumblepad 2:
The digital pad maps to the N64 d-pad.  The left analog stick maps to the N64 analog stick.
The right analog stick maps to the C-buttons,  and the buttons 2 and 1 map to A and B.
Button 4 is the Z trigger, and the top shoulder buttons map to the left and right N64 triggers.
Button 10 is the start button.
The bottom shoulder buttons select the memory pack or rumble pak.

3) Logitech Logitech(R) Precision(TM) Gamepad, Gravis GamePad Pro USB
I came up with what I see as one of the few decent configurations (SSB aside) since it allows access to everything but the dpad.
A is L1, B is R1, Z is L2, R is R2, L is select. C buttons are the four buttons, and the dpad acts as the joystick. Not the most orthodox, but it works well.

4) Microsoft Xbox 360 controller and clones:

```
N64          -> Xbox 360:

analog stick -> left stick
digital pad  -> directional pad
R            -> right bumper, right trigger
L            -> left bumper
Z            -> left trigger
A            -> A
B            -> X
start        -> start
C buttons    -> right stick
C left       -> Y (additionally to right stick)
C down       -> B (additionally to right stick)

mempak       -> none for now
rumblepak    -> none for now
```

As discussed in issue #478 Xbox 360 controllers should follow the above
mapping convention. If you want to add a Xbox 360 controller clone please
stick to it. As your clone might has different button naming, you can find
Xbox 360 controller button names at
https://en.wikipedia.org/wiki/File:360_controller.svg

Keys that are still unbound are back (aka. select) and left/right stick button
clicks. Those might be used for mempack and rumblepak toggles.

5) MP-8866 Dual USB Joypad:
This is a USB adapter for PlayStation controllers (2).

```
D-Pad:    hat(0)
L-Stick:  x:0, y:1
R-Stick:  x:2, y:3
Triangle: button(0)
Circle:   button(1)
Cross:    button(2)
Square:   button(3)
L2:       button(4)
R2:       button(5)
L1:       button(6)
R1:       button(7)
Start:    button(8)
Select:   button(9)
L3:       button(10)
R3:       button(11)
Note:  This is when analog mode is selected. If analog is off then D-Pad becomes axes 0/1 and both sticks are disabled (including L3/R3).
```

6) Nintendo Wiimote Classic
I am on a Mac and used https://code.google.com/p/wjoy/ successfully to connect my Wiimote + Classic Controller.

This is my working Wiimote + Class Controller configuration. You use the Classic Controller for all play, the Wiimote serves only as a host for the Classic Controller. I have swapped the left analog stick set as the C-Buttons and the right analog stick set as the N64 Analog (Y-Axis / X-Axis). This makes playing FPS titles like Perfect Dark a bit more reasonable for me. You can easily switch them by swapping 2 with 4 and 3 with 5 in the axis() sections below.

```
N64 -> Classic Controller
Z        -> L
R        -> R
L        -> ZL
A        -> A
B        -> B
Start    -> Start (+)
DPad     -> DPad
CButtons -> Left Analog
Analog   -> Right Analog

Mempak switch -> Home
Rumblepak switch -> Select (-)
```

7) N64 controller:
All controls are mapped to their proper place on the N64 controller with an Adaptoid or custom hardware with Gamecon driver.
Rumble and Memory packs can be selected with the 'r' and 'm' keys, respectively.

8) Playstation 3 Controller:

```
Left analog stick - analog stick
Right analog stick - C-pad
D-Pad - D-Pad
Cross - A
Square - B
L1 / R1 - L / R
L2 - Z
Start - Start
```

9) SAITEK P880:
The gamepad doesnt have enough keys to real assign all buttons. The second 
analog stick can be used as button by pushing him insight.

General Configuration:
Digital Pad was used as N64 digital pad, First analog stick was used as N64 
Analog stick. The red button was used as N64 Start button. L and R was used 
for N64 L and R. Second analog stick axes was used for N64 C buttons and 
second "analog stick button" was used for C-down. The first column of keys was 
used for A and B and the second and third row was used for C-Buttons - except 
for the Button next to the A button which would be C-Down but got the Z 
button.

10) Xbox Gamepad (userspace driver)
I created an Input Config for a Xbox 360 controller running with
xboxdrv on a Linux system (http://pingus.seul.org/~grumbel/xboxdrv/).

```
Z = Left shoulder button
L = Left shoulder trigger
A = A Button
B = X Button
```

everything else should be obvious.

Unfortunately, you will also have to make some configuration to
xboxdrv to make this work properly. xboxdrv has to be started with the
following config file. The "-as-button" options make sure that the D-
Pad and Trigger are emulated as buttons and the deadzone options make
the C buttons work much better.
The guide=KEY_ESC allows you to quit the emulator by pressing the
guide key on the controller. This is obviously just nice-to-have and
not actually neccessary for the config to work.

```
[xboxdrv]
silent=true
trigger-as-button=true
dpad-as-button=true

[ui-buttonmap]
guide=KEY_ESC

[axismap]
x2^deadzone:27000
y2^deadzone:27000
```

11) Saitek Cyborg V.3 Rumble Pad (aka Saitek PS2700)
Honestly, it's one of the best pads that I've used in a long time, so thought I'd contribute this quick config. Basically, Dpad and Analog sticks are unchanged, C-buttons are mapped to the right analog stick, L-R triggers are L1 and R1, Z is mapped to R2, A + B are mapped to X and Square, respectively, start is mapped to the Home button, and Triangle, Square, L2, Start, Select, and the Analog triggers are unused, since it's not intuitive to use them for what's left.

12) Arsenal Gaming PS3 controller (aka. "Gasia Co.,Ltd PS(R) Gamepad")

```
N64 Start = PS3 Start
N64 D-pad = PS3 D-pad
N64 joystick = PS3 left joystick
N64 C buttons = PS3 right joystick
N64 A = PS3 X
N64 B = PS3 Square
N64 R = PS3 R1
N64 L = PS3 L1
N64 Z = PS3 L2
Rumble pack swap = PS3 Triangle
Memory pack swap = PS3 Circle
```

13) Google Stadia controller
The Google Stadia controller can be used as a HID joystick by plugging it into a computer via USB-C or USB-C to USB-A.

```
N64 Start = Stadia Logo/Start
N64 D-pad = Stadia D-pad
N64 joystick = Stadia Left Analog Joystick
N64 C buttons = Stadia Right Analog Joystick
N64 A = Stadia A
N64 B = Stadia B
N64 R = Stadia Right Bumper
N64 L = Stadia Left Bumper
N64 Z = Stadia Left Trigger
Rumble pack swap = Stadia Y
Memory pack swap = Stadia X
```

14) PS4 Controller for Linux

The non-Linux configuration for the Sony Interactive Entertainment Wireless Controller had incompatible bindings. Z was right analog stick up.
I made a list of the ps4 buttons:
```
button 0 = cross
button 1 = circle
button 2 = triangle
button 3 = square
button 4 = l1
button 5 = r1
button 6 = l2
button 7 = r2
button 8 = share
button 9 = options
button 10 = ps
button 11 = l3
button 12 = r3

axis 0- = lstick left
axis 0+ = lstick right
axis 1- = lstick up
axis 1+ = lstick down
axis 2+ = l2
axis 2- = l2
axis 3- = rstick left
axis 3+ = rstick right
axis 4- = rstick up
axis 4+ = rstick down
axis 5+ = r2
axis 5- = r2

hat 0 Right = Right
hat 0 Left = Left
hat 0 Down = Down
hat 0 Up = Up
```
