import api from '@/api'

export default {
  getAllContacts: () => api.get('contacts'),
  newContact: (payload) => api.post('contacts', payload),
  deleteContact: (id) => api.delete(`contacts/${id}`),
  editContact: (id, payload) => api.put(`contacts/${id}`, payload),
}
