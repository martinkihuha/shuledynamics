<script setup lang="ts">
import { computed } from 'vue'
import { store, getGreeting, formatDate } from '@/lib/utils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'

const greeting = computed(() => getGreeting())

defineProps<{
  title: string
  quickLinks: any[]
}>()

// Generate random background SVG elements
const backgroundSvgs = computed(() => [
  {
    id: 'svg-1',
    class: 'top-0 left-0 rotate-0 scale-50',
    fill: '#2563EB',
  },
  {
    id: 'svg-2',
    class: 'top-5 left-5 rotate-10 scale-100',
    fill: '#16A34A',
  },
  {
    id: 'svg-3',
    class: '-top-5 left-10 rotate-80 scale-120',
    fill: '#2563EB',
  },
  {
    id: 'svg-4',
    class: 'bottom-7 right-14 rotate-0 scale-50',
    fill: '#16A34A',
  },
  {
    id: 'svg-5',
    class: 'bottom-5 right-5 rotate-50 scale-100',
    fill: '#2563EB',
  },
  {
    id: 'svg-6',
    class: '-bottom-5 right-10 rotate-80 scale-100',
    fill: '#16A34A',
  },
  {
    id: 'svg-7',
    class: '-bottom-5 right-7/12 rotate-35 scale-200',
    fill: '#2563EB',
  },
  {
    id: 'svg-8',
    class: 'top-5 right-6/12 rotate-90 scale-120',
    fill: '#16A34A',
  },
  {
    id: 'svg-9',
    class: '-top-5 right-6/12 rotate-90 scale-150',
    fill: '#2563EB',
  },
  {
    id: 'svg-10',
    class: '-bottom-5 right-4/12 rotate-35 scale-150',
    fill: '#16A34A',
  },
  {
    id: 'svg-11',
    class: '-top-5 right-4/12 rotate-100 scale-200',
    fill: '#2563EB',
  },
  {
    id: 'svg-12',
    class: '-top-5 right-3/12 rotate-20 scale-100',
    fill: '#16A34A',
  },
])
</script>

<template>
  <AppHead :title="title" description="The app's dashboard page" />

  <AppHeader>
    <div class="flex items-center justify-between w-full truncate">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:home" class="size-4" />
              <span>Dashboard</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="flex flex-col flex-1 gap-4 p-4">
    <Card class="relative gap-0 p-4 overflow-hidden rounded-lg shadow-none md:pb-8">
      <div class="text-[11px] text-muted-foreground">{{ formatDate(new Date().toString()) }}</div>
      <h2 class="text-lg font-medium tracking-tight">
        {{ greeting }}, <span class="text-primary">{{ store.authUser.name }}</span>
      </h2>
      <!-- Dynamically generated background SVG elements -->
      <svg
        v-for="svg in backgroundSvgs"
        :key="svg?.id"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute h-full opacity-5"
        :class="svg?.class"
      >
        <path
          :fill="svg?.fill"
          d="M30.6,-52C41.5,-40.7,53.3,-35.2,58.6,-26.1C63.8,-16.9,62.4,-4.1,60.5,8.6C58.5,21.2,55.9,33.7,49,43.5C42.1,53.3,31,60.5,19.4,62.1C7.8,63.8,-4.3,59.9,-18.9,58.4C-33.5,56.9,-50.6,57.8,-60.9,50.3C-71.3,42.8,-74.9,27.1,-67.8,15.4C-60.7,3.7,-42.9,-3.9,-37,-17C-31.2,-30.2,-37.3,-48.9,-33.2,-63.3C-29,-77.7,-14.5,-87.9,-2.3,-84.3C9.9,-80.7,19.8,-63.4,30.6,-52Z"
          transform="translate(100 100)"
        />
      </svg>
      <!-- <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#2563EB"
          d="M30.6,-52C41.5,-40.7,53.3,-35.2,58.6,-26.1C63.8,-16.9,62.4,-4.1,60.5,8.6C58.5,21.2,55.9,33.7,49,43.5C42.1,53.3,31,60.5,19.4,62.1C7.8,63.8,-4.3,59.9,-18.9,58.4C-33.5,56.9,-50.6,57.8,-60.9,50.3C-71.3,42.8,-74.9,27.1,-67.8,15.4C-60.7,3.7,-42.9,-3.9,-37,-17C-31.2,-30.2,-37.3,-48.9,-33.2,-63.3C-29,-77.7,-14.5,-87.9,-2.3,-84.3C9.9,-80.7,19.8,-63.4,30.6,-52Z"
          transform="translate(100 100)"
        />
      </svg> -->
    </Card>

    <p class="-mb-3 font-medium text-muted-foreground md:pl-2">Quick Links</p>

    <div v-if="quickLinks.length > 0" class="grid grid-cols-2 gap-4 auto-rows-min md:grid-cols-6">
      <Link v-for="item in quickLinks" :key="item?.id" :href="item?.url">
        <Card
          class="flex flex-col items-center justify-center gap-2 transition-all duration-300 aspect-square rounded-xl hover:scale-110"
        >
          <Icon :icon="item.iconSolid" class="size-10 text-primary" />
          <span class="text-xs">{{ item?.title }}</span>
        </Card>
      </Link>
    </div>

    <div class="grid flex-1 gap-4 min-h-min md:grid-cols-2">
      <Card class="p-4 min-h-44 rounded-xl"> </Card>
      <Card class="p-4 min-h-44 rounded-xl"></Card>
    </div>
  </div>
</template>
