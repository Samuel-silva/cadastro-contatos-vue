import Vue from 'vue'
import Vuex from 'vuex'
import ApiContacts from '@/api/contacts'

Vue.use(Vuex)

const state = {
  contacts: [],
  listLoading: true,
}
const getters = {
  namesList(state) {
    const { contacts } = state;

    const names = [];
    contacts.forEach(function(contact) {
      const {id, name} = contact
      names.push({
        id,
        name
      })
    })

    return names
  },

  detailContact: (state) => (id) => {
    const detail = state.contacts.filter((contact) => contact.id === id);
    return detail[0];
  },
}
const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },

  SET_LIST_LOADING(state, payload) {
    state.listLoading = payload;
  },
}
const actions = {
  getAllContacts: async ({ commit }) => {
    const response = await ApiContacts.getAllContacts()
    commit('SET_LIST_LOADING', false);
    commit('SET_CONTACTS', response.data);
  },

  removeContact({ commit }, payload) {
    const { id, contacts } = payload;
    const newContacts = contacts.filter((item) => {
      return item.id != id;
    })
    commit('SET_CONTACTS', newContacts);
  },

  setLoading({ commit }, payload) {
    commit('SET_LIST_LOADING', payload);
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
