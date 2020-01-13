<template>
	<v-app>
		<h1>Mis Préstamos</h1>

		<div class="loading mx-auto" v-if="loading">
			<v-progress-circular :size="100" :width="5" color="primary" indeterminate></v-progress-circular>
		</div>
		<div v-else>
			<div v-if="this.loans.length==0">
				<h1>No tienes Préstamos Activos</h1>
			</div>
			<div v-else>
				<v-card v-for="(loan,index) in loans" :key="index" class="ma-3 pa-6" outlined tile>
					<v-card-title>Libro:</v-card-title>
					{{loan.title}}
				</v-card>
			</div>
		</div>
	</v-app>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
			loans: null,
			loading: true
		};
	},

	beforeCreate() {
		console.log("UserId::" + this.$store.state.userId);
		this.loading = true
		Axios.get(
			"http://localhost:8080/loans/" + this.$store.state.userId
		).then(response => {
			console.log(response);
			this.loading = false;
			this.loans = response.data.data;
		})
		.catch(error => {
			this.loading = false;
			console.log("Asdasdasdasdasdasd")
			console.log(error);
			this.$router.push({name:"serverError"});
		})
	}

	/* mounted() {
        console.log("UserId::"+this.$store.state.userId);
		Axios.get(
			"http://localhost:8080/loans/" + this.$store.state.userId
		).then(response => {
            console.log(response);
            this.loans = response.data.data;
        });
	} */
};
</script>

<style scoped>
.loading{
	padding-top: 5em;
}
</style>