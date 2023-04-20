<template>
  <div>
    <header-component />
    <main-component>
      <div class="d-flex justify-content-sm-between flex-column flex-sm-row">
        <h2>{{ txtTitle }}</h2>

        <router-link
          class="btn btn-success mt-sm-0 mt-2 align-self-end align-self-sm-center"
          :to="{ name: 'new-edit-register' }"
        >
          <span class="pr-3">{{ txtBtn }}</span>
          <b-icon icon="person-plus" />
        </router-link>
      </div>
      <list-contacts />
    </main-component>
    <footer-component />
  </div>
</template>

<script>
import { BIcon } from 'bootstrap-vue'

import FooterComponent from '@/components/FooterComponent'
import HeaderComponent from '@/components/HeaderComponent'
import ListContacts from '@/components/ListContacts'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'HomeView',

  components: {
    BIcon,
    FooterComponent,
    HeaderComponent,
    ListContacts,
    MainComponent,
  },

  data() {
    return {
      txtTitle: "Seus cadastrados",
      txtBtn: "Adicionar"
    }
  },
}
</script>
