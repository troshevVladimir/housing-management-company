<template>
  <div class="accordions-container">
    <div class="accordions-header">
      <h3 class="accordions-title">{{ title }}</h3>
    </div>
    <slot />
    <ui-button @click="closeAll">Close all</ui-button>
  </div>
</template>

<script>
export default {
  name: 'ui-accordions',
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      children: [],
    }
  },
  methods: {
    closeAll() {
      this.children.forEach((el) => {
        el.close()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .accordions-container {
    width: 100%;
  }
</style>
