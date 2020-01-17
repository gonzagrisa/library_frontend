<template>
	<v-app>
		<v-card id="rounded-card" class="mx-auto mt-12" width="700">
			<v-card-title class="justify-center">
				<h1 class="display-1">Crea tu Cuenta</h1>
			</v-card-title>
			<v-card-text>
				<v-form v-model="valid">
					<v-text-field
						label="Título"
						prepend-icon="mdi-book-open-variant"
						required
						v-model="title"
						:rules="this.titleRules"
					/>
					<v-text-field
						label="Autor"
						prepend-icon="mdi-fountain-pen-tip"
						v-model="author"
						required
						:rules="this.authorRules"
					/>
					<v-text-field
						label="Cantidad"
						prepend-icon="mdi-bookshelf"
						v-model="amount"
						required
					/>
					<v-textarea v-model="url" color="teal" prepend-icon="mdi-link-variant"
                            :rules="this.urlRules">
						<template v-slot:label>
							<div>
								Url Cover
								<small>(opcional)</small>
							</div>
						</template>
					</v-textarea>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions class="justify-center mt-2 mb-2">
					<v-btn :disabled="!valid" color="success" class="mr-4" rounded>Registrarse</v-btn>
				</v-card-actions>
			</v-card-text>
		</v-card>
	</v-app>
</template>


<script>
export default {
	data() {
		return {
            valid: false,
			title: "",
			author: "",
			amount: 0,
            url: "",
            titleRules:[
                v => !!v || "Ingrese un Título"
            ],
            authorRules:[
                v => !!v || "Ingrese el Autor del Libro"
            ],
            urlRules:[
                v => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|svg)+$/.test(v)
                    || "Ingrese la Url de una imagen"
            ]
		}
	}
};
</script>

<style scoped>
#rounded-card{
    border-radius:15px;
}
</style>