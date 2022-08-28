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
import { mapGetters } from 'vuex'
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
		sendData(data) {
			// fetch('apiLinck', {
			// 	method: 'POST',
			// 	headers: {
			// 		'Content-Type': 'application/json;charset=utf-8',
			// 	},
			// 	body: JSON.stringify(data),
			// })
			// 	.then((resp) => resp.json())
			// 	.then((response) => {
			// 		this.formFields = { ...this.formFields, response }
			// 	})
			let rq = new Promise((res, rej) => {
				setTimeout(() => {
					res('success')
				}, 2000)
			})

			rq.then((res) => console.log(res))
			rq.finally(() => {
				this.loading = false
			})
		},
		debounsedSend: _.throttle(function (data) {
			console.log('sended')
			this.sendData(data)
		}, 1000),
		submit(data) {
			this.validate()
			if (this.valid) {
				this.loading = true
				this.debounsedSend()
				this.closeModal()
			} else {
			}
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