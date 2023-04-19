import api from '@/api'

export default {
  getAllContacts: () => api.get('contacts'),
  newContact: (payload) => api.post('contacts', payload),
}
