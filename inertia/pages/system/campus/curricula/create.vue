<script setup lang="ts">
import { onMounted } from 'vue'
import { store } from '@/lib/utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppPagination from '@/components/AppPagination.vue'

defineProps<{
  results: any
  title: string
}>()

onMounted(() => {
  store.searchParam = ''
  store.searchPlaceholder = 'Search Campuses...'
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
            <BreadcrumbLink as-child>
              <Link
                href="/system"
                class="flex items-center gap-2 text-xs transition-all duration-300 text-primary hover:underline"
              >
                <Icon icon="heroicons:cog-6-tooth-solid" class="size-4" />
                <span>System Settings</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbLink as-child>
              <Link
                href="/system/campus"
                class="flex items-center gap-2 text-xs transition-all duration-300 text-primary hover:underline"
              >
                <Icon icon="heroicons:cog-6-tooth-solid" class="size-4" />
                <span>Campus Management</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:building-office-2" class="size-4" />
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Link
              href="/system/campus/create"
              class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded cursor-pointer h-9 bg-primary text-primary-foreground md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
            >
              <Icon icon="heroicons:plus" class="size-4" />
              <span class="text-nowrap">New Campus</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Click to add a school campus</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <Card class="p-0 rounded bg-card/80">
      <table class="min-w-full text-xs rounded table-fixed">
        <thead>
          <tr class="border-b text-[10px] divide-x divide-card bg-muted text-muted-foreground">
            <th class="p-1 text-left text-nowrap"></th>
            <th class="p-2 text-left text-nowrap">Name</th>
            <th class="p-2 text-left w-full">Address</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(item, i) in results?.data"
            :key="item?.id"
            class="transition-all duration-300 divide-x divide-card hover:bg-primary/10"
            :class="{ 'bg-secondary/80': i % 2 === 0 }"
          >
            <td class="p-1"></td>
            <td class="pl-3 p-2 text-nowrap">
              <Link
                :href="`/system/campus/${item?.id}`"
                class="underline transition-all duration-300 text-primary hover:no-underline"
              >
                {{ item?.name }}
              </Link>
            </td>
            <td class="p-2">
              {{ item?.address }}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <AppPagination :meta="results?.meta" current-path="/system/campus" />
  </div>
</template>
