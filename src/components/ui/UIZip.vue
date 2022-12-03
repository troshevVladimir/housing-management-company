<template>
  <div class="zip">
    <div ref="zip"></div>
  </div>
</template>

<script>
import noUiSlider from 'nouislider'
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    minmax: {
      type: Array,
    },
    step: {
      type: Number,
    },
    round: {
      type: Number,
    }
  },
  data() {
    return {
      localValue: 0,
      sliderInstance: null,
    }
  },
  watch: {
    localValue(val) {
      this.$emit('change', val)
      this.$emit('update:modelValue', val)
    },
  },
  created() {
    this.localValue = this.value || this.modelValue
    if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
      this.$parent.formItems.push(this)
    }
  },
  mounted() {
    this.sliderInstance = noUiSlider.create(this.$refs.zip, {
      start: [0, this.minmax[1] / 2],
      connect: true,
      step: this.step,
      range: {
        min: 0,
        max: this.minmax[1],
      },
      format: {
        to: (value) => Number(value).toFixed(this.round),
        from: (value) => Number(value).toFixed(this.round),
      },
      pips: {
        mode: 'steps',
        values: [0, this.minmax[1]],
        density: 400
      },
      tooltips: true,
    })
    this.sliderInstance.on('update', this.onUpdateSlider)
  },
  beforeUnmount() {
    this.sliderInstance.off('update', this.onUpdateSlider)
  },
  methods: {
    onUpdateSlider(value) {
      this.localValue = Number(value[1]).toFixed(this.round)
    },
  },
}
</script>

<style lang="scss">
  @import 'nouislider/dist/nouislider.css';

  .noUi-target.noUi-horizontal .noUi-base {
    background-color: #c4c4c4;
    height: 4px;
  }

  .zip {
    .noUi-target.noUi-horizontal {
      background: transparent;
      border-radius: 1px;
      border: none;
      box-shadow: none;
      margin-bottom: 41px;
      height: 4px;

      .noUi-value-sub,
      .noUi-marker-large,
      .noUi-marker-sub {
        display: none;
      }

      .noUi-value-large {
        transform: translate(-50%, -3px);
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #c4c4c4;
      }

      & .noUi-handle {
        top: -9px;
        right: -10px;
        width: 20px;
        height: 20px;
        background-color: #e7e7e7;
        border-radius: 5px;

        &::before,
        &::after {
          display: none;
        }
      }

      .noUi-connect {
        background-color: #ffb13d;
        height: 4px;
      }

      .noUi-base {
        background-color: #c4c4c4;
        height: 4px;

        & > .noUi-origin {
          display: none;
        }

        & > .noUi-origin + .noUi-origin {
          display: block;
        }
      }

      .noUi-tooltip {
        background: transparent;
        padding: 0;
        border: none;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #161616;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 2px);
      }
    }
  }
</style>

