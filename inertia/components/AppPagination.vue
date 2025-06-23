<script setup lang="ts">
import { computed } from 'vue'
import { store } from '@/lib/utils'

defineProps<{
  meta: any
  currentPath: string
}>()

const perPage = computed(() => store.perPage)

const getPage = (val: any) => {
  store.page = val
}

const getPerPage = (val: any) => {
  store.perPage = val
}

const range = computed(() => {
  const result = []
  result.push(15)
  for (let i = 15; i <= 105; i += 15) {
    result.push(i)
  }
  for (let i = 150; i <= 600; i += 150) {
    result.push(i)
  }
  return result
})
</script>

<template>
  <div class="flex items-center justify-between gap-2 text-[10px] sm:text-xs sm:pl-2">
    <div class="hidden sm:block">
      {{ meta?.total > 0 ? (meta?.currentPage - 1) * meta?.perPage + 1 : meta?.total }} -
      {{
        meta?.currentPage * meta?.perPage <= meta?.total
          ? meta?.currentPage * meta?.perPage
          : meta?.total
      }}
      of {{ meta?.total }}
    </div>

    <div class="flex items-center">
      <button
        type="button"
        :disabled="!meta?.previousPageUrl"
        class="bg-card border border-r-0 border-muted-foreground/50 rounded-l flex items-center gap-2 p-2 sm:px-4"
        :class="!meta?.previousPageUrl ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'"
        @click="getPage(Number(meta?.currentPage - 1))"
      >
        <Icon icon="heroicons:chevron-left" class="size-3 sm:size-4" />
        <span>Prev</span>
      </button>

      <select
        id="pagination"
        :disabled="!meta?.previousPageUrl && !meta?.nextPageUrl"
        class="bg-card border border-muted-foreground/50 text-xs p-2"
        :class="{ 'cursor-not-allowed opacity-30': !meta?.previousPageUrl && !meta?.nextPageUrl }"
        @change="getPage(($event?.target as HTMLSelectElement).value)"
      >
        <option
          v-for="(_, i) in meta?.lastPage"
          :key="i"
          :selected="meta?.currentPage === i + 1"
          :value="i + 1"
        >
          Page {{ i + 1 }} of {{ meta?.lastPage }}
        </option>
      </select>

      <button
        type="button"
        :disabled="!meta?.nextPageUrl"
        class="bg-card border border-l-0 border-muted-foreground/50 rounded-r flex items-center gap-2 p-2 sm:px-4"
        :class="!meta?.nextPageUrl ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'"
        @click="getPage(Number(meta?.currentPage + 1))"
      >
        <span>Next</span>
        <Icon icon="heroicons:chevron-right" class="size-3 sm:size-4" />
      </button>
    </div>

    <div class="flex items-center gap-2">
      <span class="hidden sm:block">Items per page:</span>
      <select
        id="perPage"
        :disabled="!meta?.previousPageUrl && !meta?.nextPageUrl"
        class="bg-card border border-muted-foreground/50 rounded text-xs p-2"
        :class="{ 'cursor-not-allowed opacity-30': !meta?.previousPageUrl && !meta?.nextPageUrl }"
        @change="getPerPage(($event?.target as HTMLSelectElement).value)"
      >
        <option
          v-for="number in range"
          :key="number"
          :selected="perPage === number"
          :value="number"
        >
          {{ number }}
        </option>
      </select>
    </div>
  </div>
</template>
