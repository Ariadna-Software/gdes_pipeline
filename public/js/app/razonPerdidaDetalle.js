/*
 razonPerdida.js
 Funciones propias de la página RazonPerdida.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var razonPerdidaId = 0;
var vm;

var apiPaginaRazonPerdidaDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaRazonPerdidaDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#razonPerdida').attr('class', 'active');
        $('#razonPerdida-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaRazonPerdidaDetalle.aceptar);
        $('#btnSalir').click(apiPaginaRazonPerdidaDetalle.salir);

        razonPerdidaId = apiComunGeneral.gup("id");
        if (razonPerdidaId == 0){
            vm.razonPerdidaId(0);
        }else{
            apiPaginaRazonPerdidaDetalle.cargarRazonPerdida(razonPerdidaId);
        }
    },
    cargarRazonPerdida: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/razon-perdida/" + id, null, function(err, data){
            if (err) return;
            apiPaginaRazonPerdidaDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.razonPerdidaId(data.razonPerdidaId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.razonPerdidaId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaRazonPerdidaDetalle.datosOk()) return;
        var data = {
            razonPerdidaId: vm.razonPerdidaId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.razonPerdidaId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/razon-perdida", data, function(err, data){
            if (err) return;
            apiPaginaRazonPerdidaDetalle.salir();
        });
    },
    datosOk: function(){
        $('#razonPerdida-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#razonPerdida-form').valid();
    },
    salir: function () {
        window.open(sprintf('RazonPerdidaGeneral.html'), '_self');
    }
}


