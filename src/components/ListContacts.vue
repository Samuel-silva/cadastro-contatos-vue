<template>
	<div class="mt-5">
		<template v-if="listLoading">
			<b-skeleton
				v-for="index in 5" :key="index"
				class="my-3"
				type="input"
			/>
		</template>
		<template v-else>
			<b-list-group v-if="contacts.length > 0">
				<b-list-group-item
					v-for="item in namesList"
					:key="item.id"
					class="d-flex justify-content-between align-items-center py-3"
				>
					<p class="mb-0">
						{{ item.name }}
					</p>
					<div class="pl-2 d-flex">
						<b-button
							variant="outline-success"
							v-b-tooltip.hover.v-success
							title="Visualizar"
							@click="openModalDetail(item.id)"
						>
							<b-icon icon="eye" />
						</b-button>
						<b-button
							variant="outline-primary"
							class="mx-2"
							v-b-tooltip.hover.v-primary
							title="Editar"
							:to="`edit/${item.id}`"
						>
							<b-icon icon="pencil-square" />
						</b-button>
						<b-button
							variant="outline-danger"
							v-b-tooltip.hover.v-danger
							title="Excluir"
							@click="openModalDelete(item.id)"
						>
							<b-icon icon="trash" />
						</b-button>
					</div>

				</b-list-group-item>
			</b-list-group>
			<not-found-contacts v-else />
		</template>

		<b-modal
			v-model="modalDelete"
			hideHeaderClose
		>
			<b-alert v-if="deleteError" variant="danger" show class="mb-0">
				<p class="mb-0">{{ txtModalDeleteError }}</p>
      </b-alert>
			<p v-else class="mb-0">{{ txtModalDelete }}</p>

			<template #modal-footer>
				<b-button
					v-if="!deleteError"
					variant="success"
					@click="deleteContact()"
				>
					Sim
				</b-button>
				<b-button
					:variant="deleteError ? 'success' : 'danger'"
					@click="modalDelete = false"
				>
					<template v-if="deleteError">Ok</template>
					<template v-else>Não</template>
				</b-button>
			</template>
		</b-modal>

		<modal-details
			v-if="detailModal"
			:id="detailId"
			:showModal="detailModal"
			@change="value => detailModal = value"
		/>
	</div>
</template>

<script>
import ApiContacts from '@/api/contacts'

import { mapActions, mapGetters, mapState } from 'vuex';
import { BAlert, BButton, BIcon, BListGroup, BModal, BSkeleton, VBTooltip } from 'bootstrap-vue'

const ModalDetails = () => import('./ModalDetails.vue');
const NotFoundContacts = () => import('./NotFoundContacts.vue');

export default {
	name: 'ListContacts',

  components: {
		BAlert,
		BButton,
		BIcon,
		BListGroup,
		BModal,
		BSkeleton,
		ModalDetails,
		NotFoundContacts,
  },

	directives: { 'b-tooltip': VBTooltip },

	data() {
		return {
			deleteError: false,
			detailModal: false,
			detailId: 0,
			idContactDelete: 0,
			modalDelete: false,
			noContacts: false,
			txtModalDelete: "Tem certeza que quer apagar este contato?",
			txtModalDeleteError: "Não foi possível excluir o contato, tente novamente."
		}
	},

	computed: {
    ...mapGetters(['namesList']),
    ...mapState(['contacts', 'listLoading']),
	},

	watch: {
		listLoading(value) {
			if (value === false && this.contacts.length === 0) {
				this.noContacts = true;
			}
		}
	},

	created () {
		this.setLoading(true);
		this.getAllContacts();
	},

	methods: {
    ...mapActions(['getAllContacts', 'removeContact', 'setLoading']),

		async deleteContact() {
			this.modalDelete = false;
			this.setLoading(true);

			await ApiContacts.deleteContact(this.idContactDelete)
        .then(() => {
					this.removeContact({ id: this.idContactDelete, contacts: this.contacts });
				})
        .catch(() => {
					this.modalDelete = true;
					this.deleteError = true;
				})
        .finally(() => {
					this.setLoading(false);
				})
		},

		openModalDelete(id) {
			this.deleteError = false;
			this.modalDelete = true;
			this.idContactDelete = id;
		},

		openModalDetail(id) {
			this.detailModal = true;
			this.detailId = id;
		},
	},
}
</script>
