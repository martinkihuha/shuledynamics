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
})
