<template>
  <div>
    <header-component />
    <main-component>
      <div class="d-flex justify-content-sm-between flex-column flex-sm-row">
        <h2>{{ txtTitle }}</h2>
      </div>
    </main-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'FormView',

  components: {
    HeaderComponent,
    MainComponent
  },

  data() {
    return {
      txtTitle: "Novo cadastro",
    }
  },
}
</script>
