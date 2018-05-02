/*
 Servicios.js
 Funciones propias de la página Servicios.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var ServicioId = 0;
var vm;

var apiPaginaServiciosDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaServiciosDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#servicios').attr('class', 'active');
        $('#servicio-form').submit(function () { return false; });

        $('#cmbAreas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaServiciosDetalle.cargarAreas();

        $('#btnAceptar').click(apiPaginaServiciosDetalle.aceptar);
        $('#btnSalir').click(apiPaginaServiciosDetalle.salir);

        servicioId = apiComunGeneral.gup("id");
        if (servicioId == 0){
            vm.servicioId(0);
        }else{
            apiPaginaServiciosDetalle.cargarServicio(servicioId);
        }
    },
    cargarServicio: function(id){
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/servicios/" + id, null, function(err, data){
            if (err) return;
            apiPaginaServiciosDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function(data){
        vm.servicioId(data.servicioId);
        vm.nombre(data.nombre);
        vm.nombreEN(data.nombreEN);
        vm.nombreFR(data.nombreFR);
        apiPaginaServiciosDetalle.cargarAreas(data.areaId);
    },
    datosPagina: function () {
        var self = this;
        self.servicioId = ko.observable();
        self.nombre = ko.observable();
        self.nombreEN = ko.observable();
        self.nombreFR = ko.observable();

        self.optionsAreas = ko.observableArray([]);
        self.selectedAreas = ko.observableArray([]);
        self.sArea = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaServiciosDetalle.datosOk()) return;
        var data = {
            servicioId: vm.servicioId(),
            nombre: vm.nombre(),
            nombreEN: vm.nombreEN(),
            nombreFR: vm.nombreFR(),
            areaId: vm.sArea()
        };
        var verb = "PUT";
        if (vm.servicioId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/servicios", data, function(err, data){
            if (err) return;
            apiPaginaServiciosDetalle.salir();
        });
    },
    datosOk: function(){
        $('#servicio-form').validate({
            rules: {
                txtNombre: { required: true }
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
        return $('#servicio-form').valid();
    },
    cargarAreas: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/areas", null, function (err, data) {
            if (err) return;
            var options = [{ areaId: 0, nombre: " " }].concat(data);
            vm.optionsAreas(options);
            $("#cmbAreas").val([id]).trigger('change');
        });
    },    
    salir: function () {
        window.open(sprintf('ServiciosGeneral.html'), '_self');
    }
}


