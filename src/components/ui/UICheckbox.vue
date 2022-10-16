<template>
  <div class="checkbox-wrapper">
    <div
      class="checkbox"
      :class="[
        `checkbox--size-${this.size}`,
        { 'checkbox--active': this.localValue },
      ]"
      @click="clickHandler"
    >
      <input type="checkbox" :id="`checkbox-${name}`" v-model="localValue" />
      <div class="checkbox__toggler"></div>
    </div>
    <label :for="`checkbox-${name}`"><slot /></label>
  </div>
</template>

<script>
export default {
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
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'small'].includes(value),
    },
  },
  data() {
    return {
      localValue: this.modelValue,
    }
  },
  methods: {
    clickHandler() {
      this.localValue = !this.localValue
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
  .checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  .checkbox-wrapper label {
    margin-bottom: 0;
    cursor: pointer;
    display: inline-block;
    width: initial;
  }

  .checkbox {
    width: 100%;
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    width: 48px;
    height: 24px;
    margin-right: 20px;
    border-radius: 100px;
    background-color: #dcdcdc;
    transition: all ease 0.2s;
    cursor: pointer;
  }

  .checkbox--size-small {
    width: 32px;
    height: 16px;
  }

  .checkbox--size-small .checkbox__toggler {
    width: 14px;
    height: 14px;
  }

  .checkbox--active {
    background-color: #316fee;
  }

  .checkbox input {
    visibility: hidden;
  }

  .checkbox__label {
    left: 100%;
    margin-left: 8px;
  }

  input:active + .checkbox__toggler {
    background-color: #999;
  }

  .checkbox__toggler {
    position: absolute;
    top: 50%;
    left: 1px;
    transform: translate(0, -50%);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.12);
  }

  .checkbox--active .checkbox__toggler {
    left: initial;
    right: 1px;
    transform: translate(0, -50%);
  }
</style>
