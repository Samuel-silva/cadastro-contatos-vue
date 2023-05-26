<template>
  <div>
    <header-component />
    <main-component>
      <bread-crump :title="txtTitle"/>
      <div class="d-flex justify-content-sm-between flex-column flex-sm-row">
        <h2>{{ txtTitle }}</h2>
      </div>

      <b-row class="justify-content-center pt-5">
        <b-col md="8">
          <b-form @submit="onSubmit">
            <div v-if="loadingDataContact" class="loading-data d-flex justify-content-center pt-5">
              <b-spinner
                class="mt-5"
                label="Loading"
                style="width: 3rem; height: 3rem;"
                variant="primary"
              />
            </div>
            <b-form-group
              id="input-group-1"
              label="Nome:"
              label-for="input-1"
            >
              <b-form-input
                ref="nameInput"
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
                  class="mt-3 input-zipcode"
                  label="CEP:"
                  label-for="input-4"
                >
                  <b-form-input
                    ref="zipcode"
                    id="input-4"
                    v-model="form.zipCode"
                    v-mask="'#####-###'"
                    required
                    @change="queryCEP"
                  />
                  <b-spinner
                    v-if="zipCodeLoading"
                    class="flex-shrink-0 ml-2"
                    variant="info"
                  />
                </b-form-group>
                <small
                  v-if="inputZipCodeError"
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
                v-model="form.address"
                required
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
                    v-model="form.number"
                    required
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
                    v-model="form.complement"
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
                v-model="form.neighborhood"
                required
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
                    v-model="form.city"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group
                  id="input-group-10"
                  class="mt-3"
                  label="Estado:"
                  label-for="input-10"
                >
                  <b-form-input
                    id="input-10"
                    v-model="form.state"
                    required
                  />
                </b-form-group>
              </b-col>
            </b-row>

            <b-button
              type="submit"
              variant="primary"
              class="mt-4"
              :disabled="saveLoading"
            >
              <template v-if="saveLoading">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                Salvando...
              </template>
              <template v-else>
                {{ txtBtnSubmit }}
              </template>
            </b-button>
          </b-form>
        </b-col>
      </b-row>

      <b-modal
        v-model="modalFinished"
        hideHeaderClose
        noCloseOnEsc
      >
        <b-alert :variant="errorSaving ? 'danger': 'success'" show class="mb-0">
          <p class="mb-0">
            <span v-html="errorSaving ? txtModalFinishedError : txtModalFinishedSuccess" />
          </p>
        </b-alert>

        <template #modal-footer>
          <b-button
            variant="primary"
            @click="fillAgain(!errorSaving)"
          >
            Sim
          </b-button>
          <b-button
            variant="success"
            to="/"
          >
            Não, ir para tela inicial
          </b-button>
        </template>
      </b-modal>
    </main-component>
    <footer-component />
  </div>
</template>

<script>
import ApiCep from '@/api/cep'
import ApiContacts from '@/api/contacts'

import { mapActions, mapGetters, mapState } from 'vuex';
import { mask } from 'vue-the-mask'
import { BAlert, BButton, BCol, BForm, BModal, BRow, BSpinner } from 'bootstrap-vue'

import BreadCrump from '@/components/BreadCrump'
import FooterComponent from '@/components/FooterComponent'
import HeaderComponent from '@/components/HeaderComponent'
import MainComponent from '@/components/MainComponent'

export default {
  name: 'FormView',

  components: {
    BAlert,
    BButton,
    BCol,
    BForm,
    BModal,
    BRow,
    BSpinner,
    BreadCrump,
    FooterComponent,
    HeaderComponent,
    MainComponent
  },

  directives: { mask },

  data() {
    return {
      errorSaving: false,
      form: {
        name: '',
        email: '',
        phone: '',
        zipCode: '',
        number: '',
        address: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
      inputZipCodeError: false,
      loadingDataContact: false,
      modalFinished: false,
      saveLoading: false,
      txtModalNotFound: "O CEP não foi encontrado, favor preencher os campos de endereço.",
      txtModalError: "Houve um erro ao carregar as informações do endereço, favor preencher os campos de endereço.",
      zipCodeLoading: false,
    }
  },

  computed: {
    ...mapGetters(['detailContact']),
    ...mapState(['contacts']),

    newRegister() {
      return this.$route.name  === 'new-register';
    },
    txtTitle() {
      return this.newRegister ? 'Novo cadastro' : 'Editar cadastro'
    },
    txtBtnSubmit() {
      return this.newRegister ? 'Cadastrar' : 'Alterar'
    },
    txtModalFinishedError() {
      return this.newRegister ?
        "Houve um erro ao salvar o contato.<br />Deseja adicionar novamente o contato?" :
        "Houve um erro ao alterar o contato.<br />Deseja tentar alterar novamente o contato?";
    },
    txtModalFinishedSuccess() {
      return this.newRegister ?
        "Contato adicionado com sucesso.<br />Deseja adicionar um novo contato?":
        "Contato alterado com sucesso.<br />Deseja continuar na editando este contato?";
    },
  },

  watch: {
    contacts() {
      this.getDetailContact(this.$route.params);
    },
  },

  created () {
    if (this.$route.name === 'edit-register') {
      this.loadingDataContact = true;
      if (this.contacts.length === 0) {
        this.getAllContacts();
      } else {
        this.getDetailContact(this.$route.params);
      }
    }
  },

  methods: {
    ...mapActions(['getAllContacts']),

    clearForm() {
      const objClear = Object.keys(this.form).reduce((acc, curr) => ({...acc, [curr]: ""}), {});
      this.form = objClear;
    },

    async createNewContact(form) {
      this.errorSaving = false;
      this.saveLoading = true;

      await ApiContacts.newContact(form)
        .then()
        .catch(() => {
          this.errorSaving = true;
        })
        .finally(() => {
          this.modalFinished = true;
          this.saveLoading = false;
        })
    },

    async editContact(form) {
      this.errorSaving = false;
      this.saveLoading = true;

      await ApiContacts.editContact(this.$route.params.id, form)
        .then()
        .catch(() => {
          this.errorSaving = true;
        })
        .finally(() => {
          this.modalFinished = true;
          this.saveLoading = false;
        })
    },

    fillAgain(clear) {
      if (clear && this.newRegister) {
        this.clearForm();
      }
      this.modalFinished = false;
      this.$refs.nameInput.focus();
    },

    getDetailContact(id) {
      const detail = this.detailContact(id.id);
      Object.assign(this.form, detail);
      this.loadingDataContact = false;
    },

    onSubmit(event) {
      event.preventDefault();

      if (this.newRegister) {
        this.createNewContact(this.form);
      } else {
        this.editContact(this.form);
      }
    },

    async queryCEP(number) {
      const numberFormart = number.replace(/-/g, '');
      this.inputZipCodeError = false;

      if (numberFormart.length != 8) {
        this.$refs.zipcode.focus();
        this.inputZipCodeError = true;
      } else {
        this.zipCodeLoading = true;
        await ApiCep.queryCep(numberFormart)
          .then((resp) => {
            if (resp.data?.erro) {
              this.showModal(this.txtModalNotFound);
            } else {
              const { logradouro: address, bairro: neighborhood, localidade: city, uf: state } = resp.data;
              Object.assign(this.form, { address, neighborhood, city, state });
            }
          })
          .catch(() => {
            this.showModal(this.txtModalError);
          })
          .finally(() => {
            this.zipCodeLoading = false;
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
.input-zipcode {
  > div {
    align-items: center;
    display: flex
  }
}
</style>

<style lang="scss" scope>
.loading-data {
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  left: -5px;
  position: absolute;
  top: -5px;
  width: 100%;
  z-index: 10;
}
</style>
