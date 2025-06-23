import Country from '#models/country'
import Curriculum from '#models/curriculum'
import Gender from '#models/gender'
import Grade from '#models/grade'
import Religion from '#models/religion'
import StudentStatus from '#models/student_status'
import Stream from 'stream'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    countryId: '114', // Default to Kenya
    country: <Country>{},
    curriculumId: '',
    curriculum: <Curriculum>{},
    genderId: '',
    gender: <Gender>{},
    gradeId: '',
    grade: <Grade>{},
    religionId: '',
    religion: <Religion>{},
    streamId: '',
    stream: <Stream>{},
    studentStatusId: '2', // Default to 'Under Admission'
    studentStatus: <StudentStatus>{},
    admissionNo: '',
    name: '',
    dob: '',
    nemisNo: '',
    dateOfAdmission: '',
    createdAt: '',
    updatedAt: '',
  },
})
