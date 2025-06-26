<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { store } from '@/lib/utils'

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import AppSidebar from '@/components/AppSidebar.vue'
import AlertBanner from '@/components/AlertBanner.vue'
// import NotificationSimple from '@/components/NotificationSimple.vue'

const props = defineProps<{
  currentPath: string
  notification: any
  school: any
}>()

watch(
  () => props.notification,
  (newVal) => {
    if (newVal) {
      // console.log('notification changed', newVal?.visible)
      store.notification.type = props?.notification?.type
      store.notification.title = props?.notification?.title
      store.notification.content = props?.notification?.content
      store.notification.visible = props?.notification?.visible
      store.notification.timeout = props?.notification?.timeout

      setTimeout(() => {
        store.notification.visible = false
      }, props?.notification?.timeout)
    }
  },
  { deep: true }
)

onMounted(() => {
  if (props?.school?.shortname === 'shule1') {
    store.authUser.email = 'mkenya@shule1.example'
  }

  if (props?.school?.shortname === 'shule2') {
    store.authUser.email = 'mkenya@shule2.example'
  }
})
</script>

<template>
  <Toaster />

  <AlertBanner />

  <!-- <NotificationSimple  /> -->

  <SidebarProvider class="print:hidden">
    <AppSidebar :current-path="currentPath" />

    <main class="flex flex-col w-full">
      <SidebarInset class="flex-grow w-full bg-gradient-to-b from-primary/15 to-secondary/15">
        <slot></slot>
      </SidebarInset>
    </main>
  </SidebarProvider>
</template>
