<template>
  <component
    :is="linkComponent"
    class="button"
    :to="!external ? routerLinkTo : null"
    :href="external ? routerLinkTo : null"
    :external="!!external"
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
    <font-awesome-icon :icon="iconName" />
  </component>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    kind: {
      type: String,
      validator: (val) => ['primary', 'secondary'].includes(val),
      default: 'primary',
    },
    size: {
      type: String,
      validator: (val) => ['small', 'default'].includes(val),
      default: 'default',
    },
    disabled: {
      type: Boolean,
    },
    linkTo: {
      type: String,
    },
    external: {
      type: Boolean,
    },
  },
  computed: {
    linkComponent() {
      if (!this.routerLinkTo) {
        return 'button'
      } else {
        return this.external ? 'a' : 'router-link'
      }
    },
    iconName() {
      if (!this.routerLinkTo) return
      return this.external ? 'arrow-right' : 'arrow-up-right-from-square'
    },
  },
}
</script>

<style lang='scss'>
  .button {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.16em;
    $parent: &;
    cursor: pointer;

    transition: all ease 0.4s;
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

    @media screen and (max-width: 600px) {
      width: 100%;
    }

    &--type-router-link {
      text-decoration: underline;
      border-color: #333;
      color: #333;
    }

    &--type-button {
      cursor: pointer;
    }

    &--primary {
      background-color: var(--main-color);
      color: #fff;

      &:hover {
        background-color: var(--main-dark-color);
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
      color: var(--main-color);
      border: 2px solid var(--main-color);

      &:hover {
        background-color: var(--main-color);
        color: #fff;
      }

      &#{$parent}--disabled {
        border-color: #afafaf;
        color: #afafaf;
      }
    }
  }

  a.button {
    background: transparent !important;
    text-decoration: none;
    color: rgb(90, 78, 255);

    &:hover {
      background: transparent;
    }
    &:after {
      width: 20px;
    }

    &--disabled {
      color: #afafaf !important;
    }
  }

  button.button {
    $parent: &;
    padding: 20px 40px;

    &:not(#{$parent}--disabled) {
      box-shadow: 0 10px 20px #888;
    }

    &:active {
      box-shadow: 0 5px 10px #999 !important;
    }

    &--disabled {
      pointer-events: none;
    }

    &--size {
      &-small {
        padding: 6px 18px;
      }
    }
  }
</style>
