<template>
  <div class="range">
    <div class="price-values">
      <div class="price-value">
        <span>от &nbsp;</span><strong>{{ from }}</strong>
      </div>
      <div class="price-value">
        <span>до &nbsp;</span><strong>{{ to }}</strong>
      </div>
    </div>
    <div ref="range"></div>
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
  },
  data() {
    return {
      from: 0,
      to: 0,
      sliderInstance: null,
    }
  },
  watch: {
    localValue(val) {
      this.$emit('change', val)
      this.$emit('update:modelValue', val)
    },
  },
  methods: {
    onUpdateSlider(value) {
      this.from = Math.round(value[0]).toLocaleString()
      this.to = Math.round(value[1]).toLocaleString()
    },
  },
  created() {
    this.localValue = this.value || this.modelValue
    if (this.$parent.formItems && Array.isArray(this.$parent.formItems)) {
      this.$parent.formItems.push(this)
    }
  },
  mounted() {
    this.sliderInstance = noUiSlider.create(this.$refs.range, {
      start: [10000, 30000],
      connect: true,
      range: {
        min: 0,
        max: 50000,
      },
    })

    this.sliderInstance.on('update', this.onUpdateSlider)
  },
  beforeUnmount() {
    this.sliderInstance.off('update', this.onUpdateSlider)
  },
}
</script>

<style lang="scss">
  .noUi-target.noUi-horizontal {
    background: transparent;
    border-radius: 1px;
    border: none;
    box-shadow: none;
    margin-bottom: 41px;
    height: 4px;

    & .noUi-handle {
      top: -9px;
      right: -10px;
      border-radius: 9px;
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
      background-color: #fff;
      height: 4px;
    }
  }
</style>

<style lang="scss" scoped>
  @import 'nouislider/dist/nouislider.css';
  .price-values {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .price-value {
    background: #f3f3f3;
    border-radius: 4px;
    padding-left: 16px;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: start;

    span {
      color: #919496;
    }

    &:first-child {
      margin-right: 8px;
    }
  }
</style>
