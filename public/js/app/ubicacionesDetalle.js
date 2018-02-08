/*
 ubicacionesDetalle.js
 Funciones propias de la página UbicacionesDetalle.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var ubicacionId = 0;
var vm;

var apiPaginaUbicacionesDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaUbicacionesDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#ubicaciones').attr('class', 'active');
        $('#ubicacion-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaUbicacionesDetalle.aceptar);
        $('#btnSalir').click(apiPaginaUbicacionesDetalle.salir);

        ubicacionId = apiComunGeneral.gup("id");
        if (ubicacionId == 0) {
            vm.ubicacionId(0);
        } else {
            apiPaginaUbicacionesDetalle.cargarUbicacion(ubicacionId);
        }
    },
    cargarUbicacion: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/ubicaciones/" + id, null, function (err, data) {
            if (err) return;
            apiPaginaUbicacionesDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function (data) {
        vm.ubicacionId(data.ubicacionId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.ubicacionId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaUbicacionesDetalle.datosOk()) return;
        var data = {
            ubicacionId: vm.ubicacionId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.ubicacionId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ubicaciones", data, function (err, data) {
            if (err) return;
            apiPaginaUbicacionesDetalle.salir();
        });
    },
    datosOk: function () {
        $('#ubicacion-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#ubicacion-form').valid();
    },
    salir: function () {
        window.open(sprintf('UbicacionesGeneral.html'), '_self');
    }
}


