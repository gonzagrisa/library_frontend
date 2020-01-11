<template>
	<v-app>
		<h1>Mis Préstamos</h1>
        <div v-if="this.loans.length==0">
            <h1>No tienes Préstamos Activos</h1>
        </div>
        <div v-else>
            <v-card v-for="(loan,index) in loans" :key="index" class="ma-3 pa-6" outlined tile>{{loan.title}}</v-card>
        </div>
	</v-app>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
			loans: []
		};
	},

	mounted() {
        console.log("UserId::"+this.$store.state.userId);
		Axios.get(
			"http://localhost:8080/loans/" + this.$store.state.userId
		).then(response => {
            console.log(response);
            this.loans = response.data.data;
        });
	}
};
</script>

<style>
</style>