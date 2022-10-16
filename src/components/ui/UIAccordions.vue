<template>
  <div class="accordions-container">
    <div class="accordions-header">
      <h3 class="accordions-title">{{ title }}</h3>
    </div>
    <slot />
    <ui-button @click="closeAll">Close all</ui-button>
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
  data() {
    return {
      children: []
    }
  },
  methods: {
    closeAll() {
      this.children.forEach((el: any) => {
        el.close()
      });
    }
  }
});
</script>

<style lang="scss" scoped>
  .accordions-container {
    width: 100%;
  }
</style>
