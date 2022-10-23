<template>
  <label
    class="label"
    :class="{
      error: errors.length,
      success: localValue && errors.length == 0,
    }"
  >
    <p>{{ label }} <sup v-if="required">*</sup></p>

    <input
      @blur="validate"
      type="text"
      :placeholder="placeholder"
      v-model="localValue"
      :name="this.name"
    />
    <div class="error-message" v-if="this.errors.length">
      {{ currentError }}
    </div>
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
      default: '',
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
  data() {
    return {
      localValue: null,
      errors: [],
      formError: `Поле ${this.label} заполнено не верно`,
      currentError: '',
    }
  },
  methods: {
    validate(e, fromParent = false) {
      this.errors = []
      this.validators.forEach((validator) => {
        const result = validator(this.localValue)
        if (result.error) {
          this.errors.push(result.message)
          if (fromParent) this.$parent.formError = true
        }

        if (!fromParent && !this.errors.length) this.$parent.formError = false
      })
    },
  },
  computed: {},
  watch: {
    localValue(val) {
      this.$emit('update:modelValue', val)
      this.$emit('change', val)
    },
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
}
</script>

<style lang="scss" scoped>
  label {
    position: relative;
    padding-bottom: 24px;
  }

  .error {
    input {
      border: 1px solid #fb7d81;
    }
  }

  .success {
    input {
      border: 1px solid #76da8c;
    }
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

  input {
    border-radius: 5px;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #666666;
    padding: 9px 16px;
    border: 1px solid;
    width: 100%;

    &:focus {
      outline: none;
      border-color: #5a3839;
    }
    &:hover {
      border-color: #666;
    }
  }
</style>
