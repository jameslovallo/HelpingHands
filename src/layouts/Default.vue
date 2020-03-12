<template>
	<v-app>
		<v-app-bar app dense color="primary" dark>
			<v-toolbar-title class="hidden-xs-only"
				>Helping Hands, NYC</v-toolbar-title
			>
			<v-spacer />
			<v-btn to="/" text>Home</v-btn>
			<v-btn to="/app/" text>App</v-btn>
			<g-link
				to="/app/"
				style="height: 0; width: 0; visibility: hidden; pointer-events: none;"
			/>
			<v-btn to="/about/" text>About</v-btn>
			<v-spacer class="hidden-sm-and-up" />
		</v-app-bar>

		<v-content>
			<slot />
		</v-content>

		<!-- <v-navigation-drawer app v-model="drawer"> </v-navigation-drawer> -->
	</v-app>
</template>

<script>
	export default {
		data: () => ({ drawer: null })
	};
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Pragati+Narrow:wght@700&display=swap");

	h1,
	h2,
	h3 {
		margin-bottom: 1rem;
		line-height: 1.25em;
		font-family: "Pragati Narrow", Roboto, sans-serif;
	}

	h1,
	.h1 {
		font-size: calc(36px + (60 - 36) * ((100vw - 400px) / (1800 - 400)));
	}

	h2,
	.h2 {
		font-size: calc(24px + (36 - 24) * ((100vw - 400px) / (1800 - 400)));
	}

	h3,
	.h3 {
		font-size: calc(34px + (48 - 34) * ((100vw - 400px) / (1800 - 400)));
	}

	p,
	ol,
	ul {
		font-size: calc(16px + (18 - 16) * ((100vw - 400px) / (1800 - 400)));
	}
</style>