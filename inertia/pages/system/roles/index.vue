<script setup lang="ts">
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

defineProps<{
  title: string
}>()
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
            <BreadcrumbPage class="flex items-center gap-2 text-xs truncate text-muted-foreground">
              <Icon icon="heroicons:user-circle" class="size-4" />
              <span>{{ title }}</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </AppHeader>
</template>
