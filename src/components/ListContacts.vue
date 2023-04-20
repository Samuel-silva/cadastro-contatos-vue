<template>
	<div class="mt-5">
		<template v-if="listLoading">
			<b-skeleton
				v-for="index in 5" :key="index"
				class="my-3"
				type="input"
			/>
		</template>
		<b-list-group v-else>
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
					>
						<b-icon icon="eye" />
					</b-button>
					<b-button
						variant="outline-primary"
						class="mx-2"
						v-b-tooltip.hover.v-primary
						title="Editar"
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

		<b-modal
			v-model="modalDelete"
			hideHeaderClose
		>
			<p v-if="deleteError">{{ txtModalDeleteError }}</p>
			<p v-else>{{ txtModalDelete }}</p>

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
	</div>
</template>

<script>
import ApiContacts from '@/api/contacts'

import { mapActions, mapGetters, mapState } from 'vuex';
import { BButton, BIcon, BListGroup, BModal, BSkeleton, VBTooltip } from 'bootstrap-vue'
export default {
	name: 'ListContacts',

  components: {
		BButton,
		BIcon,
		BListGroup,
		BModal,
		BSkeleton,
  },

	directives: { 'b-tooltip': VBTooltip },

	data() {
		return {
			deleteError: false,
			idContactDelete: 0,
			modalDelete: false,
			txtModalDelete: "Tem certeza que quer apagar este contato?",
			txtModalDeleteError: "Não foi possível excluir o contato, tente novamente."
		}
	},

	computed: {
    ...mapGetters(['namesList']),
    ...mapState(['contacts', 'listLoading']),
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
	},
}
</script>
