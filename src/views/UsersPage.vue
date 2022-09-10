<template>
  <div class="houses-page">
    <h1 class="houses-page__page-title">{{$route.params.title}}</h1>

    <div class="table-responsive">
      <router-view name="table"></router-view>
    </div>

    <custom-loader v-if="loading"></custom-loader>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import CustomLoader from '@/components/CustomLoader.vue'
import ItemModal from '@/components/ItemModal'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as _ from 'lodash'

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
		&__error {
			font-weight: 600;
			font-size: 20px;
			color: red;
		}

		&__actions-col {
			max-width: 30px;
		}
	}
</style>