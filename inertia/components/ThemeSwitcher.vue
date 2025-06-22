<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useColorMode } from '@vueuse/core'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="rounded size-9">
        <Icon
          icon="radix-icons:moon"
          class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="radix-icons:sun"
          class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <DropdownMenuItem class="p-2 text-xs" @click="mode = 'light'">
        <Icon icon="radix-icons:sun" class="size-3" />
        <span>Light</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="p-2 text-xs" @click="mode = 'dark'">
        <Icon icon="radix-icons:moon" class="size-3" />
        <span>Dark</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="p-2 text-xs" @click="mode = 'auto'">
        <Icon icon="radix-icons:gear" class="size-3" />
        <span>System</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
