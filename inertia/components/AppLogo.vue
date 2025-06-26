<script setup lang="ts">
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import logoSrc from '@/images/icon.png'
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton
        as-child
        size="lg"
        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none pl-4"
      >
        <Link href="/" class="flex items-center w-full text-xl">
          <img :src="logoSrc" alt="Shule Dynamics logo" class="size-7" width="100" height="100" />
          <div class="inline-flex items-center gap-0">
            <span class="text-primary">Shule</span>
            <span class="font-extralight text-secondary">Dynamics</span>
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
