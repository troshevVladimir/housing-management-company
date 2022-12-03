<template>
  <div class="checkbox-wrapper">
    <div
      class="checkbox"
      :class="[
        `checkbox--size-${this.size}`,
        {
          'checkbox--active': localValue,
        },
      ]"
      @click="clickHandler"
    >
      <input type="checkbox" :id="`checkbox-${name}`" v-model="localValue" />
      <div class="checkbox__toggler"></div>
    </div>

    <label :for="`checkbox-${name}`">
      <slot /> <sup v-if="required">*</sup>
    </label>

    <div class="error-message" v-if="errors">
      {{ errors }}
    </div>
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
    required: {
      type: Boolean,
    },
  },
  data() {
    return {
      localValue: this.modelValue,
      errors: '',
    }
  },
  methods: {
    clickHandler() {
      this.localValue = !this.localValue
    },
    validate() {
      this.errors = ''
      if (this.required && !this.localValue) {
        this.errors = 'Тут надо отметить обязательно'
      }
    },
  },
  watch: {
    localValue(val) {
      this.validate()
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
    position: relative;
    padding-bottom: 24px;
  }

  .checkbox-wrapper label {
    margin-bottom: 0;
    cursor: pointer;
    display: inline-block;
    width: initial;
  }

  .error-message {
    color: #fb7d81;
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }

  .checkbox {
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
    box-shadow: 0 8px 16px #ccc;
  }

  .checkbox--active .checkbox__toggler {
    left: initial;
    right: 1px;
    transform: translate(0, -50%);
  }
</style>
