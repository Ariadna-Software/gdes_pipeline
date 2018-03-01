/*
 unidadesNegocio.js
 Funciones propias de la página UnidadesNegocio.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var gruposUsuarioId = 0;
var vm;

var apiPaginaUnidadesNegocioDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaUnidadesNegocioDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#unidadesNegocio').attr('class', 'active');
        $('#unidadNegocio-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaUnidadesNegocioDetalle.aceptar);
        $('#btnSalir').click(apiPaginaUnidadesNegocioDetalle.salir);

        unidadNegocioId = apiComunGeneral.gup("id");
        if (unidadNegocioId == 0){
            vm.unidadNegocioId(0);
        }else{
            apiPaginaUnidadesNegocioDetalle.cargarGrupoUsuario(unidadNegocioId);
        }
    },
    cargarGrupoUsuario: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/unidades-negocio/" + id, null, function(err, data){
            if (err) return;
            apiPaginaUnidadesNegocioDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.unidadNegocioId(data.unidadNegocioId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.unidadNegocioId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaUnidadesNegocioDetalle.datosOk()) return;
        var data = {
            unidadNegocioId: vm.unidadNegocioId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.unidadNegocioId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/unidades-negocio", data, function(err, data){
            if (err) return;
            apiPaginaUnidadesNegocioDetalle.salir();
        });
    },
    datosOk: function(){
        $('#unidadNegocio-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#unidadNegocio-form').valid();
    },
    salir: function () {
        window.open(sprintf('UnidadesNegocioGeneral.html'), '_self');
    }
}


