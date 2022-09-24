<template>
  <main class="main">
    <DefaultHeader></DefaultHeader>

    <section class="content">
			<h1 class="houses-page__page-title">{{$route.meta.title}}</h1>
      <router-view></router-view>
    </section>

    <DefaultAsside></DefaultAsside>

    <footer class="footer">footer</footer>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DefaultAsside from "../components/DefaultAsside.vue";
import DefaultHeader from "../components/DefaultHeader.vue";
import { mapGetters, mapActions } from 'vuex'

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
	},
	methods: {
		...mapActions({
			initUserFromStor: 'userData/initUserFromStor'
		})
	},
	mounted() {
		this.initUserFromStor()
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

		grid-template-areas:
			'header header'
			'sidebar content'
			'footer footer';

		.header {
			grid-area: header;
			z-index: 10;
		}

		.sidebar {
			grid-area: sidebar;
			background-color: rgb(110, 60, 60);
		}

		.content {
			grid-area: content;
			background-color: rgb(101, 97, 109);

			padding: 20px 15px;
		}

		.footer {
			grid-area: footer;
		}
	}
</style>
