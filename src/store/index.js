import Vue from 'vue'
import Vuex from 'vuex'
import ApiContacts from '@/api/contacts'

Vue.use(Vuex)

const state = {
  contacts: [],
  contactsErrorApi: false,
  listLoading: true,
}

const getters = {
  namesList(state) {
    const { contacts } = state;

    const names = contacts.reduce((namesArray, contact) => {
      const {id, name} = contact;
      return [...namesArray, {id, name}];
    }, []);

    return names;
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

  SET_CONTACTS_ERROR_API(state, payload) {
    state.contactsErrorApi = payload;
  },
}

const actions = {
  getAllContacts: async ({ commit }) => {
    commit('SET_CONTACTS_ERROR_API', false);
    await ApiContacts.getAllContacts()
      .then((response) => {
        commit('SET_CONTACTS', response.data);
      })
      .catch(() => {
        commit('SET_CONTACTS_ERROR_API', true);
      })
      .finally(() => {
        commit('SET_LIST_LOADING', false);
      })
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
