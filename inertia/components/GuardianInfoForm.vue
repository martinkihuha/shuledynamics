<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/guardian'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import Country from '#models/country'
import Curriculum from '#models/curriculum'
import Religion from '#models/religion'
import Student from '#models/student'

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
import WysiwygEditor from '@/components/WysiwygEditor.vue'

const isLoading = ref(false)
const countries = ref<Country[]>([])
const curriculums = ref<Curriculum[]>([])
const religions = ref<Religion[]>([])
const students = ref<Student[]>([])

const fetchCountries = async () => {
  try {
    const response = await fetch('/api/countries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    countries.value = await response.json()
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

const fetchCurriculums = async () => {
  try {
    const response = await fetch('/api/curriculums', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    curriculums.value = await response.json()
  } catch (error) {
    console.error('Error fetching curriculums:', error)
  }
}

const fetchReligions = async () => {
  try {
    const response = await fetch('/api/religions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    religions.value = await response.json()
  } catch (error) {
    console.error('Error fetching religions:', error)
  }
}

const fetchStudents = async () => {
  try {
    const response = await fetch('/api/students', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    students.value = await response.json()
  } catch (error) {
    console.error('Error fetching students:', error)
  }
}

onMounted(() => {
  fetchCountries()
  fetchCurriculums()
  fetchReligions()
  fetchStudents()
})

const formSchema = z.object({
  countryId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Country' }),
  religionId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Religion' }),
  name: z.string().refine((v) => !!v, { message: 'Invalid Name' }),
  email: z.string().refine((v) => !!v, { message: 'Invalid Email' }),
  mobile: z.string().refine((v) => !!v, { message: 'Invalid Mobile Number' }),
  location: z.string().refine((v) => !!v, { message: 'Invalid Location' }),
  notes: z.string().refine((v) => !!v, { message: 'Invalid Notes' }),
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
      router.post('/guardians', values, {
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
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Guardian Name
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Guardian Name"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="mobile">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Mobile Number
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="tel"
                placeholder="Mobile Number"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Email
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="email"
                placeholder="Email"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="location">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Location
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Location"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="religionId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Religion
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Religion" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in religions"
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

        <FormField v-slot="{ componentField }" name="countryId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Country
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in countries"
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

        <div class="sm:col-span-2">
          <FormField name="notes">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1">
                <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                Notes
              </FormLabel>

              <FormControl class="gap-0 text-xs">
                <WysiwygEditor v-model="store.result.notes" name="Notes" />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>
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
