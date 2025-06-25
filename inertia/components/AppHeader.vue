<script setup lang="ts">
import { useSidebar } from '@/components/ui/sidebar'
import ThemeSwitcher from './ThemeSwitcher.vue'

// import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const { open, toggleSidebar } = useSidebar()
</script>

<template>
  <header
    class="w-full h-12 sticky top-0 bg-card border-b flex flex-none shrink-0 items-center gap-2 transition-[width,height] ease-linear z-10"
  >
    <div class="flex items-center w-full gap-2 mx-3 md:px-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <button type="button" class="group" @click="toggleSidebar">
              <div class="relative flex flex-col items-center justify-center size-5">
                <span
                  class="absolute w-full h-0.5 bg-muted-foreground rounded-full -translate-y-1.5 transition-all duration-300"
                  :class="{ 'group-hover:rotate-45 group-hover:translate-y-0': open }"
                ></span>
                <span
                  class="absolute w-full h-0.5 bg-muted-foreground rounded-full transition-all duration-300"
                  :class="
                    open ? 'group-hover:opacity-0' : 'group-hover:w-3/4 group-hover:translate-x-0.5'
                  "
                ></span>
                <span
                  class="absolute w-full h-0.5 bg-muted-foreground rounded-full translate-y-1.5 transition-all duration-300"
                  :class="{ 'group-hover:-rotate-45 group-hover:translate-y-0': open }"
                ></span>
              </div>
              <span class="sr-only">Toggle Sidebar</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="text-xs border bg-card text-muted-foreground">
            <p>{{ open ? 'Hide' : 'Show' }} Sidebar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <span class="w-px h-4 mx-1 bg-stone-400 md:mx-2"></span>

      <slot></slot>

      <div class="flex items-center gap-2">
        <!-- <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button as-child variant="outline" class="p-0 rounded-lg size-9">
                <a href="/api/my-qrcode" target="_blank" rel="noopener noreferrer">
                  <Icon icon="ic:round-qrcode" class="size-[1.2rem]" />
                  <span class="sr-only">My QR Code</span>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="text-xs border bg-card text-secondary-foreground">
              <p>Open your business card</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> -->

        <ThemeSwitcher />
      </div>
    </div>
  </header>
</template>
