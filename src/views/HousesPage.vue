<template>
  <div class="houses-page">
    <h1 class="houses-page__page-title">{{this.$route.params.title}}</h1>

    <div class="table-responsive">
      <table class="table align-middle table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Address</th>
            <th scope="col">Tenants</th>
            <th scope="col">Livers</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="house in houses" :key="house.id">
            <th scope="row">1</th>
            <td>{{house.address}}</td>
            <td>{{house.tenants}}</td>
            <td>{{house.livers}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <item-modal title="Edit house" v-if="modalShow" @close="closeModal" @submit="submit">
      <form class="validated-form mb-5">
        <div class="mb-3 validated-form__field" v-for="field in formFields" :key="field.name">
          <label :for="field.name" class="form-label">{{field.label}}</label>
          <input
            :name="field.name"
            :type="field.type"
            class="form-control"
            :id="field.name"
            v-model="field.value"
          />
          <div class="validated-form__invalid-text" v-if="false">{{field.invalidText}}</div>
        </div>
      </form>
      <button class="btn btn-primary me-2" @click="closeModal">Close</button>
      <button class="btn btn-success" @click="submit">Submit</button>
    </item-modal>

    <custom-loader v-if="loading"></custom-loader>

    <div class="houses-page__error" v-if="!valid">Форма заполнена не верно</div>

    <button type="button" class="d-block btn btn-primary" @click="showModal">Add new House</button>
  </div>
</template>

<script>
import ItemModal from '@/components/ItemModal.vue'
import CustomLoader from '@/components/CustomLoader.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as _ from 'lodash'

export default {
	name: 'houses-page',
	components: {
		ItemModal,
		CustomLoader,
	},
	data() {
		return {
			loading: false,
			modalShow: false,
			fromData: null,
			valid: true,
			form: null,
			formFields: [
				{
					name: 'address',
					label: 'Address',
					type: 'text',
					value: '',
					required: true,
					invalidText: 'Неправильно заполнено поле',
				},
				{
					name: 'tenants',
					label: 'Tenants amount',
					type: 'number',
					value: '',
					required: true,
					invalidText: 'Неправильно заполнено поле',
				},
				{
					name: 'livers',
					label: 'Livers amount',
					type: 'number',
					value: '',
					required: true,
					invalidText: 'Неправильно заполнено поле',
				},
			],
		}
	},
	methods: {
		...mapActions({
			getHouses: 'housesData/getAllHouses',
		}),
		sendData(data) {
			fetch('/api/houses/', {
				method: 'POST',
				body: data,
			})
				.then((resp) => {
					return resp.json()
				})
				.then((response) => {
					debugger
					this.setHouse(response)
				})
				.catch((e) => {
					console.error(e)
				})
				.finally(() => {
					this.loading = false
				})
		},
		debounsedSend: _.throttle(function (data) {
			this.sendData(data)
		}, 1000),
		submit() {
			this.validate()
			if (this.valid) {
				this.loading = true
				this.formDataInit()
				this.debounsedSend(this.formData)
				this.closeModal()
			} else {
				console.log('invalid handler')
			}
		},
		formDataInit() {
			const formData = new FormData()
			this.formFields.forEach((el) => {
				formData.append(el.name, el.value)
			})
			this.formData = formData

			return formData
		},
		showModal() {
			this.modalShow = true
		},
		closeModal() {
			this.modalShow = false
		},
		validate() {
			let valid = true
			this.formFields.forEach((el) => {
				if ((el.value?.length && el.value.length < 0) || !el.value) {
					valid = false
				}
			})
			this.valid = valid
		},
	},
	computed: {
		...mapGetters({
			houses: 'housesData/getAll',
		}),

		...mapMutations({
			setHouse: 'housesData/setHouse',
		}),
	},
	mounted() {
		this.loading = true
		this.getHouses().then(() => {
			this.loading = false
		})
	},
}
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
	}
</style>