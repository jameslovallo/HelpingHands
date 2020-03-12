<template>
	<Layout>
		<v-container class="text-center my-12">
			<h1>
				{{ title }}
			</h1>
			<p class="body-1">
				But New Yorkers look out for each other.<br />We want to connect those
				who can help with those who need it.
			</p>
			<v-btn large rounded color="accent" to="/app/">Get Started</v-btn>
			<v-img
				src="spread_love.svg"
				contain
				max-width="800"
				style="margin: 2rem auto;"
				class="mt-lg-12"
			/>
		</v-container>
	</Layout>
</template>

<script>
	export default {
		data: () => ({
			title:
				"Every day, thousands of New Yorkers struggle to access life-saving resources."
		})
	};
</script>