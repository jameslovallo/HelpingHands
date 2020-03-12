<template>
	<v-app>
		<v-app-bar app dense color="primary" dark>
			<v-toolbar-title class="hidden-xs-only"
				>Helping Hands, NYC</v-toolbar-title
			>
			<v-spacer />
			<v-btn to="/" text>Home</v-btn>
			<v-btn to="/app/" text>App</v-btn>
			<v-btn to="/about/" text>About</v-btn>
			<v-spacer class="xs-only" />
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
	h1,
	h2,
	h3 {
		margin-bottom: 1rem;
		line-height: 1.25em;
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