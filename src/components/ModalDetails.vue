<template>
  <b-modal v-model="openModal" size="lg">
    <h2>
      <b-icon icon="person" variant="primary" />
      {{ detail.name }}
    </h2>
    <p class="mb-1">{{ detail.phone }}</p>
    <p>{{ detail.email }}</p>
    <p class="pt-4 h5">Endereço</p>
    <hr class="my-1" />
    <p class="mb-1">{{ addressStreet }}</p>
    <p class="mb-1">{{ detail.neighborhood }} - {{ detail.city }}/{{ detail.state }}</p>
    <p>CEP: {{ detail.zipCode }}</p>

    <template #modal-footer>
      <b-button
        variant="primary"
        @click="openModal = false"
      >
        Fechar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import { BIcon, BModal } from 'bootstrap-vue'

export default {
  name: 'ModalDetails',

  components: {
    BIcon,
    BModal
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    showModal: {
      type: Boolean,
      required: true,
    }
  },

  computed: {
    ...mapGetters(['detailContact']),

    detail() {
      return this.detailContact(this.id);
    },

    addressStreet() {
      const { address, number, complement } = this.detail;
      if (complement) return `${address}, ${number} - ${complement}`;
      return `${address}, ${number}`
    },

    openModal: {
      get() {
        return this.showModal;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
}
</script>
