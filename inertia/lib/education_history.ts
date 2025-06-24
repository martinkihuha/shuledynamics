import County from '#models/county'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    previousSchools: [
      {
        countyId: '',
        county: <County>{},
        schoolName: '',
        yearOfAdmission: '',
        yearOfDeparture: '',
        classOfDeparture: '',
        departureReason: '',
        leavingCertificate: '',
        extraActivities: false,
        createdAt: '',
        updatedAt: '',
      },
    ],
  },

  addPreviousSchool() {
    this.result.previousSchools.push({
      countyId: '',
      county: <County>{},
      schoolName: '',
      yearOfAdmission: '',
      yearOfDeparture: '',
      classOfDeparture: '',
      departureReason: '',
      leavingCertificate: '',
      extraActivities: false,
      createdAt: '',
      updatedAt: '',
    })
  },

  delPreviousSchool(index: number) {
    this.result.previousSchools.splice(index, 1)
  },
})
