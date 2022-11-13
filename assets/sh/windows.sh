if [ ! -d "EMG" ] ; then
    git clone --depth 1 https://github.com/GhostlyDark/EMG EMG
fi

mkdir -p Source

cp -r EMG/assets/sh/Windows/* ./

source win32.sh
