<template>
  <div class="text-center">
    <template v-if="contactsErrorApi">
      <b-icon icon="exclamation-circle" variant="warning" class="h1" style="width: 80px; height: 80px;" />
      <h2>Desculpe, mas houve um erro ao buscar os dados!</h2>
      <p>Tente novamente mais tarde.</p>
    </template>
    <template v-else>
      <b-icon icon="person" variant="primary" style="width: 80px; height: 80px;" />
      <h2>Você ainda não possui nenhum contato cadastrado.</h2>
      <p>Clique no botão abaixo para começar a cadastrar seus contatos.</p>
      <router-link
        class="btn btn-success btn-lg mt-sm-0 mt-2 align-self-end align-self-sm-center"
        :to="{ name: 'new-register' }"
      >
        <span class="pr-3">Adicionar</span>
        <b-icon icon="person-plus" />
      </router-link>
    </template>
  </div>
</template>

<script>
import { BIcon } from 'bootstrap-vue'
import { mapState } from 'vuex';

export default {
  name: 'NotFoundContacts',

  components: {
    BIcon
  },

  computed: {
    ...mapState(['contactsErrorApi']),
	},
}
</script>
