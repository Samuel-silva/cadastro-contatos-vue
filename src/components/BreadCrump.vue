<template>
  <b-breadcrumb class="pb-2">
    <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
    <b-breadcrumb-item active>{{ title }}</b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
import { BBreadcrumb } from 'bootstrap-vue'

export default {
  name: 'BreadCrump',

  components: {
    BBreadcrumb
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
