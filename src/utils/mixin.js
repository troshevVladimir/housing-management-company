// export const formItemMixin = {
//   props: {
//     value: {
//       type: String,
//     },
//     modelValue: {
//       type: String,
//       default: '',
//     },
//     // label: {
//     //   type: String,
//     // },
//     name: {
//       type: String,
//     },
//     validators: {
//       type: Array,
//     },
//     required: {
//       type: Boolean,
//     },
//   },

//   data() {
//     return {
//       localValue: null,
//       errors: [],
//       formError: `Поле ${this.label} заполнено не верно`,
//       currentError: '',
//     }
//   },

//   methods: {
//     validate(e, fromParent = false) {
//       this.errors = []
//       this.validators.forEach((validator) => {
//         const result = validator(this.localValue)
//         if (result.error) {
//           this.errors.push(result.message)
//           if (fromParent) this.$parent.formError = true
//         }

//         if (!fromParent && !this.errors.length) this.$parent.formError = false
//       })
//     },
//   },

//   watch: {
//     localValue(val) {
//       this.$emit('update:modelValue', val)
//       this.$emit('change', val)
//     },
//     errors: {
//       handler: function (val) {
//         if (val.length) {
//           this.currentError = this.errors[0]
//         } else {
//           this.currentError = ''
//         }
//       },
//       deep: true,
//     },
//   },
//   created() {
//     this.localValue = this.value || this.modelValue
//     if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
//       this.$parent.formItems.push(this)
//     }
//   },
// }