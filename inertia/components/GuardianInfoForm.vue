<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { store } from '@/lib/student'
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
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const isLoading = ref(false)
const countries = ref<Country[]>([])
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
  fetchRelationships()
  fetchReligions()
  fetchSalutations()
})

const guardianSchema = z.object({
  countryId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Nationality' }),
  relationshipId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Relationship' }),
  religionId: z.union([z.number(), z.string()]).refine((v) => !!v, { message: 'Invalid Religion' }),
  salutationId: z
    .union([z.number(), z.string()])
    .refine((v) => !!v, { message: 'Invalid Salutation' }),
  name: z.string().refine((v) => !!v, { message: 'Invalid Name' }),
  email: z.string().refine((v) => !!v, { message: 'Invalid Email' }),
  mobile: z.string().refine((v) => !!v, { message: 'Invalid Mobile Number' }),
  location: z.string().refine((v) => !!v, { message: 'Invalid Location' }),
})

const formSchema = z.object({
  guardians: z.array(guardianSchema).nonempty({ message: 'At least one guardian is required' }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    guardians: [
      {
        countryId: '',
        relationshipId: '',
        religionId: '',
        salutationId: '',
        name: '',
        mobile: '',
        email: '',
        location: '',
      },
    ],
  },
})

const onSubmit = handleSubmit((values) => {
  if (isLoading?.value) return // Prevent multiple submissions if already loading

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

    <Card v-for="(item, i) in store?.guardians" :key="i" class="p-4 rounded bg-muted dark:bg-card">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-6">
        <div class="sm:col-span-2">
          <FormField
            v-model="item.salutationId"
            v-slot="{ componentField }"
            :name="`guardians[${i}].salutationId`"
          >
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
          <FormField v-model="item.name" v-slot="{ componentField }" :name="`guardians[${i}].name`">
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
        </div>

        <div class="sm:col-span-2">
          <FormField
            v-model="item.relationshipId"
            v-slot="{ componentField }"
            :name="`guardians[${i}].relationshipId`"
          >
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1">
                <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
                Relationship
              </FormLabel>

              <Select v-bind="componentField">
                <FormControl class="rounded bg-card">
                  <SelectTrigger class="w-full">
                    <SelectValue placeholder="Relationship" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    v-for="item in relationships"
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
          <FormField
            v-model="item.mobile"
            v-slot="{ componentField }"
            :name="`guardians[${i}].mobile`"
          >
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
        </div>

        <div class="sm:col-span-2">
          <FormField
            v-model="item.email"
            v-slot="{ componentField }"
            :name="`guardians[${i}].email`"
          >
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
        </div>

        <div class="sm:col-span-2">
          <FormField
            v-model="item.religionId"
            v-slot="{ componentField }"
            :name="`guardians[${i}].religionId`"
          >
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
          <FormField
            v-model="item.location"
            v-slot="{ componentField }"
            :name="`guardians[${i}].location`"
          >
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
          <FormField
            v-model="item.countryId"
            v-slot="{ componentField }"
            :name="`guardians[${i}].countryId`"
          >
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

        <div class="sm:col-span-6">
          <FormField
            v-model="item.notes"
            v-slot="{ componentField }"
            :name="`guardians[${i}].notes`"
          >
            <FormItem class="flex flex-col gap-1">
              <FormLabel class="text-[10px] flex items-center gap-1 pl-3">
                <!-- <Icon icon="mdi:asterisk" class="text-red-500 size-2" /> -->
                Notes
              </FormLabel>

              <FormControl class="text-xs">
                <Textarea
                  placeholder="Notes"
                  autocomplete="off"
                  class="text-xs rounded bg-card"
                  v-bind="componentField"
                />
              </FormControl>

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
                  @click="store.addGuardian"
                >
                  <Icon icon="heroicons:plus" class="size-4" />
                  <span>Add another Guardian</span>
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
                  class="h-8 text-red-50 text-xs rounded-[2px] flex items-center gap-2 px-4"
                  :class="
                    store?.guardians?.length < 2
                      ? 'bg-red-600/30 cursor-not-allowed'
                      : 'bg-red-600 hover:ring-2 hover:ring-offset-2 hover:ring-red-600 dark:hover:ring-offset-black transition-all duration-300'
                  "
                  :disable="store?.guardians?.length < 2"
                  @click="store.delGuardian(i)"
                >
                  <Icon icon="heroicons:trash" class="size-4" />
                  <span>Remove this Guardian</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                <p v-if="store?.guardians?.length < 2">
                  class="flex items-center gap-2">
                  <Icon icon="heroicons:lock-closed-solid" class="text-base text-primary" />
                  <span>
                    <span class="text-primary">Locked:</span>
                    Must have atleast 1 guardian
                  </span>
                </p>
                <p v-else>Delete this guardian</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
