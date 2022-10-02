<template>
  <div :class="accordion['accordion-container']">
    <div :class="accordion['accordion-label']" @click='accordionTogle'>
      <slot name='label'/>
    </div>
    <Transition name="accordion">
      <div :class="[accordion['accordion-content'], 'accordion-content']" v-show="visible">
        <slot name='content'/>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ui-accordion",
  props: {
    name: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    accordionTogle() {
      if (!this.visible) {
        this.$emit('open')
      }
      this.visible = !this.visible
    },
    close() {
      this.visible = false
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.$router.replace({ name: this.$route.name, hash: `#${this.name}` })
      } else {
        this.$router.replace({ name: this.$route.name })
      }
    }
  }
});
</script>

<style module='accordion'>
  .accordion-container {
    width: 100%;
    margin-top: 0;
  }

  .accordion-label {
    cursor: pointer;
    background-color: rgb(122, 75, 75);
    padding: 20px 10px;
  }

  .accordion-content {
    padding: 5px 10px;
    margin-bottom: 0;
    background-color: var(--bg-secondary-color);
  }
</style>

<style lang='scss' scoped>
  .accordion-content{
    :slotted(p) {
      font-size: 14px;
      font-weight: 400;
      color: var(--white-color);
      letter-spacing: 0.5px;
      transition: opacity 0.5s ease;
    }
  }

  .accordion-enter-active,
  .accordion-leave-active {
    transition: all 0.5s ease;
    :slotted(p) {
      opacity: 0;
    }
  }

  .accordion-enter-from,
  .accordion-leave-to {
    transform-origin: 0 0;
    transform: scaleY(0);
    opacity: 0;
  }

  .accordion-enter-to,
  .accordion-leave-from {
    transform-origin: 0 0;
    transform: scaleY(1);
    opacity: 1;
  }
</style>
