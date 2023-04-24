import api from '@/api'
const keySuccess = '2d1a8187-4905-4fab-9f04-988ba9c7b059';
const keyError = '84639b56-2779-48a9-8cd9-632baa9b52ff';

export default {
  getAllContacts: () => api.get(keySuccess),
  newContact: (payload) => api.post(keyError, payload),
  deleteContact: (id) => api.delete(`${keyError}/${id}`),
  editContact: (id, payload) => api.put(`${keyError}/${id}`, payload),
}
