<template>
  <div>
    <header-component />
    <main-component>
      <div class="d-flex justify-content-sm-between flex-column flex-sm-row">
        <h2>{{ txtTitle }}</h2>
      </div>

      <b-row class="justify-content-center pt-5">
        <b-col md="8">
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Nome:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                required
              />
            </b-form-group>

            <b-form-group
              id="input-group-2"
              class="mt-3"
              label="E-mail:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.email"
                type="email"
                required
              />
            </b-form-group>

            <b-row>
              <b-col md="6">
                <b-form-group
                  id="input-group-3"
                  class="mt-3"
                  label="Telefone:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.phone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                    required
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="6">
                <b-form-group
                  id="input-group-4"
                  class="mt-3 input-cep"
                  label="CEP:"
                  label-for="input-4"
                >
                  <b-form-input
                    ref="cep"
                    id="input-4"
                    v-model="form.cep"
                    v-mask="'#####-###'"
                    required
                    @change="getCEP"
                  />
                  <b-icon
                    v-if="cepLoading"
                    animation="spin"
                    class="ms-1 text-info"
                    font-scale="2"
                    icon="arrow-repeat"
                  />
                </b-form-group>
                <small
                  v-if="inputCepErro"
                  class="text-danger"
                >
                  O CEP deve conter 9 números.
                </small>
              </b-col>
            </b-row>

            <b-form-group
              id="input-group-5"
              class="mt-3"
              label="Endereço:"
              label-for="input-5"
            >
              <b-form-input
                id="input-5"
                v-model="form.logradouro"
                required
                :disabled="inputDisabled"
              />
            </b-form-group>

            <b-row>
              <b-col md="5">
                <b-form-group
                  id="input-group-6"
                  class="mt-3"
                  label="Número:"
                  label-for="input-6"
                >
                  <b-form-input
                    id="input-6"
                    v-model="form.numero"
                    required
                    :disabled="inputDisabled"
                  />
                </b-form-group>
              </b-col>
              <b-col md="7">
                <b-form-group
                  id="input-group-7"
                  class="mt-3"
                  label="Complemento:"
                  label-for="input-7"
                >
                  <b-form-input
                    id="input-7"
                    v-model="form.complemento"
                    :disabled="inputDisabled"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group
              id="input-group-8"
              class="mt-3"
              label="Bairro:"
              label-for="input-8"
            >
              <b-form-input
                id="input-8"
                v-model="form.bairro"
                required
                :disabled="inputDisabled"
              />
            </b-form-group>

            <b-row>
              <b-col md="8">
                <b-form-group
                  id="input-group-9"
                  class="mt-3"
                  label="Cidade:"
                  label-for="input-9"
                >
                  <b-form-input
                    id="input-9"
                    v-model="form.localidade"
                    required
                    :disabled="inputDisabled"
                  />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  id="input-group-8"
                  class="mt-3"
                  label="Estado:"
                  label-for="input-8"
                >
                  <b-form-input
                    id="input-8"
                    v-model="form.uf"
                    required
                    :disabled="inputDisabled"
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4">Cadastrar</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-modal />
    </main-component>
  </div>
</template>

<script>
import axios from 'axios'
import { mask } from 'vue-the-mask'
import { BButton, BCol, BForm, BIcon, BModal, BRow } from 'bootstrap-vue'

import HeaderComponent from '@/components/HeaderComponent'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'FormView',

  components: {
    BButton,
    BCol,
    BForm,
    BIcon,
    BModal,
    BRow,
    HeaderComponent,
    MainComponent
  },

  directives: { mask },

  data() {
    return {
      cepLoading: false,
      form: {
        name: '',
        email: '',
        phone: '',
        cep: '',
        numero: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
      },
      inputCepErro: false,
      inputDisabled: true,
      txtTitle: "Novo cadastro",
      txtModalNotFound: "O CEP não foi encontrado, favor preencher os campos de endereço.",
      txtModalErro: "Houve um erro ao carregar as informações do endereço, favor preencher os campos de endereço."
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },

    getCEP(number) {
      const cep = number.replace(/-/g, '');
      if (cep.length != 8) {
        this.$refs.cep.focus();
        this.inputCepErro = true;
      } else {
        this.cepLoading = true;
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((resp) => {
            if (resp.data?.erro) {
              this.showModal(this.txtModalNotFound);
            } else {
              const { logradouro, bairro, localidade, uf } = resp.data;
              Object.assign(this.form, { logradouro, bairro, localidade, uf });
            }
          })
          .catch(() => {
            this.showModal(this.txtModalErro);
          })
          .finally(() => {
            this.cepLoading = false;
            this.inputDisabled = false;
          })
      }
    },

    showModal(title) {
      this.$bvModal.msgBoxOk(title, {
        centered: true,
        okVariant: 'success'
      })
    },
  },
}
</script>

<style lang="scss">
.input-cep {
  > div {
    align-items: center;
    display: flex
  }
}
</style>
