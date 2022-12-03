<template>
  <transition name="fade">
    <div v-if="isActive" class="tabs__content">
      <slot></slot>
    </div>
  </transition>
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
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: translate(-50%);
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate(-50%);
    }

    100% {
      opacity: 1;
    }
  }
  .fade-leave-active {
    animation: fadeOut 1s ease;
    position: absolute;
    top: 20px;
  }

  .fade-enter-active {
    animation: fadeIn 1s ease;
  }

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
