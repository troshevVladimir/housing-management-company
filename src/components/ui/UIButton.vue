<template>
  <component
    :is="component"
    class="button"
    :to="!external ? routerLinkTo : false"
    :external="!!external"
    :href="external ? routerLinkTo : false"
    :class="{
      [`button--${kind}`]: kind,
      [`button--type-${component}`]: component,
      [`button--size-${size}`]: size,
      [`button--disabled`]: disabled,
    }"
  >
    <slot name="before" />
    <slot />
    <slot name="after" />
  </component>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    kind: {
      type: String,
      validator: (val) => ['primary', 'secondary'].includes(val),
      default: 'primary'
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
    external: {
      type: Boolean,
    }
  },
  computed: {
    component() {
      if (!this.routerLinkTo) {
        return 'button'
      } else {
        return this.external ? 'a' : 'router-link'
      }
    },
  },
};
</script>

<style lang='scss'>
  @import '@/assets/vars';

  .button {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.16em;
    $parent: &;
    padding: 20px 40px;
    transition: all ease 0.4s;
    text-decoration: none;
    box-shadow: 0 10px 20px #888;
    border-radius: 10px;
    border-style: none;
    display: inline-flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    & > svg {
      path {
        stroke: currentcolor !important;
      }
    }

    @media screen and (max-width: $mobile) {
      width: 100%;
    }

    &--primary {
      background-color: $yellow;
      color: #fff;

      &:hover {
        background-color: $brown;
      }

      &#{$parent}--disabled {
        background-color: #afafaf;
        color: #fff;
      }

      &:active {
        background-color: #6b3d3f;
      }
    }

    &--secondary {
      background: transparent;
      color: $yellow;
      border: 2px solid $yellow;

      &:hover {
        background-color: $yellow;
        color: #fff;
      }

      &#{$parent}--disabled {
        border-color: #afafaf;
        color: #afafaf;
      }
    }

    &--disabled {
      pointer-events: none;
    }

    &--size {
      &-small {
        padding: 6px 12px;
      }
    }

    &--type-router-link {
      text-decoration: underline;
      border-color: #333;
      color: #333;
    }

    &--type-button {
      cursor: pointer;
    }

    &:active {
      box-shadow: 0 5px 10px #999;
    }
  }
</style>
