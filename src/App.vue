<template>
	<v-app>
		<v-app-bar v-if="$route.meta.requiresNavBar" app color="primary" dark elevate-on-scroll>
			<router-link to="/">
				<v-img
					alt="Vuetify Logo"
					class="shrink mr-2"
					contain
					src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
					transition="scale-transition"
					width="40"
					to="/"
				></v-img>
			</router-link>
			<v-toolbar-title>
				<router-link to="/" tag="span" style="cursor: pointer">BookJar</router-link>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<div id="searchInput">
				<v-autocomplete
					ref="search"
					v-model="model"
					:items="items"
					label="Búsca Libros y más"
					:search-input.sync="autocomplete"
					@change="search"
					:loading="isLoading"
					color="white"
					item-text="Description"
					prepend-icon="mdi-magnify"
					return-object
					:hide-no-data="hideData"
					no-data-text="No se encontraron resultados"
				>
					<template v-slot:item="data">
						<template v-if="typeof data.item !== 'object'">
							<v-list-item-content v-text="data.item"></v-list-item-content>
						</template>
						<template v-else>
							<v-list-item-avatar>
								<img v-if="data.item.cover" :src="data.item.cover"/>
								<img v-else src="../public/no_cover.jpg"/>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title v-html="data.item.title"></v-list-item-title>
								<v-list-item-subtitle v-html="data.item.author"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</template>
				</v-autocomplete>
			</div>
			<v-btn to="/books" text rounded>
				<span class="mr-2">Explorar</span>
				<v-icon>mdi-compass</v-icon>
			</v-btn>
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
				<v-btn to="/loans" text rounded>
					<span class="mr-2">Préstamos</span>
					<v-icon>mdi-book</v-icon>
				</v-btn>
				<v-btn @click="logout()" text rounded>
					<span class="mr-2">Logout</span>
				</v-btn>
			</div>
		</v-app-bar>
		<v-content>
			<router-view :key="this.$store.state.viewKey"></router-view>
		</v-content>
		<Footer />
	</v-app>
</template>

<script>
import Footer from "./components/Footer";
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
	name: "App",

	components: {
		Footer
	},

	data() {
		return {
			descriptionLimit: 60,
			entries: [],
			isLoading: false,
			model: null,
			autocomplete: null,
			hideData: true,
			idBook:null
		};
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
		search() {
			if (this.model != []) {
				this.$router.push({ name: 'book', params: { bookId: this.model.id } })
				this.entries = [];
				this.isLoading = false;
				this.model = [];
				this.autocomplete = null;
				this.hideData = true;
				this.$refs.search.blur();
				if(this.$route.name == "book"){
					this.$store.state.viewKey += 1;
				}
			}
		}
	},

	watch: {
		autocomplete(val) {
			// Items have already been loaded
			if (this.items.length > 0) return;
			// Items have already been requested
			if (this.isLoading) return;
			this.isLoading = true;
			// Lazily load input items
			fetch("http://localhost:8080/books")
				.then(res => res.json())
				.then(res => {
					const count = res.count;
					const entries = res.data;
					this.count = count;
					this.entries = entries;
					console.log(this.entries);
					this.hideData = false;
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
						? entry.title.slice(0, this.descriptionLimit) + "..."
						: entry.title;
				return Object.assign({}, entry, { Description });
			});
		},

		isLoggedIn() {
			return this.$store.state.loggedIn;
		}
	}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,700|Open+Sans&display=swap");

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