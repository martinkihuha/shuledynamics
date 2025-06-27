<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/student'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import StudentStatus from '#models/student_status'
import Gender from '#models/gender'
import Country from '#models/country'
import Religion from '#models/religion'
import Curriculum from '#models/curriculum'
import Grade from '#models/grade'
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
const today = new Date().toISOString().split('T')[0]
const countries = ref<Country[]>([])
const curricula = ref<Curriculum[]>([])
const genders = ref<Gender[]>([])
const grades = ref<Grade[]>([])
const religions = ref<Religion[]>([])
const streams = ref<Stream[]>([])
const studentStatuses = ref<StudentStatus[]>([])

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

const fetchGenders = async () => {
  try {
    const response = await fetch('/api/genders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    genders.value = await response.json()
  } catch (error) {
    console.error('Error fetching genders:', error)
  }
}

const fetchGrades = async () => {
  try {
    const response = await fetch('/api/grades', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    grades.value = await response.json()
  } catch (error) {
    console.error('Error fetching grades:', error)
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

const fetchStudentStatuses = async () => {
  try {
    const response = await fetch('/api/student-statuses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    studentStatuses.value = await response.json()
  } catch (error) {
    console.error('Error fetching student statuses:', error)
  }
}

onMounted(() => {
  fetchCountries()
  fetchCurricula()
  fetchGenders()
  fetchGrades()
  fetchReligions()
  fetchStreams()
  fetchStudentStatuses()
})

const formSchema = z.object({
  countryId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Nationality' }),
  curriculumId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Curriculum' }),
  genderId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Gender' }),
  gradeId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Grade' }),
  religionId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Religion' }),
  streamId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Stream' }),
  admissionNo: z.string().refine((v) => !!v, { message: 'Invalid Admission Number' }),
  name: z.string().refine((v) => !!v, { message: 'Invalid Name' }),
  dob: z.string().refine((v) => !!v, { message: 'Invalid Date of Birth' }),
  nemisNo: z.string().refine((v) => !!v, { message: 'Invalid NEMIS Number' }),
  dateOfAdmission: z.string().refine((v) => !!v, { message: 'Invalid Date of Admission' }),
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
  <form class="space-y-4" @submit="onSubmit">
    <p class="flex items-center justify-start gap-1 text-xs">
      <span class="font-semibold text-red-500">Note:</span> All fields marked with an asterisk
      (<Icon icon="mdi:asterisk" class="-mx-1 text-red-500 size-2" />) are required!
    </p>

    <Card class="p-4 rounded bg-muted dark:bg-card">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Student Name
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Student Name"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="dob">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Date of Birth
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="date"
                placeholder="Date of Birth"
                autocomplete="off"
                :max="today"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="admissionNo">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Admission Number
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Admission Number"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="studentStatusId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Student Status
            </FormLabel>

            <Select v-bind="componentField" disabled>
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Student Status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in studentStatuses"
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

        <FormField v-slot="{ componentField }" name="genderId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Gender
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in genders"
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
              Nationality
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Nationality" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in countries"
                  :key="item?.id"
                  :value="item?.id?.toString()"
                  class="text-xs"
                >
                  {{ item?.nationality }}
                </SelectItem>
              </SelectContent>
            </Select>

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

        <FormField v-slot="{ componentField }" name="dateOfAdmission">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Date of Admission
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="date"
                placeholder="Date of Admission"
                autocomplete="off"
                :max="today"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="nemisNo">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              NEMIS Number
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="NEMIS Number"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

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

        <FormField v-slot="{ componentField }" name="gradeId">
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Grade
            </FormLabel>

            <Select v-bind="componentField">
              <FormControl class="rounded bg-card">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  v-for="item in grades"
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
