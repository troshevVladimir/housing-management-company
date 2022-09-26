<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <h2 class="tabs-title">{{ title }}</h2>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ui-tabs",
  props: {
    title: {
      type: String
    }
  },
	computed: {
	},
  methods: {
    closeAll() {

    }
	},
	mounted() {
	}
});
</script>

<style lang="scss" scoped>
  .tabs-container {
    width: 100%;
  }
</style>
