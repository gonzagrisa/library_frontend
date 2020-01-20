<template>
	<v-app light>
		<section class="parallaxx">
			<v-parallax
				height="850"
				:src="require('../../public/parallaximage.png')"
				>
					<v-layout id="parallaxText" column align-center justify-center class="white--text">
						<h1 class="white--text mb-4 display-4 text-center font-weight-bold">BookJar</h1>
						<div class="subheading mb-4 text-center display-1">Los mejores Libros, en el Mejor Lugar</div>
					</v-layout>
			</v-parallax>
		</section>

		<section>
			<v-layout column wrap class="my-12" align-center>
				<v-flex xs12 sm4 class="my-4">
					<div class="text-center">
						<h2 class="headline">Encontra miles de libros</h2>
						<span class="subheading">Siempre estamos actualizandonos</span>
					</div>
				</v-flex>
				<v-flex xs12>
					<v-container grid-list-xl>
						<v-layout row wrap align-center>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large class="blue--text text--lighten-2">mdi-book</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline text-center">Todos los libros</div>
									</v-card-title>
									<v-card-text>Desde libros antiguos hasta libros nuevos, de todos los géneros, siempre vas a encontrar tu libro</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large class="blue--text text--lighten-2">mdi-clipboard-check-multiple</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline text-center">Una enorme cantidad de libros</div>
									</v-card-title>
									<v-card-text>Tenemos gran cantidad de ejemplares por libro, así no te vas a quedar sin poder llevarte el tuyo</v-card-text>
								</v-card>
							</v-flex>
							<v-flex xs12 md4>
								<v-card flat class="transparent">
									<v-card-text class="text-center">
										<v-icon x-large class="blue--text text--lighten-2">mdi-magnify-scan</v-icon>
									</v-card-text>
									<v-card-title primary-title class="layout justify-center">
										<div class="headline text-center">Encontrá lo que andas buscando</div>
									</v-card-title>
									<v-card-text>
										Buscá por género, autor, título.
										Te ofrecemos un buscador potente que se basa de acuerdo a tus gustos.
									</v-card-text>
								</v-card>
							</v-flex>
						</v-layout>
					</v-container>
				</v-flex>
			</v-layout>
		</section>

		<section>
			<v-parallax 
			src="http://www.talencia.cat/mypics/max/26/268236_firewatch-wallpaper.jpg" height="400">
				<v-layout column align-center justify-center>
					<v-btn color="blue darken-4" dark large href="/login">Comencemos</v-btn>
				</v-layout>
			</v-parallax>
		</section>

		<section>
			<v-container grid-list-xl>
				<v-layout row wrap justify-center class="my-12">
					<v-flex xs12 sm4>
						<v-card flat class="transparent">
							<v-card-title primary-title class="layout justify-center">
								<div class="headline">Sobre nosotros</div>
							</v-card-title>
							<v-card-text class="text-justify"> 
								<strong>"BookJar"</strong> es una de las librerías más importantes de la Ciudad de Córdoba. <br>
								El local se encuentra desde sus principios en Ituzaingó 1167 de la Ciudad de Córdoba. Actualmente contamos con más de 20.000 títulos en diversas temáticas e idiomas, pudiendo encontrar también textos escolares y universitarios. <br>
								La <strong>Misión</strong> de BookJar consiste en contribuir con el fomento y desarrollo del entretenimiento y la cultura, buscando crear espacios apropiados para el encuentro con el conocimiento orientándose a la satisfacción de las necesidades de los clientes. <br>
								La <strong>Visión</strong> de BookJar es afianzar el liderazgo de la empresa en el mercado de la difusión de la cultura, accediendo a nuevos mercados y enriqueciendo la oferta de productos y servicios brindados. 
							</v-card-text>
						</v-card>
					</v-flex>
					<v-flex xs12 sm4 offset-sm1>
						<v-card flat class="transparent">
							<v-card-title primary-title class="layout justify-center">
								<div class="headline">Contactanos</div>
							</v-card-title>
							<v-card-text>Estamos abiertos al público 24/7</v-card-text>
							<v-list class="transparent">
								<v-list-item>
									<v-list-item-action>
										<v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title>+54 0351 460-6756</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-action>
										<v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title>Ituzaingó 1167 - Córdoba, AR</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-action>
										<v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title>bookjar@gmail.com</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</section>
	</v-app>
</template>

<script>
// @ is an alias to /src
export default {
	name: "home",
	components: {}
};
</script>

<style scoped>
#parallaxText{
	margin-top: -1em;
}

</style>