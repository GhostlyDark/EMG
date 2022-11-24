# 3rdParty CMakeLists.txt

include(ExternalProject)

set(THIRDPARTY_DIR ${CMAKE_BINARY_DIR}/Source)
set(M64P_CORE_DIR ${THIRDPARTY_DIR}/mupen64plus-core)
set(CORE_FILE "mupen64plus.dll")
set(EMG_TAG "origin/emg")

set(MUPEN64PLUSCORE_URL "https://github.com/GhostlyDark/mupen64plus-core")
set(MUPEN64PLUS_UI_URL "https://github.com/GhostlyDark/mupen64plus-ui-console")
set(MUPEN64PLUS_AUDIO_SDL_URL "https://github.com/GhostlyDark/mupen64plus-audio-sdl")

set(MUPEN64PLUS_RSP_CXD4_URL "https://github.com/GhostlyDark/rsp")
set(MUPEN64PLUS_RSP_HLE_URL "https://github.com/GhostlyDark/mupen64plus-rsp-hle")
set(MUPEN64PLUS_RSP_PARALLEL_URL "https://github.com/GhostlyDark/parallel-rsp")

set(MUPEN64PLUS_INPUT_GCA_URL "https://github.com/GhostlyDark/mupen64plus-input-gca")
set(MUPEN64PLUS_INPUT_RAPHNET_URL "https://github.com/GhostlyDark/mupen64plus-input-raphnetraw")
set(MUPEN64PLUS_INPUT_SDL_URL "https://github.com/GhostlyDark/mupen64plus-input-sdl")

set(MUPEN64PLUS_GFX_ANGRYLION_URL "https://github.com/GhostlyDark/angrylion-rdp-plus")
set(MUPEN64PLUS_GFX_GLIDEN64_URL "https://github.com/GhostlyDark/GLideN64")
set(MUPEN64PLUS_GFX_PARALLEL_URL "https://github.com/GhostlyDark/parallel-rdp-standalone")

set(SDL_JSTEST_URL "https://github.com/GhostlyDark/sdl-jstest")

ExternalProject_Add(mupen64plus-core
    SOURCE_DIR mupen64plus-core/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUSCORE_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all PLUGINDIR= SHAREDIR= BINDIR= MANDIR= LIBDIR= APPSDIR= ICONSDIR= INCDIR= LDCONFIG= COREDIR=./ NEW_DYNAREC=1 OSD=0 TARGET=${CORE_FILE}
    BUILD_IN_SOURCE False

    BINARY_DIR ${M64P_CORE_DIR}/projects/unix
    
    BUILD_BYPRODUCTS ${M64P_CORE_DIR}/projects/unix/${CORE_FILE}
)

set(APIDIR "${CMAKE_BINARY_DIR}/Source/mupen64plus-core/src/api")

ExternalProject_Add(mupen64plus-ui-console
    SOURCE_DIR mupen64plus-ui-console/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_UI_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-ui-console/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-ui-console/projects/unix/mupen64plus.exe
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-cxd4
    SOURCE_DIR mupen64plus-rsp-cxd4/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_RSP_CXD4_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR} POSTFIX=
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-rsp-cxd4/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-rsp-cxd4/projects/unix/mupen64plus-rsp-cxd4.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-hle
    SOURCE_DIR mupen64plus-rsp-hle/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_RSP_HLE_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-rsp-hle/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-rsp-hle/projects/unix/mupen64plus-rsp-hle.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-parallel
    SOURCE_DIR mupen64plus-rsp-parallel

    GIT_REPOSITORY ${MUPEN64PLUS_RSP_PARALLEL_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-rsp-parallel/mupen64plus-rsp-parallel.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-sdl
    SOURCE_DIR mupen64plus-input-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_INPUT_SDL_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-input-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-input-sdl/projects/unix/mupen64plus-input-sdl.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-raphnetraw
    SOURCE_DIR mupen64plus-input-raphnetraw/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_INPUT_RAPHNET_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-input-raphnetraw/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-gca
    SOURCE_DIR mupen64plus-input-gca/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_INPUT_GCA_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND cargo build --release --features "m64p_compat"
    BUILD_IN_SOURCE True

    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-input-gca/target/release/mupen64plus_input_gca.dll
    DEPENDS mupen64plus-core
)

set(GLIDEN64_DIR "${THIRDPARTY_DIR}/mupen64plus-video-GLideN64")
set(GLIDEN64_BUILD_DIR "${GLIDEN64_DIR}/projects/cmake")
set(GLIDEN64_LIB "${GLIDEN64_BUILD_DIR}/mupen64plus-video-GLideN64.dll")

ExternalProject_Add(mupen64plus-video-angrylion-plus
    SOURCE_DIR mupen64plus-video-angrylion-plus

    GIT_REPOSITORY ${MUPEN64PLUS_GFX_ANGRYLION_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DBUILD_MUPEN64PLUS=ON -DBUILD_PROJECT64=OFF -DCMAKE_BUILD_TYPE=Release

    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-video-angrylion-plus/mupen64plus-video-angrylion-plus.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-video-GLideN64
    SOURCE_DIR mupen64plus-video-GLideN64

    GIT_REPOSITORY ${MUPEN64PLUS_GFX_GLIDEN64_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DMUPENPLUSAPI=ON -DUSE_SYSTEM_LIBS=ON -DCMAKE_BUILD_TYPE=Release

    SOURCE_SUBDIR ./src/
    BINARY_DIR ${GLIDEN64_BUILD_DIR}

    BUILD_BYPRODUCTS ${GLIDEN64_LIB}
    BUILD_BYPRODUCTS ${GLIDEN64_DIR}/ini/GLideN64.custom.ini
)

ExternalProject_Add(mupen64plus-video-parallel
    SOURCE_DIR mupen64plus-video-parallel

    GIT_REPOSITORY ${MUPEN64PLUS_GFX_PARALLEL_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-video-parallel/mupen64plus-video-parallel.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-audio-sdl
    SOURCE_DIR mupen64plus-audio-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    GIT_REPOSITORY ${MUPEN64PLUS_AUDIO_SDL_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_COMMAND make all APIDIR=${APIDIR} NO_OSS=1 NO_SPEEX=1 NO_SRC=1
    BUILD_IN_SOURCE False

    BINARY_DIR ${THIRDPARTY_DIR}/mupen64plus-audio-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/mupen64plus-audio-sdl/projects/unix/mupen64plus-audio-sdl.dll
    DEPENDS mupen64plus-core
)

ExternalProject_Add(sdl-jstest
    SOURCE_DIR sdl-jstest/

    INSTALL_COMMAND ""

    GIT_REPOSITORY ${SDL_JSTEST_URL}
    GIT_TAG ${EMG_TAG}
    GIT_SHALLOW 1

    BUILD_IN_SOURCE True
    CMAKE_ARGS
    
    BUILD_BYPRODUCTS ${THIRDPARTY_DIR}/sdl-jstest/sdl2-jstest.exe
)

ExternalProject_Get_property(mupen64plus-core BUILD_BYPRODUCTS)
set(MUPEN64PLUSCORE_LIB ${BUILD_BYPRODUCTS} PARENT_SCOPE)
set(MUPEN64PLUSCORE_INI ${M64P_CORE_DIR}/data/mupen64plus.ini PARENT_SCOPE)
set(MUPEN64PLUSCORE_CHT ${M64P_CORE_DIR}/data/mupencheat.txt PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-ui-console BUILD_BYPRODUCTS)
set(MUPEN64PLUS_UI ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-rsp-cxd4 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_CXD4 ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-rsp-hle BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_HLE ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-rsp-parallel BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_PARALLEL ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-input-sdl BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_SDL ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-input-raphnetraw BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_RAPHNET ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-input-gca BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_GCA ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-video-angrylion-plus BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_ANGRYLION ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-video-GLideN64 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_GLIDEN64 ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-video-parallel BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_PARALLEL ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(mupen64plus-audio-sdl BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_AUDIO_SDL ${BUILD_BYPRODUCTS} PARENT_SCOPE)

ExternalProject_Get_property(sdl-jstest BUILD_BYPRODUCTS)
set(SDL_JSTEST ${BUILD_BYPRODUCTS} PARENT_SCOPE)