<template>
  <label class="radio" v-for="(item, index) in data" :key="index">
    <input
      type="radio"
      :name="name"
      :value="item.value"
      :checked="item.checked"
      @change="changeHandler"
    />
    <span class="custom-radio"></span>
    <span class="value">{{ item.label }}</span>
  </label>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: false,
    },
    name: {
      type: String,
    },
  },
  data() {
    return {
      localValue: null,
    }
  },
  methods: {
    changeHandler(e) {
      this.$emit(this.name, e.target.value)
    },
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
  .radio {
    display: flex;
    flex-direction: row;
    font-size: 14px;

    input[type='radio'] {
      display: none;
    }

    input:checked + .custom-radio {
      border-color: #ffb13d;

      &::after {
        display: block;
      }
    }
  }

  .custom-radio {
    width: 20px;
    height: 20px;
    border: 2px solid #e7e7e7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;

    &::after {
      content: '';
      display: none;
      width: 10px;
      height: 10px;
      background-color: #ffb13d;
      border-radius: 50%;
    }
  }
</style>
