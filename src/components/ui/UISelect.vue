<template>
    <div class="select" v-click-outside="closeDropdown">
      <div class="select__input input" @click="togleDropdown">
        <span class="select__text">{{selectedText}}</span>
      </div>
      <ul class="select__dropdown" v-show="dropdownOpen">
        <li
          class="select__dropdown-item"
          v-for="item in localData"
          :class="{'active': curentItem(item.id)}"
          :key="item.id"
          @click="selectItem(item.id)"
        >{{item.text}}</li>
      </ul>
    </div>
</template>

<script lang="ts">

export type ID = string | number

export interface SelectDataItem {
  id: ID
  value: string
  text: string
  seletcd: boolean
}

export type ArraySelectData = Array<SelectDataItem>

export interface Data {
  selectedItem: null | SelectDataItem
  dropdownOpen: boolean
  localData: ArraySelectData
}
import { PropType, defineComponent } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<ArraySelectData>,
      required: true,
      default: [
        {
          id: 0,
          value: 'asdasd',
          text: '#1',
          seletcd: false,
        },
        {
          id: 1,
          value: 'asdasd',
          text: '#2',
          seletcd: false,
        },
        {
          id: 2,
          value: 'asdasd',
          text: '#3',
          seletcd: false,
        }
      ]
    }
  },
  name: 'UISelect',
  data(): Data {
    return {
      dropdownOpen: false,
      selectedItem: null,
      localData: this.data
    }
  },
  methods: {
    selectItem(id: ID) {
      if (this.selectedItem && this.selectedItem.id === id) {
        this.selectedItem = null
        return
      }

      const selected = this.localData.find((el: SelectDataItem) => {
        return el.id === id
      })
      this.selectedItem = selected
      this.$emit('input', selected.id)
    },
    togleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    closeDropdown () {
      this.dropdownOpen = false
    },
    curentItem(id: ID) {
      return id === this.selectedID
    }
  },
  computed: {
    selectedText() {
      return this.selectedItem?.text || ' '
    },
    selectedID() {
      return this.selectedItem ? this.selectedItem.id : ''
    }
  }
})
</script>

<style lang='scss' scoped>
.select {
  width: 100%;
  $parent: &;

  &__input {
    width: 100%;
    position: relative;

    #{$parent}__text {
      display: block;
      min-height: 24px; // Проблема с высотой селекта
    }
  }

  &__dropdown {
    width: 100%;
    padding: 10px;
    background-color: var(--light-color);
    position: relative;
    top: 100%;
    border-radius: 4px;
  }

  &__dropdown-item {
    color: var(--text-light-color);
    padding: 5px 10px;
    cursor: pointer;
    background-color: var(--bg-secondary-color);

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &.active {
      border: 3px solid var(--accent-color);
    }
  }
}

</style>