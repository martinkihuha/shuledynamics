<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { useSidebar } from '@/components/ui/sidebar' // Import useSidebar
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

import AppLogo from './AppLogo.vue'
import NavUser from './NavUser.vue'

const props = defineProps<{
  currentPath: string
  // currentUser: any
  // modules: any
}>()

const { open, toggleSidebar } = useSidebar() // Use the composable

const modules = ref<any[]>([])
const openStates = reactive<Record<string, boolean>>({})
// const isSidebarOpen = ref(true) // Remove local state

// Helper function to check if any sub-item is active
const isSubModuleActive = (item: any, currentPath: string) => {
  return item?.subModules?.some((link: any) => currentPath.includes(link?.url))
}

// Function to update open states based on current path
const updateOpenStates = (path: string) => {
  if (!modules.value) return
  modules.value.forEach((item) => {
    const key = item?.id || item?.url
    openStates[key] = path.includes(item?.url) || isSubModuleActive(item, path)
  })
}

onMounted(async () => {
  try {
    const response = await fetch('/api/modules')
    if (!response.ok) throw new Error('failed to load modules')

    modules.value = await response.json()
    updateOpenStates(props.currentPath)
  } catch (error) {
    console.error(error)
  }
})

watch(
  () => props.currentPath,
  (newPath) => {
    updateOpenStates(newPath)
  }
)

// Function to handle click on sub-menu items
const handleSubItemClick = () => {
  // Check for mobile screen size and if sidebar is open
  if (window.innerWidth < 768 && open.value) {
    toggleSidebar() // Use toggleSidebar from the composable
  }
  // Navigation will proceed via the Link component
}
</script>

<template>
  <!-- Remove v-model:open -->
  <Sidebar collapsible="icon" variant="sidebar">
    <SidebarHeader
      class="h-12 bg-card border-b p-0 group-has-data-[collapsible=icon]/sidebar-wrapper:py-2"
    >
      <AppLogo />
    </SidebarHeader>

    <SidebarContent class="bg-card">
      <SidebarGroup>
        <SidebarGroupLabel class="text-muted-foreground">Main Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu v-if="modules">
            <SidebarMenuItem v-for="item in modules" :key="item?.id">
              <SidebarMenuButton
                :tooltip="item?.title"
                :class="{
                  'bg-secondary-foreground/5 text-primary': currentPath.includes(item?.url),
                }"
                class="text-xs transition-all duration-300 rounded-xs hover:bg-secondary-foreground/10"
                asChild
              >
                <Link :href="item?.url" class="text-xs" @click="handleSubItemClick">
                  <Icon
                    :icon="currentPath.includes(item?.url) ? item?.iconSolid : item?.icon"
                    class="transition-all duration-300"
                    :class="
                      currentPath.includes(item?.url) ? 'text-primary' : 'text-muted-foreground/80'
                    "
                  />
                  <span>{{ item?.title }}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter
      class="h-12 bg-card border-t p-0 group-has-data-[collapsible=icon]/sidebar-wrapper:py-2"
    >
      <NavUser />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
