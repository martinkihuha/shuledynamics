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

defineProps<{
  school: any
  result: any
  title: string
}>()

onMounted(() => {
  store.searchParam = ''
  store.searchPlaceholder = 'Search Curriculums...'
})
</script>

<template>
  <AppHead :title="title" description="The app's curriculums management page" />

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
                <Icon icon="heroicons:building-office-2-solid" class="size-4" />
                <span>Campus Management</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:building-office" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="w-full p-2 space-y-2 sm:px-4">
    <div class="flex items-end justify-between w-full gap-2">
      <h1>{{ result?.name }} Curriculums</h1>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Link
              href="/system/campus/create"
              class="flex items-center gap-2 px-3 text-xs transition-all duration-300 rounded cursor-pointer h-9 bg-primary text-primary-foreground md:px-6 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black"
            >
              <Icon icon="heroicons:plus" class="size-4" />
              <span class="text-nowrap">New Curriculum</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Click to add a new curriculum</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <Card class="p-0 rounded bg-card/80">
      <table class="min-w-full text-xs rounded table-fixed">
        <thead>
          <tr class="text-[10px] divide-x divide-card">
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            ></th>
            <th
              class="p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Curriculum
            </th>
            <th
              class="w-full p-2 text-left text-nowrap bg-gradient-to-b from-muted-foreground/20 via-muted-foreground/5 to-muted-foreground/20"
            >
              Classes
            </th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr
            v-for="(item, i) in result?.curriculums"
            :key="item?.id"
            class="transition-all duration-300 divide-x divide-card hover:bg-primary/10"
            :class="{ 'bg-muted/80': i % 2 !== 0 }"
          >
            <td class="p-2 text-right text-nowrap">{{ i + 1 }}</td>
            <td class="p-2 text-nowrap">{{ item?.name }}</td>
            <td class="p-2 text-nowrap">
              {{
                result?.grades
                  ?.filter((g: any) => g?.curriculumId === item?.id)
                  .map((gd: any) => gd?.grade?.name)
                  .join(', ')
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>
