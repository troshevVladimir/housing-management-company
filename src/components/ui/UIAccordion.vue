<template>
  <div class="accordion-container" :class="{ 'accordion-active': visible }">
    <div class="accordion-label" @click="accordionTogle">
      <slot name="label" />
      <font-awesome-icon :icon="iconName" size="lg"/>
    </div>
    <div class="accordion-content">
      <slot name="content" />
    </div>
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
      // if (!this.visible) {
      // this.$parent.closeAll()
      // }
      this.visible = !this.visible
    },
    close() {
      this.visible = false
    },
  },
  computed: {
    iconName() {
      return this.visible ? 'minus' : 'plus'
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.$router.replace({ name: this.$route.name, hash: `#${this.name}` })
      } else {
        this.$router.replace({ name: this.$route.name })
      }
    }
  },
  created() {
    this.$parent.children.push(this)
  }
});
</script>

<style lang='scss'>
  .accordion-container {
    width: 100%;
    margin-top: 0;
  }

  .accordion-label {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: #666;
    padding: 20px 10px;
    transition: all ease 0.4s;

    &:hover {
      color: var(--text-color);
      background-color: #999;
    }
  }

  .accordion-active {
    .accordion-content {
      padding: 5px 10px;
      transition: max-height 2s ease, opacity 1s;
      opacity: 1;
      max-height: 1500px;
    }

    .accordion-label {
      background-color: #999;
    }
  }

  .accordion-content {
    background-color: #fff;
    max-height: 0;
    padding: 5px 10px;

    transition: max-height 0.6s ease, opacity 0.6s;
    overflow: hidden;
    opacity: 0;
  }
</style>
