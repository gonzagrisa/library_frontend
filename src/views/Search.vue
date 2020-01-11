<template>
	<v-app>
		<div id="book" class="mx-auto">
			<p class="display-2">{{this.$store.state.searchObject.title}}</p>
			<v-divider></v-divider>
			<p>Autor: {{this.$store.state.searchObject.author}}</p>
			<p>Cantidad disponible: {{this.$store.state.searchObject.amount}}</p>
			<v-btn color="success" v-if="this.$store.state.loggedIn" rounded @click="makeLoan">Pedir Prestamo</v-btn>
		</div>
	</v-app>
</template>

<script>
import Axios from "axios";
export default {
	data() {
		return {
		};
	},

	mounted() {
		window.scrollTo(0, 0);
	},
	
	methods:{
		makeLoan(){
			Axios
			.post("http://localhost:8080/loans")
			.then(response => {
				this.books = response.data.data
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

#book{

}

</style>