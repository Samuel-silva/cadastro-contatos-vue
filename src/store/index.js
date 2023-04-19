import Vue from 'vue'
import Vuex from 'vuex'
import ApiContacts from '@/api/contacts'

Vue.use(Vuex)

const state = {
  contacts: [],
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
  }
}
const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },
}
const actions = {
  getAllContacts: async ({ commit }) => {
    const response = await ApiContacts.getAllContacts()
    commit('SET_CONTACTS', response.data);
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
