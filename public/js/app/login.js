/*
 login.js
 Funciones propias de la página login.html
*/

var vm;

var apiPaginaLogin = {
    ini: function () {
        apiComunGeneral.iniLogin();
        vm = new this.datosPagina();
        ko.applyBindings(vm);
        $("#btnLogin").click(this.btnLogin2);
        $("#login-form").submit(function () { return false; });
        apiPaginaLogin.getVersion();
        // Solicitar autorización azure
        var email = apiComunGeneral.gup("email");
        var error = apiComunGeneral.gup("error");
        if (error != "") {
            if (error = "LOGOUT") {
                apiComunGeneral.deleteCookie('usuario');
                window.open('https://login.microsoftonline.com/common/oauth2/logout', '_self');
            }
            return;
        }
        if (!email || email == "") {
            window.open('/auth/openid', '_self');
        } else {
            var data = {
                "usuario": {
                    "email": email
                }
            };
            apiPaginaLogin.lanzarLoginEmail(data);
        }
    },
    datosPagina: function () {
        var self = this;
        self.login = ko.observable();
        self.password = ko.observable();
    },
    btnLogin: function () {
        if (!apiPaginaLogin.datosOK()) return;
        var data = {
            "usuario": {
                "login": vm.login(),
                "password": vm.password()
            }
        };
        apiPaginaLogin.lanzarLogin(data);
    },
    btnLogin2: function () {
        window.open('/auth/openid', '_self');
    },    
    datosOK: function () {
        $('#login-form').validate({
            rules: {
                login: { required: true },
                password: { required: true }
            },
            messages: {
                login: {
                    required: i18n.t("login.valLogin")

                },
                password: {
                    required: i18n.t("login.valPassword")
                }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#login-form').valid();
    },
    lanzarLogin: function (data) {
        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/login/clave", data, function (err, data) {
            if (err) return;
            if (!data) {
                this.mostrarMensaje('Login y/o password incorrectos');
            } else {
                var a = data;
                apiComunGeneral.setCookie("usuario", JSON.stringify(a), 1)
                window.open('Index.html', '_self');
            }
        });
    },
    lanzarLoginEmail: function (data) {
        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/login/email", data, function (err, data) {
            if (err) return;
            if (!data) {
                window.open("login2.html?error=AUTH", '_self');
            } else {
                var a = data;
                apiComunGeneral.setCookie("usuario", JSON.stringify(a), 1)
                window.open('Index.html', '_self');
            }
        });
    },
    mostrarMensaje: function (mensaje) {
        $("#mensaje").text(mens);
    },
    getVersion: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/version", null, function (err, data) {
            if (err) return;
            if (!data.version) return this.mostrarMensaje('No se pudo obtener version');
            $("#version").text(data.version);
        });
    }
}




