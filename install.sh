# Terminate the script if any commands return a non-zero error code
set -e

# Install dependencies
sudo apt install -y build-essential libz-dev libpng-dev libfreetype-dev libsamplerate-dev libspeexdsp-dev liblircclient-dev libboost-dev libboost-filesystem-dev libhidapi-hidraw0 libhidapi-dev libsdl2-dev cmake gcc git make nasm p7zip-full p7zip-rar unzip wget

# mupen64plus building
echo "************************************ Creating directories"
mkdir source

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
MAKE_INSTALL="PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR=icons INCDIR=api LDCONFIG=true NEW_DYNAREC=1 COREDIR=./"

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
	"$MAKE" -C source/${component}/projects/unix clean $@
	"$MAKE" -C source/${component}/projects/unix all $@ ${MAKE_INSTALL}
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

# Downloading additional components
git clone https://github.com/GhostlyDark/EMG.git EMG
git clone https://github.com/GhostlyDark/sdl-jstest.git source/sdl-jstest
git clone https://github.com/GhostlyDark/mupen64plus-input-raphnetraw.git source/mupen64plus-input-raphnetraw

# Build sdl2-jstest
cd source/sdl-jstest
mkdir build
cd build
cmake ..
make
cd ../../../

# Build Raphnetraw Input Plugin
make -C source/mupen64plus-input-raphnetraw/projects/unix all

# Download Electron
wget https://github.com/electron/electron/releases/download/v21.0.1/electron-v21.0.1-linux-x64.zip
unzip electron-v21.0.1-linux-x64.zip -d EMG -x LICENSE

cp -r m64p-build/* EMG/resources/app/m64p/
cp -r source/sdl-jstest/build/sdl2-jstest EMG/resources/app/m64p/
cp -r source/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw.so EMG/resources/app/m64p/

cd EMG
mv electron emg
./emg
