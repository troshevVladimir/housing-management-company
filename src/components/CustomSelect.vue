<template>
  <select class="form-select" aria-label="Default select example">
    <option
      v-for="option in options"
      :key="option.value"
      :selected="isSelected(option.value)"
      @click="select(option.id)"
    >{{option.value}}</option>
  </select>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'custom-select',
	props: {
		options: {
			type: Array,
			required: true,
		},
		selected: {
			type: String,
			required: true,
		},
	},
	methods: {
		isSelected(currentOption) {
			return currentOption === selected
		},
		select(id) {
			this.$emit('selected', id)
		},
	},
})
</script>

<style>
</style>