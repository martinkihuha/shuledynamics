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
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppPagination from '@/components/AppPagination.vue'

defineProps<{
  school: any
  results: any
  title: string
}>()

onMounted(() => {
  store.searchParam = ''
  store.searchPlaceholder = 'Search Campuses...'
})
</script>

<template>
  <AppHead :title="title" description="The app's campus management page" />

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
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:building-office-2" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="w-full p-2 space-y-2 sm:p-4">
    <div class="flex items-center justify-between w-full gap-2">
      <h1>{{ school?.fullname }} Campuses</h1>

      <!-- <TooltipProvider>
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
      </TooltipProvider> -->
    </div>

    <Card class="p-0 rounded bg-card/80">
      <table class="min-w-full text-xs rounded table-fixed">
        <thead>
          <tr class="text-[10px] divide-x divide-card">
            <th
              class="p-1 text-left md:w-12 bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20 text-nowrap"
            ></th>
            <th
              class="p-2 text-left md:w-32 bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20 text-nowrap"
            >
              Campus
            </th>
            <th
              class="p-2 text-left md:w-36 bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20 text-nowrap"
            >
              Phone
            </th>
            <th
              class="p-2 text-left md:w-48 bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20 text-nowrap"
            >
              Email
            </th>
            <th
              class="p-2 text-left bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Address
            </th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(item, i) in results?.data"
            :key="item?.id"
            class="transition-all duration-300 divide-x divide-card hover:bg-primary/10"
            :class="{ 'bg-muted/80': i % 2 !== 0 }"
          >
            <td class="p-1 text-nowrap">
              <img
                v-if="item?.logoUrl"
                :src="item?.logoUrl"
                :alt="`${item?.name}'s logo'`"
                class="object-contain h-10"
              />
            </td>
            <td class="px-2 py-1 text-nowrap">
              <Link
                :href="`/system/campus/${item?.id}`"
                class="underline transition-all duration-300 text-primary hover:no-underline"
              >
                <div class="text-sm">{{ school?.fullname }}</div>
                <div>{{ item?.name }}</div>
              </Link>
            </td>
            <td class="px-2 py-1 text-nowrap">{{ item?.phone1 }}</td>
            <td class="px-2 py-1 text-nowrap">{{ item?.email }}</td>
            <td class="px-2 py-1">
              <div>{{ item?.physicalAddress }}</div>
              <div v-if="item?.postalAddress && item?.postalCode">
                P.O. Box {{ item?.postalAddress }} - {{ item?.postalCode }}
              </div>
              <div>{{ item?.county?.name }}, {{ item?.country?.name }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <AppPagination :meta="results?.meta" current-path="/system/campus" />
  </div>
</template>
