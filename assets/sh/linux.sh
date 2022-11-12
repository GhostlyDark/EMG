# Install dependencies
sudo apt install -y build-essential cmake curl freeglut3-dev gcc git libfreetype-dev libhidapi-dev libhidapi-hidraw0 libpng-dev libsdl2-dev make nasm p7zip-full p7zip-rar wget zlib1g-dev

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "$HOME/.cargo/env"

# Variables
ELECTRON="v21.2.2"
EMG="EMG/resources/app/m64p/"
MAKE_INSTALL="PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR=icons INCDIR=api LDCONFIG=true COREDIR=./ NEW_DYNAREC=1 OSD=0 POSTFIX= NO_OSS=1 NO_SPEEX=1 NO_SRC=1"
M64P_COMPONENTS="mupen64plus-core mupen64plus-ui-console mupen64plus-audio-sdl mupen64plus-input-sdl mupen64plus-input-raphnetraw mupen64plus-rsp-hle rsp"
SOURCE="mupen64plus-rom sdl-jstest SDL_GameControllerDB mupen64plus-input-gca GLideN64 angrylion-rdp-plus parallel-rdp-standalone parallel-rsp"

mkdir -p source

# Download source code
git clone --depth 1 https://github.com/GhostlyDark/EMG.git EMG

for component in ${M64P_COMPONENTS} ${SOURCE}; do
	git clone --depth 1 https://github.com/GhostlyDark/${component}.git source/${component} $@
done

# Download and extract Electron
[ ! -f electron-${ELECTRON}-linux-x64.zip ] && wget https://github.com/electron/electron/releases/download/${ELECTRON}/electron-${ELECTRON}-linux-x64.zip
7z x electron-${ELECTRON}-linux-x64.zip -oEMG '-x!LICENSE' -y

# Build mupen64plus components
for component in ${M64P_COMPONENTS}; do
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

#Build mupen64plus-video-GLideN64
cd source/GLideN64/src
mkdir -p build
cd build
cmake .. -DMUPENPLUSAPI=On -DUSE_SYSTEM_LIBS=ON
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
cp source/mupen64plus-rom/m64p_test_rom.v64 ${EMG}
cp source/sdl-jstest/build/sdl2-jstest ${EMG}
cp source/SDL_GameControllerDB/gamecontrollerdb.txt ${EMG}
cp source/mupen64plus-input-gca/target/release/libmupen64plus_input_gca.so ${EMG}/mupen64plus-input-gca.so
cp source/GLideN64/src/build/plugin/Release/mupen64plus-video-GLideN64.so ${EMG}
cp source/GLideN64/ini/GLideN64.custom.ini ${EMG}
cp source/angrylion-rdp-plus/build/mupen64plus-video-angrylion-plus.so ${EMG}
cp source/parallel-rdp-standalone/build/mupen64plus-video-parallel.so ${EMG}
cp source/parallel-rsp/build/mupen64plus-rsp-parallel.so ${EMG}

cd EMG
mv electron emg
./emg
