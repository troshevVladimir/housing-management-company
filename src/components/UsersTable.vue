<template>
  <table class="houses-page__table table align-middle table-dark table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, idx) in users" :key="user.id">
        <th scope="row">{{idx + 1 }}</th>
        <td>{{user.email}}</td>
        <td v-if="canEdit">
          <select
            class="form-select"
            @change="select(user.id, $event)"
            aria-label="Default select example"
          >
            <option
              v-for="(role) in roles"
              :key="role.value"
              :selected="isCurrentRole(role.value, user.role)"
            >{{role.value}}</option>
          </select>
        </td>
        <td v-else>{{user.role}}</td>

        <td class="houses-page__actions-col">
          <!-- <button type="button" class="btn btn-outline-info">Edit</button> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex'

export default defineComponent({
	name: 'item-modal',
	data() {
		return {
		}
	},
	computed: {
		...mapGetters({
			currentUser: "userData/getUser",
			users: 'userData/getUsers',
			roles: 'userData/getUserRoles',
		}),
		canEdit() {
			return this.currentUser.role === 'admin'
		},

	},
	methods: {
		...mapActions({
			getUsers: "userData/getUsers",
			getRoles: "userData/getRoles"
		}),

		isCurrentRole(role: string, userRole: string) {
			return role === userRole
		},
		save(userId: string | number, selectedRole: string) {
			fetch('/api/getusers/', {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token'),
				},
				body: JSON.stringify({
					role: selectedRole,
					userId
				})
			})
		},
		select(userId: string | number, event: any) {
			const selectedRole = event.target.value
			const changedUser = this.users.find((user: any) => {
				return user.id === userId
			})

			if (changedUser.role !== selectedRole) {
				this.save(userId, selectedRole)
			}
		}
	},
	created () {
		this.getRoles()
		this.loading = true
		this.getUsers()
			.then(() => {
				this.loading = false
			})
	},
})
</script>

<style>
</style>