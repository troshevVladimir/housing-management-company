<template>
  <component
    :is='component'
    class="button"
    :to='routerLinkTo'
    :class='{
      [`button--${this.kind}`]: this.kind,
      [`button--type-${this.component}`]: this.component,
      [`button--size-${this.size}`]: this.size,
      [`button--disabled`]: this.disabled
    }'
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    kind: {
      type: String,
      validator: (val) => ['danger', 'success'].includes(val),
    },
    size: {
      type: String,
      validator: (val) => ['small', 'default'].includes(val),
      default: 'default',
    },
    disabled: {
      type: Boolean,
    },
    routerLinkTo: {
      type: Object,
      default: null,
    },
  },
  computed: {
    component() {
      return this.routerLinkTo ? 'router-link' : 'button';
    },
  },
};
</script>

<style lang='scss'>
.button {
  padding: 20px 30px;
  border: 2px solid #666;
  color: #000;
  transition: all ease .4s;
  text-decoration: none;

  @media screen and (max-width: 600px) {
    padding: 10px 15px;
  }

  &:hover {
    color: rgb(88, 86, 86)
  }

  &--danger{
    border-color: rgb(136, 58, 58);

    &:hover {
      border-color: rgb(92, 39, 39);
    }
  }

  &--success{
    border-color: rgb(58, 136, 58);

    &:hover {
      border-color: rgb(39, 92, 61);
    }
  }

  &--size {
    &-small {
      padding: 10px 15px;
    }
  }

  &--type-a {
    text-decoration: underline;
  }

  &--disabled {
    pointer-events: none;
    color: #666;
    border-color: rgb(163, 160, 160);
  }

  &--type-button {
    cursor: pointer;
  }
}
</style>
