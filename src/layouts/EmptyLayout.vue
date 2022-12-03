<template>
  <main class="main">
    <section class="content">
      <router-view></router-view>
      <!-- <router-view name="helper"></router-view> -->
    </section>
    <footer class="footer">footer</footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "empty-layout",
});
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    .content {
      background-color: #777;
      padding: 20px 15px;
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .footer {
      flex: 0 0 200px;
    }
  }
</style>
