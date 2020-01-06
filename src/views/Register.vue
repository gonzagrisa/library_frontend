<template>
	<v-app>
		<v-card id="rounded-card" class="mx-auto mt-12" width="400">
			<v-card-title class="justify-center">
				<h1 class="display-1">Register</h1>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						label="Username"
						prepend-icon="mdi-account-circle"
						required
						v-model="username"
						:rules="[checkUsername]"
					/>
					<v-text-field label="Email" type="email" prepend-icon="mdi-email" v-model="email" required
								:rules="[checkEmailUsed]"/>
					<v-text-field
						label="Confirm Email"
						type="email"
						prepend-icon="mdi-email"
						v-model="email2"
						required
						:rules="[compareEmails]"
					/>
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Password"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						v-model="password"
						required
					/>
					<v-text-field
						type="password"
						label="Confirm Password"
						prepend-icon="mdi-lock"
						v-model="password2"
						required
						:rules="[comparePasswords]"
					/>
					<p class="text-center mt-5">
						By clicking Sign Up you accept the
						<br />
						<router-link to="/terms">Terms and Conditions of Use</router-link>
					</p>
				</v-form>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions class="justify-center mt-2 mb-2">
				<v-btn color="success" rounded>Sign Up</v-btn>
			</v-card-actions>
		</v-card>
		<div class="mx-auto mt-10">
			<p class="text-center">
				Already have an account?
				<router-link to="/login">Login</router-link>
			</p>
		</div>
	</v-app>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

export default {
	data() {
		return {
			username: "",
            email: "",
            email2:"",
			password: "",
            password2: "",
			showPassword: false,
			usernameUsed:false,
			emailUsed:false
		};
	},
	methods: {
		register() {},
		checkUser(){
			if(this.username==""){
				return this.usernameUsed=false;
			}
			axios
				.get("http://localhost:8080/signup/checkUsername/"+ this.username)
				.then( res =>{
					this.usernameUsed=false;
				})
				.catch((er)=>{
					this.usernameUsed="Username already in use";
				})
		},
		checkEmail(){
			if(this.email==""){
				return this.emailUsed=false;
			}
			axios
				.get("http://localhost:8080/signup/checkEmail/"+ this.email)
				.then( res =>{
					this.emailUsed=false;
				})
				.catch((er)=>{
					this.emailUsed="Email already in use";
				})
		}
	},
	computed: {
		compareEmails() {
			return this.email !== this.email2
				? "Emails don't match"
				: false;
		},
		comparePasswords() {
			return this.password !== this.password2
				? "Passwords don't match"
				: false;
		},
		checkUsername(){
			this.checkUser();
			return this.usernameUsed;
		},
		checkEmailUsed(){
			this.checkEmail();
			return this.emailUsed;
		}
		
	},
    mounted(){
        window.scrollTo(0,0);
    }
};
</script>

<style>
/* #rounded-card{
    border-radius:50px;
} */
a {
	text-decoration: none;
	font-weight: bold;
}
</style>