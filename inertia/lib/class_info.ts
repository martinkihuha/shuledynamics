import AcademicTerm from '#models/academic_term'
import Curriculum from '#models/curriculum'
import Stream from 'stream'
import { reactive } from 'vue'

export const store = reactive({
  result: {
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
