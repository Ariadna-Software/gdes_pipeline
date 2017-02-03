/*
 ofertas.js
 Funciones propias de la página Ofertas.html
*/

var usuario = JSON.parse(apiComunGeneral.getCookie('usuario'));
var data = null;
var ofertaId = 0;
var vm;

var apiPaginaOfertasDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        vm = new apiPaginaOfertasDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#ofertas').attr('class', 'active');
        $('#oferta-form').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnSalir').click(apiPaginaOfertasDetalle.salir);
        $('#cmbTipoOfertas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoOfertas();
        $('#cmbResponsables').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarResponsables();

        $('#cmbPaiss').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarPaiss();
        $('#cmbEmpresas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarEmpresas();
        $('#cmbAreas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarAreas();
        $('#cmbCentros').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarCentros();

        $('#cmbEstados').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarEstados();
        $('#cmbProyectos').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarProyectos();
        $('#cmbTipoActividads').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoActividads();
        $('#cmbTipoSoportes').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoSoportes();

        ofertaId = apiComunGeneral.gup("id");

        if (ofertaId == 0) {
            vm.ofertaId(0);
            vm.fechaOferta(moment(new Date()).format("DD/MM/YYYY"));
            vm.fechaUltimoEstado(moment(new Date()).format("DD/MM/YYYY"));
            apiPaginaOfertasDetalle.cargarEstados(1);

            apiPaginaOfertasDetalle.cargarPaiss(usuario.paisId);
            apiPaginaOfertasDetalle.cargarEmpresas(usuario.empresaId);
            apiPaginaOfertasDetalle.cargarAreas(usuario.areaId);
            apiPaginaOfertasDetalle.cargarCentros(usuario.centroId);
            apiPaginaOfertasDetalle.cargarResponsables(usuario.responsableId);
        } else {
            apiPaginaOfertasDetalle.cargarOferta(ofertaId);
        }
    },
    cargarOferta: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/ofertas/" + id, null, function (err, data) {
            if (err) return;
            apiPaginaOfertasDetalle.cargarDatosPagina(data);
        });
    },
    cargarDatosPagina: function (data) {
        vm.ofertaId(data.ofertaId);
        vm.numeroOferta(data.numeroOferta);
        vm.fechaOferta(moment(data.fechaOferta).format(i18n.t('util.date_format')));
        if (data.fechaUltimoEstado) vm.fechaUltimoEstado(moment(data.fechaUltimoEstado).format(i18n.t('util.date_format')));
        if (data.fechaLimiteProyecto) vm.fechaLimiteProyecto(moment(data.fechaLimiteProyecto).format(i18n.t('util.date_format')));
        if (data.fechaEntrega) vm.fechaEntrega(moment(data.fechaEntrega).format(i18n.t('util.date_format')));
        vm.numeroPedido(data.numeroPedido);
        apiPaginaOfertasDetalle.cargarTipoOfertas(data.tipoOfertaId);
        apiPaginaOfertasDetalle.cargarResponsables(data.responsableId);

        apiPaginaOfertasDetalle.cargarPaiss(data.paisId);
        apiPaginaOfertasDetalle.cargarEmpresas(data.empresaId);
        apiPaginaOfertasDetalle.cargarAreas(data.areaId);
        apiPaginaOfertasDetalle.cargarCentros(data.centroId);

        apiPaginaOfertasDetalle.cargarEstados(data.estadoId);
        apiPaginaOfertasDetalle.cargarProyectos(data.proyectoId);
        apiPaginaOfertasDetalle.cargarTipoSoportes(data.tipoSoporteId);
        apiPaginaOfertasDetalle.cargarTipoActividads(data.tipoActividadId);
        vm.importePresupuesto(data.importePresupuesto);
        vm.importePresupuestoDivisa(data.importePresupuestoDivisa);
        vm.codigoDivisa(data.codigoDivisa);
        vm.importeInversion(data.importeInversion);
        vm.importeRetorno(data.importeRetorno);
        vm.tiempoEmpleado(data.tiempoEmpleado);
        vm.personaContacto(data.personaContacto);
        vm.descripcion(data.descripcion);
        vm.observaciones(data.observaciones);
        vm.autorizaciones(data.autorizaciones);
        vm.ofertaSingular(data.ofertaSingular);
        vm.periodo(data.periodo);
        vm.colaboradores(data.colaboradores);
        vm.margenContribucion(data.margenContribucion);
        vm.importeContribucion(data.importeContribucion);
    },
    datosPagina: function () {
        var self = this;
        self.ofertaId = ko.observable();
        self.numeroOferta = ko.observable();
        self.fechaOferta = ko.observable();
        self.fechaUltimoEstado = ko.observable();
        self.fechaLimiteProyecto = ko.observable();
        self.numeroPedido = ko.observable();
        self.importePresupuesto = ko.observable();
        self.importePresupuestoDivisa = ko.observable();
        self.codigoDivisa = ko.observable();
        self.importeInversion = ko.observable();
        self.importeRetorno = ko.observable();
        self.tiempoEmpleado = ko.observable();
        self.personaContacto = ko.observable();
        self.descripcion = ko.observable();
        self.observaciones = ko.observable();
        self.autorizaciones = ko.observable();
        self.periodo = ko.observable();
        self.fechaEntrega = ko.observable();
        self.colaboradores = ko.observable();
        self.margenContribucion = ko.observable();
        self.importeContribucion = ko.observable();

        self.optionsTipoOfertas = ko.observableArray([]);
        self.selectedTipoOfertas = ko.observableArray([]);
        self.sTipoOferta = ko.observable();
        self.ofertaSingular = ko.observable();

        self.optionsResponsables = ko.observableArray([]);
        self.selectedResponsables = ko.observableArray([]);
        self.sResponsable = ko.observable();

        self.optionsPaiss = ko.observableArray([]);
        self.selectedPaiss = ko.observableArray([]);
        self.sPais = ko.observable();

        self.optionsEmpresas = ko.observableArray([]);
        self.selectedEmpresas = ko.observableArray([]);
        self.sEmpresa = ko.observable();

        self.optionsAreas = ko.observableArray([]);
        self.selectedAreas = ko.observableArray([]);
        self.sArea = ko.observable();

        self.optionsCentros = ko.observableArray([]);
        self.selectedCentros = ko.observableArray([]);
        self.sCentro = ko.observable();

        self.optionsEstados = ko.observableArray([]);
        self.selectedEstados = ko.observableArray([]);
        self.sEstado = ko.observable();

        self.optionsProyectos = ko.observableArray([]);
        self.selectedProyectos = ko.observableArray([]);
        self.sProyecto = ko.observable();

        self.optionsTipoActividads = ko.observableArray([]);
        self.selectedTipoActividads = ko.observableArray([]);
        self.sTipoActividad = ko.observable();

        self.optionsTipoSoportes = ko.observableArray([]);
        self.selectedTipoSoportes = ko.observableArray([]);
        self.sTipoSoporte = ko.observable();
    },
    aceptar: function () {
        if (!apiPaginaOfertasDetalle.datosOk()) return;
        var data = {
            ofertaId: vm.ofertaId(),
            numeroOferta: vm.numeroOferta(),
            fechaOferta: moment(vm.fechaOferta(), i18n.t('util.date_format')).format(i18n.t('util.date_iso')),
            fechaUltimoEstado: moment(vm.fechaUltimoEstado(), i18n.t('util.date_format')).format(i18n.t('util.date_iso')),
            fechaLimiteProyecto: moment(vm.fechaLimiteProyecto(), i18n.t('util.date_format')).format(i18n.t('util.date_iso')),
            fechaEntrega: moment(vm.fechaEntrega(), i18n.t('util.date_format')).format(i18n.t('util.date_iso')),
            tipoOfertaId: vm.sTipoOferta(),
            responsableId: vm.sResponsable(),
            paisId: vm.sPais(),
            empresaId: vm.sEmpresa(),
            areaId: vm.sArea(),
            centroId: vm.sCentro(),
            estadoId: vm.sEstado(),
            proyectoId: vm.sProyecto(),
            tipoActividadId: vm.sTipoActividad(),
            tipoSoporteId: vm.sTipoSoporte(),
            numeroPedido: vm.numeroPedido(),
            importePresupuesto: vm.importePresupuesto(),
            importePresupuestoDivisa: vm.importePresupuestoDivisa(),
            codigoDivisa: vm.codigoDivisa(),
            importeInversion: vm.importeInversion(),
            importeRetorno: vm.importeRetorno(),
            tiempoEmpleado: vm.tiempoEmpleado(),
            personaContacto: vm.personaContacto(),
            descripcion: vm.descripcion(),
            observaciones: vm.observaciones(),
            autorizaciones: vm.autorizaciones(),
            ofertaSingular: vm.ofertaSingular(),
            periodo: vm.periodo(),
            colaboradores: vm.colaboradores(),
            margenContribucion: vm.margenContribucion(),
            importeContribucion: vm.importeContribucion()
        };
        var verb = "PUT";
        if (vm.ofertaId() == 0) verb = "POST";
        apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
            if (err) return;
            apiPaginaOfertasDetalle.salir();
        });
    },
    datosOk: function () {
        $('#oferta-form').validate({
            rules: {
                txtNumeroOferta: { required: true },
                txtFechaOferta: { required: true },
                cmbTipoOfertas: { required: true },
                cmbResponsables: { required: true },
                cmbEstados: { required: true },
                cmbPaiss: { required: true },
                cmbEmpresas: { required: true },
                cmbAreas: { required: true },
                cmbCentros: { required: true },
                cmbProyectos: { required: true },
                txtImportePresupuesto: { required: true },
                txtDescripcion: { required: true }
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('aswselect2')) {
                    error.insertAfter(element);  // select2
                } else {
                    error.insertAfter(element.parent());               // default
                }
            }
        });
        return $('#oferta-form').valid();
    },
    salir: function () {
        window.open(sprintf('OfertasGeneral.html'), '_self');
    },
    cargarTipoOfertas: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-oferta", null, function (err, data) {
            if (err) return;
            var options = [{ tipoOfertaId: 0, nombre: " " }].concat(data);
            vm.optionsTipoOfertas(options);
            $("#cmbTipoOfertas").val([id]).trigger('change');
        });
    },
    cargarResponsables: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/responsables", null, function (err, data) {
            if (err) return;
            var options = [{ responsableId: 0, nombre: " " }].concat(data);
            vm.optionsResponsables(options);
            $("#cmbResponsables").val([id]).trigger('change');
        });
    },
    cargarPaiss: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/paises", null, function (err, data) {
            if (err) return;
            var options = [{ paisId: 0, nombre: " " }].concat(data);
            vm.optionsPaiss(options);
            $("#cmbPaiss").val([id]).trigger('change');
        });
    },
    cargarEmpresas: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/empresas", null, function (err, data) {
            if (err) return;
            var options = [{ empresaId: 0, nombre: " " }].concat(data);
            vm.optionsEmpresas(options);
            $("#cmbEmpresas").val([id]).trigger('change');
        });
    },
    cargarAreas: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/areas", null, function (err, data) {
            if (err) return;
            var options = [{ areaId: 0, nombre: " " }].concat(data);
            vm.optionsAreas(options);
            $("#cmbAreas").val([id]).trigger('change');
        });
    },
    cargarCentros: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/centros", null, function (err, data) {
            if (err) return;
            var options = [{ centroId: 0, nombre: " " }].concat(data);
            vm.optionsCentros(options);
            $("#cmbCentros").val([id]).trigger('change');
        });
    },
    cargarEstados: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/estados", null, function (err, data) {
            if (err) return;
            var options = [{ estadoId: 0, nombre: " " }].concat(data);
            vm.optionsEstados(options);
            $("#cmbEstados").val([id]).trigger('change');
        });
    },
    cargarTipoActividads: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-actividades", null, function (err, data) {
            if (err) return;
            var options = [{ tipoActividadId: 0, nombre: " " }].concat(data);
            vm.optionsTipoActividads(options);
            $("#cmbTipoActividads").val([id]).trigger('change');
        });
    },
    cargarProyectos: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/proyectos", null, function (err, data) {
            if (err) return;
            var options = [{ proyectoId: 0, nombre: " " }].concat(data);
            vm.optionsProyectos(options);
            $("#cmbProyectos").val([id]).trigger('change');
        });
    },
    cargarTipoSoportes: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-soporte", null, function (err, data) {
            if (err) return;
            var options = [{ tipoSoporteId: 0, nombre: " " }].concat(data);
            vm.optionsTipoSoportes(options);
            $("#cmbTipoSoportes").val([id]).trigger('change');
        });
    },
    lanzarMensajeAyuda: function(mensaje){
        apiComunNotificaciones.mensajeAyuda(mensaje);
    }
}


