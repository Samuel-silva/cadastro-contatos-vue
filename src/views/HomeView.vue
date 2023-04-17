<template>
  <div>
    <header-component :msg="txtHeader" />
    <main-component>
      <h2>Clientes cadastrados</h2>
    </main-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'HomeView',

  components: {
    HeaderComponent,
    MainComponent
  },

  data() {
    return {
      txtHeader: "Cadastro"
    }
  },
}
</script>
