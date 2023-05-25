import api from '@/api'

const url = 'contacts';
const url_json = 'json';

export default {
  getAllContacts: () => api.get(`${url}.${url_json}`),
  newContact: (payload) => api.post(`${url}.${url_json}`, payload),
  deleteContact: (id) => api.delete(`${url}/${id}.${url_json}`),
  editContact: (id, payload) => api.put(`${url}/${id}.${url_json}`, payload),
}
