import api from '@/api'
const key = '2d1a8187-4905-4fab-9f04-988ba9c7b059';

export default {
  getAllContacts: () => api.get(key),
  newContact: (payload) => api.post(key, payload),
  deleteContact: (id) => api.delete(`${key}/${id}`),
  editContact: (id, payload) => api.put(`${key}/${id}`, payload),
}
