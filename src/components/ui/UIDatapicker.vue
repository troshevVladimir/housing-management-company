<template>
  <label
    class="label"
    :class="{
      error: errors.length,
      success: localValue && errors.length == 0,
    }"
  >
    <p>{{ label }} <sup v-if="required">*</sup></p>

    <div>
      <date-picker
        v-model="localValue"
        :placeholder="placeholder"
        value-type="format"
      >
        <!-- <template #icon-calendar> -->
        <!-- <icon-base
            icon-name="tip"
            :height="24"
            :width="24"
            view-box="0 0 24 24"
          >
            <IconCalendar />
          </icon-base> -->
        <!-- </template> -->
      </date-picker>
      <!-- <date-picker v-model="time2" type="datetime"></date-picker> -->
      <!-- <date-picker v-model="time3" range></date-picker> -->
    </div>
    <div v-if="errors.length" class="error-message">
      {{ currentError }}
    </div>
  </label>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
export default {
  components: { DatePicker },
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
      default: () => [],
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
  methods: {
    validate(e, fromParent = false) {
      this.errors = []
      if (!this.validators && !this.validators.length) return
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
</style>

<style>
  .mx-datepicker {
    width: 100%;
    outline: none;
  }

  .mx-input {
    box-shadow: none;
    padding: 9px 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #828282;
    height: initial;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
  }

  .mx-input:hover {
    border-color: #dcdcdc;
  }

  .mx-input:focus {
    border: 1px solid #5a3839 !important;
  }
</style>
