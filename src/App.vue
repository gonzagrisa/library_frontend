<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>
				<h2>La Librería del Gonzi</h2>
			</div>

			<v-spacer></v-spacer>

			<v-btn to="/login" text rounded>
				<span class="mr-2">Login</span>
				<v-icon>mdi-account</v-icon>
			</v-btn>

			<v-btn to="/register" text rounded>
				<span class="mr-2">Crea tu Cuenta</span>
				<v-icon>mdi-account-badge-horizontal</v-icon>
			</v-btn>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<p>
			<br />
			<br />
			<br />
			<br />
			<br />
		</p>
		<Footer class="mt-12" />
	</v-app>
</template>

<script>
import Footer from "./components/Footer";

export default {
	name: "App",

	components: {
		Footer
	},

	data: () => ({
		//
	})
};

//https://codepen.io/AndrewThian/pen/QdeOVa
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

.v-application {
	font-family: "Montserrat", sans-serif !important;
	/* .title { // To pin point specific classes of some components
       font-family: $title-font, sans-serif !important;
    } */
}
</style>