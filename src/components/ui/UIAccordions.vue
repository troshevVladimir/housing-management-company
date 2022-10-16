<template>
  <div class="accordions-container">
    <div class="accordions-header">
      <h3 class="accordions-title">{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ui-accordions",
  props: {
    title: {
      type: String
    }
  },
});
</script>

<style lang="scss" scoped>
  .accordions-container {
    width: 100%;
  }
</style>
