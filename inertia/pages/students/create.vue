<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { store } from '@/lib/student'

import StudentTab from '#models/student_tab'

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
import StudentInfoForm from '@/components/StudentInfoForm.vue'

const props = defineProps<{
  result: any
  title: string
}>()

const activeTab = ref(1)
const studentTabs = ref<StudentTab[]>([])
const tabInfo = computed(() => {
  let content = 'Hapa'
  if (activeTab.value !== 1) {
    content = studentTabs.value.find((tab) => tab?.id === activeTab.value - 1)?.title ?? 'Hapa'
  }
  return content
})

const fetchStudentTabs = async () => {
  try {
    const response = await fetch('/api/student-tabs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    studentTabs.value = await response.json()
  } catch (error) {
    console.error('Error fetching student tabs:', error)
  }
}

onMounted(() => {
  store.result = JSON.parse(JSON.stringify(props.result))

  fetchStudentTabs()
})
</script>

<template>
  <AppHead :title="title" description="A form to create a Student in Shule Dynamics" />

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
                href="/students"
                class="flex items-center gap-2 text-xs transition-all duration-300 text-primary hover:underline"
              >
                <Icon icon="heroicons:users-solid" class="size-4" />
                <span>Students</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator class="hidden md:block" />
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
        class="flex items-center justify-between w-full divide-x divide-stone-200 dark:divide-stone-400"
      >
        <li
          v-for="tab in studentTabs"
          :key="tab?.id"
          class="inline-flex items-center w-full gap-2 px-3 text-xs h-9 hover:bg-accent first:rounded-tl-sm last:rounded-tr-sm"
          :class="{
            'bg-card text-primary font-semibold hover:bg-card cursor-not-allowed':
              activeTab === tab?.id,
            'bg-accent text-accent-foreground border-b border-stone-200 dark:border-stone-800 font-medium cursor-pointer':
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

      <div class="p-4 text-sm">
        <div v-if="activeTab === 1" class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <StudentInfoForm class="md:col-span-2" />
        </div>

        <p v-else>
          First complete the
          <b
            class="underline cursor-pointer text-primary hover:no-underline"
            @click="activeTab = activeTab - 1"
          >
            {{ tabInfo }}
          </b>
          tab
        </p>
      </div>
    </Card>
  </div>
</template>
