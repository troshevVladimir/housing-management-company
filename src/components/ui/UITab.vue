<template>
  <div v-show="isActive" class="tabs__body">
    <div class="tabs__content">
      <slot></slot>
    </div>
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
  .tabs__body {
    width: 100%;
  }

  .tabs__content {
    background: #f5f5f8;
    border-radius: 16px;
    padding: 20px 24px;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    .tabs__content {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
</style>
