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
  },
  {
    id: 'svg-2',
    class: 'top-5 left-5 rotate-10 scale-100',
  },
  {
    id: 'svg-3',
    class: '-top-5 left-10 rotate-80 scale-120',
  },
  {
    id: 'svg-4',
    class: 'bottom-2 right-0 rotate-0 scale-50',
  },
  {
    id: 'svg-5',
    class: 'bottom-5 right-5 rotate-50 scale-100',
  },
  {
    id: 'svg-6',
    class: '-bottom-5 right-10 rotate-80 scale-100',
  },
  {
    id: 'svg-7',
    class: '-bottom-5 right-7/12 rotate-35 scale-200',
  },
  {
    id: 'svg-8',
    class: 'top-5 right-6/12 rotate-10 scale-100',
  },
  {
    id: 'svg-9',
    class: '-top-5 right-6/12 rotate-90 scale-150',
  },
  {
    id: 'svg-10',
    class: '-bottom-5 right-3/12 rotate-35 scale-150',
  },
  {
    id: 'svg-11',
    class: '-top-5 right-4/12 rotate-90 scale-200',
  },
  {
    id: 'svg-12',
    class: '-top-5 right-3/12 rotate-20 scale-100',
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

      <span></span>
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
        :key="svg.id"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        class="absolute h-full opacity-5"
        :class="svg.class"
      >
        <path
          fill="#443BC9"
          d="M19.2,-32.3C23.6,-30.7,25.1,-23,24,-16.6C22.8,-10.2,19,-5.1,18.4,-0.3C17.9,4.5,20.6,9,19.5,11.4C18.3,13.8,13.3,14.1,9.4,17.6C5.5,21.1,2.8,27.8,-2.1,31.5C-7,35.2,-14.1,35.9,-20.9,34.1C-27.7,32.3,-34.2,27.9,-38.9,21.8C-43.5,15.7,-46.3,7.9,-45,0.7C-43.8,-6.4,-38.5,-12.8,-32.1,-15.9C-25.7,-18.9,-18.1,-18.6,-12.6,-19.6C-7,-20.5,-3.5,-22.8,1.9,-26.1C7.4,-29.5,14.8,-33.9,19.2,-32.3Z"
          transform="translate(50 50)"
          style="transition: 0.3s"
          stroke-width="0"
        ></path>
      </svg>
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
