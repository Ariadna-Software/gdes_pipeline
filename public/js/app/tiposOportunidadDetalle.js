/*
 tiposOportunidadDetalle.js
 Funciones propias de la página TiposoportunidadDetalle.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var tipoOportunidadId = 0;
var vm;

var apiPaginaTiposOportunidadesDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaTiposOportunidadesDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#tiposOportunidad').attr('class', 'active');
        $('#tipoOportunidad-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaTiposOportunidadesDetalle.aceptar);
        $('#btnSalir').click(apiPaginaTiposOportunidadesDetalle.salir);

        tipoOportunidadId = apiComunGeneral.gup("id");
        if (tipoOportunidadId == 0){
            vm.tipoOportunidadId(0);
        }else{
            apiPaginaTiposOportunidadesDetalle.cargarTipoOportunidad(tipoOportunidadId);
        }
    },
    cargarTipoOportunidad: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-oportunidad/" + id, null, function(err, data){
            if (err) return;
            apiPaginaTiposOportunidadesDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.tipoOportunidadId(data.tipoOportunidadId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.tipoOportunidadId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaTiposOportunidadesDetalle.datosOk()) return;
        var data = {
            tipoOportunidadId: vm.tipoOportunidadId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.tipoOportunidadId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/tipos-oportunidad", data, function(err, data){
            if (err) return;
            apiPaginaTiposOportunidadesDetalle.salir();
        });
    },
    datosOk: function(){
        $('#tipoOportunidad-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#tipoOportunidad-form').valid();
    },
    salir: function () {
        window.open(sprintf('TiposOportunidadGeneral.html'), '_self');
    }
}


