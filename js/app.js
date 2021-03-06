


var Calculadora = {
	memoria: 0,
	punto: false,
	ultOperacion: "",
	ultValorProcesado: 0,
	resultadoMostrado: false,
	display: document.getElementById("display"),
		
	init: function(){		
    	this.asignarEventosBotones('tecla');

  	},
  	asignarEventosBotones: function(selector){
	    var teclas = document.getElementsByClassName(selector);
	    for (var i = 0; i < teclas.length; i++) {
	      teclas[i].onmousedown = this.reducirTamañoBotonAccion;
	      teclas[i].onmouseup = this.aumentaramañoBotonAccion;
	      teclas[i].onclick = this.actualizarDisplay;
	    }
 	},
	reducirTamañoBotonAccion: function(event){
  	
  		event.target.style.transform ="scale(0.9)";

  	},
  	aumentaramañoBotonAccion: function(event){

  		event.target.style.transform ="scale(1)";
 
  	},

  	reiniciarPantalla: function(){
		display.innerHTML = "0"
		Calculadora.memoria = 0
		Calculadora.punto = false
  	},

  	limpiarPantalla: function(){
  		display.innerHTML = ""
  		Calculadora.punto = false
  	},

    cambiarSigno: function(){

      valorTem = parseFloat(display.innerHTML)

      if (valorTem < 0){

        display.innerHTML = Math.abs(valorTem);

      }else if (valorTem > 0){

        display.innerHTML = "-" + valorTem

      }
    },

  	colocarPunto: function(){
  		if (!Calculadora.punto){

  			/// SI ESTA EN BLANCO LA PANTALLA, AGREGO EL 0 ANTES DEL PUNTO
  			if (display.innerHTML == ""){
  				display.innerHTML = "0"
  			}

  			display.innerHTML += "."
  			Calculadora.punto = true
  		}
  	},

  	colocarDigitos: function(tecla){

  		//SI EL DISPLAY ESTA EN 0 CERO, LO LIMPIO
  		if (display.innerHTML == "0" ){
  			display.innerHTML = ""

  		}

  		if (display.innerHTML.length < 8){
  			display.innerHTML += tecla
  		}


      Calculadora.resultadoMostrado = false
		
  	},


  	mostrarResultado: function(){

      // CHEQUEO SI PRESIONA SEGUIDO
      if (Calculadora.resultadoMostrado){

        //REPITO LA ULTIMA OPERACION
        Calculadora.efectuarOperacion(Calculadora.ultOperacion,Calculadora.ultValorProcesado)

      }else {

        //PROCESO LA ULTIMA OPERACION
        Calculadora.efectuarOperacion(Calculadora.ultOperacion)
      }  		


      //CHEQUEO SI TIENE MAS DE 8 CARACTERES
      valorTemp2 = parseFloat(Calculadora.memoria.toFixed(2)).toString();

      if (valorTemp2.length > 8){
         valorTemp2 = valorTemp2.substring(0,8)
      }


  		//MUESTRO LA MEMORIA
  		display.innerHTML = valorTemp2
  		Calculadora.punto = false
  		Calculadora.resultadoMostrado = true

  	},


  	efectuarOperacion: function(operacion){

  		if (arguments[1]){
  			ultValor = arguments[1]
  		}else {
  			ultValor = parseFloat(display.innerHTML)
  		}


  	  if (Calculadora.memoria == 0 ){

        Calculadora.memoria = ultValor

      }else if (operacion == "mas"){

  			Calculadora.memoria += ultValor

  		}else if (operacion == "menos"){

  			Calculadora.memoria -= ultValor

  		}else if (operacion == "por"){

  			Calculadora.memoria *= ultValor

  		}else if (operacion == "dividido"){

  			Calculadora.memoria = Calculadora.memoria / ultValor

  		}

      Calculadora.ultOperacion = operacion
      Calculadora.ultValorProcesado = ultValor
  		Calculadora.limpiarPantalla()  	
  	},


  	actualizarDisplay: function(event){

  		tecla = event.target.id  		

  		// CHEQUEO SI SON TECLAS NUMERICAS
  		if (tecla >= 0 && tecla <= 9){
  			Calculadora.colocarDigitos(tecla);

  		// BOTON DE ENCENDIDO ON, REINICIA LA PANTALLA Y LA MEMORIA
  		}else if (tecla == "on"){
  			Calculadora.reiniciarPantalla();

  		// BOTON DE PUNTO. SI NO SE HA COLOCADO
  		}else if (tecla == "punto"){
  			Calculadora.colocarPunto()

  		}else if (tecla == "mas" || tecla == "menos" || tecla == "por" || tecla == "dividido"){

       Calculadora.resultadoMostrado = false
       Calculadora.memoria = 0
			 Calculadora.efectuarOperacion(tecla);		

  		}else if (tecla == "igual"){

  			Calculadora.mostrarResultado();

  		}else if (tecla == "sign"){

        Calculadora.cambiarSigno();

      }

  		console.log(tecla)
  		
  		
  	}
}

Calculadora.init();


