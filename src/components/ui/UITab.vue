<template>
  <div v-show="isActive" class="tabs__content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.isActive = this.selected
  },
  created() {
    this.$parent.tabsArray.push(this)
  },
}
</script>

<style lang="scss" scoped>
  .tabs__content {
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    .tabs__content {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
</style>
