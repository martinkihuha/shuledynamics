<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/lib/utils'

const icon = computed(() => {
  switch (store?.notification?.type) {
    case 'success':
      return 'heroicons:check-circle-solid'
      break

    case 'error':
      return 'heroicons:exclamation-circle-solid'
      break

    default:
      return 'heroicons:exclamation-triangle-solid'
      break
  }
})
</script>

<template>
  <div
    v-if="store?.notification?.visible"
    class="relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1 z-50"
    :class="{
      'bg-green-600 text-green-50': store?.notification?.type === 'success',
      'bg-red-600 text-red-50': store?.notification?.type === 'error',
      'bg-yellow-400 text-black': store?.notification?.type === 'warning',
    }"
  >
    <div class="flex flex-wrap items-center gap-2">
      <Icon :icon="icon" class="size-6" aria-hidden="true" />
      <div class="text-sm sm:text-base">
        <strong class="font-bold">{{ store?.notification?.title }}:</strong>
        {{ store?.notification?.content }}
      </div>
    </div>
    <div class="flex justify-end flex-1">
      <button
        type="button"
        @click="store.notification.visible = false"
        class="inline-flex text-white rounded-md cursor-pointer"
      >
        <span class="sr-only">Close</span>
        <Icon icon="heroicons:x-mark" class="size-5" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
