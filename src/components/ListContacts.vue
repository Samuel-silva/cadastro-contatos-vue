<template>
	<div class="mt-5">
		<b-list-group>
			<b-list-group-item
				v-for="item in namesList"
				:key="item.id"
				class="d-flex justify-content-between align-items-center py-3"
			>
				<p class="mb-0">
					{{ item.name }}
				</p>
				<div class="ps-2 d-flex">
					<b-button
						variant="outline-success"
					>
						<b-icon icon="eye" />
					</b-button>
					<b-button
						variant="outline-primary"
						class="mx-2"
					>
						<b-icon icon="pencil-square" />
					</b-button>
					<b-button
						variant="outline-danger"
					>
						<b-icon icon="trash" />
					</b-button>
				</div>

			</b-list-group-item>
		</b-list-group>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { BButton, BIcon, BListGroup } from 'bootstrap-vue'

export default {
  name: 'ListContacts',

  components: {
		BButton,
		BIcon,
		BListGroup,
  },

	computed: {
    ...mapGetters(['namesList']),
	},

	created () {
		this.getAllContacts();
	},

	methods: {
    ...mapActions(['getAllContacts']),
	},
}
</script>
