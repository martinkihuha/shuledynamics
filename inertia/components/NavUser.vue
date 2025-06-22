<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'

import avatar from '@/images/undraw_profile_pic_ic5t.svg'

const initials = computed(() =>
  store.authUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
)
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none pl-4"
          >
            <Avatar class="rounded-lg size-8">
              <AvatarImage v-if="avatar" :src="avatar" :alt="store?.authUser?.name" />
              <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-xs leading-tight text-left">
              <span class="font-semibold truncate">{{ store?.authUser?.name }}</span>
              <span class="truncate font-extralight text-[10px] text-primary">
                {{ store?.authUser?.email }}
              </span>
            </div>
            <Icon icon="heroicons:chevron-up-down" class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          class="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          side="right"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-xs">
              <Avatar class="rounded-lg size-10">
                <AvatarImage v-if="avatar" :src="avatar" :alt="store?.authUser?.name" />
                <AvatarFallback class="rounded-lg">{{ initials }}</AvatarFallback>
              </Avatar>
              <div class="grid flex-1 text-xs leading-tight text-left">
                <span class="font-semibold truncate">{{ store?.authUser?.name }}</span>
                <span class="truncate font-extralight text-[10px] text-primary">
                  {{ store?.authUser?.email }}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem as-child>
              <Link href="#" rel="noopener noreferrer" class="flex items-center gap-2 py-2">
                <Icon icon="heroicons:user-circle" class="text-muted-foreground/80 size-6" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <!-- <DropdownMenuItem>
              <Icon icon="heroicons:phone" class="text-muted-foreground/80 size-6" />
              Contact Support
            </DropdownMenuItem> -->
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              href="/auth/logout"
              method="post"
              as="button"
              class="flex items-center w-full gap-2 py-2"
            >
              <Icon
                icon="heroicons:arrow-left-end-on-rectangle"
                class="text-muted-foreground/80 size-6"
              />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
