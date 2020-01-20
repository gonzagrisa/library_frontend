<template>
	<v-app id="book">
		<div class="loading mx-auto" v-if="loading">
			<v-progress-circular :size="100" :width="5" color="primary" indeterminate></v-progress-circular>
		</div>

		<v-card v-else color="white" width="650px" class="mx-auto mt-12" raised>
			<div class="d-flex flex-no-wrap justify-space-between">
				<v-avatar id="cover" class="ma-1 mt-3 mb-3 pa-5" size="100%" tile>
					<v-img v-if="book.cover" :src="this.book.cover" contain style="background-size:contain;" />
					<v-img v-else contain src="../../public/no_cover.jpg" />
				</v-avatar>
				<v-divider id="divider" vertical></v-divider>

				<div class="cardText">
					<v-card-title id="title" style="word-break: normal" class="black--text">{{this.book.title}}</v-card-title>
					<v-card-subtitle id="author" class="black--text">{{this.book.author}}</v-card-subtitle>
					<v-divider></v-divider>
					<v-card-title id="loan" class="black--text mt-1">Préstamo</v-card-title>
					<v-card-text id="days" class="black--text">Días: {{days}}</v-card-text>
					<v-slider
						v-model="days"
						color="blue"
						track-color="grey"
						min="1"
						max="15"
						:disabled="!this.$store.state.loggedIn || this.book.availables==0"
					>
						<template v-slot:prepend>
							<v-icon @click="decrement" :color="iconColor">mdi-minus</v-icon>
						</template>
						<template v-slot:append>
							<v-icon @click="increment" :color="iconColor">mdi-plus</v-icon>
						</template>
					</v-slider>

					<v-card-subtitle id="available" class="darkgrey--text">{{this.book.availables}} Disponibles</v-card-subtitle>

					<v-btn
						color="blue darken-4"
						class="white--text mx-auto"
						@click="postLoan"
						:disabled="!this.$store.state.loggedIn || this.book.availables==0"
						width="100%"
					>Pedir Préstamo</v-btn>
					<div class="text-center mt-4" v-if="this.$store.state.rol === 'admin'">
						<v-row>
							<v-btn class="mx-2" fab dark small color="teal" @click="dialog = true;">
								<v-icon dark>mdi-pencil</v-icon>
							</v-btn>
							<v-btn class="mx-2" fab dark small color="red" @click="deleteBook">
								<v-icon dark>mdi-delete</v-icon>
							</v-btn>
							<v-btn class="mx-2" fab dark small :to="'/book/loans/'+this.book.id" color="purple">
								<v-icon>mdi-account-search</v-icon>
							</v-btn>
						</v-row>
					</div>
					<br />
					<br />
				</div>
			</div>
			<v-dialog v-model="dialog" max-width="400px">
				<v-card>
					<v-card-title>
						<p class="mx-auto">Actualizar libro</p>
					</v-card-title>
					<p class="text-center">Ingrese la nueva cantidad de ejemplares</p>
					<v-form v-model="valid">
						<div class="mx-auto" id="amount">
							<v-text-field
								label="Cantidad"
								prepend-icon="mdi-bookshelf"
								type="number"
								outlined
								v-model="amount"
								:rules="[amountRules]"
								required
							/>
						</div>
					</v-form>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn depressed raised class="white--text" color="blue" @click="dialog = false">Cancelar</v-btn>
						<v-btn
							depressed
							raised
							class="white--text"
							color="green"
							@click="updateBook"
							:disabled="!valid"
						>Actualizar</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-card>
	</v-app>
</template>

<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default {
	data() {
		return {
			valid: true,
			days: 1,
			cover: null,
			book: [],
			loading: true,
			iconColor: null,
			dialog: false,
			amount: 0,
			amountRules: v => {
				if (v < 0)
					return "La Cantidad de Ejemplares no puede ser negativa";
				return true;
			}
		};
	},

	mounted() {
		window.scrollTo(0, 0);
		Axios.get("http://localhost:8080/books/" + this.$route.params.bookId)
			.then(response => {
				this.book = response.data.data.book[0];
				this.amount = this.book.amount;
				(this.iconColor =
					this.$store.state.loggedIn && this.book.availables > 0
						? "blue"
						: "grey"),
					(this.loading = false);
			})
			.catch(error => {
				this.$router.push({ name: "notFound" });
			});
	},

	methods: {
		postLoan() {
			Axios.post("http://localhost:8080/loans", {
				days: this.days,
				bookId: this.book.id
			})
				.then(response => {
					this.$swal
						.fire({
							icon: "success",
							title:
								'<p style="font-family:Montserrat;">Préstamo Realizado</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						})
						.then(() => this.$router.push({ name: "explore" }));
					console.log(response.data);
				})
				.catch(error => {
					if (error.response.status == 400) {
						this.$swal.fire({
							icon: "error",
							title:
								'<p style="font-family:Montserrat;">Préstamo no Realizado</p>',
							html:
								'<p style="font-family:Montserrat;">Parece que no devolviste libros a tiempo!</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						});
					} else if (error.response.status == 401) {
						this.$store.commit("logout");
						this.$swal
							.fire({
								icon: "error",
								title:
									'<p style="font-family:Montserrat;">Sesión Expirada</p>',
								html:
									'<p style="font-family:Montserrat;">Inicie sesión de nuevo</p>',
								confirmButtonText:
									'<p style="font-family:Montserrat;">Ok</p>',
								backdrop: false
							})
							.then(() => this.$router.push({ name: "login" }));
					} else {
						console.log(error.response);
					}
				});
		},

		updateBook() {
			Axios.put("http://localhost:8080/books", {
				amount: Number(this.amount),
				bookId: this.book.id
			})
				.then(response => {
					console.log(response);
					this.$swal
						.fire({
							icon: "success",
							title:
								'<p style="font-family:Montserrat;">Cantidad Actualizada</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						})
						.then(() => (this.$store.state.viewKey += 1));
				})
				.catch(error => {
					console.log(error.response);
					if (error.response.status == 401) {
						this.$store.commit("logout");
						this.$swal
							.fire({
								icon: "error",
								title:
									'<p style="font-family:Montserrat;">Sesión Expirada</p>',
								html:
									'<p style="font-family:Montserrat;">Inicie sesión de nuevo</p>',
								confirmButtonText:
									'<p style="font-family:Montserrat;">Ok</p>',
								backdrop: false
							})
							.then(() => this.$router.push({ name: "login" }));
					} else if (error.response.status == 403) {
						this.$router.push({ name: "unauthorized" });
					} else {
						this.$swal.fire({
							icon: "error",
							title:
								'<p style="font-family:Montserrat;">No se pudo actualizar la cantidad de ejemplares</p>',
							html:
								'<p style="font-family:Montserrat;">La nueva cantidad es menor a la cantidad de ejemplares que ya se encuentran en préstamo</p>',
							confirmButtonText:
								'<p style="font-family:Montserrat;">Ok</p>',
							backdrop: false
						});
					}
				});
		},

		deleteBook() {
			const apiCall = "http://localhost:8080/books/" + this.book.id;
			console.log(apiCall);
			console.log(this.book.id);
			this.$swal
				.fire({
					title: '<p style="font-family:Montserrat;">Estás seguro?</p>',
					html: '<p style="font-family:Montserrat;">Este cambio no se puede revertir</p>',
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: '<p style="font-family:Montserrat;">Eliminar!</p>',
					cancelButtonText: '<p style="font-family:Montserrat;">Cancelar</p>',
					backdrop: false
				})
				.then(result => {
					if (result.value) {
						Axios.delete(apiCall)
							.then(response => {
								this.$swal
									.fire({
										icon: "success",
										title:
											'<p style="font-family:Montserrat;">Eliminado!</p>',
										html:
											'<p style="font-family:Montserrat;">Libro eliminado con éxito</p>',
										backdrop: false
									})
									.then(() =>
										this.$router.push({ name: "explore" })
									);
							})
							.catch(error => {
								console.log(error.response.status);
								console.log(error.response.code);
								switch (error.response.status) {
									case 400:
										this.$swal.fire({
											icon: "error",
											title:
												'<p style="font-family:Montserrat;">No se puede Eliminar el Libro</p>',
											html:
												'<p style="font-family:Montserrat;">Hay ejemplares del libro en préstamo</p>',
											confirmButtonText:
												'<p style="font-family:Montserrat;">Ok</p>',
											backdrop: false
										});
										break;
									case 401:
										this.$store.commit("logout");
										this.$swal
											.fire({
												icon: "error",
												title:
													'<p style="font-family:Montserrat;">Sesión Expirada</p>',
												html:
													'<p style="font-family:Montserrat;">Inicie sesión de nuevo</p>',
												confirmButtonText:
													'<p style="font-family:Montserrat;">Ok</p>',
												backdrop: false
											})
											.then(() =>
												this.$router.push({
													name: "login"
												})
											);
										break;
									case 403:
										this.$router.push({
											name: "unauthorized"
										});
										break;
								}
							});
					}
				});
		},

		decrement() {
			this.days--;
		},
		increment() {
			this.days++;
		}
	}
};
</script>

<style scoped>
.loading {
	padding-top: 5em;
}

.card {
	padding-left: 2em;
	padding-right: 1em;
	padding-top: 2em;
}

#cover {
	width: 300px !important;
	min-width: 0px !important;
}

.cardText {
	padding-right: 2em;
	width: 20em;
}

#title {
	margin-top: 0.5em;
	margin-left: -0.7rem;
	font-weight: 800;
	font-size: 25px;
}

#author {
	margin-top: -10px;
	margin-left: -0.7em;
}

#loan {
	font-weight: 800;
	font-size: 25px;
	margin-left: -0.7rem;
}

#days {
	margin-bottom: -0.7rem;
	margin-left: -0.7em;
	margin-top: 1em;
	font-weight: 500;
	font-size: 18px;
}

#available {
	margin-top: 0em;
}

#divider {
	margin-right: 1rem;
}

#amount {
	width: 250px;
}
</style>