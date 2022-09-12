<template>
  <div class="houses-page">
    <h1 class="houses-page__page-title">{{$route.params.title}}</h1>

    <span v-html="getError"></span>

    <div class="table-responsive" v-if="!getError">
      <router-view name="table"></router-view>
    </div>

    <custom-loader v-if="loading"></custom-loader>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CustomLoader from '@/components/CustomLoader.vue'
import ItemModal from '@/components/ItemModal'
import * as _ from 'lodash'
import { mapGetters } from 'vuex'

interface State {
	loading: boolean
}

export default defineComponent({
	name: 'houses-page',
	components: {
		CustomLoader,
		ItemModal
	},
	data(): State {
		return {
			loading: false
		}
	},
	methods: {
		closeModal() {
			this.modalShow = false
		}
	},
	computed: {
		...mapGetters({
			getError: 'userData/getError',
		}),
		canEdit() {
			return this.user.role === 'admin' || this.user.role === 'author'
		},
	},

})
</script>

<style lang='scss'>
	.houses-page {
		&__page-title {
			margin-bottom: 40px;
		}

		&__actions-col {
			max-width: 30px;
		}
	}
</style>