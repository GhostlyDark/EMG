sudo apt install -y build-essential libz-dev libpng-dev libfreetype-dev libsamplerate-dev libspeexdsp-dev liblircclient-dev libboost-dev libboost-filesystem-dev libhidapi-hidraw0 libhidapi-dev libsdl2-dev cmake gcc git make nasm p7zip-full p7zip-rar unzip wget

git clone https://github.com/GhostlyDark/EMG.git EMG
git clone https://github.com/GhostlyDark/sdl-jstest.git sdl-jstest
git clone https://github.com/raphnet/mupen64plus-input-raphnetraw.git mupen64plus-input-raphnetraw
git clone https://github.com/mupen64plus/mupen64plus-core.git mupen64plus-core

cd EMG/assets/scripts
chmod u+x ./m64p_build.sh
./m64p_build.sh NEW_DYNAREC=1 COREDIR=./
cd ../../../

cd sdl-jstest
mkdir build
cd build
cmake ..
make
cd ../../

cd mupen64plus-input-raphnetraw/projects/unix
make all
cd ../../../

wget https://github.com/electron/electron/releases/download/v21.0.1/electron-v21.0.1-linux-x64.zip
unzip electron-v21.0.1-linux-x64.zip -d EMG -x LICENSE

cp -r EMG/assets/scripts/m64p-build/* EMG/resources/app/m64p/
cp -r sdl-jstest/build/sdl2-jstest EMG/resources/app/m64p/
cp -r mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw.so EMG/resources/app/m64p/

cd EMG
mv electron emg
./emg
