<template>
	<div class="team">
		<v-container fluid>
			<v-row align="center" justify="center">
				<v-col v-for="(book,index) in books" :key="index" cols="3" md4>
					<v-hover v-slot:default="{ hover }">
						<v-card
						id="card"
						
						:elevation="hover ? 18 : 1"
						@click="console.log('asdasdasd')"
						>
							<v-img
								v-if="book.cover"
								:src="book.cover"
								class="white--text align-end"
								cover
							>
								<v-card-title v-text="book.title"></v-card-title>
							</v-img>
							<v-img
								v-else
								src="../../public/no_cover.jpg"
								class="white--text align-end"
								gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.2)"
								cover
							>
								<v-card-title v-text="book.title"></v-card-title>
							</v-img>
						</v-card>
					</v-hover>
				</v-col>
			</v-row>
		</v-container>
		<br>
	</div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
	data() {
		return {
			books: null,
			alignment: "center",
			dense: false,
			justify: "center",
			noCover: "../../public/no_cover.jpg"
		};
	},
	methods: {},
	mounted() {
		axios.get("http://localhost:8080/books").then(response => {
			this.books = response.data.data;
		});
	}
};
</script>

<style scoped>
#card{
	width: 200px;
	height: 300px;
	position: relative;
	float: left;
	transition: 0.2s;

}
#card:hover{
  width: 210px;
  margin-left: -0.3em;
  margin-top: -0.5em;
  transition: 0.5s;
  z-index: 2;
}

</style>