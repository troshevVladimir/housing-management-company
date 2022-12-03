<template>
  <div class="registration">
    <form class="registration__form" @submit.prevent="registration">
      <h2 class="mb-5">Регистрация</h2>
      <div class="mb-4">
        <label class="registration__form-label">
          <span class="registration__form-label-value">Email address</span>
          <input
            @blur="validateEmail"
            @input="isEmailInvalid ? validateEmail() : ''"
            v-model="formData.email"
            class="form-control"
            :class="{'is-invalid': this.isEmailInvalid}"
            placeholder="name@gamil.com"
          />
          <div
            v-if="errors.email.includes('emptyError')"
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
          >Поле обязательно для заполнения</div>
          <div
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
            v-else-if="errors.email.includes('formatError')"
          >Неправильный формат почты</div>
        </label>
      </div>
      <div class="mb-4">
        <label class="registration__form-label">
          <span class="registration__form-label-value">Password</span>
          <input
            @blur="validatePassword"
            @input="isPasswordInvalid ? validatePassword() : ''"
            v-model="formData.password"
            class="form-control"
            :class="{'is-invalid': this.isPasswordInvalid}"
            type="password"
            rows="3"
          />
          <div
            v-if="errors.password.includes('emptyError')"
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
          >Поле обязательно для заполнения</div>
          <div
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
            v-else-if="errors.password.includes('formatError')"
          >Пароль должен быть длиннее 5 и короче 40 символов</div>
        </label>
      </div>
      <div class="mb-4">
        <label class="registration__form-label">
          <span class="registration__form-label-value">Confirm Password</span>
          <input
            @blur="validateConfirmPassword"
            @input="isConfirmPasswordInvalid ? validateConfirmPassword() : ''"
            ref="confirmPass"
            class="form-control"
            :class="{'is-invalid': this.isConfirmPasswordInvalid}"
            type="password"
            rows="3"
          />
          <div
            v-if="errors.confirmPassword.includes('emptyError')"
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
          >Поле обязательно для заполнения</div>
          <div
            id="validationServerUsernameFeedback"
            class="invalid-feedback"
            v-else-if="errors.confirmPassword.includes('formatError')"
          >Пароли не совпадают</div>
        </label>
      </div>
      <button type="submit" class="btn btn-primary me-2" :disabled="!canSubmit">Зарегистрироваться</button>
      <button type="button" class="btn btn-outline-secondary">Сгенерировать пароль</button>
      <div v-if="isLoading" class="overlay">
        <CustomLoader />
      </div>
      <div class="error" v-if="error">{{error}}</div>
    </form>
    <router-link :to="{name: 'login'}" class="me-4">Авторизоваться</router-link>
    <router-link :to="{name: 'main'}">Перейти на главную</router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CustomLoader from "@/components/CustomLoader.vue";

type ArrayErrors = Array<string>

export default defineComponent({
	name: "registration",
	components: { CustomLoader },
	data() {
		return {
			error: '',
			isLoading: false,
			errors: {
				email: [] as ArrayErrors,
				password: [] as ArrayErrors,
				confirmPassword: [] as ArrayErrors
			},
			formData: {
				email: '',
				password: '',
			},
			canSubmit: true
		}
	},
	computed: {
		isEmailInvalid() {
			return !!this.errors.email.length
		},
		isPasswordInvalid() {
			return !!this.errors.password.length
		},
		isConfirmPasswordInvalid() {
			return !!this.errors.confirmPassword.length
		},
		isAllValid() {
			let valid = true
			Object.keys(this.errors).forEach(key => {
				if (this.errors[key].length) {
					valid = false
				}
			})

			return valid
		}
	},
	methods: {
		submit() {
			if (!this.canSubmit) return
			this.isLoading = true
			fetch('/api/auth/registration', {
				headers: { 'Content-Type': 'application/json; charset=utf-8' },
				method: "POST",
				body: JSON.stringify(this.formData)
			})
				.then(res => res.json())
				.then(response => {
					if (response.message) {
						this.error = response.message
						throw new Error(response.message)
					}
					localStorage.setItem('token', response.token);
					this.$router.push({ name: 'main' })
				})
				.catch(e => {
					console.error(e)
					this.error = e.message
				})
				.finally(() => {
					this.isLoading = false
				})
		},
		validateConfirmPassword() {
			const confirmPassword = this.$refs.confirmPass.value
			const passwordErrors = this.errors.confirmPassword
			passwordErrors.length = 0

			if (!confirmPassword.length && !passwordErrors.includes('emptyError')) {
				passwordErrors.push('emptyError')
			}

			const isCorrectPassword = confirmPassword === this.formData.password

			if (!isCorrectPassword && !passwordErrors.includes('formatError')) {
				passwordErrors.push('formatError')
			}

			this.canSubmit = this.isAllValid
		},
		validatePassword() {
			const password = this.formData.password
			const passwordErrors = this.errors.password

			passwordErrors.length = 0

			if (!password.length && !passwordErrors.includes('emptyError')) {
				passwordErrors.push('emptyError')
			}

			const isCorrectPassword = password.length > 5 && password.length < 40

			if (!isCorrectPassword && !passwordErrors.includes('formatError')) {
				passwordErrors.push('formatError')
			}

			this.canSubmit = this.isAllValid
		},
		validateEmail() {
			const email = this.formData.email
			const emailErrors = this.errors.email

			emailErrors.length = 0

			if (!email.length && !emailErrors.includes('emptyError')) {
				emailErrors.push('emptyError')
			}

			const isCorrectEmail = email.toLowerCase().match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);

			if (!isCorrectEmail && !emailErrors.includes('formatError')) {
				emailErrors.push('formatError')
			}

			this.canSubmit = this.isAllValid
		},
		registration() {
			this.validateEmail()
			this.validatePassword()
			this.validateConfirmPassword()
			this.canSubmit = this.isAllValid
			this.submit()
		},
	}
});
</script>
<style lang='scss'>
	.registration {
		width: 100%;
		max-width: 600px;

		&__form {
			position: relative;
			background-color: #fff !important;
			padding: 50px;
		}

		&__form-label {
			width: 100%;
		}

		&__form-label-value {
			display: inline-block;
			margin-bottom: 4px;
		}
	}

	.overlay {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		opacity: 0.8;
		background-color: #fff;
	}
</style>