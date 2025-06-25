<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/class_info'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import AcademicTerm from '#models/academic_term'
import Curriculum from '#models/curriculum'
import Stream from '#models/stream'

import { Card } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const isLoading = ref(false)
const academicTerms = ref<AcademicTerm[]>([])
const curricula = ref<Curriculum[]>([])
const streams = ref<Stream[]>([])

const fetchAcademicTerms = async () => {
  try {
    const response = await fetch('/api/academic-terms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    academicTerms.value = await response.json()
  } catch (error) {
    console.error('Error fetching academic terms:', error)
  }
}

const fetchCurricula = async () => {
  try {
    const response = await fetch('/api/curricula', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    curricula.value = await response.json()
  } catch (error) {
    console.error('Error fetching curriculums:', error)
  }
}

const fetchStreams = async () => {
  try {
    const response = await fetch('/api/streams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    streams.value = await response.json()
  } catch (error) {
    console.error('Error fetching streams:', error)
  }
}

onMounted(() => {
  fetchAcademicTerms()
  fetchCurricula()
  fetchStreams()
})

const formSchema = z.object({
  academicTermId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Academic Term' }),
  curriculumId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Curriculum' }),
  streamId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Stream' }),
  admissionClass: z.string().refine((v) => !!v, { message: 'Invalid Admission Class' }),
  classTeacher: z.string().refine((v) => !!v, { message: 'Invalid Class Teacher' }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: store.result,
})

const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return // Prevent multiple submissions if already loading

  // console.log('Values:', values)
  if (store?.result?.id === '') {
    try {
      isLoading.value = true
      router.post('/students', values, {
        onError: (errors) => {
          console.error('Error submitting form:', errors)
        },
        onFinish: () => {
          isLoading.value = false
        },
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      isLoading.value = false
    }
  }
})
</script>

<template>
  <form class="space-y-3" @submit="onSubmit">
    <p class="flex items-center justify-start gap-1 text-xs">
      <span class="font-semibold text-red-500">Note:</span> All fields marked with an asterisk
      (<Icon icon="mdi:asterisk" class="-mx-1 text-red-500 size-2" />) are required!
    </p>

    <Card class="p-4 rounded bg-muted">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ componentField }" name="curriculumId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Curriculum
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Curriculum" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in curricula"
                  :key="item?.id"
                  :value="item?.id?.toString()"
                  class="text-xs"
                >
                  {{ item?.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="academicTermId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Academic Term
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Academic Term" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in academicTerms"
                  :key="item?.id"
                  :value="item?.id?.toString()"
                  class="text-xs"
                >
                  {{ item?.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="streamId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Stream
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Stream" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in streams"
                  :key="item?.id"
                  :value="item?.id?.toString()"
                  class="text-xs"
                >
                  {{ item?.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="admissionClass">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Admission Class
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Admission Class"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="classTeacher">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Class Teacher
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Class Teacher"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
    </Card>

    <div class="flex items-center justify-center w-full gap-3 pt-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <button
              type="submit"
              class="h-9 bg-primary text-primary-foreground text-xs rounded-[2px] flex items-center gap-2 px-10 hover:ring-2 hover:ring-offset-2 hover:ring-primary dark:hover:ring-offset-black transition-all duration-300"
            >
              <Icon icon="lucide:save" class="size-4" />
              <span>Save</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Validate and save this student's information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Link
              href="/students"
              class="h-9 bg-muted-foreground text-muted text-xs rounded-[2px] flex items-center gap-2 px-8 hover:ring-2 hover:ring-offset-2 hover:ring-muted-foreground dark:hover:ring-offset-black transition-all duration-300"
            >
              <Icon icon="heroicons:no-symbol-16-solid" class="size-4" />
              <span>Cancel</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Reset and return to the students listing</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>

    <div
      v-if="JSON.stringify(errors) !== '{}'"
      class="flex items-center justify-center w-full gap-2 text-red-600"
    >
      <Icon icon="heroicons:exclamation-triangle-16-solid" class="size-5" />
      <span>Please review all required fields before saving</span>
    </div>
  </form>
</template>
