<template>
	<header class="header navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Navbar</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link class="nav-link" to="/">Main</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/about">About</router-link>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>Houses</a>
						<ul class="dropdown-menu">
							<li>
								<router-link
									class="dropdown-item"
									:to="{name: 'houses', params: { title: 'Houses page'}}"
								>Houses Table</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
		<span>
			<b>{{userName}}</b>
		</span>
	</header>
</template>

<script lang="ts">
export default {
	props: {
		userName: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss">
	.header {
		padding-right: 40px;
	}
</style>