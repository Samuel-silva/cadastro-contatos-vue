<template>
  <header :class="`header ${defaultCssClass}`">
    <b-container class="py-xl-5 py-lg-4 py-md-3 py-sm-2">
      <h1 class="py-5">{{ msg }}</h1>
    </b-container>
  </header>
</template>

<script>
import { BContainer } from 'bootstrap-vue'

export default {
  name: 'HeaderComponent',

  components: {
    BContainer
  },

  props: {
    msg: {
      type: String,
      required: true,
    },
    cssClassName: {
      type: String,
      default: ''
    }
  },

  computed: {
    defaultCssClass() {
      if (!this.cssClassName) return 'bg-primary text-white';
      return this.cssClassName;
    }
  },
}
</script>
