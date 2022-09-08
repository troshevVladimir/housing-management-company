<template>
  <component :is="getLayout"></component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

export default defineComponent({
	data() {
		return {
			layout: "DefaultLayout",
			routesWithEmptyLayout: ['auth']
		};
	},
	components: {
		DefaultLayout,
		EmptyLayout
	},
	computed: {
		getLayout() {
			console.log();

			if (this.routesWithEmptyLayout.includes(this.$route.path.split('/')[1])) {
				return 'EmptyLayout'
			}
			return 'DefaultLayout'
		}
	}
});
</script>

<style lang="scss">
	body {
		--bs-body-bg: rgb(106, 102, 128);
	}
</style>
