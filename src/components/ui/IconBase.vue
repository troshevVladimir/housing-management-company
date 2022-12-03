<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="viewBox || `0 0 ${width} ${height}`"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title
      :id="iconName"
      lang="en"
    >{{ iconName }} icon</title>
    <g
      :fill="fillColor"
      :stroke="strokeColor"
    >
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box',
    },
    width: {
      type: [Number, String],
      default: 16,
    },
    height: {
      type: [Number, String],
      default: 16,
    },
    fillColor: {
      type: String,
      default: 'transparent',
    },
    strokeColor: {
      type: String,
      default: 'transparent',
    },
    viewBox: {
      type: String,
      default: '',
    },
  },
}
</script>