<template>
	<v-footer color="primary lighten-1" padless>
		<v-row justify="center" no-gutters>
			<v-btn
				v-for="(link,index) in links"
				:key="index"
				:to="link.path"
				color="white"
				text
				rounded
				class="my-2"
			>{{ link.name }}</v-btn>
			<v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
				{{ new Date().getFullYear() }} —
				<strong>Gonzi System</strong>
			</v-col>
			<v-col class="primary lighten-2 text-center white--text" cols="12">
				<strong>Made with</strong>
				<v-icon color="red" size="20px">mdi-heart</v-icon>
				<strong>and</strong>
				<v-icon color="green">mdi-nodejs</v-icon>
				<p></p>
				<v-btn
					target="_blank"
					href="https://github.com/gonzagrisa/library_frontend"
					text
					rounded
				>
					<v-icon>mdi-github-circle</v-icon>
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