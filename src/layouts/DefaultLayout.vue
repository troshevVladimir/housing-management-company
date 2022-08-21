<template>
  <main class="main">
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
              <router-link class="nav-link" to="/">Main</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <span><b>{{userName}}</b></span>
    </header>
    <section class="content">
      <router-view></router-view>
    </section>

    <DefaultAsside></DefaultAsside>

    <footer class="footer">footer</footer>
  </main>
</template>

<script>
import { defineComponent } from "vue";
import DefaultAsside from "./DefaultAsside.vue";
import { mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: "default-layout",
  components: {
    DefaultAsside,
  },
  computed: {
     ...mapState({
      userName: state => state.userData.userName,
    }),
    ...mapGetters([
      'userData/userName'
    ])
  }
});
</script>

<style lang="scss">
.main {
  display: grid;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  grid-template-rows: 70px auto 100px;
  grid-template-columns: 200px auto;

  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";

  .header {
    grid-area: header;
  }

  .sidebar {
    grid-area: sidebar;
    background-color: rgb(110, 60, 60);
  }

  .content {
    grid-area: content;
    background-color: rgb(78, 32, 185);
  }

  .footer {
    grid-area: footer;
  }
}
</style>
