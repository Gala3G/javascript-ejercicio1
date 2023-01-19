
//FASE 1 - CREAR LAS FUNCIONES



//FASE 1_FUNCIONES: PASO 1 - CREO LAS FUNCIONES PARA LAS VALIDACIONES DE LOS DATOS RECIBIDOS POR FORMULARIO


//Funcion para guardar en un Array el nombre de las ID que recogeré del formulario y que validaré

function guardarArray() {

    var array2 = [];
    array2 = new Array('nombre', 'empresa', 'cargo', 'email'); //meto manualmente las id 
    console.log("mi primera subida con push a github");
    return array2;
}


//Funcion para imprimir por pantalla los errores que vamos a identificar durante el proceso 

function mostrarErrores(error) {

    var cajaValidaciones; //para recoger la id de la etiqueta ul HTML 
    var dd; //para crear dd dentro de la id ul por cada error recibido

    cajaValidaciones = document.querySelector('#validaciones'); //ID de ul
    dd = document.createElement('dd');
    dd.textContent = error; //le doy a dd el contenido del error recibido
    console.info(dd.textContent);
    cajaValidaciones.appendChild(dd);//escribo el error en la id de la ul HTML como etiqueta dd 

}


//Funcion para que cada vez que pulsamos enviar, se eliminen los errores previos impresos

window.borrarErrores = function () {
    //uso window para capturar los errores almacenados
    /*NOTA: es la unica funcion que no he sabido sacar del HTML <button type="submit" class="btn btn-primary" id="enviar" onclick = "borrarErrores()" > Enviar</button >*/

    var ul = document.querySelector('#validaciones'); //ID de ul

    //mientras la ul no esté vacía, elimino cada children 
    if (ul.length != 0) {
        var erroresIdentificados = ul.children.length;

        for (i = 0; i < erroresIdentificados; i++) {
            ul.removeChild(ul.children[0]);
        }

    }
}



//Funcion trim

function aplicarTrim(dato) { //dato es el texto recibido del formulario 

    dato = dato.trim();

    return dato;
}



//Funcion para validar length 
function validarLength(dato, min, max) {

    var permiso = true;

    if (dato.length < min || dato.length > max) {
        permiso = false;
    }
    return permiso; //si el dato recibido es correcto, devuelve true 

}



//Funcion para dato - Nombre - validacion de espacios - se exige minimo 1 espacio:

function validarEspacios(dato) {
    var datoModificado; //para manipular el dato recibido
    var diferencia;
    var permiso = true;

    datoModificado = dato.replaceAll(' ', ''); //Creo una variable donde guardar el dato recibido pero sin espacios

    diferencia = dato.length - datoModificado.length;//Calculo la diferencia del length y la guardo


    if (diferencia == 0 || diferencia > 4) { //si no hay diferencias - no hay apellido - error
        //si hay una diferencia de más de 4 espacios - no es valido 
        permiso = false;

    }

    return permiso;

}


//Funcion para dato - Nombre y Cargo - validar que sólo recibimos letras: 

function validacionLetras(cadenaLetras) {


    var errorEncontrado;
    var i = 0;
    var contador = 0;
    var permiso = true; //booleano que devuelve la funcion


    cadenaLetras = cadenaLetras.toUpperCase().replaceAll(' ', ''); //elimino espacios + paso a Mayusculas

    do {     //que recorra la cadena hasta que encuentre algo que no sea una letra o devuelve error  
        //imprime el caracter incorrecto 


        errorEncontrado = false;

        if (cadenaLetras.charCodeAt(i) >= 65 && cadenaLetras.charCodeAt(i) <= 90) { //valida mayusculas
            //nota: no le he permitido la Ñ como válida  
            contador++;


        } else {

            errorEncontrado = true;
            error = 'Carácter "' + cadenaLetras[i] + '" no es valido';
            mostrarErrores(error); //saco el error en documento

            permiso = false;
        }

        i++; //indice del charCodeAt 


    } while (!errorEncontrado && i <= cadenaLetras.length - 1); //sal del bucle al primer error o si todo es correcto

    return permiso; //devuelve false si encuentra error 

}



//Funcion para dato - Email - validaciones - igual que en funcion validacionLetras pero con sus especificaciones

function validacionEmail(cadenaLetras) {


    var errorEncontrado;
    var i = 0;
    var contador = 0;
    var permiso = false;
    var recorte;



    cadenaLetras = cadenaLetras.toUpperCase().replaceAll(' ', '');

    //validar que contiene @ por booleano 
    if (permiso != cadenaLetras.includes('@')) {

        recorte = cadenaLetras.slice(cadenaLetras.indexOf('@'), cadenaLetras.length);
        recorte = recorte.replace('@', ''); //si esta: elimino @ y guardo el recorte en nueva variable desde la @ hasta el final   

    } else {
        mostrarErrores('Email: Te falta la arroba');//si no, imprimo error
    }


    //validar que contiene "." por booleano 
    if (permiso != recorte.includes('.')) {

        recorte = recorte.replace('.', ''); //si esta: elimino "."  
        console.log(recorte);

    } else {
        mostrarErrores('Email: Te falta el "." '); //si no, imprimo error
    }


    if (recorte.length > 5) { //si el recorte desde @ al final sin el "." es mas de 5 letras, sigo: valido que solo hayan letras


        recorte = recorte.toUpperCase();

        //nota: a partir, uso el mismo control que en validacionLetras - podría haber creado una funcion y evitar duplicación

        do {

            errorEncontrado = false;
            permiso = true;

            if (recorte.charCodeAt(i) >= 65 && recorte.charCodeAt(i) <= 90) {
                contador++;
                console.info('posicion : ' + contador + ' es: ' + recorte.charAt(i));

            } else {
                errorEncontrado = true;
                permiso = false;
                error = 'Carácter "' + recorte[i] + '" no es valido';
                mostrarErrores(error); //saco el error en documento

            }

            i++;


        } while (!errorEncontrado && i <= recorte.length - 1);



    } else {
        mostrarErrores('Email: revisa el dominio'); //si el recorte desde @ al final sin el "." es menos de 5 letras - error
        permiso = false;
    }

    return permiso; //devuelve false si encuentra error 

}




//FASE 1_FUNCIONES: PASO 2 - DISEÑAR LA POSICION DE LOS ELEMENTOS EN LA TARJETA PARA MOVERLAS CON LAS TECLAS - FLECHAS


//Funcion para recoger la posicion de cada elemento y pasarsela por parametro


function moverPorTeclas(elemento, limiteBottom, limiteRight) {
//entran por parametros el elemento (foto, logo, texto)
//defino las dimensiones de cada elemento en su limite bottom y right. De lo contrario, se salen del marco de trabajo
    
    
    var cuadrado = document.getElementById(elemento);//recojo el elemento

    //NOTA: he tenido que poner todos los objetos en la misma posicion de inicio para que todas puedan moverse por todo el contenedor de la tarjeta - pero visualmente es muy poco práctico 

    var posicionX = 0; //horizontal
    var posicionY = 0; //vertical

    function movecuadrado(event) {
        if (event.keyCode == 37) { //izq
            if (posicionX > 0) {//left
                posicionX -= 10; //el espacio que se va a mover - es lento para poder controlar mejor la posicion
                cuadrado.style.left = posicionX + 'px';
            }

        }
        if (event.keyCode == 38) { //arriba
            if (posicionY > 0) {//top 
                posicionY -= 10;
                cuadrado.style.top = posicionY + 'px';
            }
        }
        if (event.keyCode == 39) {//derecha
            if (posicionX < limiteRight) {//right
                posicionX += 10;
                cuadrado.style.left = posicionX + 'px';
            }
        }
        if (event.keyCode == 40) {//abajo 
            if (posicionY < limiteBottom) { //bottom
                posicionY += 10;
                cuadrado.style.top = posicionY + 'px';
            }
        }
    }
    document.onkeydown = movecuadrado;//pasa al documento el resultado de la funcion mover cuadrado 

}




//FASE 2_PASO 1 - RECOJO LOS DATOS DEL FORMULARIO Y LOS VALIDO


document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("formulario").addEventListener('submit', validarFormulario);


});



function validarFormulario(event) {



    event.preventDefault(); //detenemos el envio de datos (submit)


    var texto;
    var error; //para guardar los errores y pasarlo por parametros a la funcion mostrarErrores 
    var array = []; //declaro array para guardar los nombres de las ID 
    const textoRecibido = [];//listas - NOTA: esto lo hice por practicar - sin utilidad funcional 
    var posicionesArray;
    var permiso = true; //inicializo el booleano de validación




    array = array.concat(guardarArray());
    //llamo a la función para añadirle los arrays de los ID - esto me rechina mucho, pero funciona
    //función devuelve - array = new Array('nombre', 'empresa', 'cargo', 'email');


    posicionesArray = array.length;



    //PASO 3 - VALIDO QUE LOS DATOS RECOGIDOS DEL FORMULARIO NO CONTENGA ERRORES


    for (let i = 0; i < posicionesArray; i++) {
        //como tengo los nombres de las ID en el array('nombre', 'empresa', 'cargo', 'email'), hago un blucle para capturar el ID y proceder a su validacion


        texto = document.getElementById(array[i]).value;
        console.info(texto + 'recojo el campo');

        if (texto.length == 0) {//valido que el texto recogido no este vacio


            error = array[i] + ': campo vacio ';
            mostrarErrores(error);
            permiso = false;


        } else {



            texto = aplicarTrim(texto); //elimino espacios en inicio o finales 


            if (array[i] == 'nombre') { //le paso las validaciones, se detiene al primer error 


                if (validarLength(texto, 5, 40) != permiso) {
                    //si la validacion da resultado falso, imprime error y se detiene la validacion
                    mostrarErrores('Nombre: Entre 5 y 40 letras');
                } else if (validarEspacios(texto) != permiso) {
                    mostrarErrores('Nombre: Escribe tu nombre completo');
                } else if (validacionLetras(texto) != permiso) {
                    mostrarErrores('Nombre: Solo letras');
                } else {
                    textoRecibido.push(texto); //NOTA: paso a lista si es correcto - sin utilidad funcional
                    document.getElementById('card-title').innerHTML = texto; //si es correcto, imprimo en la tarjeta el resultado

                }

                //a partir de aquí, es el mismo patron para todos los campos 

            } else if (array[i] == 'empresa') {


                if (validarLength(texto, 3, 40) != permiso) {
                    mostrarErrores('Empresa: Entre 3 y 40 letras');
                    document.getElementById('card-text1').innerHTML = 'Empresa';

                } else {
                    textoRecibido.push(texto);
                    document.getElementById('card-text1').innerHTML = texto;

                }

            } else if (array[i] == 'cargo') {

                if (validarLength(texto, 4, 30) != permiso) {
                    mostrarErrores('Cargo: Entre 4 y 30 letras');
                } else if (validacionLetras(texto) != permiso) {
                    mostrarErrores('Cargo: Solo letras');
                } else {
                    textoRecibido.push(texto);
                    document.getElementById('card-text2').innerHTML = texto;

                }

            } else if (array[i] == 'email') {
                array[i] = array[i].replaceAll(' ', '');
                if (validarLength(texto, 7, 50) != permiso) {
                    mostrarErrores('Email: entre 7 y 50 letras');
                } else if (validacionEmail(texto) != permiso) {
                    mostrarErrores('Email: Revisa los errores');
                } else {
                    textoRecibido.push(texto);
                    document.getElementById('card-text3').innerHTML = texto;

                }

            }


        }

    }
    //NOTA: sin utilidad funcional 
    if (permiso) {
        event.submit();

        return this.submit()

    }

}




//FASE 3 - DESARROLLO DE LOS EVENTOS


//CAMBIAR LOGOS - Evento para modificar la img del logo segun el movimiento del raton
//cada img tiene su propio div, recojo la ID y modifico el logo en tarjeta por disparador mouseover 

var movimiento = document.getElementById("foto1");
movimiento.addEventListener("mouseover", function () {
    document.getElementById('foto').src = "Imagenes/hotel1.jpg";
});


var movimiento = document.getElementById("foto2");
movimiento.addEventListener("mouseover", function () {
    document.getElementById('foto').src = "Imagenes/hotel2.jpg";
});


var movimiento = document.getElementById("foto3");
movimiento.addEventListener("mouseover", function () {
    document.getElementById('foto').src = "Imagenes/hotel3.jpg";
});


var movimiento = document.getElementById("foto4");
movimiento.addEventListener("mouseover", function () {
    document.getElementById('foto').src = "Imagenes/hotel4.jpg";
});



//SUBIR FOTO RETRATO 

const display = document.querySelector(".display");//aqui es donde va el archivo subido
const input = document.querySelector("#upload"); //recojo la ID del input type file (del archivo)
let img = document.querySelector("img");

input.addEventListener("change", () => { //Change - creo evento que se dispara al seleccionar el input type file 

    let reader = new FileReader(); // FileReader - creo el objeto que me permite leer ficheros (buffer en java)

    reader.readAsDataURL(input.files[0]); //ReadAsDataURL - le paso al objeto la ID del input type file y el archivo a leer


    reader.addEventListener("load", () => { //Load - creo evento que se activa cada vez que la operación de lectura se ha completado satisfactoriamente

        display.innerHTML = `<img src=${reader.result} alt='' width='220px' height='200px' />` //envío la imagen y controlo las medidas 
    });

});


//COLOR - Evento para modificar background-color segun el color que pulsemos

var btn1 = document.getElementById('btn1'); //recojo el ID del boton

btn1.addEventListener('click', function onClick(event) {//CLICK - evento se dispara al pulsar el boton del formulario

    const collection = document.getElementsByClassName('card-body'); //recojo la class del div que modificaré en tarjeta
    collection[0].style.backgroundColor = 'aqua';  //cambio el color del fondo
    collection[0].style.color = 'blue';            //cambio el color de las letras

});


//A partir de aquí, todo usa el mismo patron:  

var btn2 = document.getElementById('btn2');
btn2.addEventListener('click', function onClick(event) {
    const collection = document.getElementsByClassName('card-body');
    collection[0].style.backgroundColor = 'pink';
    collection[0].style.color = 'brown';
});


var btn3 = document.getElementById('btn3');
btn3.addEventListener('click', function onClick(event) {
    const collection = document.getElementsByClassName('card-body');
    collection[0].style.backgroundColor = 'grey';
    collection[0].style.color = 'black';
});

var btn4 = document.getElementById('btn4');
btn4.addEventListener('click', function onClick(event) {
    const collection = document.getElementsByClassName('card-body');
    collection[0].style.backgroundColor = 'green';
    collection[0].style.color = 'orange';
});



//MOVER LOS ELEMENTOS POR TECLAS - He creado en el HTML un boton con una lista desplegable con el nombre de cada elemento (logo,tus datos,sube tu foto)


var cuadrado1 = document.getElementById('elemento1'); 

cuadrado1.addEventListener('click', function () {
//Cuando el usuario pulsa una de las opciones se dispara CLICK - evento que recoge las especificaciones de las dimensiones de cada elemento y las pasa a la función moverPorTeclas
    
    console.info('pika pika1')

    var elemento = "foto";
    var limiteBottom = '360';
    var limiteRight = '280';

    moverPorTeclas(elemento, limiteBottom, limiteRight);

});

//a partir de aqui, el patrón se repite para cada elemento: 

var cuadrado2 = document.getElementById('elemento2');

cuadrado2.addEventListener('click', function () {

    console.info('pika pika2')

    var elemento = "card-body";
    var limiteBottom = '360';
    var limiteRight = '130';

    moverPorTeclas(elemento, limiteBottom, limiteRight);

});


var cuadrado3 = document.getElementById('elemento3');

cuadrado3.addEventListener('click', function () {

    console.info('pika pika3')

    var elemento = "retrato";
    var limiteBottom = '250';
    var limiteRight = '150';

    moverPorTeclas(elemento, limiteBottom, limiteRight);

});


