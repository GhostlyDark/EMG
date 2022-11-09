# Install dependencies
sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libhidapi-dev libhidapi-hidraw0 liblircclient-dev libpng-dev libsamplerate0-dev libsdl2-dev libspeexdsp-dev make nasm p7zip-full p7zip-rar wget zlib1g-dev

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"

# Variables
ELECTRON="v21.2.2"
EMG="EMG/resources/app/m64p/"
MAKE_INSTALL="PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR=icons INCDIR=api LDCONFIG=true COREDIR=./ NEW_DYNAREC=1 OSD=0 SSE=SSE2"
M64P_COMPONENTS="mupen64plus-core mupen64plus-rom mupen64plus-ui-console mupen64plus-audio-sdl mupen64plus-input-sdl mupen64plus-rsp-hle rsp"

mkdir -p source

# Download source code
git clone --depth 1 https://github.com/GhostlyDark/EMG.git EMG
git clone --depth 1 https://github.com/GhostlyDark/sdl-jstest.git source/sdl-jstest
git clone --depth 1 https://github.com/GhostlyDark/SDL_GameControllerDB source/SDL_GameControllerDB
git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-input-gca.git source/mupen64plus-input-gca
git clone --depth 1 https://github.com/GhostlyDark/mupen64plus-input-raphnetraw.git source/mupen64plus-input-raphnetraw
git clone --depth 1 https://github.com/GhostlyDark/GLideN64.git source/GLideN64
git clone --depth 1 https://github.com/GhostlyDark/angrylion-rdp-plus.git source/angrylion-rdp-plus
git clone --depth 1 https://github.com/GhostlyDark/parallel-rdp-standalone.git source/parallel-rdp-standalone
git clone --depth 1 https://github.com/GhostlyDark/parallel-rsp.git source/parallel-rsp

# Download Electron
[ ! -f electron-${ELECTRON}-linux-x64.zip ] && wget https://github.com/electron/electron/releases/download/${ELECTRON}/electron-${ELECTRON}-linux-x64.zip
7z x electron-${ELECTRON}-linux-x64.zip -oEMG '-x!LICENSE' -y

# Download mupen64plus source code
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

	echo "*** Downloading ${component} ${component_type} ***"
	git clone --depth 1 https://github.com/GhostlyDark/${component}.git source/${component} $@
done

# Build mupen64plus components
for component in ${M64P_COMPONENTS}; do
	if [ "${component}" = "mupen64plus-core" ]; then
		component_type="library"
	elif  [ "${component}" = "mupen64plus-rom" ]; then
		echo "*** Building test ROM ***"
		cp source/mupen64plus-rom/m64p_test_rom.v64 ${EMG}
		continue
	elif  [ "${component}" = "mupen64plus-ui-console" ]; then
		component_type="front-end"
	else
		component_type="plugin"
	fi

	echo "*** Building ${component} ${component_type} ***"
	make -j4 -C source/${component}/projects/unix clean $@
	make -j4 -C source/${component}/projects/unix all $@ ${MAKE_INSTALL}
	make -j4 -C source/${component}/projects/unix install $@ ${MAKE_INSTALL} DESTDIR="$(pwd)/${EMG}"

done

# Build sdl2-jstest
cd source/sdl-jstest
mkdir -p build
cd build
cmake ..
make -j4
cd ../../../

# Build mupen64plus-input-gca
cd source/mupen64plus-input-gca
cargo build --release --features "m64p_compat"
cd ../../

# Build mupen64plus-input-raphnetraw
make -j4 -C source/mupen64plus-input-raphnetraw/projects/unix all

#Build mupen64plus-video-GLideN64
cd source/GLideN64/src
mkdir -p build
cd build
cmake .. -DMUPENPLUSAPI=On
make -j4
cd ../../../../

# Build mupen64plus-video-angrylion-plus
cd source/angrylion-rdp-plus
mkdir -p build
cd build
cmake ..
make -j4
cd ../../../

# Build mupen64plus-video-parallel
cd source/parallel-rdp-standalone
mkdir -p build
cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j4
cd ../../../

# Build mupen64plus-rsp-parallel
cd source/parallel-rsp
mkdir -p build
cd build
cmake ..
make -j4
cd ../../../

# Prepare files
cp source/sdl-jstest/build/sdl2-jstest ${EMG}
cp source/SDL_GameControllerDB/gamecontrollerdb.txt ${EMG}
cp source/mupen64plus-input-gca/target/release/libmupen64plus_input_gca.so ${EMG}/mupen64plus-input-gca.so
cp source/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw.so ${EMG}
cp source/GLideN64/src/build/plugin/Release/mupen64plus-video-GLideN64.so ${EMG}
cp source/GLideN64/ini/GLideN64.custom.ini ${EMG}
cp source/angrylion-rdp-plus/build/mupen64plus-video-angrylion-plus.so ${EMG}
cp source/parallel-rdp-standalone/build/mupen64plus-video-parallel.so ${EMG}
cp source/parallel-rsp/build/mupen64plus-rsp-parallel.so ${EMG}

cd EMG
mv electron emg
./emg
