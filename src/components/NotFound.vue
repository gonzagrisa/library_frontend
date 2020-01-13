<template>
	<v-app id="NotFound">
		<div id="E404">
			<p class="Eimg"><v-img src="https://i.imgur.com/A040Lxr.png" max-height="400" max-width="400"></v-img></p>
			<p class="Etext display-3 font-weight-black">Oops!</p>
			<p class="Etext display-4 font-weight-black">Error 404</p>
			<p class="Etext display-2">
				Esta página se
				<br />perdió en el Espacio
			</p>
		</div>
	</v-app>
</template>

<script>
export default {};
</script>

<style>
#NotFound{
	/* background-image: url('../../public/E404_Background.jpg'); */
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .4)), url('../../public/E404_Background.jpg');
	background-size: cover;
}

#E404{
	margin-top: 6rem;
}
.Eimg{
	float: left;
	margin-right: 7rem;
	margin-left: 15rem;
}
.Etext{
	margin-top: 1rem;
	display: block;
	color: white;
	text-shadow: 0px 3px 7px black;
}

</style>