<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import favicon from '@/images/icon.png'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <Head>
    <title>{{ title }}</title>
    <meta name="description" :content="description" />
    <link rel="icon" type="image/png" :href="favicon" />
  </Head>
</template>
