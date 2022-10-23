<template>
  <form @submit.prevent="submit" class="form">
    <div class="form__body">
      <slot :validators="this.validations()" />
    </div>

    <div
      v-if="formMessage.value || formError"
      class="form__message"
      :class="`form__message--${formMessage.type}`"
    >
      {{ formMessage.value || 'Форма заполнено не верно' }}
    </div>

    <div class="form__actions">
      <ui-button kind="success">Submit</ui-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formMessage: {
        type: 'error',
        value: '',
      },
      formItems: [],
      formData: null,
      formError: false,
    }
  },
  methods: {
    submit() {
      this.initFormData()
      this.formError = false
      this.validateItems()
      // fetch('')
    },
    validateItems() {
      this.formItems.forEach((el) => {
        el.validate(null, true)
      })
    },
    initFormData() {
      this.formData = new FormData()
      this.formItems.forEach((item) => {
        this.formData.append(item.name, item.localValue)
      })
    },
    validations() {
      return {
        required: (value) => {
          if (!value) {
            return {
              error: true,
              message: 'Это поле обязательно для заполнения',
            }
          }
          return {
            error: false,
          }
        },
        length: (length) => {
          return (value) => {
            if (value.length < length) {
              return {
                error: true,
                message: `Это поле обязательно должно иметь длину больше ${length}`,
              }
            }
            return {
              error: false,
            }
          }
        },
        email: (value) => {
          const condition = String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          if (!condition) {
            return {
              error: true,
              message: 'Тут надо указать e-mail',
            }
          }
          return {
            error: false,
          }
        },
      }
    },
  },
}
</script>
<style lang="scss">
  .form {
    &__body {
      margin-bottom: 30px;

      & > *:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    &__message {
      &--error {
        color: #fb7d81;
        font-size: 16px;
      }
    }
  }
</style>