/*
 comun.general.js
 Funciones comunes a todas las páginas de manera general
*/

var apiComunGeneral = {
    iniLogin: function () {
        // Inicialización específica de la página de login
        apiComunIdiomas.iniIdiomas();
    },
    initPage: function (usuario) {
        if (!usuario) window.open('login.html', '_self');
        var expTime = moment(usuario.expKeyTime);
        var ahora = moment(new Date());
        if (ahora > expTime) window.open('login.html', '_self');

        var lg = i18n.lng();
        if (usuario.codigoIdioma) lg = usuario.codigoIdioma;

        i18n.init({lng: lg}, function (t) { $('.I18N').i18n(); });
        
        var flag = "flag flag-es";
        var lgn = "ES";
        switch (lg) {
            case "en":
                flag = "flag flag-us";
                lgn = "EN";
                break;
        };
        $('#language-flag').attr('class', flag);
        $('#language-abrv').text(lgn);
        validator_languages(lgn);

        apiComunGeneral.getVersion();
        $("#nombreUsuario").text(usuario.nombre);
    },
    getVersion: function(){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/version", null, function(err, data){
            if (err) return;
            if (!data.version) return this.mostrarMensaje('No se pudo obtener version');
            $("#version").text(data.version);
        });
    },
    mostrarMensaje: function (mensaje) {
        $("#mensaje").text(mens);
    },
    areCookiesEnabled: function () {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
            document.cookie = "testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
    },
    setCookie: function (c_name, value, exdays) {
        if (!this.areCookiesEnabled()) {
            alert("NO COOKIES");
        }
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },
    deleteCookie: function (c_name) {
        if (!this.areCookiesEnabled()) {
            alert("NO COOKIES");
        }
        document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    }
}