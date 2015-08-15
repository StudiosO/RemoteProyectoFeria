//Clase de las notificaciones como mod funcion son constructor
var Notificar = function(texto, Mod){
    //Si el mod es true, significa que tenemos que comunicar un mensaje especial
    //Si el false entonces solo le muestra al usuario que esta cargando
    if(Mod == true){
        //Oculta la elemento de animacion de carga
        document.getElementById("Carga_DATE").style.display = "none";
        //Muestra el boton de la notifiacion
        document.getElementById("Button_Notificacion").style.display = "block";
        //Escribe el mensaje para el usuario
        document.getElementById("Notificaciones_TEXT").innerHTML = texto;
        //Muestra la notifiacion
        document.getElementById("Notificaciones").style.display = "block";
    }else{
        //Vacia el texto de mensaje de notificacion
        document.getElementById("Notificaciones_TEXT").innerHTML = "";
        //Inicia la animacion
        document.getElementById("Carga_DATE").style.WebkitAnimationPlayState = "running";
        //Muestra el elemento de la animacion
        document.getElementById("Carga_DATE").style.display = "block";
        //Oculta el boton de la notificacion
        document.getElementById("Button_Notificacion").style.display = "none";
        //Muestra la notificacion    
        document.getElementById("Notificaciones").style.display = "block";
        
        //Esta funcion oculta la notificacion y detiene la animacion dentro de 2,1s
        setTimeout(function (){
            document.getElementById("Notificaciones").style.display = "none";
            document.getElementById("Carga_DATE").style.WebkitAnimationPlayState = "paused";
        }, 2100);
    }
}
//Agregado el evento al boton de notificaciones
var Button_Notificacion = document.getElementById("Button_Notificacion");
Button_Notificacion.addEventListener("click", function(){
    document.getElementById("Notificaciones").style.display = "none";
});


//APP de angular de la aplicacion
var app = angular.module("KindsSchool", ["firebase", "ngSanitize"]);


//Controlador del login
app.controller("FormularioInitCtrl", function ($scope) {

    //Mostrador de errores de campos o datos
    $scope.TEXT_LOGIN = "Datos de Usuario";

    //a sera true se el usuario existe y b si la contraseña de usuario
    var a = false, b = false;


    //Objeto de funciones de la sesion de usuario
    var Sesion = {
        //Funcion que se ejecuta al iniciar la sesion correctamente
        Start : function (){
            localStorage.OsmanyTeamNameUser = $scope.Nombre_Usuario;
            localStorage.OsmanyTeamPasswordUser = $scope.Contrasena_Usuario;
            localStorage.OsmanyTeamLogin = 'true';
            console.log("Estas Dentro");
            document.getElementById("Formulario").style.display = "none";
            document.getElementById("GAME_CONTENT").style.display = "block";
            //document.getElementById("Info_Main_GAME").style.WebkitAnimationPlayState = "running";
            this.Sesion_Reiniciar_Datos();
        },
        //Reinicia los datos del Local Storage para despues ser usados
        Sesion_Reiniciar_Datos : function (){
            localStorage.OsmanyTeamAgeUser = "";
            localStorage.OsmanyTeamSexUser = "";
            localStorage.OsmanyTeamNivel = 0;
            localStorage.OsmanyTeamItemsExecuteApp = 0;
        }
    };



    //Funcion al intentar iniciar sesion
    $scope.Ingresar = function () {
        //Comprobar si el formulario no tiene errores de caracteres
        if ($scope.valx1 && $scope.valx2) {
            var valy1 = document.getElementById("Nombre_Login_User").value;
            var valy2 = document.getElementById("Contrasena_Login_User").value;

            //comprueba si los campos estan vacios "nombre de usuario"
            if (valy1 === null || valy1 == "") {
                $scope.Nombre_Usuario = "Digita aqui";
            } else {
                //Comprueba si el campo esta vacion "contraseña"
                if (valy2 === null || valy2 == "") {
                    $scope.TEXT_LOGIN = "Campo Vacio";


                } else {

                    //Function que comprueba los datos
                    //Objote de carga de todos los usuarios
                    var ref = new Firebase("https://kindsschool.firebaseio.com/Users");

                    ref.once("value", function (snapshot){
                        //Si no existe nombre de usuario de buelbe false, de lo contrario true
                        a = snapshot.child($scope.Nombre_Usuario).exists();
                        //Si no existe contraseña de buelbe false, de lo contrario true
                        b = snapshot.child($scope.Nombre_Usuario+ "/"+ $scope.Contrasena_Usuario).exists();   
                    })
                    
                    //Mandamos una notifiacion de que se cargan los datos
                    Notificar("", false);

                    //Pedimos la respuesta de la carga dentro de 2,2s
                    setTimeout($scope.Respuesta, 2200);
                }

            }
            //Si los caractes no son los correctos
        } else {
            $scope.TEXT_LOGIN = "Campos erroneos";
        }
    }
    


    //Respuesta que da los resultados de la comprobación
    $scope.Respuesta = function(){
        //Comprobamos si el usuario existe
        if(a){
            //Compureba si la contraseña es la correcta
            if(b){
                //Se realiza la iniciacion de sesion
                Sesion.Start();
            }else{
                //Notificamos que la conntraseña no es correcta
                Notificar("Contraseña Incorrecta", true);
            }
        }else{
            //Notifica que el nombre de usuario no existe
            Notificar("Nombre de Usuario No Existe", true);
        }
    }
    //Funcion para el evento click del boton crear usuario
    $scope.CrearUsuario = function () {
        //Oculta el formulario de iniciar sesion
        document.getElementById("Formulario").style.display = "none";
        //Muestra el formulario de Crear Usuario
        document.getElementById("Crear_Usuario").style.display = "block";
    }
});




//Controlador de formulario de crear usuario
app.controller("FormularioCreatCtrl", function ($scope) {
    //Muestra errores de formulario o datos
    $scope.TEXT_CREAT = "Agrega Usuario";

    //Inicializacion de variables
    $scope.Age = "5";
    $scope.Sexo_Creat = "nino";
    //Guardara true si el nombre de usuario existe
    var ab = false;

    //Funcion del evento click para el boton de crear usuario
    $scope.Crear_User = function () {
        //Comprueba si hay errores en los caracteres
        if ($scope.valName && $scope.valPassword) {
            var ValName = document.getElementById("Nombre_Creat_User").value;
            var ValPassword = document.getElementById("Contrasena_Creat_User").value;
            //Comprueba si los campos estan vacios "Nombre de usuario"
            if (ValName === null || ValName == "") $scope.TEXT_CREAT = "Campos Vacios";
            else {
                //Comprueba si los campos estan vacios "Contraseña"
                if (ValPassword === null || ValPassword == "") {
                    $scope.TEXT_CREAT = "Campos Vacios";
                } else {
                    //Si todo esta correcto cargamos el objeto con los usuarios
                    var refe = new Firebase("https://kindsschool.firebaseio.com/Users");
                    refe.once("value", function (snapshot){
                        //False si el nombre de usuario existe, de lo contrario true
                        ab = snapshot.child($scope.Nombre_Creat).exists();
                    });
                    //Le notificamos al usuario que esta cargando
                    Notificar("", false);
                    //Ejecuta la funcion de introducir datos dentro la BD
                    setTimeout($scope.IntroducirDatos, 2200);
                }
            }
        } else {
            $scope.TEXT_CREAT = "Campos Erroneos";
        }
    }

    $scope.IntroducirDatos = function(){
        //Comprueba si el usuario existe
        if(ab)Notificar("Nombre de usuario, ya esta en uso", true);
        else{
            //Los datos a introducir

            //Datos de fecha de creacion de usuario
            var date = new Date();
            var fecha = {};
            fecha.Dia = date.getDate();
            fecha.Mes = date.getMonth()+1;
            fecha.Ano = date.getFullYear();

            //Objeto que contiene los datos de usuario
            var ref = new Firebase("https://kindsschool.firebaseio.com/Users");
            //Agrega usuario id
            ref.child($scope.Nombre_Creat);
            //Objeto con los datos del nuevo usuario
            var usuario = new Firebase("https://kindsschool.firebaseio.com/Users/"+ $scope.Nombre_Creat);
            //Agrega los datos al usuario
            usuario.child($scope.Contrasena_Creat).set({ AgeUser : $scope.Age, SexUser : $scope.Sexo_Creat, Nivel : 0, ItemsExecuteApp : 0, DATE_INICIO : fecha.Dia+ " - "+ fecha.Mes+ " - "+ fecha.Ano, SesionInicia : false});
            
            //Finalmente oculta el formulario de crear usuario
            document.getElementById("Formulario").style.display = "block";
            //Y muestra el formulario de iniciar sesion
            document.getElementById("Crear_Usuario").style.display = "none";
        }
    }

    //Funcion para el evento click del boton cancelar
    $scope.Cancelar = function () {
        //Muestra el formulario de iniciar sesion
        document.getElementById("Formulario").style.display = "block";
        //Oculta el formulario de crear usuario
        document.getElementById("Crear_Usuario").style.display = "none";
    }
});





//Controlador del main del game
app.controller("GAME_CONTROLLER", function ($scope, $firebaseObject) {
    //Iniciadores de variables


    //Variables y objeto con rutas de resource de precarga de archivos
    //Los elementos del html
    var preload01 = document.getElementById("audioPreload_01");
    var preload02 = document.getElementById("audioPreload_02");
    var preload03 = document.getElementById("audioPreload_03");
    var preload04 = document.getElementById("audioPreload_04");
    var preload05 = document.getElementById("audioPreload_05");
    var preload06 = document.getElementById("audioPreload_06");
    var preload07 = document.getElementById("audioPreload_07");
    var preload08 = document.getElementById("audioPreload_08");

    //Los enlaces de rutas para los archivos de precargar
    //Audio
    $scope.SRC_audioPreload_01 = "";
    $scope.SRC_audioPreload_02 = "";
    $scope.SRC_audioPreload_04 = "";
    $scope.SRC_audioPreload_05 = "";
    $scope.SRC_audioPreload_06 = "";
    $scope.SRC_audioPreload_07 = "";
    $scope.SRC_audioPreload_08 = "";
    $scope.SRC_audioPreload_09 = "";
    //Video
    $scope.SRC_videoPreload_01mp4 = "";
    $scope.SRC_videoPreload_01webm = "";

    //Obejtos que contiene las rutas de todos los archivos
    var RutasResource = {};

    //Estilo de contendor del main GAME
    $scope.GAME_STYLE = {display : "block", background: "url('img/fondo02.jpg')"};

    //Estilo del contenedor del menu del play game
    document.getElementById("Content_PLay_Main_GAME").style.display = "none";


    //Funcion para los botones de atras para detectar el alto de pantalla
    /*function alertSize() {

      if( typeof( window.innerWidth ) == 'number' ) {

        //No-IE

        $scope.AnchoVentana = window.innerWidth;

        $scope.AltoVentana = window.innerHeight;

      } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {

        //IE 6+

        $scope.AnchoVentana = document.documentElement.clientWidth;

        $scope.AltoVentana = document.documentElement.clientHeight;

      } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {

        //IE 4 compatible

        $scope.AnchoVentana = document.body.clientWidth;

        $scope.AltoVentana = document.body.clientHeight;

      }

      window.alert( 'Width = ' + myWidth );

      window.alert( 'Height = ' + myHeight );

    }*/

    //Funcion para el evento click del play main GAME
    $scope.Play_Main_GAME = function(){
        document.getElementById("Main_GAME").style.display = "none";
        document.getElementById("Content_PLay_Main_GAME").style.display = "block";
        
    }
    //Funcion para el evento click del boton Salir de sesion
    $scope.Salir_Sesion = function (){
        document.getElementById("Nombre_Login_User").value = "";
        document.getElementById("Contrasena_Login_User").value = "";
        localStorage.OsmanyTeamLogin = 'false';
        document.getElementById("GAME_CONTENT").style.display = "none";
        document.getElementById("Formulario").style.display="block";
    }
    
    //Funcion para el evento click del boton atras del menu play GAME
    $scope.Atras_Play_Main_GAME = function (){
        document.getElementById("Content_PLay_Main_GAME").style.display = "none";
        document.getElementById("Main_GAME").style.display = "block"; 
    }

    //Funcion para abrir escena
    $scope.AbrirEscena = function(id){
        document.getElementById("Play_Colores").style.display = "block";
        document.getElementById(id).style.display = "block";
        document.getElementById("Content_PLay_Main_GAME").style.display = "none";
    }
    //PARA regresar al menu
    $scope.Main_GAME = function (id){
        document.getElementById(id).style.display="none";
        document.getElementById("Main_GAME").style.display = "block";
    }
    
});


//Controlador de play formas
app.controller("Play_Colores", function($scope){

    //---------------------------------------------------------//
    //Eventos y actividades para la escena identificar colores
    var img = "<img src='img/touch.png'>";
    var red = document.getElementById("CP_Red"), berde = document.getElementById("CP_Berde"), azul = document.getElementById("CP_Azul");
    $scope.Click_CP_Red = function(){
        var x = document.getElementById("CP_Red").innerHTML;
        if(x != ""){
            red.innerHTML = "";
            berde.innerHTML = img;
        }
    }
    $scope.Click_CP_Berde = function(){
        var x = document.getElementById("CP_Berde").innerHTML;
        if(x != ""){
            berde.innerHTML = "";
            azul.innerHTML = img;
        }
    }
    $scope.Click_CP_Azul = function (){
        var x = document.getElementById("CP_Azul").innerHTML;
        if(x != ""){
            azul.innerHTML = "";
        }
    }
});
