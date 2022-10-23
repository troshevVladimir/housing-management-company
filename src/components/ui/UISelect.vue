<template>
  <div
    class="select"
    v-click-outside="closeDropdown"
    :class="{
      error: errors.length,
      success: localValue && errors.length == 0,
    }"
  >
    <label @click="togleDropdown"
      ><p>{{ label }}<sup v-if="required">*</sup></p>
    </label>
    <div class="select__input" @click="togleDropdown">
      <span class="select__text">{{ selectedText }}</span>
    </div>
    <ul class="select__dropdown" v-show="dropdownOpen">
      <li
        class="select__dropdown-item"
        v-for="item in localData"
        :class="{ active: item.selected }"
        :key="item.id"
        @click="selectItem(item.id)"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="error-message" v-if="this.errors.length">
      {{ currentError }}
    </div>
  </div>
</template>

<script lang="ts">

export type ID = string | number

export interface SelectDataItem {
  id: ID
  value: string
  text: string
  selected: boolean
}

export type ArraySelectData = Array<SelectDataItem>

export interface Data {
  localValue: number | string | null | SelectDataItem
  dropdownOpen: boolean
  localData: ArraySelectData
  selectedText: string
  currentError: string
  errors: Array<string>
}
import { PropType, defineComponent } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<ArraySelectData>,
      required: true,
    },
    value: {
      type: [String, Number],
    },
    modelValue: {
      type: [String, Number],
      default: 0
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    validators: {
      type: Array,
    },
    required: {
      type: Boolean,
    },
  },
  name: 'UISelect',

  data(): Data {
    return {
      dropdownOpen: false,
      localValue: this.value || this.modelValue || null,
      localData: this.data,
      selectedText: this.placeholder || '',
      currentError: '',
      errors: [],
    }
  },
  methods: {
    validate(fromParent = false) {
      this.errors = []
      this.validators.forEach((validator: any) => {
        const result = validator(this.localValue)
        if (result.error) {
          this.errors.push(result.message)
        }
      })
    },
    selectItem(id: ID) {
      const selected = this.localData.find((el: SelectDataItem) => {
        return el.id === id
      })

      if (selected.selected) {
        selected.selected = false
        this.localValue = ''
        this.selectedText = this.placeholder
      } else {
        this.localData.forEach((el: SelectDataItem) => {
          el.selected = false
        });
        selected.selected = true
        this.localValue = selected.value
        this.selectedText = selected.text
      }

      this.$emit('change', selected.id)
      this.$emit('update:modelValue', selected.id)
      this.closeDropdown()
    },
    togleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
      if (!this.dropdownOpen) {
        this.validate()
      }
    },
    closeDropdown() {
      this.dropdownOpen = false
      this.validate()
    },
  },
  watch: {
    errors: {
      handler: function (val) {
        if (val.length) {
          this.currentError = this.errors[0]
        } else {
          this.currentError = ''
        }
      },
      deep: true,
    },
  },
  created() {
    this.localValue = this.value || this.modelValue
    if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
      this.$parent.formItems.push(this)
    }
  },
})
</script>

<style lang='scss'>
  .select {
    width: 100%;
    display: block;
    $parent: &;
    position: relative;
    padding-bottom: 24px;

    .error-message {
      color: #fb7d81;
      position: absolute;
      bottom: 0;
      left: 0;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }

    &__input {
      cursor: pointer;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #666666;
      padding: 9px 16px;
      border: none;
      width: 100%;
      background-color: #fff;
      border-radius: 4px;

      &:hover {
        outline: rgba(49, 112, 238, 0.5) auto 1px;
      }

      &:focus-visible {
        outline: rgba(49, 112, 238, 0.5) auto 1px;
      }
    }

    &__dropdown {
      position: absolute;
      top: calc(100% - 20px);
      width: 100%;
      padding: 10px;
      background-color: var(--light-color);
      border-radius: 4px;
      z-index: 10;
    }

    &__dropdown-item {
      color: var(--text-light-color);
      transition: background-color ease 0.2s;
      padding: 5px 10px;
      cursor: pointer;
      background-color: var(--bg-secondary-color);

      &:not(:last-child) {
        margin-bottom: 5px;
      }

      &.active {
        border: 3px solid var(--accent-color);
      }

      &:hover {
        background-color: var(--disable-color);
      }
    }
  }
</style>