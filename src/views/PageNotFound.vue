<template>
  <div>
    <header-component cssClassName="bg-primary text-white" :msg="txtHeader" />
    <main-component>
      <h2 class="text-center py-5">{{ txtMain }}</h2>
      <div class="text-center pt-lg-4 pt-sm-2">
        <b-button
          size="lg"
          squared
          to="/"
          variant="outline-primary"
        >
          {{ txtBtn }}
        </b-button>
      </div>
    </main-component>
    <footer-component />
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'

import FooterComponent from '@/components/FooterComponent'
import HeaderComponent from '@/components/HeaderComponent'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'PageNotFound',

  components: {
    BButton,
    FooterComponent,
    HeaderComponent,
    MainComponent
  },

  data() {
    return {
      txtHeader: "404: Página não encontrada",
      txtMain: "A página que você estava procurando não foi encontrada.",
      txtBtn: "Ir para página inicial"
    }
  },
}
</script>
