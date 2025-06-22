<script setup lang="ts">
import { onMounted } from 'vue'
import { store } from '@/lib/utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSearch from '@/components/AppSearch.vue'

defineProps<{
  results: any
  title: string
}>()

onMounted(() => {
  store.searchParam = ''
  store.searchPlaceholder = 'Search Applicants...'
})
</script>

<template>
  <AppHead :title="title" description="A listing of Shule Dynamics's applicants" />

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
              <Icon icon="heroicons:user-circle" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="w-full p-2 space-y-4 sm:px-4">
    <div class="flex items-center justify-between w-full gap-2">
      <AppSearch />

      <Link
        href="/applicants/create"
        class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded cursor-pointer h-9 bg-primary text-primary-foreground dark:text-secondary md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
      >
        <Icon icon="heroicons:plus" class="size-4" />
        <span class="text-nowrap">New Applicant</span>
      </Link>
    </div>
  </div>
</template>
