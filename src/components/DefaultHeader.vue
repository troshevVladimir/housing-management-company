<template>
  <header class="header navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'main'}">Main</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'about'}">About</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >Houses</a>
            <ul class="dropdown-menu">
              <li>
                <router-link
                  class="dropdown-item"
                  :to="{name: 'houses', params: { title: 'Houses page'}}"
                >Houses Table</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="header__right-header">
      <div class="auth" v-if="!user.email">
        <router-link class="me-3" :to="{name: 'login'}">Login</router-link>
        <router-link :to="{name: 'registration'}">Registration</router-link>
      </div>
      <div v-else class="user">
        <b class="header__user-name me-3">{{user.email}}</b>
        <button @click="exit" type="button" class="btn btn-outline-secondary">Выйти</button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { mapGetters, mapMutations } from "vuex";

export default {
	props: {
		userName: {
			type: String,
			required: true
		}
	},
	methods: {
		...mapMutations({
			clearUser: "userData/clearUser"
		}),
		exit() {
			localStorage.removeItem('token')
			this.clearUser()
			this.$router.push({ name: 'login' })
		}

	},
	computed: {
		...mapGetters({
			user: 'userData/getUser'
		})
	}
}
</script>

<style lang="scss">
	.header {
		padding-right: 40px;
	}
	.user {
		display: flex;
		align-items: center;
	}
</style>