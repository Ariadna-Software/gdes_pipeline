/*
 fasesOferta.js
 Funciones propias de la página fasesOferta.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var faseOfertaId = 0;
var vm;

var apiPaginaFasesOfertaDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaFasesOfertaDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#fasesOferta').attr('class', 'active');
        $('#faseOferta-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaFasesOfertaDetalle.aceptar);
        $('#btnSalir').click(apiPaginaFasesOfertaDetalle.salir);

        faseOfertaId = apiComunGeneral.gup("id");
        if (faseOfertaId == 0){
            vm.faseOfertaId(0);
        }else{
            apiPaginaFasesOfertaDetalle.cargarFaseOferta(faseOfertaId);
        }
    },
    cargarFaseOferta: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/fases-oferta/" + id, null, function(err, data){
            if (err) return;
            apiPaginaFasesOfertaDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.faseOfertaId(data.faseOfertaId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.faseOfertaId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaFasesOfertaDetalle.datosOk()) return;
        var data = {
            faseOfertaId: vm.faseOfertaId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.faseOfertaId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/fases-oferta", data, function(err, data){
            if (err) return;
            apiPaginaFasesOfertaDetalle.salir();
        });
    },
    datosOk: function(){
        $('#faseOferta-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#faseOferta-form').valid();
    },
    salir: function () {
        window.open(sprintf('FasesOfertaGeneral.html'), '_self');
    }
}


