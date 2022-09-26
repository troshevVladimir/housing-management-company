<template>
  <div :class="tab['tab-container']">
    <div :class="tab['tab-label']" @click='tabTogle'>
      <slot name='label'/>
    </div>
    <div :class="[tab['tab-content'], 'tab-content', {[tab['tab-visible']]: this.visible}]">
      <slot name='content'/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ui-tab",
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
	computed: {
	},
  methods: {
    tabTogle() {
      this.visible = !this.visible
      this.shine()
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

<style module='tab'>
  .tab-container {
    width: 100%;
    margin-top: 0;
  }

  .tab-label {
    cursor: pointer;
    background-color: rgb(122, 75, 75);
    padding: 20px 10px;
  }

  .tab-content.tab-visible {
    display: block;
    visibility: visible;
  }

  .tab-content {
    display: none;
    visibility: hidden;
    padding: 5px 10px;
    margin-bottom: 0;
    background-color: var(--bg-secondary-color);
  }
</style>

<style lang='scss' scoped>
  .tab-content{
    :slotted(p) {
      font-size: 14px;
      font-weight: 400;
      color: var(--text-light-color);
      letter-spacing: 0.5px;
    }
  }
</style>
