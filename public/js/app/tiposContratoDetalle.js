/*
 tiposContrato.js
 Funciones propias de la página TiposContrato.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var tipoContratoId = 0;
var vm;

var apiPaginaTipoContratoDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaTipoContratoDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#tiposContrato').attr('class', 'active');
        $('#tipoContrato-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaTipoContratoDetalle.aceptar);
        $('#btnSalir').click(apiPaginaTipoContratoDetalle.salir);

        tipoContratoId = apiComunGeneral.gup("id");
        if (tipoContratoId == 0){
            vm.tipoContratoId(0);
        }else{
            apiPaginaTipoContratoDetalle.cargarTipoContrato(tipoContratoId);
        }
    },
    cargarTipoContrato: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-contrato/" + id, null, function(err, data){
            if (err) return;
            apiPaginaTipoContratoDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.tipoContratoId(data.tipoContratoId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.tipoContratoId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaTipoContratoDetalle.datosOk()) return;
        var data = {
            tipoContratoId: vm.tipoContratoId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.tipoContratoId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/tipos-contrato", data, function(err, data){
            if (err) return;
            apiPaginaTipoContratoDetalle.salir();
        });
    },
    datosOk: function(){
        $('#tipoContrato-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#tipoContrato-form').valid();
    },
    salir: function () {
        window.open(sprintf('TiposContratoGeneral.html'), '_self');
    }
}


