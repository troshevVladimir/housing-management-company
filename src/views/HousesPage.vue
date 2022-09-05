<template>
  <div class="houses-page">
    <h1 class="houses-page__page-title">{{this.$route.params.title}}</h1>

    <div class="table-responsive">
      <table class="houses-page__table table align-middle table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Address</th>
            <th scope="col">Tenants</th>
            <th scope="col">Livers</th>
            <th scope="col" class="houses-page__actions-col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(house, idx) in houses" :key="house.id">
            <th scope="row">{{idx + 1 }}</th>
            <td>{{house.address}}</td>
            <td>{{house.tenants}}</td>
            <td>{{house.livers}}</td>
            <td class="houses-page__actions-col">
              <button
                type="button"
                class="btn btn-danger me-2"
                @click="debounsedDelete(house.id)"
              >&times;</button>
              <button
                type="button"
                class="btn btn-outline-info"
                @click="prepareForUpdate(house.id)"
              >Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <item-modal title="Edit house" v-if="modalShow">
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
      <button class="btn btn-success" @click="submit(this.mdalParams.id)">Submit</button>
    </item-modal>

    <custom-loader v-if="loading"></custom-loader>

    <div class="houses-page__error" v-if="!valid">Форма заполнена не верно</div>

    <button type="button" class="d-block btn btn-primary" @click="showModal('post')">Add new House</button>
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
			mdalParams: {
				id: null,
				method: '',
			},
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
		...mapMutations({
			setHouse: 'housesData/setHouse',
			updateHouse: 'housesData/updateHouse',
			deleteHouse: 'housesData/deleteHouse',
		}),
		clearInputs() {
			this.formFields.forEach((el) => {
				el.value = ''
			})
		},
		sendData(data) {
			const that = this
			fetch('/api/houses/', {
				method: 'POST',
				body: data,
			})
				.then((resp) => {
					return resp.json()
				})
				.then((response) => {
					that.clearInputs()
					that.setHouse(response)
				})
				.catch((e) => {
					console.error(e)
				})
				.finally(() => {
					this.loading = false
				})
		},
		debounsedUpdate: _.throttle(function (id, data) {
			this.updateData(id, data)
		}, 1000),
		debounsedSend: _.throttle(function (data) {
			this.sendData(data)
		}, 1000),
		debounsedDelete: _.throttle(function (id) {
			this.deleteItem(id)
		}, 1000),
		deleteItem(id) {
			const that = this
			fetch(`/api/houses/${id}`, {
				method: 'DELETE',
			})
				.then((res) => {
					return res.json()
				})
				.then((response) => {
					that.deleteHouse(response)
				})
		},
		prepareForUpdate(id) {
			this.mdalParams.id = id
			this.showModal('put')
			const houseSelectedData = this.house(id)
			this.formFields.forEach((el) => {
				el.value = houseSelectedData[el.name]
			})
		},
		updateData(id, data) {
			const that = this
			fetch(`/api/houses/${id}`, {
				method: 'PUT',
				body: data,
			})
				.then((resp) => {
					return resp.json()
				})
				.then((response) => {
					that.clearInputs()
					that.updateHouse(response)
				})
				.catch((e) => {
					console.error(e)
				})
				.finally(() => {
					this.loading = false
				})
		},
		submit(id) {
			this.validate()
			if (this.valid) {
				this.loading = true
				this.formDataInit()

				if (this.mdalParams.method === 'put') {
					this.debounsedUpdate(id, this.formData)
				} else if (this.mdalParams.method === 'post') {
					this.debounsedSend(this.formData)
				}

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
		showModal(method) {
			this.mdalParams.method = method
			this.modalShow = true
		},
		closeModal() {
			this.modalShow = false
			this.clearInputs()
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
			house: 'housesData/getHouse',
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

		&__actions-col {
			max-width: 30px;
		}
	}
</style>