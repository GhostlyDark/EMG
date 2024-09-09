#ifndef WSI_PLATFORM_HPP
#define WSI_PLATFORM_HPP

#include "wsi.hpp"

class MupenWSIPlatform : public Vulkan::WSIPlatform
{
public:
    VkSurfaceKHR create_surface(VkInstance instance, VkPhysicalDevice gpu) override;
    void destroy_surface(VkInstance instance, VkSurfaceKHR surface) override;
    std::vector<const char *> get_instance_extensions() override;
    uint32_t get_surface_width() override;
    uint32_t get_surface_height() override;
    bool alive(Vulkan::WSI &wsi) override;
    void poll_input() override;
    void poll_input_async(Granite::InputTrackerHandler *handler) override;
    void do_resize();
};

#endif // WSI_PLATFORM_HPP