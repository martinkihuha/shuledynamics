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

  <div class="w-full p-4 space-y-6 md:space-y-4">
    <div class="flex items-center justify-between w-full gap-2">
      <AppSearch />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Link
              href="/applicants/create"
              class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded-[2px] cursor-pointer h-9 bg-primary text-primary-foreground md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
            >
              <Icon icon="heroicons:plus" class="size-4" />
              <span class="text-nowrap">New Applicant</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Click to create a new applicant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <Card class="hidden p-0 border-none rounded sm:block">
      <table class="min-w-full text-xs rounded table-fixed">
        <thead>
          <tr class="text-[10px] divide-x divide-card border-b">
            <th class="px-3 py-2 text-left rounded-tl text-nowrap bg-muted-foreground/10">Name</th>
            <th class="p-2 text-left text-nowrap bg-muted-foreground/10">Age</th>
            <th class="p-2 text-left text-nowrap bg-muted-foreground/10">Gender</th>
            <th class="p-2 text-left text-nowrap bg-muted-foreground/10">Class</th>
            <th class="p-2 text-left text-nowrap bg-muted-foreground/10">Stream</th>
            <th class="p-2 text-right text-nowrap bg-muted-foreground/10">Fees Balance</th>
            <th class="w-2/12 px-3 py-2 text-left rounded-tr text-nowrap bg-muted-foreground/10">
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(item, i) in results?.data"
            :key="item?.id"
            class="transition-all duration-300 divide-x divide-card hover:bg-primary/10"
            :class="{ 'bg-muted': i % 2 !== 0 }"
          >
            <td class="px-3 py-2 text-nowrap">
              <Link
                :href="`/applicants/${item?.id}`"
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

    <div class="block space-y-6 sm:hidden">
      <Card v-for="(item, i) in results?.data" :key="item?.id" class="p-0 border-none rounded">
        <Link :href="`/students/${item?.id}`" class="text-xs divide-y">
          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:user-circle-solid" class="size-4 text-primary" />

              <span>Name</span>
            </div>

            <div>{{ item?.name }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:phone-solid" class="size-4 text-primary" />

              <span>Age</span>
            </div>

            <div>{{ item?.age }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:envelope-solid" class="size-4 text-primary" />

              <span>Gender</span>
            </div>

            <div>{{ item?.gender?.name }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:globe-alt-solid" class="size-4 text-primary" />

              <span>Class</span>
            </div>

            <div>{{ item?.class }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:map-solid" class="size-4 text-primary" />

              <span>Stream</span>
            </div>

            <div>{{ item?.stream }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:banknotes-solid" class="size-4 text-primary" />

              <span>Fees Balance</span>
            </div>

            <div>{{ formatCurrency(item?.currency?.name, item?.balance) }}</div>
          </div>

          <div class="flex items-center justify-between gap-8 p-2">
            <div class="flex items-center gap-2 text-accent-foreground">
              <Icon icon="heroicons:map-solid" class="size-4 text-primary" />

              <span>Status</span>
            </div>

            <div>{{ item?.status }}</div>
          </div>
        </Link>
      </Card>
    </div>

    <AppPagination v-if="results?.data?.length" :meta="results?.meta" current-path="/applicants" />
  </div>
</template>
