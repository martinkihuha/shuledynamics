<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { store } from '@/lib/staff'

import SystemTab from '#models/system_tab'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'

import AppHead from '@/components/AppHead.vue'
import AppHeader from '@/components/AppHeader.vue'
import StaffInfoForm from '@/components/StaffInfoForm.vue'
import StaffEducationForm from '@/components/StaffEducationForm.vue'
import StaffWorkExperienceForm from '@/components/StaffWorkExperienceForm.vue'

const props = defineProps<{
  result: any
  title: string
}>()

const activeTab = ref(12)
const systemTabs = ref<SystemTab[]>([])
const tabInfo = computed(() => {
  let content = 'Hapa'
  if (activeTab.value !== 12) {
    content = systemTabs.value.find((tab: any) => tab?.id === activeTab.value - 1)?.title ?? 'Hapa'
  }
  return content
})

const fetchSystemTabs = async () => {
  try {
    const response = await fetch('/api/system-tabs?search=staff', {
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
  store.result = JSON.parse(JSON.stringify(props.result))

  fetchSystemTabs()

  if (systemTabs.value.length > 0) {
    activeTab.value = systemTabs?.value[0]?.id || 12
  }
})
</script>

<template>
  <AppHead :title="title" description="A form to create a staff member in Shule Dynamics" />

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
                href="/staff"
                class="flex items-center gap-2 text-xs transition-all duration-300 text-primary hover:underline"
              >
                <Icon icon="heroicons:user-group-solid" class="size-4" />
                <span>Staff</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:plus" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>

  <div class="w-full p-2 space-y-4 sm:p-4">
    <Card class="gap-0 p-0 rounded-sm">
      <ul
        class="flex items-center justify-between w-full overflow-x-auto divide-x divide-stone-300"
      >
        <li
          v-for="tab in systemTabs"
          :key="tab?.id"
          class="inline-flex items-center w-full gap-2 px-3 text-xs h-9 hover:bg-accent first:rounded-tl-sm last:rounded-tr-sm"
          :class="{
            'bg-card text-primary font-semibold hover:bg-card cursor-not-allowed dark:border-stone-700 dark:text-white':
              activeTab === tab?.id,
            'bg-accent text-accent-foreground border-b border-stone-300 dark:border-stone-700 font-medium cursor-pointer':
              activeTab !== tab?.id,
          }"
          @click="activeTab = tab?.id"
        >
          <Icon
            :icon="activeTab === tab?.id ? tab?.iconSolid : tab?.icon"
            class="flex-none"
            :class="activeTab === tab?.id ? 'size-5' : 'size-4'"
          />
          <span class="text-nowrap">{{ tab?.title }}</span>
        </li>
      </ul>

      <div class="p-4 text-xs">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="md:col-span-2">
            <StaffInfoForm v-if="activeTab === 12" />
            <StaffEducationForm v-else-if="activeTab === 13" />
            <StaffWorkExperienceForm v-else-if="activeTab === 14" />

            <p v-else>
              First complete the
              <b
                class="underline cursor-pointer text-primary hover:no-underline"
                @click="activeTab = activeTab - 1"
              >
                {{ tabInfo }}
              </b>
              tab.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
