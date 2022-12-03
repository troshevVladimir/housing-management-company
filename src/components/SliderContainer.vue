<template>
  <div ref="swiper" class="swiper">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="navigation">
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css';
export default {
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      swiper: null,
      baseConfig: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },

  mounted() {
    this.swiper = new Swiper(this.$refs.swiper, {
      ...this.baseConfig,
      ...this.config,
    })
  },
}
</script>