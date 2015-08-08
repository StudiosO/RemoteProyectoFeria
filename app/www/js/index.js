//Objeto de inicialisador de splashcreen, coneccion, login
var Iniciador = {

    //Guarda true si esta conectado a internet
    Conectado: null,

    //Comprobar si existe coneccion a internet
    Coneccion: function () {

        //Chekea la coneccion de internet
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            if(states[networkState] == 'No network connection'){
                Iniciador.Conectado = false;
            }else{
                Iniciador.Conectado = true;
            }

        //Oculta el splash y hace visible 
        //login o error de coneccion dependiendo de si tiene internet
        Iniciador.SplashScreen();
       // alert("Coneccion: "+ states[networkState]);
    },

    //Ocultar el splashscreen
    SplashScreen: function () {

        setTimeout(function () {
            //alert("conectado: "+ Iniciador.Conectado);
            document.getElementById("SplashScreen").style.display = "none";
            if(localStorage.OsmanyTeamLogin == 'true'){
                document.getElementById("GAME_CONTENT").style.display = "block"
            }else{
                if (Iniciador.Conectado) {
                    document.getElementById("Formulario").style.display = "block";
                    document.getElementById("Sin_Coneccion").style.display = "none";
                } else {
                    document.getElementById("Formulario").style.display = "none";
                    document.getElementById("Sin_Coneccion").style.display = "block";
                }
            }
        }, 3000);
    }
}


var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", this.MandarFondo, false);
    },
    onDeviceReady: function () {
        if (localStorage.OsmanyTeamExecuteApp != 1) {
            localStorage.OsmanyTeamExecuteApp = 1;
            localStorage.OsmanyTeamLogin = false;
            localStorage.OsmanyTeamNameUser = "";
            localStorage.OsmanyTeamPasswordUser = "";
            localStorage.OsmanyTeamAgeUser = "";
            localStorage.OsmanyTeamSexUser = "";
            localStorage.OsmanyTeamNivel = 0;
            localStorage.OsmanyTeamItemsExecuteApp = 0;
        }
        //Bloque los autos movimiento de pantalla y establece uno
        screen.lockOrientation("portrait-primary");

        //Asignar Eventos a elementos
        var Actualizar = document.getElementById("BotonComprobarConeccion");
        Actualizar.addEventListener("click", function () {
            //SplashScreen vuelve aparecer para comprobar internet
            document.getElementById("SplashScreen").style.display = "block";
            Iniciador.Coneccion();

        });


        Iniciador.Coneccion();
        app.receivedEvent();
    },
    receivedEvent: function () {

    },
    MandarFondo: function(){
        //Suspender la aplicacion cuande el usuario desee salir
        window.plugins.Suspend.suspendApp();
    }
};

app.initialize();
//Iniciador.SplashScreen();
