<template>
	<div class="team">
		<!-- {{ books.data }} -->
		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3 v-for="book in books.data" :key="book.id">
					<v-card max-width="344" class="mx-auto">
						<v-list-item>
							<v-list-item-avatar color="grey"></v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
								<v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>

						<v-img src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" height="194"></v-img>

						<v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

						<v-card-actions>
							<v-btn text color="deep-purple accent-4">Read</v-btn>
							<v-btn text color="deep-purple accent-4">Bookmark</v-btn>
							<v-spacer></v-spacer>
							<v-btn icon>
								<v-icon>mdi-heart</v-icon>
							</v-btn>
							<v-btn icon>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
	data() {
		return {
			books: null
		};
	},
	methods: {
		/* async getBooks() {
			await axios
				.get("http://localhost:8080/books")
				.then(res => {
					this.books = res;
					console.log(books);
				})
				.catch(e => {
					console.log(e.message);
				});
		} */
	},
	mounted() {
		axios
			.get("http://localhost:8080/books")
			.then(response => (this.books = response.data));
	}
};
</script>