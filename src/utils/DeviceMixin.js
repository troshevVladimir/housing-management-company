
export default {
  data() {
    return {
      currentWidth: 0,
      mobileBP: 767,
      tabletBP: 1659,
    }
  },

  computed: {
    isMobile() {
      return this.currentWidth < this.mobileBP
    },
    isTablet() {
      return this.currentWidth < this.tabletBP
    },
    isDesktop() {
      return this.currentWidth > this.tabletBP
    },
  },

  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.currentWidth = window.innerWidth
    },
  },
}