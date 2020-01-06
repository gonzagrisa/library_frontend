<template>
	<v-app>
		<h1>{{this.$store.state.loggedIn}}</h1>
		<v-card width="400" class="mx-auto mt-12" xs6 md3>
			<v-card-title class="justify-center">
				<h1 class="display-1">Login</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field label="Email" prepend-icon="mdi-account-circle" v-model="email"/>
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
				<v-btn color="info" rounded @click="login">Login</v-btn>
			</v-card-actions>
		</v-card>
		<div class="mx-auto mt-5">
			<p>
				Don't have an account yet?
				<router-link to="/register">Sign Up</router-link>
			</p>
		</div>
	</v-app>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
axios.defaults.withCredentials = true;

export default {
	name: "login",
	data() {
		return {
			email: "",
			password: "",
			cookie: document.cookie,
			showPassword: false,
		};
	},
	methods: {
		async login() {
			await axios
				.post("http://localhost:8080/login", {
					email: this.email,
					password: this.password
				})
				.then(res => {
					if (res.status == 200) {
						this.$store.state.loggedIn=true;
						this.$router.push({ name: "books" });
					} else {
						console.log("invalid username or password");
					}
				})
				.catch(e => {
					console.log(e.message);
				});
		},
	},
	mounted() {
		window.scrollTo(0, 0);
	}
};
</script>

<style>
a{
    text-decoration: none;
}
</style>