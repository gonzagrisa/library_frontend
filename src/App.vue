<template>
	<v-app>
		<v-app-bar v-if="$route.meta.requiresNavBar" app color="primary" dark>
			<div class="d-flex align-center">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
				/>
				<h2>BookJar</h2>
			</div>

			<v-spacer></v-spacer>
			<div id="searchInput">
				<v-autocomplete
					v-model="inputText"
					@change="search"
					:items="items"
					:loading="isLoading"
					:search-input.sync="autocomplete"
					color="white"
					hide-no-data
					item-text="Description"
					label="Búsca Libros, Autores y más"
					prepend-icon="mdi-magnify"
					
					
				></v-autocomplete>
			</div>
			<div v-if="!isLoggedIn">
				<v-btn to="/login" text rounded>
					<span class="mr-2">Login</span>
					<v-icon>mdi-account</v-icon>
				</v-btn>

				<v-btn to="/register" text rounded>
					<span class="mr-2">Crea tu Cuenta</span>
					<v-icon>mdi-account-badge-horizontal</v-icon>
				</v-btn>
			</div>
			<div v-else>
				<v-btn text rounded>
					<span class="mr-2">Préstamos</span>
					<v-icon>mdi-book</v-icon>
				</v-btn>
				<v-btn @click="logout()" text rounded>
					<span class="mr-2">Logout</span>
				</v-btn>
			</div>
		</v-app-bar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<p>
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
import axios from "axios";

export default {
	name: "App",

	components: {
		Footer
	},
	methods: {
		async logout() {
			await axios
				.post("http://localhost:8080/logout")
				.then(res => {
					if (res.status == 200) {
						this.$store.commit("logout");
						this.$router.push({ name: "home" });
					}
				})
				.catch(e => {
					console.log(e.message);
				});
		},
		search(){
			console.log("changed question mark");
			console.log(this.inputText);
			this.inputText=""
			this.$router.push({ name: "login" });
		}

	},

	data() {
		return {
			descriptionLimit: 60,
			entries: [],
			isLoading: false,
			inputText: null,
			autocomplete: null
		};
	},

	watch: {
		autocomplete(val) {
			// Items have already been loaded
			if (this.items.length > 0) return;

			// Items have already been requested
			if (this.isLoading) return;

			this.isLoading = true;

			// Lazily load input items
			//https://api.publicapis.org/entries
			//http://localhost:8080/books
			fetch("http://localhost:8080/books")
				.then(res => res.json())
				.then(res => {
					console.log(res);
					const count = res.count;
					const entries = res.data;

					console.log("Count:"+count);
					console.log("Entries:"+entries);
					this.count = count;
					this.entries = entries;
					
				})
				.catch(err => {
					console.log(err);
				})
				.finally(() => (this.isLoading = false));
		}
	},

	computed: {
		
		items() {
			return this.entries.map(entry => {
				const Description =
					entry.title.length > this.descriptionLimit
						? entry.title.slice(0, this.descriptionLimit) +
						  "..."
						: entry.title;
				return Object.assign({}, entry, { Description });
			});
		},

		isLoggedIn() {
			return this.$store.state.loggedIn;
		}
	}
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

#searchInput {
	margin-top: 1.4rem;
	padding: 1rem;
	width: 35em;
}
</style>