<template>
	<v-app id="book">
		<div class="loading mx-auto" v-if="loading">
			<v-progress-circular :size="100" :width="5" color="primary" indeterminate></v-progress-circular>
		</div>
		<div v-else>
			<v-card min-width="250" max-width="400" height="205" id="card" class="mx-auto mt-12" elevation="5">
				<v-avatar id="cover" size="170" tile>
					<v-img v-if="book.cover" :src="book.cover" contain style="background-size:contain;" />
					<v-img v-else contain src="../../public/no_cover.jpg" />
				</v-avatar>
				<v-card-text>
					<p id="title" class="black--text">{{book.title}}</p>
					<p id="author" color="grey darken-4">{{book.author}}</p>
					<p id="author" color="grey darken-4">Cantidad: {{book.amount}}</p>
					<p id="author" color="grey darken-4">Disponibles: {{book.availables}}</p>
				</v-card-text>
			</v-card>
		</div>
		<div v-if="countLoans > 0">
           	<p class="loansTitle mt-5 text-center font-weight-black">Préstamos Realizados</p>
            <v-row align="center" class="ml-12 mr-12 mb-12">
			    <v-col v-for="(loan,index) in loans" :key="index" cols="3" md4>
			        <v-card
			        	width="400"
			        	height="150"
			        	id="card"
			        	elevation="5"
			        >
				        <v-card-text>
				        	<p id="title" class="black--text">{{loan.username}}</p>
				        	<p id="author" color="grey darken-4">{{loan.email}}</p>
				        	<div v-if="loan.expiracyDate<Date.now()">
				        		<p id="date" class="red--text">Fecha de Vencimiento: {{formatDate(loan.expiracyDate)}}</p>
				        		<p id="days">Dias Restantes: 0</p>
				        	</div>
				        	<div v-else>
				        		<p id="date" class="green--text">Fecha de Vencimiento: {{formatDate(loan.expiracyDate)}}</p>
				        		<p id="days">Dias Restantes: {{diffDays(loan.expiracyDate)}}</p>
				        	</div>
				        </v-card-text>
			        </v-card>
			    </v-col>
            </v-row>
		</div>
		<div v-else>
           	<p class="loansTitle mt-5 text-center font-weight-black">No hay Préstamos Registrados</p>
        </div>
	</v-app>
</template>

<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

export default {
	data() {
		return {
			valid: true,
			loans: [],
			book: [],
			loading: true,
			countLoans: 0
		};
	},

	mounted() {
		window.scrollTo(0, 0);
		Axios.get("http://localhost:8000/books/" + this.$route.params.bookId)
			.then(response => {
				console.log(response.data.data.book[0]);
				this.book = response.data.data.book[0];
				Axios.get(
					"http://localhost:8000/book/loans/" +
						this.$route.params.bookId
				)
					.then(response => {
						console.log(response.data);
						this.countLoans = response.data.count;
						this.loans = response.data.data;
						this.loading = false;
					})
					.catch(error => {
						console.log(error.response);
					});
			})
			.catch(error => {
				this.$router.push({ name: "notFound" });
			});
	},

	methods: {
		formatDate(millsec) {
			function pad(s) {
				return s < 10 ? "0" + s : s;
			}
			var d = new Date(millsec);
			return [
				pad(d.getDate()),
				pad(d.getMonth() + 1),
				d.getFullYear()
			].join("/");
		},
		diffDays(date) {
			const date1 = new Date(date);
			const date2 = new Date();
			const diffTime = Math.abs(date2 - date1);
			const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
			return diffDays;
		}
	}
};
</script>

<style scoped>
.loading {
	padding-top: 5em;
}

.loansTitle{
    font-size: 35px;
}

#title {
	font-weight: 700;
	font-size: 20px;
	margin-bottom: 0.1em;
}

#author {
	font-size: 16px;
	margin-bottom: 1em;
}

#date {
	font-weight: 500;
	font-size: 15px;
	margin-bottom: 0em;
}

#days {
	font-weight: 500;
	font-size: 15px;
}

.v-card__text {
	margin-bottom: 0px;
	padding-bottom: 0em;
}

#return {
	color: white;
	font-weight: 500;
}

#book {
	margin: auto;
}

#card {
	border-radius: 1em;
}

#cover {
	margin-top: 1rem;
	margin-bottom: 1rem;
	float: left;
}
</style>