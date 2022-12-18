<template>
  <div class="wrapper">
    <label
      class="label"
      :class="{
        error: errors.length,
        success: localValue && errors.length == 0,
      }"
    >
      <!-- <p>{{ label }} <sup v-if="required">*</sup></p> -->
      {{ getFiles || placeholder }}
      <input
        type="file"
        :name="name"
        multiple
        @change="changeHandler"
        @blur="validate"
      />
      <div v-if="errors.length" class="error-message">
        {{ currentError }}
      </div>
    </label>
    <!-- <icon-base
      v-if="!isMobile"
      v-tippy="{ placement: 'right', theme: 'light' }"
      content="Можно добавить до 5 файлов с разрешением pdf, jpg, png, jpeg, txt, doc, docx, xls, xlsx, ppt, pptx, xml до 20мб. Максимальный размер файла 5мб"
      icon-name="tip"
      :height="20"
      :width="20"
      view-box="0 0 20 20"
    >
      <IconTooltip />
    </icon-base> -->
  </div>
</template>

<script>
export default {
  props: {
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
      localValue: [],
      errors: [],
      formError: `Поле ${this.label} заполнено не верно`,
      currentError: '',
    }
  },

  computed: {
    getFiles() {
      return this.localValue.join(', ')
    },
  },
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
    if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
      this.$parent.formItems.push(this)
    }
  },
  methods: {
    changeHandler(e) {
      this.errors = []
      const files = e.target.files
      if (files.length > 5) {
        e.preventDefault()
        this.errors.push('Вы не можите выбрать больше 5 файлов')
        return
      }
      for (let index = 0; index < files.length; index++) {
        const element = files[index]
        this.localValue.push(element.name)
      }
    },
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
  .wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    max-width: 177px;

    @media screen and (max-width: 600px) {
      max-width: 100%;
    }
  }

  label {
    position: relative;
    display: flex;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #828282;
    padding: 9px 16px;
    width: 100%;
    border: 1px dashed #dcdcdc;
    border-radius: 5px;
    margin-right: 20px;

    @media screen and (max-width: 600px) {
      margin-right: 0;
    }

    &:focus {
      outline: none;
      border: 1px solid #5a3839;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #000;
    }

    .error-message {
      color: #fb7d81;
      position: absolute;
      bottom: -16px;
      left: 0;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    }
  }

  input {
    visibility: hidden;
    display: none;
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
</style>

<style lang="scss">
  .tippy-tooltip.light-theme {
    padding: 16px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px #ddd;
  }
</style>
