<template>
  <main>
    <b-container class="py-3 py-md-5">
        <slot />
    </b-container>
  </main>
</template>

<script>
import { BContainer } from 'bootstrap-vue'

export default {
  name: 'MainComponent',

  components: {
    BContainer
  },
}
</script>
