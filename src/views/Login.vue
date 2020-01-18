<template>
	<v-app>
		<!-- <h1>{{this.$store.state.loggedIn}}</h1> -->
		<v-card width="400" class="mx-auto mt-12" xs6 md3>
			<v-card-title class="justify-center">
				<h1 class="display-1">Login</h1>
			</v-card-title>
			<v-card-text>
				<div id="errorMessage" v-if="errored">Email o Contraseña Incorrectos</div>
				<v-form>
					<v-text-field label="Email" prepend-icon="mdi-account-circle" v-model="email" />
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						prepend-icon="mdi-lock"
						v-model="password"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
					/>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="justify-center mb-5 mt-3">
				<v-btn :loading="this.loading" color="info" rounded @click="login">Login</v-btn>
			</v-card-actions>
		</v-card>
		<div class="mx-auto mt-5">
			<p>
				Todavía no tenés una Cuenta?
				<router-link to="/register">Registrate</router-link>
			</p>
		</div>
	</v-app>
</template>

<script>
import axios from "axios";
import Vue from "vue";
axios.defaults.withCredentials = true;

export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
			cookie: document.cookie,
			showPassword: false,
			errored: false,
			loading: false
		};
	},
	methods: {
		login() {
			this.loading = true;
			axios
				.post("http://localhost:8080/login", {
					email: this.email,
					password: this.password
				})
				.then(response => {
					this.loading = false;
					const id = response.data.userId;
					const rol = response.data.rol;
					this.$store.commit("login", {
						userId: id,
						userRol: rol
					});
					this.$router.push({ name: "explore" });
				})
				.catch(error => {
					console.log(error);
					this.loading = false;
					this.errored = true;
				});
		}
	},
	mounted() {
		window.scrollTo(0, 0);
	}
};
</script>

<style scoped>
a {
	text-decoration: none;
}

#errorMessage {
	color: red;
	font-weight: bold;
	text-align: center;
	font-size: 14px;
	margin-bottom: 0.5rem;
}
</style>