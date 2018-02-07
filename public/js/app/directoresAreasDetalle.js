/*
 directoresAreasdetalle.js
 Funciones propias de la página DirectoresAreasDetalle.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var directorId = 0;
var vm;

var apiPaginaDirectoresAreasDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaDirectoresAreasDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#dirAreas').attr('class', 'active');
        $('#dirArea-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaDirectoresAreasDetalle.aceptar);
        $('#btnSalir').click(apiPaginaDirectoresAreasDetalle.salir);

        directorId = apiComunGeneral.gup("id");
        if (directorId == 0){
            vm.directorId(0);
        }else{
            apiPaginaDirectoresAreasDetalle.cargarArea(directorId);
        }
    },
    cargarArea: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/directores-areas/" + id, null, function(err, data){
            if (err) return;
            apiPaginaDirectoresAreasDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.directorId(data.directorId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.directorId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaDirectoresAreasDetalle.datosOk()) return;
        var data = {
            directorId: vm.directorId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.directorId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/directores-areas", data, function(err, data){
            if (err) return;
            apiPaginaDirectoresAreasDetalle.salir();
        });
    },
    datosOk: function(){
        $('#dirArea-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#dirArea-form').valid();
    },
    salir: function () {
        window.open(sprintf('DirectoresAreasGeneral.html'), '_self');
    }
}


