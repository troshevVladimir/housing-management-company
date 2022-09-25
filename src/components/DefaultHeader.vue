<template>
  <header class="header">
    <nav>
      <ul class="header__links">
        <li class="header__link">
          <router-link class="header__link" :to="{name: 'main'}">Main</router-link>
        </li>
        <li class="">
          <router-link class="header__link" :to="{name: 'about'}">About</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="header__link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Houses</a>
          <ul class="dropdown-menu">
            <li>
              <router-link
                class="dropdown-item"
                :to="{name: 'houses'}"
              >Houses Table</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="header__link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Users</a>
          <ul class="dropdown-menu">
            <li>
              <router-link
                class="dropdown-item"
                :to="{name: 'users'}"
              >Users</router-link>
            </li>
            <li>
              <router-link
                class="dropdown-item"
                :to="{name: 'roles'}"
              >Roles</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="header__right-header">
      <div class="auth" v-if="!user.name">
        <router-link class="me-3" :to="{name: 'login'}">Login</router-link>
        <router-link :to="{name: 'registration'}">Registration</router-link>
      </div>
      <div v-else class="user">
        <b class="header__user-name me-3">{{user.name}}</b>
        <button @click="exit" type="button" class="btn btn-outline-secondary">Выйти</button>
      </div>
    </div>
  </header>

</template>

<script lang="ts">
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
	methods: {
		...mapMutations({
			clearUser: "userData/clearUser",
			clearHouses: "housesData/clear"
		}),
    exit() {
      const body = {
        id: this.user.id
      }
			localStorage.removeItem('token')
			this.clearHouses()
      this.clearUser()
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
					'Content-Type': 'application/json',
				},
        body: JSON.stringify(body)
      })
        .then(() => {
          this.$router.push({ name: 'login' })
        })
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
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__links {
      list-style: none;
      display: flex;
      align-items: center;
      margin-bottom: 0;
    }

    &__link {
      margin-right: 20px;
      text-decoration: none;
      color: #000;
      font-weight: 600;
      font-size: 20px;
    }

		&__right-header {
			padding-right: 40px;

		}
	}

	.user {
		display: flex;
		align-items: center;
	}

	.navbar-nav {
		background-color: #fff;
		width: 100%;
	}
</style>