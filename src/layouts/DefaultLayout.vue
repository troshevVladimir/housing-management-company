<template>
  <main class="main">
    <DefaultHeader :user-name="userName"></DefaultHeader>

    <section class="content">
      <router-view></router-view>
    </section>

    <DefaultAsside></DefaultAsside>

    <footer class="footer">footer</footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultAsside from "./DefaultAsside.vue";
import DefaultHeader from "./DefaultHeader.vue";
import { mapGetters, mapState } from 'vuex'

export default defineComponent({
  name: "default-layout",
  components: {
    DefaultAsside,
    DefaultHeader
  },
  computed: {
    ...mapGetters({
      userName: 'getUserName'
    })
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
