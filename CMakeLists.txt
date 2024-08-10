cmake_minimum_required(VERSION 3.15)

project(EMG)

set(INSTALL_PATH "${CMAKE_SOURCE_DIR}/build/EMG/resources/m64p")

add_custom_target(bundle_dependencies
	COMMAND bash "${CMAKE_SOURCE_DIR}/dependencies.sh" "${INSTALL_PATH}/mupen64plus.exe" "${INSTALL_PATH}" "/mingw64/bin"
)

include(ExternalProject)

if(WIN32)
    set(SO_EXT ".dll")
    set(EXE_EXT ".exe")
    set(GCA_LIB "mupen64plus_input_gca.dll")
    set(CORE_FILE "mupen64plus.dll")
else()
    set(SO_EXT ".so")
    set(EXE_EXT "")
    set(GCA_LIB "libmupen64plus_input_gca.so")
    set(CORE_FILE "mupen64plus.so")
endif()

set(M64P_CORE_DIR ${CMAKE_BINARY_DIR}/mupen64plus-core)
set(APIDIR ${M64P_CORE_DIR}/src/api)

set(GLIDEN64_DIR "${CMAKE_BINARY_DIR}/mupen64plus-video-GLideN64")

set(GLIDEN64_BUILD_DIR "${GLIDEN64_DIR}/projects/cmake")
if(WIN32)
	set(GLIDEN64_LIB "${GLIDEN64_BUILD_DIR}/mupen64plus-video-GLideN64${SO_EXT}")
else()
	set(GLIDEN64_LIB "${GLIDEN64_BUILD_DIR}/plugin/Release/mupen64plus-video-GLideN64${SO_EXT}")
endif()

ExternalProject_Add(mupen64plus-core
    SOURCE_DIR mupen64plus-core/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all ACCURATE_FPU=1 OSD=0 TARGET=${CORE_FILE}
    BUILD_IN_SOURCE False

    BINARY_DIR ${M64P_CORE_DIR}/projects/unix
    
    BUILD_BYPRODUCTS ${M64P_CORE_DIR}/projects/unix/${CORE_FILE}
)

ExternalProject_Add(mupen64plus-ui-console
    SOURCE_DIR mupen64plus-ui-console/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-ui-console/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-ui-console/projects/unix/mupen64plus${EXE_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-cxd4
    SOURCE_DIR mupen64plus-rsp-cxd4/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR} POSTFIX=
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-rsp-cxd4/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-cxd4/projects/unix/mupen64plus-rsp-cxd4${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-hle
    SOURCE_DIR mupen64plus-rsp-hle/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-rsp-hle/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-hle/projects/unix/mupen64plus-rsp-hle${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-rsp-parallel
    SOURCE_DIR mupen64plus-rsp-parallel

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-rsp-parallel/mupen64plus-rsp-parallel${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-sdl
    SOURCE_DIR mupen64plus-input-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-input-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-sdl/projects/unix/mupen64plus-input-sdl${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-raphnetraw
    SOURCE_DIR mupen64plus-input-raphnetraw/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-input-raphnetraw/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-raphnetraw/projects/unix/mupen64plus-input-raphnetraw${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-input-gca
    SOURCE_DIR mupen64plus-input-gca/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND cargo build --release --features "m64p_compat"
    BUILD_IN_SOURCE True

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-input-gca/target/release/${GCA_LIB}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-video-angrylion-plus
    SOURCE_DIR mupen64plus-video-angrylion-plus

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DBUILD_MUPEN64PLUS=ON -DBUILD_PROJECT64=OFF

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-angrylion-plus/mupen64plus-video-angrylion-plus${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-video-GLideN64
    SOURCE_DIR mupen64plus-video-GLideN64

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE False
    CMAKE_ARGS -DMUPENPLUSAPI=ON -DUSE_SYSTEM_LIBS=ON

    SOURCE_SUBDIR ./src/
    BINARY_DIR ${GLIDEN64_BUILD_DIR}

    BUILD_BYPRODUCTS ${GLIDEN64_LIB}
    BUILD_BYPRODUCTS ${GLIDEN64_DIR}/ini/GLideN64.custom.ini
)

ExternalProject_Add(mupen64plus-video-parallel
    SOURCE_DIR mupen64plus-video-parallel

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS -DCMAKE_BUILD_TYPE=Release

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-parallel/mupen64plus-video-parallel${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-video-rice
    SOURCE_DIR mupen64plus-video-rice/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-rice/projects/unix

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-rice/projects/unix/mupen64plus-video-rice${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-video-glide64mk2
    SOURCE_DIR mupen64plus-video-glide64mk2/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-video-glide64mk2/projects/unix

    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-video-glide64mk2/projects/unix/mupen64plus-video-glide64mk2${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(mupen64plus-audio-sdl
    SOURCE_DIR mupen64plus-audio-sdl/

    CONFIGURE_COMMAND ""
    INSTALL_COMMAND ""

    BUILD_COMMAND make all APIDIR=${APIDIR}
    BUILD_IN_SOURCE False

    BINARY_DIR ${CMAKE_BINARY_DIR}/mupen64plus-audio-sdl/projects/unix
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/mupen64plus-audio-sdl/projects/unix/mupen64plus-audio-sdl${SO_EXT}
    DEPENDS mupen64plus-core
)

ExternalProject_Add(sdl-jstest
    SOURCE_DIR sdl-jstest/

    INSTALL_COMMAND ""

    BUILD_IN_SOURCE True
    CMAKE_ARGS
    
    BUILD_BYPRODUCTS ${CMAKE_BINARY_DIR}/sdl-jstest/sdl2-jstest${EXE_EXT}
)

ExternalProject_Get_property(mupen64plus-core BUILD_BYPRODUCTS)
set(MUPEN64PLUSCORE_LIB ${BUILD_BYPRODUCTS})
set(MUPEN64PLUSCORE_INI ${M64P_CORE_DIR}/data/mupen64plus.ini)
set(MUPEN64PLUSCORE_CHT ${M64P_CORE_DIR}/data/mupencheat.txt)

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
set(RICE_INI ${CMAKE_BINARY_DIR}/mupen64plus-video-rice/data/RiceVideoLinux.ini)

ExternalProject_Get_property(mupen64plus-video-glide64mk2 BUILD_BYPRODUCTS)
set(MUPEN64PLUS_PLUGIN_GFX_GLIDE ${BUILD_BYPRODUCTS})
set(GLIDE_INI ${CMAKE_BINARY_DIR}/mupen64plus-video-glide64mk2/data/Glide64mk2.ini)

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
