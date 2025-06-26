<script setup lang="ts">
import { store } from '@/lib/utils'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const searchInput: any = ref('')

watchDebounced(
  searchInput,
  () => {
    store.searchParam = searchInput.value
    // console.log(`Search: ${searchParam.value}`);
  },
  { debounce: 1000, maxWait: 1500 }
)
</script>

<template>
  <Card class="relative w-full p-0 m-0 rounded shadow-none sm:w-1/2">
    <Input
      v-model="searchInput"
      type="search"
      :placeholder="store.searchPlaceholder"
      id="search"
      class="w-full pl-8 text-xs rounded h-9"
    />
    <Icon
      icon="heroicons:magnifying-glass"
      class="absolute left-2.5 top-2.5 text-muted-foreground"
    />
  </Card>
</template>
