<script>
import { h } from "vue"
import UISelect from "./UISelect.vue"

export default {
  name: 'ui-input',
  emits: ['change'],
  render() {
    const defaultSlot = this.$slots.default ? this.$slots.default() : []
    const tag = this.type === 'select' ? UISelect : this.tag

    const input = h(
      tag,
      {
        type: this.type,
        name: this.name,
        class: [{
          'input--checkbox': this.type === 'checkbox',
          'input': this.type !== 'select'
        }],
        onInput: value => this.$emit('change', value)
      },
      defaultSlot
    )

    return h('label', {class: 'label'}, [this.label, input])
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    tag: {
      type: String,
    },
    label: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-weight: 600;
  font-size: 20px;
  color: var(--dark-color);

  input:not(.input--checkbox) {
    width: 100%;
  }

  .input,
  &:deep(.input) {
    background-color: var(--light-color);
    border: 1px solid var(--dark-color);
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 600;
    min-height: 30px;

    &--checkbox {
      &::after {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: var(--light-color);
        border: 1px solid var(--dark-color);
        border-radius: 4px;
      }

      &:checked {
        &::after {
          content: 'v';
        }
      }
    }
  }
}


</style>