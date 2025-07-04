#include <assert.h>
#include <cstdlib>
#include "Config.h"
#include "RSP.h"
#include "VI.h"
#include "Graphics/Context.h"
#include "DisplayWindow.h"
#include "PluginAPI.h"
#include "FrameBuffer.h"

bool DisplayWindow::start()
{
	if (!_start())
		return false;

	graphics::ObjectHandle::defaultFramebuffer = _getDefaultFramebuffer();

	gfxContext.init();
	m_drawer._initData();
	m_buffersSwapCount = 0;

	// only query max MSAA when needed
	if (m_maxMsaa == 0) {
		m_maxMsaa = gfxContext.getMaxMSAALevel();
	}

	if (m_maxAnisotropy == 0) {
		m_maxAnisotropy = static_cast<u32>(gfxContext.getMaxAnisotropy());
	}

	return true;
}

void DisplayWindow::stop()
{
	m_drawer._destroyData();
	gfxContext.destroy();
	_stop();
}

void DisplayWindow::restart()
{
	_restart();
	m_bResizeWindow = true;
}

void DisplayWindow::swapBuffers()
{
	m_drawer.drawOSD();
	m_drawer.clearStatistics();
	_swapBuffers();
	if (!RSP.LLE) {
		if ((config.generalEmulation.hacks & hack_doNotResetOtherModeL) == 0)
			gDP.otherMode.l = 0;
		if ((config.generalEmulation.hacks & hack_doNotResetOtherModeH) == 0)
			gDP.otherMode.h = 0x0CFF;
	}
	++m_buffersSwapCount;
}

void DisplayWindow::setCaptureScreen(const char * const _strDirectory)
{
	::mbstowcs(m_strScreenDirectory, _strDirectory, PLUGIN_PATH_SIZE - 1);
	m_bCaptureScreen = true;
}

void DisplayWindow::saveScreenshot()
{
	if (!m_bCaptureScreen)
		return;
	_saveScreenshot();
	m_bCaptureScreen = false;
}

void DisplayWindow::saveBufferContent(FrameBuffer * _pBuffer)
{
	saveBufferContent(_pBuffer->m_FBO, _pBuffer->m_pTexture);
}

void DisplayWindow::saveBufferContent(graphics::ObjectHandle _fbo, CachedTexture *_pTexture)
{
	if (wcslen(m_strScreenDirectory) == 0) {
		api().FindPluginPath(m_strScreenDirectory);
		std::wstring pluginPath(m_strScreenDirectory);
		if (pluginPath.back() != L'/')
			pluginPath += L'/';
		::wcsncpy(m_strScreenDirectory, pluginPath.c_str(), std::min(size_t(PLUGIN_PATH_SIZE), pluginPath.length() + 1));
	}
	_saveBufferContent(_fbo, _pTexture);
}

bool DisplayWindow::changeWindow()
{
	if (!m_bToggleFullscreen)
		return false;
	m_drawer._destroyData();
	_changeWindow();
	updateScale();
	m_drawer._initData();
	m_bToggleFullscreen = false;
	return true;
}

void DisplayWindow::closeWindow()
{
	if (!m_bToggleFullscreen || !m_bFullscreen)
		return;
	m_drawer._destroyData();
	_changeWindow();
	m_bToggleFullscreen = false;
}


void DisplayWindow::setWindowSize(u32 _width, u32 _height)
{
	if (m_width != _width || m_height != _height) {
		m_resizeWidth = _width;
		m_resizeHeight = _height;
		m_bResizeWindow = true;
	}
}

bool DisplayWindow::resizeWindow()
{
	if (!m_bResizeWindow)
		return false;
	m_drawer._destroyData();
	if (!_resizeWindow())
		if(!_start())
			return false;
	updateScale();
	m_drawer._initData();
	m_bResizeWindow = false;
	return true;
}

void DisplayWindow::updateScale()
{
	if (VI.width == 0 || VI.height == 0)
		return;
	m_scaleX = static_cast<f32>(m_width) / static_cast<f32>(VI.width);
	m_scaleY = static_cast<f32>(m_height) / static_cast<f32>(VI.height);
}

void DisplayWindow::_setBufferSize()
{
	float vi_width = static_cast<f32>(VI.width);
	float vi_height = static_cast<f32>(VI.height);
	float aspect_ratio_w = vi_width / vi_height;
	float aspect_ratio_h = vi_height / vi_width;
	m_bAdjustScreen = false;
	switch (config.frameBufferEmulation.aspect) {
	case Config::aStretch: // stretch
		m_width = m_screenWidth;
		m_height = m_screenHeight;
		break;
	case Config::aAutomatic: // automatic aspect ratio
		if (m_screenWidth * aspect_ratio_h > m_screenHeight) {
			m_height = m_screenHeight;
			m_width = m_screenHeight * aspect_ratio_w;
		} else if (m_screenHeight * aspect_ratio_w > m_screenWidth) {
			m_width = m_screenWidth;
			m_height = m_screenWidth * aspect_ratio_h;
		} else {
			m_width = m_screenWidth;
			m_height = m_screenHeight;
		}
		break;
	case Config::a43: // force 4/3
		if (m_screenWidth * 3 / 4 > m_screenHeight) {
			m_height = m_screenHeight;
			m_width = m_screenHeight * 4 / 3;
		} else if (m_screenHeight * 4 / 3 > m_screenWidth) {
			m_width = m_screenWidth;
			m_height = m_screenWidth * 3 / 4;
		} else {
			m_width = m_screenWidth;
			m_height = m_screenHeight;
		}
		break;
	case Config::a169: // force 16/9
		if (m_screenWidth * 9 / 16 > m_screenHeight) {
			m_height = m_screenHeight;
			m_width = m_screenHeight * 16 / 9;
		} else if (m_screenHeight * 16 / 9 > m_screenWidth) {
			m_width = m_screenWidth;
			m_height = m_screenWidth * 9 / 16;
		} else {
			m_width = m_screenWidth;
			m_height = m_screenHeight;
		}
		break;
	case Config::aAdjust43: // adjust
		m_width = m_screenWidth;
		m_height = m_screenHeight;
		if (m_screenWidth * 3 / 4 > m_screenHeight) {
			f32 width43 = m_screenHeight * 4.0f / 3.0f;
			m_adjustScale = width43 / m_screenWidth;
			m_bAdjustScreen = true;
		}
		break;
	case Config::aAdjust169: // adjust
		m_width = m_screenWidth;
		m_height = m_screenHeight;
		if (m_screenWidth * 9 / 16 > m_screenHeight) {
			f32 width169 = m_screenHeight * 16.0f / 9.0f;
			m_adjustScale = width169 / m_screenWidth;
			m_bAdjustScreen = true;
		}
		break;
	default:
		assert(false && "Unknown aspect ratio");
		m_width = m_screenWidth;
		m_height = m_screenHeight;
	}
}

void DisplayWindow::readScreen(void **_pDest, long *_pWidth, long *_pHeight)
{
	_readScreen(_pDest, _pWidth, _pHeight);
}

void DisplayWindow::readScreen2(void * _dest, int * _width, int * _height, int _front)
{
	_readScreen2(_dest, _width, _height, _front);
}

u32 DisplayWindow::maxMSAALevel() const
{
	return m_maxMsaa;
}

u32 DisplayWindow::maxAnisotropy() const
{
	return m_maxAnisotropy;
}
