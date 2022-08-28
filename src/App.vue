<template>
	<component :is="layout"></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default defineComponent({
	data() {
		return {
			layout: "DefaultLayout",
		};
	},
	components: {
		DefaultLayout,
	},
});
</script>

<style lang="scss">
	body {
		--bs-body-bg: rgb(106, 102, 128);
	}
</style>
