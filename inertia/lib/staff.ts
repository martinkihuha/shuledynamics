import Campus from '#models/campus'
import Country from '#models/country'
import Gender from '#models/gender'
import Grade from '#models/grade'
import Religion from '#models/religion'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    campusId: '', // Will be set based on the user's campus
    campus: <Campus>{},
    countryId: '114', // Default to Kenya
    country: <Country>{},
    genderId: '',
    gender: <Gender>{},
    gradeId: '',
    grade: <Grade>{},
    religionId: '',
    religion: <Religion>{},
    admissionNo: '',
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
