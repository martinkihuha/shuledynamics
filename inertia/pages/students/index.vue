<script setup lang="ts">
import { onMounted } from 'vue'
import { store, formatCurrency } from '@/lib/utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
  store.searchPlaceholder = 'Search Students...'
})
</script>

<template>
  <AppHead :title="title" description="A listing of Shule Dynamics's students" />

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
              <Icon icon="heroicons:users" class="size-4" />
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
              href="/students/create"
              class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded cursor-pointer h-9 bg-primary text-primary-foreground md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
            >
              <Icon icon="heroicons:plus" class="size-4" />
              <span class="text-nowrap">Admit New Student</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Click to admit a student</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <Card class="p-0 rounded bg-card/80">
      <table class="min-w-full text-xs rounded table-fixed">
        <thead>
          <tr class="text-[10px] divide-x divide-card">
            <th
              class="px-3 py-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Name
            </th>
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Age
            </th>
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Gender
            </th>
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Class
            </th>
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Stream
            </th>
            <th
              class="p-2 text-right text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Balance
            </th>
            <th
              class="w-2/12 px-3 py-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(item, i) in results?.data"
            :key="item?.id"
            class="transition-all duration-300 divide-x divide-card hover:bg-primary/10"
            :class="{ 'bg-secondary/80': i % 2 === 0 }"
          >
            <td class="px-3 py-2 text-nowrap">
              <Link
                :href="`/students/${item?.id}`"
                class="underline transition-all duration-300 text-primary hover:no-underline"
              >
                {{ item?.name }}
              </Link>
            </td>
            <td class="p-2 text-nowrap">
              {{ item?.age }}
            </td>
            <td class="p-2">{{ item?.gender?.name }}</td>
            <td class="p-2">{{ item?.class }}</td>
            <td class="p-2">{{ item?.stream }}</td>
            <td class="p-2 text-right">
              {{ formatCurrency(item?.currency?.name, item?.balance) }}
            </td>
            <td class="px-3 py-2 text-nowrap">
              {{ item?.status }}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>

    <AppPagination :meta="results?.meta" current-path="/students" />
  </div>
</template>
