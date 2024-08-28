cmake_minimum_required(VERSION 3.15)

project(EMG)

set(INSTALL_PATH ${CMAKE_SOURCE_DIR}/build/EMG/resources/m64p)

add_custom_target(bundle_dependencies
	COMMAND bash "${CMAKE_SOURCE_DIR}/dependencies.sh" "${INSTALL_PATH}/mupen64plus.exe" "${INSTALL_PATH}" "/mingw64/bin"
)

include(ExternalProject)



if(WIN32)
    set(LIB_EXT ".dll")
    set(BIN_EXT ".exe")
    set(GCA_LIB "mupen64plus_input_gca.dll")
else()
    set(LIB_EXT ".so")
    set(BIN_EXT "")
    set(GCA_LIB "libmupen64plus_input_gca.so")
endif()



set(SOURCEDIR ${CMAKE_SOURCE_DIR}/source)

set(APIDIR ${SOURCEDIR}/mupen64plus-core/src/api)

set(GLIDEN64_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-GLideN64)

set(GLIDEN64_BUILD_DIR ${GLIDEN64_DIR}/projects/cmake)
if(WIN32)
	set(GLIDEN64_LIB ${GLIDEN64_BUILD_DIR}/mupen64plus-video-GLideN64${LIB_EXT})
else()
	set(GLIDEN64_LIB ${GLIDEN64_BUILD_DIR}/plugin/Release/mupen64plus-video-GLideN64${LIB_EXT})
endif()



ExternalProject_Add(mupen64plus-core
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-core/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-core/projects/unix/Makefile 
        SRCDIR=${SOURCEDIR}/mupen64plus-core/src
        SUBDIR=${SOURCEDIR}/mupen64plus-core/subprojects 
        ACCURATE_FPU=1 OSD=0 TARGET=mupen64plus${LIB_EXT}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-core/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-core/projects/unix/mupen64plus${LIB_EXT}
)

ExternalProject_Add(mupen64plus-ui-console
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-ui-console/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-ui-console/projects/unix/Makefile 
        SRCDIR=${SOURCEDIR}/mupen64plus-ui-console/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-ui-console/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-ui-console/projects/unix/mupen64plus${BIN_EXT}
)

ExternalProject_Add(mupen64plus-rsp-cxd4
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-rsp-cxd4/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-rsp-cxd4/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-rsp-cxd4
        APIDIR=${APIDIR} POSTFIX=

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-rsp-cxd4/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-cxd4/projects/unix/mupen64plus-rsp-cxd4${LIB_EXT}
)

ExternalProject_Add(mupen64plus-rsp-hle
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-rsp-hle/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-rsp-hle/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-rsp-hle/src
        APIDIR=${APIDIR} POSTFIX=

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-rsp-hle/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-hle/projects/unix/mupen64plus-rsp-hle${LIB_EXT}
)

ExternalProject_Add(mupen64plus-rsp-parallel
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-rsp-parallel

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-rsp-parallel

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-parallel/mupen64plus-rsp-parallel${LIB_EXT}
)

ExternalProject_Add(mupen64plus-input-sdl
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-input-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-input-sdl/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-input-sdl/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-input-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-sdl/projects/unix/mupen64plus-input-sdl${LIB_EXT}
)

ExternalProject_Add(mupen64plus-input-raphnetraw
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-input-raphnetraw/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-input-raphnetraw/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-input-raphnetraw/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-input-raphnetraw/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw${LIB_EXT}
)

ExternalProject_Add(mupen64plus-input-gca
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-input-gca/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND cargo build --manifest-path ${SOURCEDIR}/mupen64plus-input-gca/Cargo.toml --release --features "m64p_compat" --target-dir=${CMAKE_BINARY_DIR}/mupen64plus-input-gca/target

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-input-gca/target/release

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-gca/target/release/${GCA_LIB}
)

ExternalProject_Add(mupen64plus-video-angrylion-plus
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-video-angrylion-plus

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DBUILD_MUPEN64PLUS=ON -DBUILD_PROJECT64=OFF

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-angrylion-plus

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-angrylion-plus/mupen64plus-video-angrylion-plus${LIB_EXT}
)

ExternalProject_Add(mupen64plus-video-GLideN64
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-video-GLideN64

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DMUPENPLUSAPI=ON -DUSE_SYSTEM_LIBS=ON

    SOURCE_SUBDIR ./src/
    BINARY_DIR ${GLIDEN64_BUILD_DIR}

    BUILD_BYPRODUCTS ${GLIDEN64_LIB}
    BUILD_BYPRODUCTS ${SOURCEDIR}/mupen64plus-video-GLideN64/ini/GLideN64.custom.ini

)

ExternalProject_Add(mupen64plus-video-parallel
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-video-parallel

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-parallel

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-parallel/mupen64plus-video-parallel${LIB_EXT}
)

ExternalProject_Add(mupen64plus-video-rice
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-video-rice/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-video-rice/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-video-rice/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-rice/projects/unix

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-rice/projects/unix/mupen64plus-video-rice${LIB_EXT}
)

ExternalProject_Add(mupen64plus-video-glide64mk2
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-video-glide64mk2/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-video-glide64mk2/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-video-glide64mk2/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-glide64mk2/projects/unix

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-glide64mk2/projects/unix/mupen64plus-video-glide64mk2${LIB_EXT}
)

ExternalProject_Add(mupen64plus-audio-sdl
    SOURCE_DIR ${SOURCEDIR}/mupen64plus-audio-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all -f ${SOURCEDIR}/mupen64plus-audio-sdl/projects/unix/Makefile
        SRCDIR=${SOURCEDIR}/mupen64plus-audio-sdl/src
        APIDIR=${APIDIR}

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-audio-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-audio-sdl/projects/unix/mupen64plus-audio-sdl${LIB_EXT}
)

ExternalProject_Add(sdl-jstest
    SOURCE_DIR ${SOURCEDIR}/sdl-jstest/

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/sdl-jstest
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/sdl-jstest/sdl2-jstest${BIN_EXT}
)



ExternalProject_Get_property(mupen64plus-core BUILD_BYPRODUCTS)
set(MUPEN64PLUSCORE_LIB ${BUILD_BYPRODUCTS})
set(MUPEN64PLUSCORE_INI ${SOURCEDIR}/mupen64plus-core/data/mupen64plus.ini)
set(MUPEN64PLUSCORE_CHT ${SOURCEDIR}/mupen64plus-core/data/mupencheat.txt)

ExternalProject_Get_property(mupen64plus-ui-console BUILD_BYPRODUCTS)
set(MUPEN64PLUS_UI ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-rsp-cxd4 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_CXD4 ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-rsp-hle BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_HLE ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-rsp-parallel BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_RSP_PARALLEL ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-input-sdl BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_SDL ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-input-raphnetraw BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_RAPHNET ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-input-gca BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_INPUT_GCA ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-video-angrylion-plus BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_ANGRYLION ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-video-GLideN64 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_GLIDEN64 ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-video-parallel BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_PARALLEL ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(mupen64plus-video-rice BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_RICE ${BUILD_BYPRODUCTS})
set(RICE_INI ${SOURCEDIR}/mupen64plus-video-rice/data/RiceVideoLinux.ini)

ExternalProject_Get_property(mupen64plus-video-glide64mk2 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_GLIDE ${BUILD_BYPRODUCTS})
set(GLIDE_INI ${SOURCEDIR}/mupen64plus-video-glide64mk2/data/Glide64mk2.ini)

ExternalProject_Get_property(mupen64plus-audio-sdl BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_AUDIO_SDL ${BUILD_BYPRODUCTS})

ExternalProject_Get_property(sdl-jstest BUILD_BYPRODUCTS)
set(SDL_JSTEST ${BUILD_BYPRODUCTS})



install(FILES ${MUPEN64PLUS_UI}
    DESTINATION ${INSTALL_PATH}
)
install(FILES ${SDL_JSTEST}
    DESTINATION ${INSTALL_PATH}
)
install(FILES ${MUPEN64PLUSCORE_LIB}
    DESTINATION ${INSTALL_PATH}
)
install(FILES ${MUPEN64PLUSCORE_INI} ${MUPEN64PLUSCORE_CHT} ${RICE_INI} ${GLIDE_INI}
    DESTINATION ${INSTALL_PATH}/data
)
install(FILES ${MUPEN64PLUS_PLUGIN_RSP_CXD4}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_RSP_HLE}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_RSP_PARALLEL}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_INPUT_SDL}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_INPUT_RAPHNET}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_INPUT_GCA}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_GFX_ANGRYLION}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_GFX_GLIDEN64}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_GFX_PARALLEL}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_GFX_RICE}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_GFX_GLIDE}
    DESTINATION ${INSTALL_PATH}/plugin
)
install(FILES ${MUPEN64PLUS_PLUGIN_AUDIO_SDL}
    DESTINATION ${INSTALL_PATH}/plugin
)
