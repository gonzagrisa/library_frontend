<template>
	<v-app>
		<!-- <div v-if="this.cover">
			<h1>COVER NOT NULL</h1>
			<v-img :src="this.$store.state.searchObject.cover" />
		</div>
		<div v-else>
			<h1>COVER NULL</h1>
			<v-img
				src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
			/>
		</div>
		<div id="book" class="mx-auto">
			<p class="display-2">{{this.$store.state.searchObject.title}}</p>
			<v-divider></v-divider>
			<p>Autor: {{this.$store.state.searchObject.author}}</p>
			<p>Cantidad disponible: {{this.$store.state.searchObject.amount}}</p>
			<v-btn color="success" v-if="this.$store.state.loggedIn" rounded @click="makeLoan">Pedir Prestamo</v-btn>
			<p>Días:</p>
			<v-slider v-model="days" track-color="grey" always-dirty min="1" max="15">
				<template v-slot:prepend>
					<v-icon color="blue">mdi-minus</v-icon>
				</template>

				<template v-slot:append>
					<v-icon color="blue">mdi-plus</v-icon>
				</template>
		</v-slider>-->

		<!-- <v-card dark>
				<div class="d-flex flex-no-wrap justify-space-between">
					<div>
						<v-card-title class="headline">{{this.$store.state.searchObject.title}}</v-card-title>

						<v-card-subtitle>{{this.$store.state.searchObject.amount}}</v-card-subtitle>
					</div>

					<v-avatar class="profile" color="grey" size="164" tile>
						<div v-if="this.cover">
							<h1>COVER NOT NULL</h1>
							<v-img height="200" width="200" :src="this.$store.state.searchObject.cover" />
						</div>
						<div v-else>
							<h1>COVER NULL</h1>
							<v-img
								src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
							/>
						</div>
					</v-avatar>
				</div>
		</v-card>-->
		<!-- </div> -->
		<v-card color="white" dark width="650px" class="mx-auto mt-12">
			<div class="d-flex flex-no-wrap justify-space-between">
				<v-avatar class="ma-1" size="400" tile>
					<v-img v-if="this.cover" :src="this.$store.state.searchObject.cover"
						contain
						style="background-size:contain;"/>
					<v-img v-else
						contain
						src="https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"
					/>
				</v-avatar>
				<div class="cardText">
					<v-card-title class="headline black--text">{{this.$store.state.searchObject.title}}</v-card-title>

					<v-card-subtitle class="black--text">{{this.$store.state.searchObject.author}}</v-card-subtitle>
					<v-btn class="green">Pedir Préstamo</v-btn>
					<v-card-text class="black--text">{{this.$store.state.searchObject.amount}} Disponibles</v-card-text>
				
				</div>
			</div>
		</v-card>
	</v-app>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
			days: 0,
			cover: null
		};
	},

	mounted() {
		window.scrollTo(0, 0);
		this.cover = this.$store.state.searchObject.cover;
		console.log("ASDASDAS");
		console.log(this.$store.state.searchObject.cover);
	},

	methods: {
		makeLoan() {
			Axios.post("http://localhost:8080/loans")
				.then(response => {
					this.books = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>

<style scoped>
.card {
	padding-left: 6em;
	padding-right: 6em;
	padding-top: 2em;
}

.cardText{
	padding-right: 5em;
}

</style>