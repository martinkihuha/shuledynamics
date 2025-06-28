import Campus from '#models/campus'
import Country from '#models/country'
import Gender from '#models/gender'
import Relationship from '#models/relationship'
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
      supportingDocument: '',
      notes: '',
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
      supportingDocument: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    })
  },

  delEducationEntry(index: number) {
    if (this.educationEntries.length <= 1) return // Ensure at least one education entry remains
    this.educationEntries.splice(index, 1)
  },

  workExperiences: [
    {
      id: '',
      jobTitle: '',
      institution: '',
      startDate: '',
      endDate: '',
      supportingDocument: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    },
  ],

  addWorkExperience() {
    this.workExperiences.push({
      id: '',
      jobTitle: '',
      institution: '',
      startDate: '',
      endDate: '',
      supportingDocument: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    })
  },

  delWorkExperience(index: number) {
    if (this.workExperiences.length <= 1) return // Ensure at least one work experience remains
    this.workExperiences.splice(index, 1)
  },

  emergencyContacts: [
    {
      id: '',
      relationshipId: '',
      relationship: <Relationship>{},
      name: '',
      mobile: '',
      email: '',
      createdAt: '',
      updatedAt: '',
    },
  ],

  addEmergencyContact() {
    this.emergencyContacts.push({
      id: '',
      relationshipId: '',
      relationship: <Relationship>{},
      name: '',
      mobile: '',
      email: '',
      createdAt: '',
      updatedAt: '',
    })
  },

  delEmergencyContact(index: number) {
    if (this.emergencyContacts.length <= 1) return // Ensure at least one emergency contact remains
    this.emergencyContacts.splice(index, 1)
  },
})
