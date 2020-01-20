<template>
	<v-footer color="primary mt-12" padless>
		<v-row justify="center" no-gutters>
			<v-col class="primary py-4 mt-8 text-center white--text foot" cols="12">
				{{ new Date().getFullYear() }} -
				<strong>Gonzi System</strong>
			</v-col>
			<v-col class="primary text-center white--text" cols="12">
				<div class="foot">
					<strong>Made with </strong>
					<v-icon color="red" size="25px">mdi-heart</v-icon>
					<strong> and </strong>
					<v-icon color="green" size="30px">mdi-nodejs</v-icon>
					<p></p>
				</div>
				<v-btn fab target="_blank" class="mb-8" href="https://github.com/gonzagrisa/library_frontend" text>
					<v-icon size="40px">mdi-github-circle</v-icon>
				</v-btn>
				<p></p>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	data: () => ({
		links: [
			{ name: "Home", path: "/" },
			{ name: "About Us", path: "/about" },
			{ name: "Team", path: "/team" },
			{ name: "Services", path: "/services" },
			{ name: "Contact Us", path: "/contact" }
		]
	})
};
</script>

<style scoped>
.foot {
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	font-size: 17px;
}
</style>