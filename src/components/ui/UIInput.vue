<template>
  <label>
    {{ label }}
    <input
      type="text"
      :placeholder="placeholder"
      v-model="localValue"
      :name="this.name"
    />
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    modelValue: {
      type: String,
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
  },
  data() {
    return {
      localValue: null,
    }
  },
  watch: {
    localValue(val) {
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
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

<style lang="scss" >
</style>
