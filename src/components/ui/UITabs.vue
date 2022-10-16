<template>
  <div class="tabs">
    <ul class="tabs__buttons">
      <li
        class="tabs__button"
        :class="{ 'tabs__button--active': tab.isActive }"
        v-for="tab in tabsArray"
        @click="selectTab(tab.id)"
        :key="tab.id"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabsArray: [],
    }
  },
  methods: {
    // TODO: При выборе таба надо ставить хешь в URl
    selectTab(id) {
      this.tabsArray.forEach((tab) => {
        tab.isActive = tab.id == id
      })
    },
  },
  mounted() {
    // TODO: Проверять хешь
    this.selectTab(this.selectedIndex)
  },
}
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .tabs__buttons {
    display: flex;
    align-items: center;
  }

  .tabs__button {
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #5a8cf1;
    margin-right: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid transparent;
  }

  .tabs__button:hover {
    border-bottom: 2px solid #3a5ea7;
  }

  .tabs__button--active {
    border-bottom: 2px solid currentColor;
  }
</style>
