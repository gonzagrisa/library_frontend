<template>
	<v-app>
		<div class="loading mx-auto" v-if="loading">
			<v-progress-circular :size="100" :width="5" color="primary" indeterminate></v-progress-circular>
		</div>

		<v-card v-else color="white" width="650px" class="mx-auto mt-12" raised>
			<div class="d-flex flex-no-wrap justify-space-between">
				<v-avatar id="cover" class="ma-1 mt-3 mb-3" size="400" tile>
					<v-img v-if="book.cover" :src="this.book.cover" contain style="background-size:contain;" />
					<v-img v-else contain src="../../public/no_cover.jpg" />
				</v-avatar>
				<v-divider id="divider" vertical></v-divider>

				<div class="cardText">
					<v-card-title id="title" class="black--text">{{this.book.title}}</v-card-title>
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
				</div>
			</div>
		</v-card>
	</v-app>
</template>

<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default {
	data() {
		return {
			days: 1,
			cover: null,
			book: [],
			loading: true,
			iconColor: null
		};
	},

	created() {},

	mounted() {
		window.scrollTo(0, 0);
		Axios.get(
			"http://localhost:8080/books/" + this.$route.params.bookId
		).then(response => {
			this.book = response.data.data.book[0];
			console.log(this.book);
			this.iconColor = (this.$store.state.loggedIn && this.book.availables>0) ? "blue" : "grey",
			this.loading = false;
		});
	},

	methods: {
		postLoan() {
			Axios.post("http://localhost:8080/loans", {
				days: this.days,
				bookId: this.$store.state.searchObject.id
			})
				.then(response => {
					console.log(response.data);
				})
				.catch(error => {
					console.log(error.response);
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
	margin-top: 1em;
}

#divider {
	margin-right: 1rem;
}
</style>