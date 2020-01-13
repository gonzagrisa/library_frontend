<template>
	<v-app id="ServerError">
		<div id="E500">
			<p>
                500 INTERNAL SERVER ERROR <br>
                Un problema ha sido detectado en nuestros servidores y no pudimos brindarte la información que necesitabas<br>
                Si es la primera vez que ves este mensaje, reinicia tu computadora. Si esta pantalla aparece de nuevo, siga los siguientes pasos: <br>
                En verdad, no hay pasos a seguir. Intentá recargar la página en un día, una semana o un año. <br>
                Technical Information: <br>
                *** Nothing to see here
            </p>
		</div>
	</v-app>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=VT323&display=swap');
#ServerError{
	/* background-image: url('../../public/E404_Background.jpg'); */
	background: darkblue;
	background-size: cover;
}

#E500{
    font-family: 'VT323', monospace;
    padding-left: 10%;
    padding-right: 10%;
    margin-top: 5%;
    font-size: 30px;
    color: white;
}


</style>