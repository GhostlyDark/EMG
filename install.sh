# Install dependencies
sudo apt install -y build-essential libz-dev libpng-dev libfreetype-dev libsamplerate-dev libspeexdsp-dev liblircclient-dev libboost-dev libboost-filesystem-dev libhidapi-hidraw0 libhidapi-dev libsdl2-dev cmake gcc git make nasm p7zip-full p7zip-rar unzip wget freeglut3-dev
#cargo

# mupen64plus building
echo "************************************ Creating directories"
mkdir -p source

# mupen64plus components
if [ -z "$M64P_COMPONENTS" ]; then
	M64P_COMPONENTS="mupen64plus-core mupen64plus-rom mupen64plus-ui-console mupen64plus-audio-sdl mupen64plus-input-sdl mupen64plus-rsp-hle rsp mupen64plus-video-rice mupen64plus-video-glide64mk2"
fi

# mupen64plus downloading
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
	git clone https://github.com/GhostlyDark/${component}.git source/${component} $@
done

if [ -z "$MAKE" ]; then
	MAKE=make
fi

mkdir -p ./m64p-build/

# mupen64plus build flags
MAKE_INSTALL="PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR=icons INCDIR=api LDCONFIG=true COREDIR=./ NEW_DYNAREC=1 SSE=SSE2"

# mupen64plus compiling
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
	"$MAKE" -j4 -C source/${component}/projects/unix clean $@
	"$MAKE" -j4 -C source/${component}/projects/unix all $@ ${MAKE_INSTALL}
	"$MAKE" -j4 -C source/${component}/projects/unix install $@ ${MAKE_INSTALL} DESTDIR="$(pwd)/m64p-build/"

done

# Download additional components
git clone https://github.com/GhostlyDark/EMG.git EMG
git clone https://github.com/GhostlyDark/sdl-jstest.git source/sdl-jstest
git clone https://github.com/GhostlyDark/SDL_GameControllerDB source/SDL_GameControllerDB
#git clone https://github.com/GhostlyDark/mupen64plus-input-gca.git source/mupen64plus-input-gca
git clone https://github.com/GhostlyDark/mupen64plus-input-raphnetraw.git source/mupen64plus-input-raphnetraw
git clone https://github.com/GhostlyDark/GLideN64.git source/GLideN64
git clone https://github.com/GhostlyDark/angrylion-rdp-plus.git source/angrylion-rdp-plus
#git clone https://github.com/GhostlyDark/parallel-rdp-standalone.git source/parallel-rdp-standalone
git clone https://github.com/GhostlyDark/parallel-rsp.git source/parallel-rsp

# Build sdl2-jstest
cd source/sdl-jstest
mkdir -p build
cd build
cmake ..
make -j4
cd ../../../

# Build mupen64plus-input-gca
#cd source/mupen64plus-input-gca
#cargo build --release --features "m64p_compat"
#cd ../../

# Build mupen64plus-input-raphnetraw
make -j4 -C source/mupen64plus-input-raphnetraw/projects/unix all

#Build mupen64plus-video-GLideN64
cd source/GLideN64/src
mkdir -p build
cd build
cmake -DMUPENPLUSAPI=On ..
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
#cd source/parallel-rdp-standalone
#mkdir -p build
#cd build
#cmake ..
#make -j4
#cd ../../../

# Build mupen64plus-rsp-parallel
cd source/parallel-rsp
mkdir -p build
cd build
cmake ..
make -j4
cd ../../../

# Download Electron
wget https://github.com/electron/electron/releases/download/v21.0.1/electron-v21.0.1-linux-x64.zip
unzip electron-v21.0.1-linux-x64.zip -d EMG -x LICENSE

# Prepare files
cp -r m64p-build/* EMG/resources/app/m64p/
cp -r source/sdl-jstest/build/sdl2-jstest EMG/resources/app/m64p/
cp -r source/SDL_GameControllerDB/gamecontrollerdb.txt EMG/resources/app/m64p/
#cp -r source/mupen64plus-input-gca/target/release/mupen64plus_input_gca.so EMG/resources/app/m64p/
cp -r source/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw.so EMG/resources/app/m64p/
cp -r source/GLideN64/src/build/plugin/Release/mupen64plus-video-GLideN64.so EMG/resources/app/m64p/
cp -r source/GLideN64/ini/GLideN64.custom.ini EMG/resources/app/m64p/
cp -r source/angrylion-rdp-plus/build/mupen64plus-video-angrylion-plus.so EMG/resources/app/m64p/
#cp -r source/parallel-rdp-standalone/build/mupen64plus-video-parallel.so EMG/resources/app/m64p/
cp -r source/parallel-rsp/build/mupen64plus-rsp-parallel.so EMG/resources/app/m64p/

cd EMG
mv electron emg
./emg
