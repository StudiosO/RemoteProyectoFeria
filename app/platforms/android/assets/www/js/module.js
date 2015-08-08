//objeto de las notificaciones
var Notificar = function(texto, Mod){
    if(Mod == true){
        document.getElementById("Carga_DATE").style.display = "none";
        document.getElementById("Button_Notificacion").style.display = "block";
        document.getElementById("Notificaciones_TEXT").innerHTML = texto;
        document.getElementById("Notificaciones").style.display = "block";
    }else{
        document.getElementById("Notificaciones_TEXT").innerHTML = "";
        document.getElementById("Carga_DATE").style.WebkitAnimationPlayState = "running";
        document.getElementById("Carga_DATE").style.display = "block";
        document.getElementById("Button_Notificacion").style.display = "none";      
        document.getElementById("Notificaciones").style.display = "block";
        
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
//Deteniendo animaciones particulares
//document.getElementById("Info_Main_GAME").style.WebkitAnimationPlayState = "paused";


//Controlador del login
app.controller("FormularioInitCtrl", function ($scope) {
    //Mostrador de errores de campos o datos
    $scope.TEXT_LOGIN = "Datos de Usuario";
        //a sera true se el usuario existe y b si la contraseña de usuario
        var a = false, b = false;


        var Sesion = {
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

            Sesion_Reiniciar_Datos : function (){
            localStorage.OsmanyTeamAgeUser = "";
            localStorage.OsmanyTeamSexUser = "";
            localStorage.OsmanyTeamNivel = 0;
            localStorage.OsmanyTeamItemsExecuteApp = 0;
        }
    };




    $scope.Ingresar = function () {
        if ($scope.valx1 && $scope.valx2) {
            var valy1 = document.getElementById("Nombre_Login_User").value;
            var valy2 = document.getElementById("Contrasena_Login_User").value;
            //alert(valy1 + " y " + valy2);
            //console.log(valy1 + " y " + valy2);
            if (valy1 === null || valy1 == "") {
                $scope.Nombre_Usuario = "Digita aqui";
            } else {
                if (valy2 === null || valy2 == "") {
                    $scope.TEXT_LOGIN = "Campo Vacio";


                } else {

                    //Function que comprueba los datos
                        console.log("Voy en Comprobar_Existencia");
                        var ref = new Firebase("https://kindsschool.firebaseio.com/Users");

                        ref.once("value", function (snapshot){
                        a = snapshot.child($scope.Nombre_Usuario).exists();
                        b = snapshot.child($scope.Nombre_Usuario+ "/"+ $scope.Contrasena_Usuario).exists();
                        
                        })
                        Notificar("", false);
                        setTimeout($scope.Respuesta, 2200);
                        console.log("Ya avise para respuesta");
                }

            }
        } else {
            $scope.TEXT_LOGIN = "Campos erroneos";
        }
    }
    


    //Respuesta que da los resultados de la comprobación
    $scope.Respuesta = function(){
        console.log("Voy a comprobar para mandarte respuesta");
        if(a){
            if(b){
                Sesion.Start();
            }else{
                Notificar("Contraseña Incorrecta", true);
            }
        }else{
            Notificar("Nombre de Usuario No Existe", true);
        }
        console.log("Ya envie respuesta a="+ a+ " b="+ b);
    }

    $scope.CrearUsuario = function () {
        document.getElementById("Formulario").style.display = "none";
        document.getElementById("Crear_Usuario").style.display = "block";
    }
});



//Controlador de formulario de crear usuario
app.controller("FormularioCreatCtrl", function ($scope) {
    $scope.TEXT_CREAT = "Agrega Usuario";
    $scope.Age = "5";
    $scope.Sexo_Creat = "nino";
    var ab = false;

    $scope.Crear_User = function () {

        if ($scope.valName && $scope.valPassword) {
            var ValName = document.getElementById("Nombre_Creat_User").value;
            var ValPassword = document.getElementById("Contrasena_Creat_User").value;
            //alert(ValName + " | " + ValPassword);
            if (ValName === null || ValName == "") $scope.TEXT_CREAT = "Campos Vacios";
            else {
                if (ValPassword === null || ValPassword == "") {
                    $scope.TEXT_CREAT = "Campos Vacios";
                } else {
                    var refe = new Firebase("https://kindsschool.firebaseio.com/Users");
                    refe.once("value", function (snapshot){
                        ab = snapshot.child($scope.Nombre_Creat).exists();
                    });
                    Notificar("", false);
                    setTimeout($scope.IntroducirDatos, 2200);
                }
            }
        } else {
            $scope.TEXT_CREAT = "Campos Erroneos";
        }
    }

    $scope.IntroducirDatos = function(){
        //alert(ab);
        if(ab)Notificar("Nombre de usuario, ya esta en uso", true);
        else{
            var date = new Date();
            var fecha = {};
            fecha.Dia = date.getDate();
            fecha.Mes = date.getMonth()+1;
            fecha.Ano = date.getFullYear();
            var ref = new Firebase("https://kindsschool.firebaseio.com/Users");
            ref.child($scope.Nombre_Creat);
            var usuario = new Firebase("https://kindsschool.firebaseio.com/Users/"+ $scope.Nombre_Creat);
            usuario.child($scope.Contrasena_Creat).set({ AgeUser : $scope.Age, SexUser : $scope.Sexo_Creat, Nivel : 0, ItemsExecuteApp : 0, DATE_INICIO : fecha.Dia+ " - "+ fecha.Mes+ " - "+ fecha.Ano, SesionInicia : false});
            document.getElementById("Formulario").style.display = "block";
            document.getElementById("Crear_Usuario").style.display = "none";
        }
    }

    $scope.Cancelar = function () {
        document.getElementById("Formulario").style.display = "block";
        document.getElementById("Crear_Usuario").style.display = "none";
    }
});




//Controladores del Game

//Controlador del main del game
app.controller("GAME_CONTROLLER", function ($scope, $firebaseObject) {
    $scope.GAME_STYLE = {display : "none", background: "url('img/fondo02.jpg')"};
    $scope.styleContent_PLay_Main_GAME = {display: "none"};
    //Objeto DATA html del juego
    var GAME = {
        Main : "",
        Play : ""
        
    };
    //var Main = '<div id="Main_GAME">'
    //$scope.DATA_RESPUESTA = Main;
    /*setTimeout(function(){
        document.getElementById("GAME_CONTENT").innerHTML = GAME.Main;
    }, 1500);*/
    $scope.Play_Main_GAME = function(){
        $scope.styleFormas_Play = {"-webkit-animation-name" : "FomasPlay", "-webkit-animation-duration" : "12s", "-webkit-animation-iteration-count" : "infinite"};
        $scope.styleContent_PLay_Main_GAME = {display : "block"};
    }

    $scope.Salir_Sesion = function (){
        document.getElementById("Nombre_Login_User").value = "";
        document.getElementById("Contrasena_Login_User").value = "";
        localStorage.OsmanyTeamLogin = 'false';
        document.getElementById("GAME_CONTENT").style.display = "none";
        document.getElementById("Formulario").style.display="block";
    }
    
});
