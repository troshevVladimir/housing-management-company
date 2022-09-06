<template>
  <main class="main">
    <DefaultHeader :user-name="userName"></DefaultHeader>

    <section class="content">
      <router-view></router-view>
    </section>

    <DefaultAsside></DefaultAsside>

    <footer class="footer">footer</footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultAsside from "./DefaultAsside.vue";
import DefaultHeader from "./DefaultHeader.vue";
import { mapGetters, mapState } from 'vuex'

export default defineComponent({
	name: "default-layout",
	components: {
		DefaultAsside,
		DefaultHeader
	},
	computed: {
		...mapGetters({
			userName: 'getUserName'
		})
	}
});
</script>

<style lang="scss">
	.main {
		display: grid;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		grid-template-rows: 70px auto 100px;
		grid-template-columns: 200px auto;

		@media screen and (max-width: 600px) {
			grid-template-columns: 1px auto;
		}

		grid-template-areas:
			'header header'
			'sidebar content'
			'footer footer';

		.header {
			grid-area: header;
			padding-right: 20px;
		}

		.sidebar {
			grid-area: sidebar;
			background-color: rgb(110, 60, 60);

			@media screen and (max-width: 600px) {
				position: absolute;
				left: 0;
				top: 0;
				transform: translate(-100%);
			}
		}

		.content {
			grid-area: content;
			background-color: rgb(78, 32, 185);

			padding: 20px 15px;
		}

		.footer {
			grid-area: footer;
		}
	}
</style>
