<script setup lang="ts">
import { ref, onMounted } from 'vue'

import SystemTab from '#models/system_tab'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'

defineProps<{
  title: string
}>()

const systemTabs = ref<SystemTab[]>([])

const fetchSystemTabs = async () => {
  try {
    const response = await fetch('/api/system-tabs?search=system', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    systemTabs.value = await response.json()
  } catch (error) {
    console.error('Error fetching system tabs:', error)
  }
}

onMounted(() => {
  fetchSystemTabs()
})
</script>

<template>
  <AppHead :title="title" description="The app's system management page" />

  <AppHeader>
    <div class="flex items-center justify-between w-full truncate">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem class="hidden md:block">
            <BreadcrumbLink as-child>
              <Link
                href="/"
                class="flex items-center gap-2 text-xs transition-all duration-300 text-primary hover:underline"
              >
                <Icon icon="heroicons:home-solid" class="size-4" />
                <span>Dashboard</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:cog-6-tooth" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="grid md:grid-cols-2 gap-4 p-4">
    <Card v-for="item in systemTabs" :key="item?.id" class="rounded-sm">
      <CardHeader>
        <CardTitle class="flex items-center gap-2 text-primary">
          <Icon :icon="item?.iconSolid" class="size-8" />
          {{ item?.title }}
        </CardTitle>
      </CardHeader>

      <CardContent class="-mt-2 text-sm">
        <p>{{ item?.description }}</p>
      </CardContent>

      <CardFooter>
        <Link
          :href="item?.url"
          class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded-xs cursor-pointer h-9 bg-primary text-primary-foreground md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
        >
          {{ item?.btnText }}
        </Link>
      </CardFooter>
    </Card>
  </div>
</template>
