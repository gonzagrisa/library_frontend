<template>
	<v-app :key="componentKey">
		<p class="mt-10 mx-auto display-2 font-weight-black">Préstamos Realizados</p>

		<div class="loading mx-auto" v-if="loading">
			<v-progress-circular :size="100" :width="5" color="primary" indeterminate></v-progress-circular>
		</div>
		<div v-else>
			<div v-if="this.loans.length==0">
				<h1>No tienes Préstamos Activos</h1>
			</div>
			<div v-else>
				<v-card
					v-for="(loan,index) in loans"
					:key="index"
					width="550"
					height="205"
					id="card"
					class="ml-4 mt-5 mb-5"
					elevation="5"
				>
					<v-avatar id="cover" size="170" tile>
						<v-img v-if="loan.cover" :src="loan.cover" contain style="background-size:contain;" />
						<v-img v-else contain src="../../public/no_cover.jpg" />
					</v-avatar>
					<v-card-text>
						<p id="title" class="black--text">{{loan.title}}</p>
						<p id="author" color="grey darken-4">{{loan.author}}</p>
						<div v-if="loan.expiracyDate<Date.now()">
							<p id="date" class="red--text">Fecha de Vencimiento: {{formatDate(loan.expiracyDate)}}</p>
							<p id="days">Dias Restantes: 0</p>
							<v-btn @click="returnBook(loan.loanId)" id="return" color="red darken-2">Devolver</v-btn>
						</div>
						<div v-else>
							<p id="date" class="green--text">Fecha de Vencimiento: {{formatDate(loan.expiracyDate)}}</p>
							<p id="days">Dias Restantes: {{diffDays(loan.expiracyDate)}}</p>
							<v-btn @click="returnBook(loan.loanId)" id="return" color="green darken-1">Devolver</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</div>
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
			loans: null,
			loading: true,
			expiracyDate: null,
			componentKey: 0
		};
	},

	created() {
		console.log("UserId::" + this.$store.state.userId);
		this.loading = true;
		Axios.get("http://localhost:8000/loans/" + this.$store.state.userId)
			.then(response => {
				console.log(response);
				this.loading = false;
				this.loans = response.data.data;
			})
			.catch(error => {
				this.loading = false;
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
				} else {
					console.log(error);
					this.$router.push({ name: "serverError" });
				}
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
		},
		returnBook(idLoan) {
			console.log(idLoan);
			Axios.delete("http://localhost:8000/loans/" + idLoan)
				.then(response => {
					console.log(response.data);
					this.$store.state.viewKey += 1;
				})
				.catch(error => {
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
					}
					console.log(error.response);
				});
		}
	}
};
</script>

<style scoped>
.loading {
	padding-top: 5em;
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

#card {
	border-radius: 1em;
}

#cover {
	margin-top: 1rem;
	margin-bottom: 1rem;
	float: left;
}
</style>