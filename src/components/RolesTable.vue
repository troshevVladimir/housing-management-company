<template>
  <table class="houses-page__table table align-middle table-dark table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Role</th>
        <th scope="col">Может смотреть</th>
        <th scope="col">Может редактировать</th>
        <th scope="col">Может создавать</th>
        <th scope="col">Может удалять</th>
        <th scope="col">Может управлять доступом</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(role, idx) in roles" :key="role.id">
        <th scope="row">{{idx + 1 }}</th>
        <td>{{role.value}}</td>

        <td v-html="renderStatus(canRead(role.value))"></td>
        <td v-html="renderStatus(canEdit(role.value))"></td>
        <td v-html="renderStatus(canCreate(role.value))"></td>
        <td v-html="renderStatus(canCreate(role.value))"></td>
        <td v-html="renderStatus(canDelete(role.value))"></td>
        <td class="houses-page__actions-col">
          <!-- <button type="button" class="btn btn-outline-info">Edit</button> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'

export default defineComponent({
	name: 'item-modal',
	methods: {
		...mapActions({
			getRoles: "userData/getRoles"
		}),
		canRead(role: string) {
			return !!role
		},
		canEdit(role: string) {
			return role === 'admin' || role === 'author'
		},
		canCreate(role: string) {
			return role === 'admin' || role === 'author'
		},
		canDelete(role: string) {
			return role === 'admin' || role === 'author'
		},
		canDefineAccess(role: string) {
			return role === 'admin' || role === 'author'
		},
		renderStatus(status: boolean) {
			return status ? 'Да' : 'Нет'
		}
	},
	computed: {
		...mapGetters({
			roles: 'userData/getUserRoles',
		}),
	},
	created () {
		this.loading = true
		this.getRoles()
			.then(() => {
				this.loading = false
			})
	},
})
</script>

<style>
</style>