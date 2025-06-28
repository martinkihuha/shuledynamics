import Campus from '#models/campus'
import Country from '#models/country'
import Gender from '#models/gender'
import Religion from '#models/religion'
import Salutation from '#models/salutation'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    campusId: '', // Will be set based on the user's campus
    campus: <Campus>{},
    countryId: '',
    country: <Country>{},
    genderId: '',
    gender: <Gender>{},
    religionId: '',
    religion: <Religion>{},
    salutationId: '',
    salutation: <Salutation>{},
    nationalId: '',
    name: '',
    mobile: '',
    email: '',
    location: '',
    postalAddress: '',
    postalCode: '',
    pinNumber: '',
    nssfNumber: '',
    nhifNumber: '',
    createdAt: '',
    updatedAt: '',
  },

  educationEntries: [
    {
      id: '',
      institution: '',
      qualification: '',
      startDate: '',
      endDate: '',
      createdAt: '',
      updatedAt: '',
    },
  ],

  addEducationEntry() {
    this.educationEntries.push({
      id: '',
      institution: '',
      qualification: '',
      startDate: '',
      endDate: '',
      createdAt: '',
      updatedAt: '',
    })
  },

  delEducationEntry(index: number) {
    if (this.educationEntries.length <= 1) return // Ensure at least one education entry remains
    this.educationEntries.splice(index, 1)
  },
})
