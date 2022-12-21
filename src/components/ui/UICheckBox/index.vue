<template>
  <label class="checkbox">
    <input type="checkbox" :name="name" v-model="localValue" />
    <span class="custom-checkbox"></span>
    <span class="value"><slot /></span>
  </label>
</template>

<script>
export default {
  name: 'UICheckBox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    }
  },
  watch: {
    localValue(val) {
      this.$emit('change', val)
      this.$emit('update:modelValue', val)
    },
  },
  created() {
    this.localValue = this.value || this.modelValue
    if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
      this.$parent.formItems.push(this)
    }
  },
}
</script>

<style lang="scss" scoped>
  .checkbox {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-size: 14px;

    input[type='checkbox'] {
      display: none;
    }

    input:checked + .custom-checkbox {
      border-color: #ffb13d;

      &::after {
        display: block;
      }
    }
  }

  .custom-checkbox {
    width: 18px;
    height: 18px;
    border: 1px solid #e0e0e0;
    border-radius: 3px;
    margin-right: 16px;

    &::after {
      content: '';
      display: none;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.75 8.75L6.25 12.25L13.25 4.75' stroke='%23FFB13D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    }
  }
</style>
