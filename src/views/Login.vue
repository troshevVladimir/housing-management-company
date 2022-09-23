<template>
  <div class="login">
    <form class="login__form" @submit.prevent="submit">
      <h2 class="mb-5">Авторизация</h2>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Password</label>
        <input
          v-model="formData.password"
          class="form-control"
          id="exampleFormControlTextarea1"
          type="password"
          rows="3"
        />
      </div>
      <button type="submit" class="btn btn-primary me-2">Войти</button>
      <button type="button" class="btn btn-outline-secondary">Забыли пароль</button>
      <div v-if="isLoading" class="overlay">
        <CustomLoader />
      </div>
      <div class="error" v-if="error">{{error}}</div>
    </form>
    <router-link :to="{name: 'registration'}" class="me-4">Заргистрироваться</router-link>
    <router-link :to="{name: 'main'}">Перейти на главную</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CustomLoader from "@/components/CustomLoader.vue";
import { mapMutations } from "vuex";

export default defineComponent({
	name: "login",
	components: { CustomLoader },
	data() {
		return {
			error: '',
			isLoading: false,
			formData: {
				email: '',
				password: '',
			},
			canSubmit: true
		}
	},
	methods: {
		submit() {
			if (!this.canSubmit) return
			this.isLoading = true
			fetch('/api/auth/login', {
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				method: "POST",
				body: JSON.stringify(this.formData)
			})

				.then(res => {
					return res.json()
				})
				.then(response => {
					if (response.message) {
						this.error = response.message
						throw new Error(response.message)
					}

					localStorage.setItem('token', response.accessToken);
					localStorage.setItem('refreshToken', response.refreshToken);
					this.$router.push({ name: 'main' })
				})
				.catch(e => {
					console.error(e)
				})
				.finally(() => {
					this.isLoading = false
				})
		},
	}
});
</script>
<style lang='scss'>
	.login {
		width: 100%;
		max-width: 600px;
		&__form {
			background-color: #fff !important;
			padding: 50px;
		}
	}
</style>