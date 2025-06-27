import AcademicTerm from '#models/academic_term'
import Country from '#models/country'
import County from '#models/county'
import Curriculum from '#models/curriculum'
import DepartureReason from '#models/departure_reason'
import Gender from '#models/gender'
import Grade from '#models/grade'
import Relationship from '#models/relationship'
import Religion from '#models/religion'
import Salutation from '#models/salutation'
import StudentStatus from '#models/student_status'
import Stream from 'stream'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    countryId: '',
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

  guardians: [
    {
      id: '',
      countryId: '',
      country: <Country>{},
      relationshipId: '',
      relationship: <Relationship>{},
      religionId: '',
      religion: <Religion>{},
      salutationId: '',
      salutation: <Salutation>{},
      name: '',
      mobile: '',
      email: '',
      location: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    },
  ],

  addGuardian() {
    this.guardians.push({
      id: '',
      countryId: '',
      country: <Country>{},
      relationshipId: '',
      relationship: <Relationship>{},
      religionId: '',
      religion: <Religion>{},
      salutationId: '',
      salutation: <Salutation>{},
      name: '',
      mobile: '',
      email: '',
      location: '',
      notes: '',
      createdAt: '',
      updatedAt: '',
    })
  },

  delGuardian(index: number) {
    if (this.guardians.length < 2) return
    this.guardians.splice(index, 1)
  },

  anyPreviousSchool: false,

  previousSchools: [
    {
      id: '',
      countyId: '',
      county: <County>{},
      curriculumId: '',
      curriculum: <Curriculum>{},
      departureReasonId: '',
      departureReason: <DepartureReason>{},
      gradeId: '',
      grade: <Grade>{},
      schoolName: '',
      dateOfAdmission: '',
      dateOfDeparture: '',
      leavingCertificate: '',
      extraActivities: false,
      createdAt: '',
      updatedAt: '',
    },
  ],

  addPreviousSchool() {
    this.previousSchools.push({
      id: '',
      countyId: '',
      county: <County>{},
      curriculumId: '',
      curriculum: <Curriculum>{},
      departureReasonId: '',
      departureReason: <DepartureReason>{},
      gradeId: '',
      grade: <Grade>{},
      schoolName: '',
      dateOfAdmission: '',
      dateOfDeparture: '',
      leavingCertificate: '',
      extraActivities: false,
      createdAt: '',
      updatedAt: '',
    })
  },

  delPreviousSchool(index: number) {
    this.previousSchools.splice(index, 1)
  },

  classInfo: {
    id: '',
    academicTermId: '',
    academicTerm: <AcademicTerm>{},
    curriculumId: '',
    curriculum: <Curriculum>{},
    streamId: '',
    stream: <Stream>{},
    admissionClass: '',
    classTeacher: '',
    createdAt: '',
    updatedAt: '',
  },
})
