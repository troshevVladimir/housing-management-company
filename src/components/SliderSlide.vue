<template>
  <div class="swiper-slide" :style="{ backgroundImage: `url(${bg})` }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      required: false,
    },
  },
}
</script>

<style>
  .swiper-slide {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>