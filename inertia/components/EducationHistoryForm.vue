<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '@/lib/student'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import County from '#models/county'
import Curriculum from '#models/curriculum'
import DepartureReason from '#models/departure_reason'
import Grade from '#models/grade'

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
const anyPrevSchool = ref('No')
const today = new Date().toISOString().split('T')[0]

const counties = ref<County[]>([])
const curricula = ref<Curriculum[]>([])
const departureReasons = ref<DepartureReason[]>([])
const grades = ref<Grade[]>([])

watch(
  () => anyPrevSchool.value,
  (newValue) => {
    if (newValue === 'Yes') {
      store.anyPreviousSchool = true
      store.addPreviousSchool() // Ensure at least one school is added
    } else {
      store.anyPreviousSchool = false
      store.previousSchools = []
    }
  },
  { immediate: true }
)

watch(
  () => store?.previousSchools?.length,
  () => {
    if (store?.previousSchools?.length === 0) {
      anyPrevSchool.value = 'No'
      store.anyPreviousSchool = false
    }
  }
)

const fetchCounties = async () => {
  try {
    const response = await fetch('/api/counties', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    counties.value = await response.json()
  } catch (error) {
    console.error('Error fetching counties:', error)
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

const fetchDepartureReasons = async () => {
  try {
    const response = await fetch('/api/departure-reasons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    departureReasons.value = await response.json()
  } catch (error) {
    console.error('Error fetching departure reasons:', error)
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

onMounted(() => {
  fetchCounties()
  fetchCurricula()
  fetchDepartureReasons()
  fetchGrades()
})

const filteredGrades = (i: string) =>
  computed(() =>
    !store?.previousSchools[Number(i)]?.curriculumId
      ? grades.value
      : grades.value.filter(
          (grade) =>
            Number(grade.curriculumId) === Number(store?.previousSchools[Number(i)]?.curriculumId)
        )
  )

const previousSchoolSchema = z.object({
  countyId: z.union([z.number(), z.string()]).refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid County' }
  ),
  schoolName: z.string().refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid School Name' }
  ),
  dateOfAdmission: z.string().refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid Date of Admission' }
  ),
  dateOfDeparture: z.string().refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid Date of Departure' }
  ),
  curriculumId: z.union([z.number(), z.string()]).refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid Curriculum' }
  ),
  gradeId: z.union([z.number(), z.string()]).refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid Class of Departure' }
  ),
  departureReasonId: z.union([z.number(), z.string()]).refine(
    (v) => {
      return store?.anyPreviousSchool === true ? !!v : true
    },
    { message: 'Invalid Departure Reason' }
  ),
})

const formSchema = z.object({
  previousSchools: z.array(previousSchoolSchema).refine(
    (v) => {
      // Only require previous schools if anyPreviousSchool is true
      return store?.anyPreviousSchool === true ? v.length > 0 : true
    },
    { message: 'At least one previous school is required' }
  ),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    previousSchools: [],
  },
})

const onSubmit = handleSubmit((values) => {
  if (isLoading.value) return // Prevent multiple submissions if already loading

  // console.log('Values:', values)
  if (store?.result?.id === '') {
    try {
      isLoading.value = true
      router.post('/education-history', values, {
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

    <!-- <div class="grid grid-cols-1 gap-4 sm:grid-cols-2"> -->
    <Card
      class="grid w-full grid-cols-1 gap-4 p-4 pt-3 rounded sm:grid-cols-2 bg-muted dark:bg-card"
    >
      <FormField v-model="anyPrevSchool" v-slot="{ componentField }" name="anyPrevSchool">
        <FormItem class="flex flex-col gap-1">
          <FormLabel class="text-[10px] flex items-center gap-1">
            <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
            Any Previous School?
          </FormLabel>

          <Select v-bind="componentField">
            <FormControl class="rounded bg-card">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Any Previous School?" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          <FormMessage class="text-xs" />
        </FormItem>
      </FormField>
    </Card>
    <!-- </div> -->

    <div v-if="store?.anyPreviousSchool" class="space-y-4">
      <Card
        v-for="(item, i) in store?.previousSchools"
        :key="i"
        class="w-full p-4 rounded bg-muted dark:bg-card"
      >
        <div class="grid grid-cols-1 gap-4 md:grid-cols-6">
          <div class="md:col-span-3">
            <FormField
              v-model="item.schoolName"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].schoolName`"
            >
              <FormItem class="flex flex-col gap-1">
                <FormLabel class="text-[10px] flex items-center gap-1">
                  <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                  School Name
                </FormLabel>

                <FormControl class="text-xs">
                  <Input
                    type="text"
                    placeholder="School Name"
                    autocomplete="off"
                    class="text-xs rounded h-9 bg-card"
                    v-bind="componentField"
                  />
                </FormControl>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="md:col-span-3">
            <FormField
              v-model="item.countyId"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].countyId`"
            >
              <FormItem class="flex flex-col gap-1">
                <FormLabel class="text-[10px] flex items-center gap-1">
                  <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                  County
                </FormLabel>

                <Select v-bind="componentField">
                  <FormControl class="rounded bg-card">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="County" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      v-for="county in counties"
                      :key="county?.id"
                      :value="county?.id?.toString()"
                      class="text-xs"
                    >
                      {{ county?.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="md:col-span-3">
            <FormField
              v-model="item.dateOfAdmission"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].dateOfAdmission`"
            >
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
          </div>

          <div class="md:col-span-3">
            <FormField
              v-model="item.dateOfDeparture"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].dateOfDeparture`"
            >
              <FormItem class="flex flex-col gap-1">
                <FormLabel class="text-[10px] flex items-center gap-1">
                  <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                  Date of Departure
                </FormLabel>

                <FormControl class="text-xs">
                  <Input
                    type="date"
                    placeholder="Date of Departure"
                    autocomplete="off"
                    :max="today"
                    class="text-xs rounded h-9 bg-card"
                    v-bind="componentField"
                  />
                </FormControl>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="md:col-span-2">
            <FormField
              v-model="item.curriculumId"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].curriculumId`"
            >
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
                      v-for="curriculum in curricula"
                      :key="curriculum?.id"
                      :value="curriculum?.id?.toString()"
                      class="text-xs"
                    >
                      {{ curriculum?.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="md:col-span-2">
            <FormField
              v-model="item.gradeId"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].gradeId`"
            >
              <FormItem class="flex flex-col gap-1">
                <FormLabel class="text-[10px] flex items-center gap-1">
                  <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                  Class of Departure
                </FormLabel>

                <Select :disabled="!item?.curriculumId" v-bind="componentField">
                  <FormControl class="rounded bg-card">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Class of Departure" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      v-for="grade in filteredGrades(`${i}`).value"
                      :key="grade?.id"
                      :value="grade?.id?.toString()"
                      class="text-xs"
                    >
                      {{ grade?.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="md:col-span-2">
            <FormField
              v-model="item.departureReasonId"
              v-slot="{ componentField }"
              :name="`previousSchools[${i}].departureReasonId`"
            >
              <FormItem class="flex flex-col gap-1">
                <FormLabel class="text-[10px] flex items-center gap-1">
                  <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                  Departure Reason
                </FormLabel>

                <Select v-bind="componentField">
                  <FormControl class="rounded bg-card">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Departure Reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      v-for="departureReason in departureReasons"
                      :key="departureReason?.id"
                      :value="departureReason?.id?.toString()"
                      class="text-xs"
                    >
                      {{ departureReason?.name }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>

          <div class="flex items-center justify-center gap-2 md:col-span-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <button
                    type="button"
                    class="h-8 bg-secondary text-secondary-foreground text-xs rounded-[2px] flex items-center gap-2 px-4 hover:ring-2 hover:ring-offset-2 hover:ring-secondary dark:hover:ring-offset-black transition-all duration-300"
                    @click="store.addPreviousSchool"
                  >
                    <Icon icon="heroicons:plus" class="size-4" />
                    <span>Add Previous School</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                  <p>Add a previous school</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <button
                    type="button"
                    class="h-8 bg-red-600 text-red-50 text-xs rounded-[2px] flex items-center gap-2 px-4 hover:ring-2 hover:ring-offset-2 hover:ring-red-600 dark:hover:ring-offset-black transition-all duration-300"
                    @click="store.delPreviousSchool(i)"
                  >
                    <Icon icon="heroicons:trash" class="size-4" />
                    <span>Remove this School</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                  <p v-if="store?.previousSchools?.length < 2">Must have atleast 1 school</p>
                  <p v-else>Delete this previous school</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </div>

    <div class="flex items-center justify-center w-full gap-3">
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
