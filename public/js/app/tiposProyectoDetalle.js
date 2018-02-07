/*
 tiposProyecto.js
 Funciones propias de la página TiposProyecto.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var tipoProyectoId = 0;
var vm;

var apiPaginaTipoProyectoDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaTipoProyectoDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#tiposProyecto').attr('class', 'active');
        $('#tipoProyecto-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaTipoProyectoDetalle.aceptar);
        $('#btnSalir').click(apiPaginaTipoProyectoDetalle.salir);

        tipoProyectoId = apiComunGeneral.gup("id");
        if (tipoProyectoId == 0){
            vm.tipoProyectoId(0);
        }else{
            apiPaginaTipoProyectoDetalle.cargarTipoProyecto(tipoProyectoId);
        }
    },
    cargarTipoProyecto: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-proyecto/" + id, null, function(err, data){
            if (err) return;
            apiPaginaTipoProyectoDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.tipoProyectoId(data.tipoProyectoId);
        vm.nombre(data.nombre);
    },
    datosPagina: function () {
        var self = this;
        self.tipoProyectoId = ko.observable();
        self.nombre = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaTipoProyectoDetalle.datosOk()) return;
        var data = {
            tipoProyectoId: vm.tipoProyectoId(),
            nombre: vm.nombre()
        };
        var verb = "PUT";
        if (vm.tipoProyectoId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/tipos-proyecto", data, function(err, data){
            if (err) return;
            apiPaginaTipoProyectoDetalle.salir();
        });
    },
    datosOk: function(){
        $('#tipoProyecto-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#tipoProyecto-form').valid();
    },
    salir: function () {
        window.open(sprintf('TiposProyectoGeneral.html'), '_self');
    }
}


