<template>
  <div class="pagination">
    <div class="pagination__nav pagination__nav--prev" @click="prev">
      <icon-base
        icon-name="tip"
        stroke-color="#888"
        :height="16"
        :width="16"
        view-box="0 0 16 16"
      >
        <IconChevronUp />
      </icon-base>
    </div>

    <div class="pagination__map">
      <div
        v-for="pageNum in visiblePages"
        :key="pageNum"
        class="pagination__btn"
        :class="{ 'pagination__btn--active': curentPage === pageNum }"
        @click="curentPage = pageNum"
      >
        {{ pageNum }}
      </div>
      <div v-if="!totalVisible" class="pagination__btn">...</div>
      <div
        v-if="!totalVisible"
        class="pagination__btn"
        :class="{ 'pagination__btn--active': curentPage === total }"
        @click="curentPage = total"
      >
        {{ total }}
      </div>
    </div>

    <div class="pagination__nav pagination__nav--next" @click="next">
      <icon-base
        icon-name="tip"
        stroke-color="#888"
        :height="16"
        :width="16"
        view-box="0 0 16 16"
      >
        <IconChevronUp />
      </icon-base>
    </div>
  </div>
</template>

<script>
import IconChevronUp from '@/assets/svg/IconChevronUp.vue'

export default {
  components: { IconChevronUp },
  props: {
    total: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      paginationVisibleAmount: 4,
      curentPage: 1,
    }
  },
  computed: {
    visibleAmount() {
      return this.curentPage + this.paginationVisibleAmount
    },
    totalVisible() {
      return this.visibleAmount >= this.total - 1
    },
    visiblePages() {
      if (this.totalVisible) {
        return this.total
      } else {
        return this.visibleAmount
      }
    },
  },
  watch: {
    curentPage(val) {
      this.$emit('change', val)
    },
  },
  methods: {
    next() {
      if (this.curentPage === this.total) return
      this.curentPage++
    },
    prev() {
      if (this.curentPage === 1) return
      this.curentPage--
    },
  },
}
</script>

<style lang="scss">
  .pagination {
    box-sizing: border-box;
    display: inline-flex;
    border-bottom: 1px solid #d9d9d9;
    align-items: center;
    justify-content: center;

    &__nav {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 10px;

      &--next {
        transform: rotate(-180deg);
        transform-origin: 50%;
      }
    }

    &__map {
      display: flex;
      margin: 0 20px;
    }

    &__btn {
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #2b2b2b;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 7px;
      cursor: pointer;

      &--active {
        font-weight: 700;
        color: $yellow;
        border-bottom: 2px solid currentcolor;
      }
    }
  }
</style>