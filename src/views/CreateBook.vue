<template>
	<v-app>
		<v-card id="rounded-card" class="mx-auto mt-12 mb-12" width="700">
			<v-card-title class="pt-10 justify-center">
				<h1 class="mb-5">Registrar Libro</h1>
			</v-card-title>
			<v-card-text class="pr-12 pl-12">
				<v-form v-model="valid">
					<v-text-field
						label="Título"
						prepend-icon="mdi-book-open-variant"
						required
						v-model="title"
						:rules="this.titleRules"
						class="mb-2"
					/>
					<v-text-field
						label="Autor"
						prepend-icon="mdi-fountain-pen-tip"
						v-model="author"
						required
						:rules="this.authorRules"
						class="mb-5"
					/>
					<div id="amount">
						<v-text-field
							label="Cantidad"
							prepend-icon="mdi-bookshelf"
							type="number"
							outlined
							v-model="amount"
							:rules="[amountRules]"
							required
							id="amount"
						/>
					</div>
					<v-textarea
						v-model="url"
						color="teal"
						prepend-icon="mdi-link-variant"
						:rules="[this.urlRules]"
					>
						<template v-slot:label>
							<div>
								Url Cover
								<small>(opcional)</small>
							</div>
						</template>
					</v-textarea>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions class="justify-center mt-2 mb-2">
					<v-btn
						:disabled="!valid"
						color="success"
						class="mr-4"
						@click="createBook"
						rounded
					>Agregar Libro</v-btn>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-app>
</template>


<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default {
	data() {
		return {
			valid: false,
			title: "",
			author: "",
			amount: null,
			url: null,
			titleRules: [v => !!v || "Ingrese un Título"],
			authorRules: [v => !!v || "Ingrese el Autor del Libro"],
			amountRules: v => {
				if (!v) return "Ingrese la Cantidad de Ejemplares";
				if (v < 0)
					return "La Cantidad de Ejemplares no puede ser negativa";
				return true;
			},
			urlRules: v => {
				if (!v) return true;
				if (
					!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|svg)+$/.test(
						v
					)
				)
					return "Ingrese la Url de una imagen";
				return false;
			}
		};
	},
	methods: {
		createBook() {
			Axios.post("http://localhost:8000/books", {
				title: this.title,
				author: this.author,
				amount: this.amount,
				cover: this.url
			})
				.then(response => {
					this.$swal
						.fire({
							icon: "success",
							title:
								'<p style="font-family:Montserrat;">Libro Registrado</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						})
						.then(() => this.$router.push({ name: "explore" }));
				})
				.catch(error => {
					if (error.response.status == 401) {
						this.$store.commit("logout");
						this.$swal.fire({
							icon: "error",
							title:
								'<p style="font-family:Montserrat;">Sesión Expirada</p>',
							html:
								'<p style="font-family:Montserrat;">Inicie sesión de nuevo</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						}).then(()=> this.$router.push({ name: "login" }));
					}
					console.log(error.response);
				});
		}
	}
};
</script>

<style scoped>
#rounded-card {
	border-radius: 15px;
}

#amount >>> .v-input__slot {
	width: 160px;
}
</style>