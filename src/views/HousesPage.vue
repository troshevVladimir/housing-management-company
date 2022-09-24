<template>
  <div class="houses-page">
    <span v-html="getError"></span>

    <div class="table-responsive">
      <table
        v-if="!getError"
        class="houses-page__table table align-middle table-dark table-striped table-hover"
      >
        <thead>
          <tr>
            <th scope="col" class="houses-page__nums-col">№</th>
            <th scope="col">Address</th>
            <th scope="col">Tenants</th>
            <th scope="col">Livers</th>
            <th v-if="canDelete || canEdit" scope="col" class="houses-page__actions-col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(house, idx) in houses" :key="house.id">
            <th scope="row" class="houses-page__nums-col">{{idx + 1 }}</th>
            <td scope="row">{{house.address}}</td>
            <td>{{house.tenants}}</td>
            <td>{{house.livers}}</td>
            <td width="20px" v-if="canDelete || canEdit">
              <button
                type="button"
                class="btn btn-danger me-2"
                @click="debounsedDelete(house.id)"
                v-if="canEdit"
              >&times;</button>
              <button
                type="button"
                class="btn btn-outline-info"
                @click="prepareForUpdate(house.id)"
                v-if="canDelete"
              >Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <item-modal :params="modalProps" v-if="modalShow && canCreate" @close="closeModal">
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
        </div>
        <div class="houses-page__error" v-if="!valid">Форма заполнена не верно</div>
      </form>
      <button class="btn btn-primary me-2" @click="closeModal">Close</button>
      <button class="btn btn-success" @click="submit(modalParams.id)">Submit</button>
    </item-modal>

    <custom-loader v-if="loading"></custom-loader>

    <button
      v-if="canCreate"
      type="button"
      class="d-block btn btn-primary"
      @click="showModal('post')"
    >Add new House</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ItemModal from '@/components/ItemModal/ItemModal.vue'
import { ModalProps } from '@/components/ItemModal/types'
import CustomLoader from '@/components/CustomLoader.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as _ from 'lodash'

type ID = number | string

interface FormField {
	name: string
	label: string
	type: string
	value: string
	required: boolean
}

interface ModalParams {
	id: ID
	method: string
}

interface State {
	text: {}
	loading: boolean
	modalShow: boolean
	fromData: null
	valid: boolean
	modalParams: ModalParams
	formFields: Array<FormField>,
}

export default defineComponent({
	name: 'houses-page',
	components: {
		ItemModal,
		CustomLoader,
	},
	data(): State {
		return {
			text: {
				update: 'Обновление дома',
				create: 'Создание нового дома'
			},
			loading: false,
			modalShow: false,
			fromData: null,
			valid: true,
			modalParams: {
				id: '',
				method: '',
			},
			formFields: [
				{
					name: 'address',
					label: 'Address',
					type: 'text',
					value: '',
					required: true,
				},
				{
					name: 'tenants',
					label: 'Tenants amount',
					type: 'number',
					value: '',
					required: true,
				},
				{
					name: 'livers',
					label: 'Livers amount',
					type: 'number',
					value: '',
					required: true,
				},
			],
		}
	},
	methods: {
		...mapActions({
			getHouses: 'housesData/getAllHouses'
		}),
		...mapMutations({
			setHouse: 'housesData/setHouse',
			updateHouse: 'housesData/updateHouse',
			deleteHouse: 'housesData/deleteHouse',
		}),
		clearInputs() {
			this.formFields.forEach((el: FormField) => {
				el.value = ''
			})
		},
		sendData<T>(data: any): Promise<T> {
			const that = this

			return fetch('/api/houses/', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
				body: data,
			})
				.then((resp) => {
					return resp.json()
				})
				.then((response) => {
					that.clearInputs()
					that.setHouse(response)
					return response
				})
				.catch((e) => {
					console.error(e)
				})
				.finally(() => {
					this.loading = false
				})
		},
		debounsedUpdate: _.throttle(function (id: ID, data: Array<FormField>) {
			this.updateData(id, data)
		}, 1000),
		debounsedSend: _.throttle(function (data: Array<FormField>) {
			this.sendData(data)
		}, 1000),
		debounsedDelete: _.throttle(function (id: ID) {
			this.deleteItem(id)
		}, 1000),
		deleteItem(id: ID) {
			const that = this
			fetch(`/api/houses/${id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
			})
				.then((res) => {
					return res.json()
				})
				.then((response) => {
					that.deleteHouse(response)
				})
		},
		prepareForUpdate(id: ID) {
			this.modalParams.id = id
			this.modalProps.title = 'Обновление'
			this.showModal('put')
			const houseSelectedData = this.house(id)
			this.formFields.forEach((el: FormField) => {
				el.value = houseSelectedData[el.name]
			})
		},
		updateData(id: ID, data: any) {
			const that = this
			fetch(`/api/houses/${id}`, {
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
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
		submit(id: ID) {
			this.validate()
			if (this.valid) {
				this.loading = true
				this.formDataInit()

				if (this.modalParams.method === 'put') {
					this.debounsedUpdate(id, this.formData)
				} else if (this.modalParams.method === 'post') {
					this.debounsedSend(this.formData)
				}

				this.closeModal()
			} else {
				console.log('invalid handler')
			}
		},
		formDataInit() {
			const formData = new FormData()
			this.formFields.forEach((el: FormField) => {
				formData.append(el.name, el.value)
			})
			this.formData = formData

			return formData
		},
		showModal(method: string): void {
			this.modalParams.method = method

			if (this.modalParams.method === 'put') {
				this.modalProps.title = this.text.update
			} else if (this.modalParams.method === 'post') {
				this.modalProps.title = this.text.create
			}

			this.modalShow = true
		},
		closeModal(): void {
			this.modalShow = false
			this.clearInputs()
		},
		validate() {
			let valid = true
			this.formFields.forEach((el: FormField) => {
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
			getError: 'housesData/getError',
			user: 'userData/getUser'
		}),
		canCreate() {
			return this.user.role === 'admin' || this.user.role === 'author' && localStorage.getItem('token')
		},
		canEdit() {
			return this.user.role === 'admin' || this.user.role === 'author' && localStorage.getItem('token')
		},
		canDelete() {
			return this.user.role === 'admin' || this.user.role === 'author' && localStorage.getItem('token')
		},
		modalProps(): ModalProps {
			return {
				title: ''
			}
		}
	},
	mounted() {
		this.loading = true
		this.getHouses().then(() => {
			this.loading = false
		})
	},
})
</script>

<style lang='scss'>
	.houses-page {
		&__table {
			width: 100%;
			table-layout: fixed;
		}
		td {
			max-width: 30%;
		}

		&__page-title {
			margin-bottom: 40px;
		}

		&__error {
			font-weight: 600;
			font-size: 20px;
			color: rgb(124, 67, 67);
		}

		& &__nums-col {
			width: 30px;
		}
	}
</style>