<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/education_history'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import County from '#models/county'

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
const counties = ref<County[]>([])

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

onMounted(() => {
  fetchCounties()
})

const previousSchoolSchema = z.object({
  countyId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid County' }),
  schoolName: z.string().refine((v) => !!v, { message: 'Invalid School Name' }),
  yearOfAdmission: z.string().refine((v) => !!v, { message: 'Invalid Year of Admission' }),
  yearOfDeparture: z.string().refine((v) => !!v, { message: 'Invalid Year of Departure' }),
  classOfDeparture: z.string().refine((v) => !!v, { message: 'Invalid Class of Departure' }),
  departureReason: z.string().refine((v) => !!v, { message: 'Invalid Departure Reason' }),
})

const formSchema = z.object({
  previousSchools: z.array(previousSchoolSchema).nonempty({
    message: 'At least one previous school is required',
  }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    previousSchools: [
      {
        countyId: '',
        schoolName: '',
        yearOfAdmission: '',
        yearOfDeparture: '',
        classOfDeparture: '',
        departureReason: '',
      },
    ],
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
  <form class="space-y-3" @submit="onSubmit">
    <p class="flex items-center justify-center gap-1 text-xs">
      <span class="font-semibold text-red-500">Note:</span> All fields marked with an asterisk
      (<Icon icon="mdi:asterisk" class="-mx-1 text-red-500 size-2" />) are required! Click the
      <Icon icon="heroicons:plus" class="size-3" />
      icon to add an item and the
      <Icon icon="heroicons:trash" class="text-red-600 size-3" />
      icon to delete an item
    </p>

    <div class="-ml-2 space-y-4 md:space-y-6">
      <div
        v-for="(item, i) in store?.result?.previousSchools"
        :key="i"
        class="flex items-center gap-2"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                type="button"
                class="inline-flex items-center gap-2 cursor-pointer"
                @click="store.addPreviousSchool"
              >
                <Icon icon="heroicons:plus" class="size-5" />
                <span class="sr-only">Add Previous School</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
              <p>Add a previous school</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Card class="w-full p-4 rounded bg-muted dark:bg-card">
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
                        v-for="item in counties"
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

            <div class="md:col-span-3">
              <FormField
                v-model="item.yearOfAdmission"
                v-slot="{ componentField }"
                :name="`previousSchools[${i}].yearOfAdmission`"
              >
                <FormItem class="flex flex-col gap-1">
                  <FormLabel class="text-[10px] flex items-center gap-1">
                    <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                    Year of Admission
                  </FormLabel>

                  <Select v-bind="componentField">
                    <FormControl class="rounded bg-card">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select Year of Admission" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        v-for="year in Array.from(
                          { length: 20 },
                          (_, i) => new Date().getFullYear() - i
                        )"
                        :key="year"
                        :value="year.toString()"
                        class="text-xs"
                      >
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>

            <div class="md:col-span-3">
              <FormField
                v-model="item.yearOfDeparture"
                v-slot="{ componentField }"
                :name="`previousSchools[${i}].yearOfDeparture`"
              >
                <FormItem class="flex flex-col gap-1">
                  <FormLabel class="text-[10px] flex items-center gap-1">
                    <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                    Year of Departure
                  </FormLabel>

                  <Select v-bind="componentField">
                    <FormControl class="rounded bg-card">
                      <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select Year of Departure" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        v-for="year in Array.from(
                          { length: 10 },
                          (_, i) => new Date().getFullYear() - i
                        )"
                        :key="year"
                        :value="year.toString()"
                        class="text-xs"
                      >
                        {{ year }}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>

            <div class="md:col-span-3">
              <FormField
                v-model="item.classOfDeparture"
                v-slot="{ componentField }"
                :name="`previousSchools[${i}].classOfDeparture`"
              >
                <FormItem class="flex flex-col gap-1">
                  <FormLabel class="text-[10px] flex items-center gap-1">
                    <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                    Class of Departure
                  </FormLabel>

                  <FormControl class="text-xs">
                    <Input
                      type="text"
                      placeholder="Class of Departure"
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
                v-model="item.departureReason"
                v-slot="{ componentField }"
                :name="`previousSchools[${i}].departureReason`"
              >
                <FormItem class="flex flex-col gap-1">
                  <FormLabel class="text-[10px] flex items-center gap-1">
                    <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                    Departure Reason
                  </FormLabel>

                  <FormControl class="text-xs">
                    <Input
                      type="text"
                      placeholder="Departure Reason"
                      autocomplete="off"
                      class="text-xs rounded h-9 bg-card"
                      v-bind="componentField"
                    />
                  </FormControl>

                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>
          </div>
        </Card>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <button
                v-if="store?.result?.previousSchools?.length > 1"
                type="button"
                class="inline-flex items-center gap-2 cursor-pointer"
                @click="store.delPreviousSchool(i)"
              >
                <Icon icon="heroicons:trash" class="text-red-600 size-5" />
                <span class="sr-only">Remove Previous School</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
              <p>Delete this previous school</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>

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
