<template>
	<v-app>
		<v-card id="rounded-card" class="mx-auto mt-12" width="400">
			<v-card-title class="justify-center">
				<h1 class="display-1">Crea tu Cuenta</h1>
			</v-card-title>
			<v-card-text>
				<v-form v-model="valid">
					<v-text-field
						label="Nombre de Usuario"
						prepend-icon="mdi-account-circle"
						required
						v-model="username"
						:rules="[checkUsername].concat(usernameRules)"
					/>
					<v-text-field
						label="Email"
						type="email"
						prepend-icon="mdi-email"
						v-model="email"
						required
						:rules="[checkEmailUsed].concat(emailRules)"
					/>
					<v-text-field
						label="Confirmar Email"
						type="email"
						prepend-icon="mdi-email"
						v-model="email2"
						required
						:rules="[compareEmails]"
					/>
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Contraseña"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						v-model="password"
						:rules="passwordRules"
						required
					/>
					<v-text-field
						type="password"
						label="Confirmar Contraseña"
						prepend-icon="mdi-lock"
						v-model="password2"
						required
						:rules="[comparePasswords]"
					/>
				</v-form>
				<!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="signup">Validate</v-btn>-->
				<p class="text-center mt-5">
					Al hacer click en Registrarse aceptas los
					<br />
					<router-link to="/terms">Terminos y Condiciones de Uso</router-link>
				</p>
				<v-divider></v-divider>
				<v-card-actions class="justify-center mt-2 mb-2">
					<v-btn :disabled="!valid" color="success" class="mr-4" rounded @click="signup">Registrarse</v-btn>
				</v-card-actions>

				<!-- <v-form @submit.prevent="signup">
					<v-text-field
						label="Nombre de Usuario"
						prepend-icon="mdi-account-circle"
						required
						v-model="username"
						:rules="[checkUsername]"
					/>
					<v-text-field
						label="Email"
						type="email"
						prepend-icon="mdi-email"
						v-model="email"
						required
						:rules="[checkEmailUsed]"
					/>
					<v-text-field
						label="Confirmar Email"
						type="email"
						prepend-icon="mdi-email"
						v-model="email2"
						required
						:rules="[compareEmails]"
					/>
					<v-text-field
						:type="showPassword ? 'text' : 'password'"
						label="Contraseña"
						prepend-icon="mdi-lock"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPassword = !showPassword"
						v-model="password"
						required
					/>
					<v-text-field
						type="password"
						label="Confirmar Contraseña"
						prepend-icon="mdi-lock"
						v-model="password2"
						required
						:rules="[comparePasswords]"
					/>
					<p class="text-center mt-5">
						Al hacer click en Registrarse aceptas los
						<br />
						<router-link to="/terms">Terminos y Condiciones de Uso</router-link>
					</p>
					<v-btn type="submit" color="success" :disabled="!isValid" rounded>Registrarse</v-btn>
				</v-form>-->
			</v-card-text>
			<v-card-actions class="justify-center mt-2 mb-2">
				<!-- <v-btn 
					color="success"
					:disabled="!isValid"
					rounded 
				@click="signup">Registrarse</v-btn>-->
			</v-card-actions>
		</v-card>
		<div class="mx-auto mt-10">
			<p class="text-center">
				Ya tenés una Cuenta?
				<router-link to="/login">Logueate</router-link>
			</p>
		</div>
	</v-app>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;

/*  */

export default {
	data() {
		return {
			username: "",
			email: "",
			email2: "",
			password: "",
			password2: "",
			showPassword: false,
			usernameUsed: false,
			emailUsed: false,

			valid: false,
			usernameRules: [
				v => !!v || "Ingrese un nombre de usuario",
				v =>
					(v && v.length < 5) ||
					"El nombre de usuario debe tener como mínimo 5 caracteres"
			],
			emailRules: [
				v => !!v || "Ingrese un E-Mail",
				v => /.+@.+\..+/.test(v) || "El E-Mail debe ser válido"
			],
			passwordRules: [
				v =>
					(v && v.length >= 5) ||
					"La contraseña debe tener más de 5 caracteres",
				v => /(?=.*[A-Z])/.test(v) || "Debe tener una letra mayúsculas",
				v => /(?=.*\d)/.test(v) || "Debe tener un número"
			]
		};
	},
	methods: {
		async signup() {
			await axios
				.post("http://localhost:8080/signup", {
					username: this.username,
					email: this.email,
					password: this.password
				})
				.then(res => {
					if (res.status == 200) {
						this.$router.push({ name: "login" });
					} else {
						console.log(res);
					}
				})
				.catch(e => {
					console.log(e.message);
				});
		},

		checkUser() {
			if (this.username == "") {
				return (this.usernameUsed = false);
			}
			axios
				.get(
					"http://localhost:8080/signup/checkUsername/" +
						this.username
				)
				.then(res => {
					this.usernameUsed = false;
				})
				.catch(er => {
					this.usernameUsed = "Nombre de Usuario en uso";
				});
		},
		async checkEmail() {
			if (this.email == "") {
				return (this.emailUsed = false);
			}
			await axios
				.get("http://localhost:8080/signup/checkEmail/" + this.email)
				.then(res => {
					this.emailUsed = false;
				})
				.catch(er => {
					this.emailUsed = "Este Email ya se encuentra en uso";
				});
		}
	},
	computed: {
		compareEmails() {
			return this.email !== this.email2
				? "Los emails no coinciden"
				: false;
		},
		comparePasswords() {
			return this.password !== this.password2
				? "Las contraseñas no coinciden"
				: false;
		},
		checkUsername() {
			this.checkUser();
			return this.usernameUsed;
		},
		checkEmailUsed() {
			this.checkEmail();
			return this.emailUsed;
		}
	},
	mounted() {
		window.scrollTo(0, 0);
	}
};
</script>

<style>
#rounded-card{
    border-radius:50px;
}
a {
	text-decoration: none;
	font-weight: bold;
}
</style>