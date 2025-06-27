<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/staff'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import Country from '#models/country'
import Relationship from '#models/relationship'
import Religion from '#models/religion'
import Salutation from '#models/salutation'

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
import Gender from '#models/gender'

const isLoading = ref(false)
const countries = ref<Country[]>([])
const genders = ref<Gender[]>([])
const relationships = ref<Relationship[]>([])
const religions = ref<Religion[]>([])
const salutations = ref<Salutation[]>([])

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

const fetchRelationships = async () => {
  try {
    const response = await fetch('/api/relationships', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    relationships.value = await response.json()
  } catch (error) {
    console.error('Error fetching relationships:', error)
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

const fetchSalutations = async () => {
  try {
    const response = await fetch('/api/salutations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    salutations.value = await response.json()
  } catch (error) {
    console.error('Error fetching salutations:', error)
  }
}

onMounted(() => {
  fetchCountries()
  fetchGenders()
  fetchRelationships()
  fetchReligions()
  fetchSalutations()
})

const formSchema = z.object({
  countryId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Nationality' }),
  genderId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Gender' }),
  religionId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Religion' }),
  salutationId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Salutation' }),
  nationalId: z.string().refine((v) => !!v, { message: 'Invalid National ID' }),
  name: z.string().refine((v) => !!v, { message: 'Invalid Name' }),
  location: z.string().refine((v) => !!v, { message: 'Invalid Location' }),
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
  <form class="space-y-4" @submit="onSubmit">
    <p class="flex items-center justify-start gap-1 text-xs">
      <span class="font-semibold text-red-500">Note:</span> All fields marked with an asterisk
      (<Icon icon="mdi:asterisk" class="-mx-1 text-red-500 size-2" />) are required!
    </p>

    <Card class="p-4 rounded bg-muted dark:bg-card">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="salutationId">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1">
                <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                Salutation
              </FormLabel>

              <Select v-bind="componentField">
                <FormControl class="rounded bg-card">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Salutation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    v-for="item in salutations"
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

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1">
                <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                Full Name
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="Full Name"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
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
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="nationalId">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1">
                <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                National ID
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="National ID"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="mobile">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
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
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
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
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="pinNumber">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                PIN Number
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="PIN Number"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="nssfNumber">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                NSSF Number
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="NSSF Number"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="shifNumber">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                SHIF Number
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="SHIF Number"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
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
        </div>

        <div class="sm:col-span-4">
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
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="postalAddress">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                Postal Address
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="Postal Address"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
          <FormField v-slot="{ componentField }" name="postalCode">
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                Postal Code
              </FormLabel>

              <FormControl class="text-xs">
                <Input
                  type="text"
                  placeholder="Postal Code"
                  autocomplete="off"
                  class="text-xs rounded h-9 bg-card"
                  v-bind="componentField"
                />
              </FormControl>

              <FormMessage class="text-xs" />
            </FormItem>
          </FormField>
        </div>

        <div class="sm:col-span-2">
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
        </div>
      </div>
    </Card>

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
            <p>Validate and save this staff's information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Link
              href="/staff"
              class="h-9 bg-muted-foreground text-muted text-xs rounded-[2px] flex items-center gap-2 px-8 hover:ring-2 hover:ring-offset-2 hover:ring-muted-foreground dark:hover:ring-offset-black transition-all duration-300"
            >
              <Icon icon="heroicons:no-symbol-16-solid" class="size-4" />
              <span>Cancel</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
            <p>Reset and return to the staff listing</p>
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
