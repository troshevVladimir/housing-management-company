<template>
  <div class="overlay">
    <div class="slider-modal">
      <div v-if="modalActions" class="buttons">
        <UIButton class="btn-more-info" kind="secondary">
          Подробнее
          <template #after>
            <icon-base
              icon-name="tip"
              :height="20"
              :width="20"
              view-box="0 0 20 20"
            >
              <IconCorner />
            </icon-base>
          </template>
        </UIButton>
        <UIButton class="btn-want-the-same">
          Хочу такой же
          <template #after>
            <icon-base
              icon-name="tip"
              :height="20"
              :width="20"
              view-box="0 0 20 20"
            >
              <IconCorner />
            </icon-base>
          </template>
        </UIButton>
      </div>
      <Slider ref="slider" :config="swiperConfig">
        <Slide v-for="(slide, id) in slides" :key="id" :bg="slide.imgUrl">
        </Slide>
      </Slider>
      <Slider ref="description" class="slider-description">
        <div
          v-for="(slide, id) in slides"
          :key="id"
          class="swiper-slide swiper-slide--description"
        >
          <div class="slide-data">
            <p class="slide-title">{{ slide.title }}</p>
            <span class="slide-date">{{ slide.date }}</span>
          </div>
        </div>
      </Slider>
      <div class="slider-controlers">
        <div class="swiper-button-prev" @click="prev"></div>
        <div class="swiper-button-next" @click="next"></div>
      </div>
      <button class="btn-close" @click="close">
        <icon-base
          icon-name="tip"
          :height="24"
          :width="24"
          view-box="0 0 24 24"
        >
          <IconX />
        </icon-base>
      </button>
    </div>
  </div>
</template>

<script>
import IconX from '@/assets/svg/IconX.vue'
import IconCorner from '@/assets/svg/IconCorner.vue'
import Slide from '@/components/SliderSlide.vue'
import Slider from '@/components/SliderContainer.vue'
export default {
  components: { Slider, Slide, IconX, IconCorner },
  props: {
    slides: {
      type: Array
    },
    modalActions: {
      type: Boolean
    },
  },
  data() {
    return {
      swiperConfig: {
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
      }
    }
  },
  mounted() {
    const slider = this.$refs.slider.swiper
    const sliderDescription = this.$refs.description.swiper
    slider.on('slideChange', () => sliderDescription.slideTo(slider.activeIndex));
  },
  methods: {
    next() {
      this.$refs.slider.swiper.slideNext()
    },
    prev() {
      this.$refs.slider.swiper.slidePrev()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/assets/vars';

  .buttons {
    display: flex;
    position: absolute;
    padding-bottom: 47px;
    transform: translate(0, -100%);

    @media screen and (max-width: $mobile) {
      flex-direction: column;
      left: 0;
      right: 0;
      padding: 0 20px;
      padding-bottom: 50px;
    }

    .button {
      &:not(:last-child) {
        margin-right: 24px;

        @media screen and (max-width: $mobile) {
          margin-bottom: 24px;
          margin-right: 0;
        }
      }
    }
  }

  .slide-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    margin-top: 16px;
    margin-bottom: 12px;
    color: #fff;
  }

  .slide-date {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #858585;
  }

  .overlay {
    position: absolute;
    z-index: 20000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #333;
  }

  .slider-modal {
    max-width: 1050px;
    width: 100%;
    background-color: transparent;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: $tablet) {
      padding: 0 40px;
    }

    @media screen and (max-width: $mobile) {
      padding: 0;
    }
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: -44px;
    background-color: transparent;
    border: none;
    padding: 0 10px 10px;
    cursor: pointer;

    @media screen and (max-width: $tablet) {
      top: -30px;
      right: 40px;
    }

    @media screen and (max-width: $mobile) {
      top: -35px;
      right: 10px;
    }
  }

  .swiper {
    width: 100%;

    :deep(.navigation) {
      display: none;
    }
  }

  .swiper-slide:not(.swiper-slide--description) {
    height: 0;
    padding-bottom: 70%;
    object-fit: contain;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 80px;
    height: 80px;
    padding: 20px;
    color: #fff;
    background: #666;
    transform: rotate(-180deg);
    border-radius: 100%;
    transition: all ease 0.4s;

    &:hover {
      background: #000;
    }

    @media screen and (max-width: $mobile) {
      width: 40px;
      height: 40px;
      padding: 0;
    }

    &::after {
      content: '';
      width: 40px;
      height: 40px;
      display: block;
      background-position: center;
      background-size: 40px 40px;
      background-repeat: no-repeat;
      background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.0002 6.66667L28.3335 20L15.0002 33.3333' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");

      @media screen and (max-width: $mobile) {
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
      }
    }
  }

  .slider-controlers {
    top: 50%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    left: -70px;
    right: -70px;

    @media screen and (max-width: $mobile) {
      left: -30px;
      right: -30px;
    }
  }

  .swiper-button-prev {
    transform: translate(-100%) rotate(180deg);

    @media screen and (max-width: $tablet) {
      transform: translate(100%) rotate(180deg);
    }
  }

  .swiper-button-next {
    transform: translate(100%);

    @media screen and (max-width: $tablet) {
      transform: translate(-100%);
    }
  }

  :deep(.swiper-pagination) {
    bottom: 20px;
    display: flex;
    column-gap: 14px;
    align-items: center;
    justify-content: center;

    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      background: #dcdcdc;
      opacity: 1;

      &-active {
        width: 22px;
        height: 22px;
        background: #ffb13d;
      }
    }
  }

  .slider-description {
    .swiper-pagination,
    .swiper-pagination,
    .navigation {
      display: none !important;
    }
  }
</style>
