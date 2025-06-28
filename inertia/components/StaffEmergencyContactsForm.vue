<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { store } from '@/lib/staff'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import Relationship from '#models/relationship'

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

const relationships = ref<Relationship[]>([])

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

onMounted(() => {
  fetchRelationships()
})

const emergencyContactSchema = z.object({
  relationshipId: z.string().refine((v) => !!v, { message: 'Invalid Relationship' }),
  name: z.string().refine((v) => !!v, { message: 'Invalid Name' }),
  mobile: z.string().refine((v) => !!v, { message: 'Invalid Mobile' }),
})

const formSchema = z.object({
  emergencyContacts: z
    .array(emergencyContactSchema)
    .nonempty({ message: 'At least one emergency contact entry is required' }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    emergencyContacts: [
      {
        relationshipId: '',
        name: '',
        mobile: '',
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
      router.post('/emergencyContacts', values, {
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

    <Card
      v-for="(item, i) in store?.emergencyContacts"
      :key="i"
      class="p-4 rounded bg-muted dark:bg-card"
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          v-model="item.name"
          v-slot="{ componentField }"
          :name="`emergencyContacts[${i}].name`"
        >
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Name
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Name"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField
          v-model="item.relationshipId"
          v-slot="{ componentField }"
          :name="`emergencyContacts[${i}].relationshipId`"
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
                  v-for="relationship in relationships"
                  :key="relationship?.id"
                  :value="relationship?.id?.toString()"
                  class="text-xs"
                >
                  {{ relationship?.name }}
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField
          v-model="item.mobile"
          v-slot="{ componentField }"
          :name="`emergencyContacts[${i}].mobile`"
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

        <FormField
          v-model="item.email"
          v-slot="{ componentField }"
          :name="`emergencyContacts[${i}].email`"
        >
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

        <div class="flex items-center justify-center gap-2 sm:col-span-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger as-child>
                <button
                  type="button"
                  class="h-8 bg-secondary text-secondary-foreground text-xs rounded-[2px] flex items-center gap-2 px-4 hover:ring-2 hover:ring-offset-2 hover:ring-secondary dark:hover:ring-offset-black transition-all duration-300"
                  @click="store.addEmergencyContact"
                >
                  <Icon icon="heroicons:plus" class="size-4" />
                  <span>Add another Emergency Contact</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                <p>Add another Emergency Contact</p>
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
                    store?.emergencyContacts?.length < 2
                      ? 'bg-red-600/30 cursor-not-allowed'
                      : 'bg-red-600 hover:ring-2 hover:ring-offset-2 hover:ring-red-600 dark:hover:ring-offset-black transition-all duration-300'
                  "
                  :disable="store?.emergencyContacts?.length < 2"
                  @click="store.delEmergencyContact(i)"
                >
                  <Icon icon="heroicons:trash" class="size-4" />
                  <span>Remove this Emergency Contact</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                <p v-if="store?.emergencyContacts?.length < 2" class="flex items-center gap-2">
                  <Icon icon="heroicons:lock-closed-solid" class="text-base text-primary" />
                  <span>
                    <span class="text-primary">Locked:</span>
                    Must have atleast 1 emergency contact
                  </span>
                </p>
                <p v-else>Delete this emergency contact</p>
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
            <p>Validate and save this staff's emergency contacts</p>
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
