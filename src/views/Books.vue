<template>
	<v-container fluid id="container">
		<v-row align="center" justify="center">
			<v-col v-for="(book,index) in books" :key="index" cols="2" md4>
				<v-hover v-slot:default="{ hover }">
					<v-card
						id="card"
						:elevation="hover ? 18 : 1"
						@click="$router.push({ name: 'book', params: { bookId: book.id } })"
						width="200"
						height="300"
					>
						<v-img
							id="imgCard"
							v-if="book.cover"
							:src="book.cover"
							class="white--text align-end"
						>
							<!-- <v-card-title style="word-break: normal" v-text="book.title"></v-card-title> -->
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="blue lighten-1"></v-progress-circular>
								</v-row>
							</template>
						</v-img>
						<v-img id="imgCard" v-else src="../../public/no_cover.jpg" class="white--text align-end text-justify">
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular indeterminate color="blue lighten-1"></v-progress-circular>
								</v-row>
							</template>
							<v-card-title id="noCover" style="word-break: normal" v-text="book.title"></v-card-title>
						</v-img>
					</v-card>
				</v-hover>
			</v-col>
		</v-row>
	</v-container>
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
#container {
	justify-content: center; /* center horizontally */
	align-items: center;
	margin: auto auto;
}

#card {
	width: 200px;
	height: 300px;
	position: relative;
	transition: all 0.5s ease;
	background-size: cover;
	overflow: hidden;
}

#card:hover {
	transform: translate3D(0, -1px, 0) scale(1.03);
	box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
		1px 6px 12px rgba(39, 44, 49, 0.04);
	transition: all 0.4s ease;
	cursor: pointer;
}

#imgCard {
	height: 300px;
}

#noCover{
	 background: rgb(2,0,36);
	background: linear-gradient(0deg, rgba(2, 0, 36, 0.856) 0%, rgba(0, 0, 0, 0.692) 100%); 
}

</style>