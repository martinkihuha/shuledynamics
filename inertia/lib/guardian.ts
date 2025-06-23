import Country from '#models/country'
import Relationship from '#models/relationship'
import Religion from '#models/religion'
import Salutation from '#models/salutation'
import { reactive } from 'vue'

export const store = reactive({
  result: {
    id: '',
    countryId: '114', // Default to Kenya
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
})
