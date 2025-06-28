<script setup lang="ts">
import { ref } from 'vue'
import { store } from '@/lib/staff'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { router } from '@inertiajs/vue3'

import { Card } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const isLoading = ref(false)
const today = new Date().toISOString().split('T')[0]

const educationSchema = z.object({
  institution: z.string().refine((v) => !!v, { message: 'Invalid Institution' }),
  qualification: z.string().refine((v) => !!v, { message: 'Invalid Qualification' }),
  startDate: z.string().refine((v) => !!v, { message: 'Invalid Start Date' }),
  endDate: z.string().refine((v) => !!v, { message: 'Invalid End Date' }),
})

const formSchema = z.object({
  educationEntries: z
    .array(educationSchema)
    .nonempty({ message: 'At least one education entry is required' }),
})

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    educationEntries: [
      {
        institution: '',
        qualification: '',
        startDate: '',
        endDate: '',
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

    <Card
      v-for="(item, i) in store?.educationEntries"
      :key="i"
      class="p-4 rounded bg-muted dark:bg-card"
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          v-model="item.institution"
          v-slot="{ componentField }"
          :name="`educationEntries[${i}].institution`"
        >
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Institution
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Institution"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField
          v-model="item.qualification"
          v-slot="{ componentField }"
          :name="`educationEntries[${i}].qualification`"
        >
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Qualification
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="text"
                placeholder="Qualification"
                autocomplete="off"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField
          v-model="item.startDate"
          v-slot="{ componentField }"
          :name="`educationEntries[${i}].startDate`"
        >
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              Start Date
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="date"
                placeholder="Start Date"
                autocomplete="off"
                :max="today"
                class="text-xs rounded h-9 bg-card"
                v-bind="componentField"
              />
            </FormControl>

            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>

        <FormField
          v-model="item.endDate"
          v-slot="{ componentField }"
          :name="`educationEntries[${i}].endDate`"
        >
          <FormItem class="flex flex-col gap-1">
            <FormLabel class="text-[10px] flex items-center gap-1">
              <Icon icon="mdi:asterisk" class="text-red-500 size-2" />
              End Date
            </FormLabel>

            <FormControl class="text-xs">
              <Input
                type="date"
                placeholder="End Date"
                autocomplete="off"
                :max="today"
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
                  @click="store.addEducationEntry"
                >
                  <Icon icon="heroicons:plus" class="size-4" />
                  <span>Add another Education Entry</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                <p>Add another Education Entry</p>
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
                    store?.educationEntries?.length < 2
                      ? 'bg-red-600/30 cursor-not-allowed'
                      : 'bg-red-600 hover:ring-2 hover:ring-offset-2 hover:ring-red-600 dark:hover:ring-offset-black transition-all duration-300'
                  "
                  :disable="store?.educationEntries?.length < 2"
                  @click="store.delEducationEntry(i)"
                >
                  <Icon icon="heroicons:trash" class="size-4" />
                  <span>Remove this Education Entry</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" class="border bg-card text-muted-foreground">
                <p v-if="store?.educationEntries?.length < 2" class="flex items-center gap-2">
                  <Icon icon="heroicons:lock-closed-solid" class="text-base text-primary" />
                  <span>
                    <span class="text-primary">Locked:</span>
                    Must have atleast 1 education entry
                  </span>
                </p>
                <p v-else>Delete this education entry</p>
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
            <p>Validate and save this staff's education entries</p>
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
