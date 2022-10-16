<template>
  <form @submit.prevent="submit" class="form">
    <div class="form__body">
      <slot />
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
      formItems: [],
      formData: null,
    }
  },
  methods: {
    submit() {
      this.initFormData()

      for (var pair of this.formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
    },
    initFormData() {
      this.formData = new FormData()
      this.formItems.forEach((item) => {
        this.formData.append(item.name, item.localValue)
      })
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
  }
</style>