/*
 ofertas.js
 Funciones propias de la página Ofertas.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;
var ofertaId = 0;
var vm;
var anteriorMultiplicador = 0;
var anteriorEstado = "";

// variables para controlar cambios de importes
var cambiaImportes = false;
var _importePresupuesto;
var _importePresupuestoDivisa;
var _importeUTE;
var _importeUTEDivisa;
var _importeTotal;
var _importeTotalDivisa;
var _margenContribucion;
var _importeContribucion;
var _importeContribucionDivisa;
var _importeAnual;
var _importeAnualDivisa;
var _importePrimerAno;
var _importePrimerAnoDivisa;
var _importeInversion;
var _importeInversionDivisa;
var _divisaId;
var _multiplicador;
var _fechaDivisa;
var _contador;


var apiPaginaOfertasDetalle = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        apiPaginaOfertasDetalle.controDeCamposEditables();

        vm = new apiPaginaOfertasDetalle.datosPagina();
        ko.applyBindings(vm);

        $('#ofertas').attr('class', 'active');
        $('#oferta-form').submit(function () { return false; });
        $('#oferta-form2').submit(function () { return false; });
        $('#oferta-form3').submit(function () { return false; });
        $('#oferta-form4').submit(function () { return false; });
        $('#oferta-form7').submit(function () { return false; });
        $('#btnAceptar').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnAceptar2').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnAceptar3').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnAceptar4').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnAceptar7').click(apiPaginaOfertasDetalle.aceptar);
        $('#btnSalir').click(apiPaginaOfertasDetalle.salir);
        $('#btnSalir2').click(apiPaginaOfertasDetalle.salir);
        $('#btnSalir3').click(apiPaginaOfertasDetalle.salir);
        $('#btnSalir4').click(apiPaginaOfertasDetalle.salir);
        $('#btnSalir7').click(apiPaginaOfertasDetalle.salir);
        $('#btnCopiar').click(apiPaginaOfertasDetalle.copiar);
        $('#btnProposal').click(apiPaginaOfertasDetalle.proposalReport);
        $('#cmbTipoOfertas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoOfertas();
        $('#cmbResponsables').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarResponsables();

        $('#cmbUsuarios').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarUsuarios();

        $('#cmbPaiss').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarPaiss();

        $('#cmbEmpresas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarEmpresas();
        $("#cmbEmpresas").select2().on('change', function (e) {
            apiPaginaOfertasDetalle.cargarEmpresaPais(e.added);
        });

        $('#cmbProbabilidad').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarProbabilidad();

        $('#cmbTipoInforme').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoInforme();

        $('#cmbAreas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarAreas();
        $("#cmbAreas").select2().on('change', function (e) {
            apiPaginaOfertasDetalle.cargarServicioArea(e.added);
        });

        $('#cmbUnidadNegocio').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarUnidadNegocio();

        $('#cmbCentros').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarCentros();

        var select2Options = select2_languages[usuario.codigoIdioma];
        select2Options.maximumSelectionSize = 3;
        $('#cmbServicio').select2(select2Options);
        apiPaginaOfertasDetalle.cargarServicio();

        $('#cmbFasesOferta').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarFasesOferta();
        $("#cmbFasesOferta").select2().on('change', function (e) {
            if (e.added && e.added.id != 0) {
                var c1 = "OP-" + _contador;
                vm.numeroOferta(c1);
                vm.codigoOferta(c1);
            }
        });

        $('#cmbTiposOportunidad').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTiposOportunidad();

        $('#cmbTiposContrato').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTiposContrato();

        $('#cmbRazonPerdida').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarRazonPerdida();

        $('#cmbEstados').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarEstados();
        $("#cmbEstados").select2().on('change', function (e) {
            if (e.added && (e.added.id != anteriorEstado)) {
                vm.fechaUltimoEstado(moment(new Date()).format('DD/MM/YYYY'));
            }
        });


        $('#cmbProyectos').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarProyectos();
        $('#cmbTipoActividads').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoActividads();
        $('#cmbTipoSoportes').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarTipoSoportes();

        $('#cmbDivisas').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarDivisas();
        $('#cmbCentroEstablecidos').select2(select2_languages[usuario.codigoIdioma]);
        apiPaginaOfertasDetalle.cargarCentroEstablecidos();

        $('#txtImportePresupuesto').on('blur', apiPaginaOfertasDetalle.cambioImporte);
        $('#txtMargenContribucion').on('blur', apiPaginaOfertasDetalle.cambioMargen);
        $('#txtMargenContribucion2').on('blur', apiPaginaOfertasDetalle.cambioMargen);
        $('#txtMultiplicador').on('blur', apiPaginaOfertasDetalle.cambioMultiplicador);
        $('#txtImportePresupuestoDivisa').on('blur', apiPaginaOfertasDetalle.calcularImporteDesdeDivisa);
        $('#txtImporteInversion').on('blur', apiPaginaOfertasDetalle.calcularDivisaDesdeInversion);
        $('#txtImporteInversionDivisa').on('blur', apiPaginaOfertasDetalle.calcularInversionDesdeDivisa);
        $('#txtImporteUTE').on('blur', apiPaginaOfertasDetalle.calcularDivisaDesdeUTE);
        $('#txtImporteUTEDivisa').on('blur', apiPaginaOfertasDetalle.calcularUTEDesdeDivisa);
        $('#txtImporteAnual').on('blur', apiPaginaOfertasDetalle.calcularDivisaDesdeAnual);
        $('#txtImporteAnualDivisa').on('blur', apiPaginaOfertasDetalle.calcularAnualDesdeDivisa);
        $('#txtImportePrimerAno').on('blur', apiPaginaOfertasDetalle.calcularDivisaDesdePrimerAno);
        $('#txtImportePrimerAnoDivisa').on('blur', apiPaginaOfertasDetalle.calcularPrimerAnoDesdeDivisa);
        apiSeguidores.init();
        apiVersiones.init();
        // CKEDITOR
        CKEDITOR.replace('anex', {
            language: usuario.codigoIdioma
        });
        ofertaId = apiComunGeneral.gup("id");
        if (ofertaId == 0) {
            vm.ofertaId(0);
            vm.version(0);
            vm.fechaOferta(moment(new Date()).format("DD/MM/YYYY"));
            vm.fechaUltimoEstado(moment(new Date()).format("DD/MM/YYYY"));
            vm.fechaCreacion(moment(new Date()).format("DD/MM/YYYY"));
            apiPaginaOfertasDetalle.cargarEstados(1);

            apiPaginaOfertasDetalle.cargarPaiss(usuario.paisId);
            apiPaginaOfertasDetalle.cargarEmpresas(usuario.empresaId);
            apiPaginaOfertasDetalle.cargarAreas(usuario.areaId);
            apiPaginaOfertasDetalle.cargarUnidadNegocio(usuario.unidadNegocioId);
            apiPaginaOfertasDetalle.cargarResponsables(usuario.responsableId);
            apiPaginaOfertasDetalle.cargarUsuarios(usuario.usuarioId);
            apiPaginaOfertasDetalle.cargarDivisas(1); // Carga por defecto euro
            vm.multiplicador(1); // por defecto multiplicador 1
            vm.ubicacion(usuario.ubicacion);
            // Obtención de contadores
            var url = myconfig.apiUrl + "/api/parametros/contadores/" + usuario.empresaId + "/" + usuario.areaId;
            apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
                if (err) return;
                _contador = data.contador;
                vm.numeroOferta(data.numeroOferta);
                vm.codigoOferta(data.codigoOferta);
            });
        } else {
            apiPaginaOfertasDetalle.cargarOferta(ofertaId);
            apiSeguidores.cargarSeguidores(ofertaId);
            apiVersiones.cargarVersiones(ofertaId);
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
        _contador = data.numeroOferta.split('-')[1];
        if (data.fechaOferta) vm.fechaOferta(moment(data.fechaOferta).format(i18n.t('util.date_format')));
        if (data.fechaUltimoEstado) vm.fechaUltimoEstado(moment(data.fechaUltimoEstado).format(i18n.t('util.date_format')));
        if (data.fechaLimiteProyecto) vm.fechaLimiteProyecto(moment(data.fechaLimiteProyecto).format(i18n.t('util.date_format')));
        if (data.fechaEntrega) vm.fechaEntrega(moment(data.fechaEntrega).format(i18n.t('util.date_format')));
        if (data.fechaDivisa) vm.fechaDivisa(moment(data.fechaDivisa).format(i18n.t('util.date_format')));
        vm.numeroPedido(data.numeroPedido);
        apiPaginaOfertasDetalle.cargarTipoOfertas(data.tipoOfertaId);
        apiPaginaOfertasDetalle.cargarResponsables(data.responsableId);
        apiPaginaOfertasDetalle.cargarUsuarios(data.usuarioId);

        apiPaginaOfertasDetalle.cargarPaiss(data.paisId);
        apiPaginaOfertasDetalle.cargarEmpresas(data.empresaId);
        apiPaginaOfertasDetalle.cargarAreas(data.areaId);
        apiPaginaOfertasDetalle.cargarCentros(data.centroId);

        apiPaginaOfertasDetalle.cargarEstados(data.estadoId);
        apiPaginaOfertasDetalle.cargarProyectos(data.proyectoId);
        apiPaginaOfertasDetalle.cargarTipoSoportes(data.tipoSoporteId);
        apiPaginaOfertasDetalle.cargarTipoActividads(data.tipoActividadId);

        apiPaginaOfertasDetalle.cargarDivisas(data.divisaId);
        apiPaginaOfertasDetalle.cargarCentroEstablecidos(data.centroEstablecidoId);
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
        vm.numeroLicitacion(data.numeroLicitacion);
        vm.codigoGdes(data.codigoGdes);
        vm.importeInversionDivisa(data.importeInversionDivisa);
        vm.nombreCorto(data.nombreCorto);
        vm.cliente(data.cliente);
        vm.version(data.version);
        vm.multiplicador(data.multiplicador);
        anteriorMultiplicador = vm.multiplicador();
        anteriorEstado = data.estadoId;
        // vrs 2.0.1
        vm.ubicacion(data.ubicacion);
        vm.paisUbicacion(data.paisUbicacion);
        apiPaginaOfertasDetalle.cargarUnidadNegocio(data.unidadNegocioId);
        apiPaginaOfertasDetalle.cargarServicio(data.servicioId, data.servicioId2, data.servicioId3);
        if (data.fechaCreacion) vm.fechaCreacion(moment(data.fechaCreacion).format(i18n.t('util.date_format')));
        if (data.fechaAdjudicacion) vm.fechaAdjudicacion(moment(data.fechaAdjudicacion).format(i18n.t('util.date_format')));
        if (data.fechaInicioContrato) vm.fechaInicioContrato(moment(data.fechaInicioContrato).format(i18n.t('util.date_format')));
        if (data.fechaFinContrato) vm.fechaFinContrato(moment(data.fechaFinContrato).format(i18n.t('util.date_format')));
        vm.duracion(data.duracion);
        apiPaginaOfertasDetalle.cargarProbabilidad(data.probabilidad);
        vm.notasPlanning(data.notasPlanning);
        apiPaginaOfertasDetalle.cargarFasesOferta(data.faseOfertaId);
        apiPaginaOfertasDetalle.cargarTiposOportunidad(data.tipoOportunidadId);
        apiPaginaOfertasDetalle.cargarTiposContrato(data.tipoContratoId);
        apiPaginaOfertasDetalle.cargarRazonPerdida(data.razonPerdidaId);
        vm.notasEstado(data.notasEstado);
        vm.codigoOferta(data.codigoOferta);
        vm.subrogacionSN(data.subrogacionSN);
        vm.subrogacionTXT(data.subrogacionTXT);
        vm.subrogacionNum(data.subrogacionNum);
        vm.uteSN(data.uteSN);
        vm.uteTXT(data.uteTXT);
        vm.gdesPor(data.gdesPor);
        vm.subcontrataSN(data.subcontrataSN);
        vm.subcontrataTXT(data.subcontrataTXT);
        vm.importeUTE(data.importeUTE);
        vm.importeUTEDivisa(data.importeUTEDivisa);
        vm.importeContribucionDivisa(data.importeContribucionDivisa);
        vm.importeAnual(data.importeAnual);
        vm.importeAnualDivisa(data.importeAnualDivisa);
        vm.importePrimerAno(data.importePrimerAno);
        vm.importePrimerAnoDivisa(data.importePrimerAnoDivisa);
        vm.descripcionInversion(data.descripcionInversion);
        vm.condicionesPago(data.condicionesPago);
        vm.consideracionesEconomicas(data.consideracionesEconomicas);
        vm.alcance(data.alcance);
        vm.requerimientos(data.requerimientos);
        vm.puntosRelevantes(data.puntosRelevantes);
        vm.condicionesEstandarSN(data.condicionesEstandarSN);
        vm.condicionesEstandarTXT(data.condicionesEstandarTXT);
        vm.garantiasEspecialesSN(data.garantiasEspecialesSN);
        vm.garantiasEspecialesTXT(data.garantiasEspecialesTXT);
        vm.segurosSN(data.segurosSN);
        vm.segurosTXT(data.segurosTXT);
        vm.penalizaciones(data.penalizaciones);
        vm.riesgos(data.riesgos);
        vm.proveedorActual(data.proveedorActual);
        vm.competidores(data.competidores);
        vm.principalCompetidor(data.principalCompetidor);
        vm.criteriosEvaluacion(data.criteriosEvaluacion);
        vm.datosComerciales(data.datosComerciales);
        vm.diferencialGDES(data.diferencialGDES);
        vm.estrategiaGDES(data.estrategiaGDES);
        vm.sinergias(data.sinergias);
        // vm.importeTotal(data.importeTotal);
        // vm.importeTotalDivisa(data.importeTotalDivisa);
        vm.sDivisa(data.divisaId);
        apiPaginaOfertasDetalle.cargarAntiguosValores();

        vm.actividadesRealizadas(data.actividadesRealizadas);
        vm.actividadesPlanificadas(data.actividadesPlanificadas);
        vm.situacionProyecto(data.situacionProyecto);
        vm.importeReclamacion1(data.importeReclamacion1);
        vm.importeReclamacion2(data.importeReclamacion2);
        vm.importeReclamacion3(data.importeReclamacion3);
        vm.importeReclamacion4(data.importeReclamacion4);
        vm.razonReclamacion1(data.razonReclamacion1);
        vm.razonReclamacion2(data.razonReclamacion2);
        vm.razonReclamacion3(data.razonReclamacion3);
        vm.razonReclamacion4(data.razonReclamacion4);
        vm.documentosEspeciales(data.documentosEspeciales);
        vm.anexos(data.anexos);
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
        self.numeroLicitacion = ko.observable();
        self.codigoGdes = ko.observable();
        self.importeInversionDivisa = ko.observable();
        self.cliente = ko.observable();
        self.multiplicador = ko.observable();
        self.fechaDivisa = ko.observable();

        self.optionsTipoOfertas = ko.observableArray([]);
        self.selectedTipoOfertas = ko.observableArray([]);
        self.sTipoOferta = ko.observable();
        self.ofertaSingular = ko.observable();
        self.nombreCorto = ko.observable();
        self.version = ko.observable();

        self.optionsResponsables = ko.observableArray([]);
        self.selectedResponsables = ko.observableArray([]);
        self.sResponsable = ko.observable();

        self.optionsUsuarios = ko.observableArray([]);
        self.selectedUsuarios = ko.observableArray([]);
        self.sUsuario = ko.observable();

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

        self.optionsDivisas = ko.observableArray([]);
        self.selectedDivisas = ko.observableArray([]);
        self.sDivisa = ko.observable();

        self.optionsCentroEstablecidos = ko.observableArray([]);
        self.selectedCentroEstablecidos = ko.observableArray([]);
        self.sCentroEstablecido = ko.observable();
        // vrs 2.0.1
        self.ubicacion = ko.observable();
        self.paisUbicacion = ko.observable();

        self.optionsUnidadNegocio = ko.observableArray([]);
        self.selectedUnidadNegocio = ko.observableArray([]);
        self.sUnidadNegocio = ko.observable();

        self.optionsServicio = ko.observableArray([]);
        self.selectedServicio = ko.observableArray([]);
        self.sServicio = ko.observable();

        self.fechaCreacion = ko.observable();
        self.fechaAdjudicacion = ko.observable();
        self.fechaInicioContrato = ko.observable();
        self.fechaFinContrato = ko.observable();
        self.duracion = ko.observable();
        self.probabilidad = ko.observable();
        self.notasPlanning = ko.observable();

        self.optionsFasesOferta = ko.observableArray([]);
        self.selectedFasesOferta = ko.observableArray([]);
        self.sFasesOferta = ko.observable();

        self.optionsTiposOportunidad = ko.observableArray([]);
        self.selectedTiposOportunidad = ko.observableArray([]);
        self.sTiposOportunidad = ko.observable();

        self.optionsTiposContrato = ko.observableArray([]);
        self.selectedTiposContrato = ko.observableArray([]);
        self.sTiposContrato = ko.observable();

        self.optionsRazonPerdida = ko.observableArray([]);
        self.selectedRazonPerdida = ko.observableArray([]);
        self.sRazonPerdida = ko.observable();

        self.optionsTipoInforme = ko.observableArray([]);
        self.selectedTipoInforme = ko.observableArray([]);
        self.sTipoInforme = ko.observable();


        self.notasEstado = ko.observable();
        self.codigoOferta = ko.observable();
        self.subrogacionSN = ko.observable();
        self.subrogacionTXT = ko.observable();
        self.subrogacionNum = ko.observable();
        self.uteSN = ko.observable();
        self.uteTXT = ko.observable();
        self.gdesPor = ko.observable()
        self.subcontrataSN = ko.observable();
        self.subcontrataTXT = ko.observable();

        self.importeUTE = ko.observable();
        self.importeUTEDivisa = ko.observable();
        self.importeContribucionDivisa = ko.observable();
        self.importeAnual = ko.observable();
        self.importeAnualDivisa = ko.observable();
        self.importePrimerAno = ko.observable();
        self.importePrimerAnoDivisa = ko.observable();
        self.descripcionInversion = ko.observable();
        self.condicionesPago = ko.observable();
        self.consideracionesEconomicas = ko.observable();
        self.alcance = ko.observable();
        self.requerimientos = ko.observable();
        self.puntosRelevantes = ko.observable();
        self.condicionesEstandarSN = ko.observable();
        self.condicionesEstandarTXT = ko.observable();
        self.garantiasEspecialesSN = ko.observable();
        self.garantiasEspecialesTXT = ko.observable();
        self.segurosSN = ko.observable();
        self.segurosTXT = ko.observable();
        self.penalizaciones = ko.observable();
        self.riesgos = ko.observable();
        self.proveedorActual = ko.observable();
        self.competidores = ko.observable();
        self.principalCompetidor = ko.observable();
        self.criteriosEvaluacion = ko.observable();
        self.datosComerciales = ko.observable();
        self.diferencialGDES = ko.observable();
        self.estrategiaGDES = ko.observable();
        self.sinergias = ko.observable();
        self.importeTotal = ko.computed(function () {
            return (self.importePresupuesto() * 1) + (self.importeUTE() * 1);
        })
        self.importeTotalDivisa = ko.computed(function () {
            return (self.importePresupuestoDivisa() * 1) + (self.importeUTEDivisa() * 1);
        });

        self.optionsProbabilidad = ko.observableArray([]);
        self.selectedProbabilidad = ko.observableArray([]);
        self.sProbabilidad = ko.observable();

        self.optionsUsuarios = ko.observableArray([]);
        self.selectedUsuarios = ko.observableArray([]);
        self.sUsuario = ko.observable();

        self.actividadesRealizadas = ko.observable();
        self.actividadesPlanificadas = ko.observable();
        self.situacionProyecto = ko.observable();
        self.importeReclamacion1 = ko.observable();
        self.importeReclamacion2 = ko.observable();
        self.importeReclamacion3 = ko.observable();
        self.importeReclamacion4 = ko.observable();
        self.razonReclamacion1 = ko.observable();
        self.razonReclamacion2 = ko.observable();
        self.razonReclamacion3 = ko.observable();
        self.razonReclamacion4 = ko.observable();
        self.documentosEspeciales = ko.observable();
        self.anexos = ko.observable();
    },
    aceptar: function () {
        // if (!apiPaginaOfertasDetalle.datosOk()) return;
        if (!apiPaginaOfertasDetalle.datosOk1()) return;
        if (!apiPaginaOfertasDetalle.datosOk2()) return;
        var data = {
            ofertaId: vm.ofertaId(),
            numeroOferta: vm.numeroOferta(),
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
            importeContribucion: vm.importeContribucion(),
            numeroLicitacion: vm.numeroLicitacion(),
            codigoGdes: vm.codigoGdes(),
            importeInversionDivisa: vm.importeInversionDivisa(),
            divisaId: vm.sDivisa(),
            centroEstablecidoId: vm.sCentroEstablecido(),
            nombreCorto: vm.nombreCorto(),
            cliente: vm.cliente(),
            version: vm.version(),
            multiplicador: vm.multiplicador(),
            ubicacion: vm.ubicacion(),
            paisUbicacion: vm.paisUbicacion(),
            unidadNegocioId: vm.sUnidadNegocio(),
            duracion: vm.duracion(),
            probabilidad: vm.sProbabilidad(),
            notasPlanning: vm.notasPlanning(),
            faseOfertaId: vm.sFasesOferta(),
            tipoOportunidadId: vm.sTiposOportunidad(),
            tipoContratoId: vm.sTiposContrato(),
            razonPerdidaId: vm.sRazonPerdida(),
            notasEstado: vm.notasEstado(),
            codigoOferta: vm.codigoOferta(),
            subrogacionSN: vm.subrogacionSN(),
            subrogacionTXT: vm.subrogacionTXT(),
            subrogacionNum: vm.subrogacionNum(),
            uteSN: vm.uteSN(),
            uteTXT: vm.uteTXT(),
            gdesPor: vm.gdesPor(),
            subcontrataSN: vm.subcontrataSN(),
            subcontrataTXT: vm.subcontrataTXT(),
            importeUTE: vm.importeUTE(),
            importeUTEDivisa: vm.importeUTEDivisa(),
            importeContribucionDivisa: vm.importeContribucionDivisa(),
            importeAnual: vm.importeAnual(),
            importeAnualDivisa: vm.importeAnualDivisa(),
            importePrimerAno: vm.importePrimerAno(),
            importePrimerAnoDivisa: vm.importePrimerAnoDivisa(),
            descripcionInversion: vm.descripcionInversion(),
            condicionesPago: vm.condicionesPago(),
            consideracionesEconomicas: vm.consideracionesEconomicas(),
            alcance: vm.alcance(),
            requerimientos: vm.requerimientos(),
            puntosRelevantes: vm.puntosRelevantes(),
            condicionesEstandarSN: vm.condicionesEstandarSN(),
            condicionesEstandarTXT: vm.condicionesEstandarTXT(),
            garantiasEspecialesSN: vm.garantiasEspecialesSN(),
            garantiasEspecialesTXT: vm.garantiasEspecialesTXT(),
            segurosSN: vm.segurosSN(),
            segurosTXT: vm.segurosTXT(),
            penalizaciones: vm.penalizaciones(),
            riesgos: vm.riesgos(),
            proveedorActual: vm.proveedorActual(),
            competidores: vm.competidores(),
            principalCompetidor: vm.principalCompetidor(),
            criteriosEvaluacion: vm.criteriosEvaluacion(),
            datosComerciales: vm.datosComerciales(),
            diferencialGDES: vm.diferencialGDES(),
            estrategiaGDES: vm.estrategiaGDES(),
            sinergias: vm.sinergias(),
            importeTotal: vm.importeTotal(),
            importeTotalDivisa: vm.importeTotalDivisa(),
            usuarioId: vm.sUsuario(),
            actividadesRealizadas: vm.actividadesRealizadas(),
            actividadesPlanificadas: vm.actividadesPlanificadas(),
            situacionProyecto: vm.situacionProyecto(),
            importeReclamacion1: vm.importeReclamacion1(),
            importeReclamacion2: vm.importeReclamacion2(),
            importeReclamacion3: vm.importeReclamacion3(),
            importeReclamacion4: vm.importeReclamacion4(),
            razonReclamacion1: vm.razonReclamacion1(),
            razonReclamacion2: vm.razonReclamacion2(),
            razonReclamacion3: vm.razonReclamacion3(),
            razonReclamacion4: vm.razonReclamacion3(),
            documentosEspeciales: vm.documentosEspeciales(),
            anexos: CKEDITOR.instances.txtAnexos.getData()
        };
        if (vm.fechaOferta()) data.fechaOferta = moment(vm.fechaOferta(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaUltimoEstado()) data.fechaUltimoEstado = moment(vm.fechaUltimoEstado(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaLimiteProyecto()) data.fechaLimiteProyecto = moment(vm.fechaLimiteProyecto(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaEntrega()) data.fechaEntrega = moment(vm.fechaEntrega(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaDivisa()) data.fechaDivisa = moment(vm.fechaDivisa(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaCreacion()) data.fechaCreacion = moment(vm.fechaCreacion(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaAdjudicacion()) data.fechaAdjudicacion = moment(vm.fechaAdjudicacion(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaInicioContrato()) data.fechaInicioContrato = moment(vm.fechaInicioContrato(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.fechaFinContrato()) data.fechaFinContrato = moment(vm.fechaFinContrato(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
        if (vm.selectedServicio().length > 0) {
            data.servicioId = vm.selectedServicio()[0];
            if (vm.selectedServicio()[1]) data.servicioId2 = vm.selectedServicio()[1]; else data.servicioId2 = null;
            if (vm.selectedServicio()[2]) data.servicioId3 = vm.selectedServicio()[2]; else data.servicioId3 = null;
        } else {
            data.servicioId = null;
            data.servicioId2 = null;
            data.servicioId3 = null;
        }
        if (vm.sRazonPerdida() == 0) data.razonPerdidaId = null;
        var verb = "PUT";
        if (vm.ofertaId() == 0) {
            verb = "POST";
            data.version = 0;
            apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
                if (err) return;
                if (vm.sEstado() != anteriorEstado) {
                    var data = {
                        asunto: "Cambio estado OFERTA: " + vm.nombreCorto(),
                        texto: "La oferta cambió el " + vm.fechaUltimoEstado() + " a " + $('#cmbEstados').select2('data').text
                    };
                    apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/correoElectronico", data, function (err) {
                        return;
                    });
                }
                apiPaginaOfertasDetalle.salir();
            });
        } else {
            var verb = "PUT";
            if (apiPaginaOfertasDetalle.comprobarCambioDeImportes()) {
                // tratar el cambio de importes
                apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("versiones.pregunta"), function () {
                    // SI
                    data.version += 1
                    apiPaginaOfertasDetalle.guardarVersion(data.version - 1);
                    apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
                        if (err) return;
                        if (vm.sEstado() != anteriorEstado) {
                            var data = {
                                asunto: "Cambio estado OFERTA: " + vm.nombreCorto(),
                                texto: "La oferta cambió el " + vm.fechaUltimoEstado() + " a " + $('#cmbEstados').select2('data').text
                            };
                            apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/correoElectronico", data, function (err) {
                                return;
                            });
                        }
                        apiPaginaOfertasDetalle.salir();
                    });
                }, function () {
                    // NO
                    apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
                        if (err) return;
                        if (vm.sEstado() != anteriorEstado) {
                            var data = {
                                asunto: "Cambio estado OFERTA: " + vm.nombreCorto(),
                                texto: "La oferta cambió el " + vm.fechaUltimoEstado() + " a " + $('#cmbEstados').select2('data').text
                            };
                            apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/correoElectronico", data, function (err) {
                                return;
                            });
                        }
                        apiPaginaOfertasDetalle.salir();
                    });
                }, i18n.t("versiones.aceptar"), i18n.t("versiones.cancelar"))
            } else {
                apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
                    if (err) return;
                    if (vm.sEstado() != anteriorEstado) {
                        var data = {
                            asunto: "Cambio estado OFERTA: " + vm.nombreCorto(),
                            texto: "La oferta cambió el " + vm.fechaUltimoEstado() + " a " + $('#cmbEstados').select2('data').text
                        };
                        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/correoElectronico", data, function (err) {
                            return;
                        });
                    }
                    apiPaginaOfertasDetalle.salir();
                });
            }
        }
    },
    datosOk: function () {
        var descript = apiPaginaOfertasDetalle.cargarDescriptoresError();
        var lerrors = i18n.t('lerrors1') + "<br>";
        $('#oferta-form').validate({
            rules: {
                cmbFasesOferta: { required: true },
                cmbPaiss: { required: true },
                cmbEmpresas: { required: true },
                cmbAreas: { required: true },
                txtUbicacion: { required: true },
                txtCliente: { required: true },
                txtNombreCorto: { required: true },
                cmbEstados: { required: true },
                txtFechaAdjudicacion: { required: true },
                txtFechaInicioContrato: { required: true },
                txtDuracion: { required: true },
                cmbRazonPerdida: { required: true },
                cmbProbabilidad: { required: true }
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('aswselect2')) {
                    error.insertAfter(element);  // select2
                } else {
                    error.insertAfter(element.parent());               // default
                }
            },
            invalidHandler: function (e, validator) {
                for (var i in validator.errorMap) {
                    console.log(i, ":", validator.errorMap[i]);
                    lerrors += descript[i] + "<br>";
                }
            }
        });
        var ofe1 = $('#oferta-form').valid();
        $('#oferta-form2').validate({
            rules: {
                txtImportePresupuesto: { required: true, number: true },
                txtMultiplicador: { number: true },
                txtImportePresupuestoDivisa: { number: true },
                txtMargenContribucion: { required: true, number: true },
                txtMargenContribucion2: { number: true },
                txtImporteContribucion: { number: true },
                txtImporteInversion: { required: true, number: true },
                txtImporteInversionDivisa: { number: true },
                txtImporteRetorno: { number: true },
                txtImporteUTE: { number: true },
                txtImporteUTEDivisa: { number: true },
                txtImporteAnual: { number: true },
                txtImporteAnualDivisa: { number: true },
                txtImportePrimerAno: { required: true, number: true },
                txtImportePrimerAnoDivisa: { number: true }
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('aswselect2')) {
                    error.insertAfter(element);  // select2
                } else {
                    error.insertAfter(element.parent());               // default
                }
            },
            invalidHandler: function (e, validator) {
                for (var i in validator.errorMap) {
                    console.log(i, ":", validator.errorMap[i]);
                    lerrors += descript[i] + "<br>";
                }
            }
        });
        var ofe2 = $('#oferta-form2').valid();
        var validos = ofe1 && ofe2;
        if (!validos) {
            lerrors += i18n.t('lerrors2');
            apiComunNotificaciones.mensajeAdvertencia(lerrors);
        }
        return validos;
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
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/usuarios", null, function (err, data) {
            if (err) return;
            var options = [{ usuarioId: 0, nombre: " " }].concat(data);
            vm.optionsResponsables(options);
            $("#cmbResponsables").val([id]).trigger('change');
        });
    },
    cargarUsuarios: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/usuarios", null, function (err, data) {
            if (err) return;
            var options = [{ usuarioId: 0, nombre: " " }].concat(data);
            vm.optionsUsuarios(options);
            $("#cmbUsuarios").val([id]).trigger('change');
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
        var url = myconfig.apiUrl + "/api/areas";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/areas/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
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
        var url = myconfig.apiUrl + "/api/estados";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/estados/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
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
    cargarDivisas: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/divisas", null, function (err, data) {
            if (err) return;
            var options = [{ divisaId: 0, nombre: " " }].concat(data);
            vm.optionsDivisas(options);
            $("#cmbDivisas").val([id]).trigger('change');
        });
    },
    cargarCentroEstablecidos: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/centrosEstablecidos", null, function (err, data) {
            if (err) return;
            var options = [{ centroEstablecidoId: 0, nombre: " " }].concat(data);
            vm.optionsCentroEstablecidos(options);
            $("#cmbCentroEstablecidos").val([id]).trigger('change');
        });
    },
    cargarUnidadNegocio: function (id) {
        var url = myconfig.apiUrl + "/api/unidades-negocio"
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/unidades-negocio/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ unidadNegocioId: 0, nombre: " " }].concat(data);
            vm.optionsUnidadNegocio(options);
            $("#cmbUnidadNegocio").val([id]).trigger('change');
        });
    },
    cargarServicio: function (id, id2, id3) {
        var url = myconfig.apiUrl + "/api/servicios";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/servicios/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ servicioId: 0, nombre: " " }].concat(data);
            vm.optionsServicio(options);
            $("#cmbServicio").val([id, id2, id3]).trigger('change');
        });
    },
    cargarFasesOferta: function (id) {
        var url = myconfig.apiUrl + "/api/fases-oferta";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/fases-oferta/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ faseOfertaId: 0, nombre: " " }].concat(data);
            vm.optionsFasesOferta(options);
            $("#cmbFasesOferta").val([id]).trigger('change');
        });
    },
    cargarProbabilidad: function (id) {
        var options = [
            { id: 20, nombre: "20%" },
            { id: 50, nombre: "50%" },
            { id: 80, nombre: "80%" }
        ];
        vm.optionsProbabilidad(options);
        $("#cmbProbabilidad").val([id]).trigger('change');

    },
    cargarTipoInforme: function (id) {
        var options = [
            { id: 1, nombre: "PPR Short" },
            { id: 2, nombre: "PPR Complete" },
            { id: 3, nombre: "PPR Annex" }
        ];
        vm.optionsTipoInforme(options);
        $("#cmbTipoInforme").val(1).trigger('change');

    },
    cargarTiposOportunidad: function (id) {
        var url = myconfig.apiUrl + "/api/tipos-oportunidad";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/tipos-oportunidad/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ tipoOportunidadId: 0, nombre: " " }].concat(data);
            vm.optionsTiposOportunidad(options);
            $("#cmbTiposOportunidad").val([id]).trigger('change');
        });
    },
    cargarTiposContrato: function (id) {
        var url = myconfig.apiUrl + "/api/tipos-contrato";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/tipos-contrato/multi/" + usuario.codigoIdioma;
        }
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ tipoContratoId: 0, nombre: " " }].concat(data);
            vm.optionsTiposContrato(options);
            $("#cmbTiposContrato").val([id]).trigger('change');
        });
    },
    cargarRazonPerdida: function (id) {
        var url = myconfig.apiUrl + "/api/razon-perdida";
        if (usuario.codigoIdioma != "es") {
            url = myconfig.apiUrl + "/api/razon-perdida/multi/" + usuario.codigoIdioma;
        }

        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            var options = [{ razonPerdidaId: 0, nombre: " " }].concat(data);
            vm.optionsRazonPerdida(options);
            $("#cmbRazonPerdida").val([id]).trigger('change');
        });
    },
    cargarServicioArea: function (data) {
        if (!data) return;
        var id = data.id;
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/servicios/area/" + id, null, function (err, data) {
            if (err) return;
            var options = [{ servicioId: 0, nombre: " " }].concat(data);
            vm.optionsServicio(options);
            $("#cmbServicio").val([id]).trigger('change');
        });
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/areas/" + id, null, function (err, data) {
            if (err) return;
            apiPaginaOfertasDetalle.cargarUnidadNegocio(data.unidadNegocioId);
        });
    },
    cargarEmpresaPais: function (data) {
        if (!data) return;
        var id = data.id;
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/paises/empresa/" + id, null, function (err, data) {
            if (err) return;
            if (data.length == 0) return;
            apiPaginaOfertasDetalle.cargarPaiss(data[0].paisId);
        });
    },
    lanzarMensajeAyuda: function (mensaje) {
        apiComunNotificaciones.mensajeAyuda(mensaje);
    },
    controDeCamposEditables: function () {
        if (!usuario.esAdministrador) {
            $("#cmbTipoSoportes").attr('disabled', 'disabled');
            $("#txtTiempoEmpleado").attr('disabled', 'disabled');
            $("#txtAutorizaciones").attr('disabled', 'disabled');
        }
    },
    cambioPais: function () {
        apiPaginaOfertasDetalle.textoAutorizacion();
    },
    cambioTipoOferta: function () {
        apiPaginaOfertasDetalle.textoAutorizacion();
    },
    cambioImporte: function () {
        apiPaginaOfertasDetalle.calcularDivisaDesdeImporte();
        apiPaginaOfertasDetalle.textoAutorizacion();
    },
    textoAutorizacion: function () {
        var text = i18n.t('ofertas.autorizacionX');
        var tipoAutorizacion = apiPaginaOfertasDetalle.calculoAutorizacion();
        if (tipoAutorizacion != null) {
            text = i18n.t('ofertas.autorizacion' + tipoAutorizacion);
        }
        vm.autorizaciones(text);
    },
    calculoAutorizacion: function () {
        if (!vm.importePresupuesto() || vm.importePresupuesto() == 0) return null;
        var tAut = 0;
        if (vm.importePresupuesto() > 150000) {
            tAut = 1;
        }
        if (vm.importePresupuesto() > 300000) {
            tAut = 2;
        }
        if (vm.importePresupuesto() > 1000000) {
            tAut = 3;
        }
        if (vm.ofertaSingular()) {
            tAut = 3;
        }
        return tAut;
    },
    cambioMargen: function () {
        var importeContribucion = (vm.importePresupuesto() * vm.margenContribucion()) / 100;
        importeContribucion = apiComunGeneral.redondeo2Decimales(importeContribucion);
        vm.importeContribucion(importeContribucion);
        apiPaginaOfertasDetalle.calcularDivisaDesdeContribucion();
    },
    calcularDivisaDesdeContribucion: function () {
        if (vm.importeContribucion() && vm.importeContribucion() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importeContribucion() * vm.multiplicador();
                vm.importeContribucionDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
            }
        }
    },
    calcularDivisaDesdeImporte: function () {
        if (vm.importePresupuesto() && vm.importePresupuesto() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importePresupuesto() * vm.multiplicador();
                vm.importePresupuestoDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
                apiPaginaOfertasDetalle.actualizarFechaDivisa();
            }
        }
    },
    calcularDivisaDesdeInversion: function () {
        if (vm.importeInversion() && vm.importeInversion() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importeInversion() * vm.multiplicador();
                vm.importeInversionDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
                apiPaginaOfertasDetalle.actualizarFechaDivisa();
            }
        }
    },
    calcularDivisaDesdeUTE: function () {
        if (vm.importeUTE() && vm.importeUTE() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importeUTE() * vm.multiplicador();
                vm.importeUTEDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
                apiPaginaOfertasDetalle.actualizarFechaDivisa();
            }
        }
    },
    calcularDivisaDesdeAnual: function () {
        if (vm.importeAnual() && vm.importeAnual() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importeAnual() * vm.multiplicador();
                vm.importeAnualDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
                apiPaginaOfertasDetalle.actualizarFechaDivisa();
            }
        }
    },
    calcularDivisaDesdePrimerAno: function () {
        if (vm.importePrimerAno() && vm.importePrimerAno() != 0) {
            if (vm.multiplicador()) {
                var importeDivisa = vm.importePrimerAno() * vm.multiplicador();
                vm.importePrimerAnoDivisa(apiComunGeneral.redondeo2Decimales(importeDivisa));
            }
        }
    },
    calcularImporteDesdeDivisa: function () {
        if (vm.multiplicador() && vm.importePresupuestoDivisa()) {
            var importe = vm.importePresupuestoDivisa() / vm.multiplicador();
            vm.importePresupuesto(apiComunGeneral.redondeo2Decimales(importe));
            apiPaginaOfertasDetalle.textoAutorizacion();
            apiPaginaOfertasDetalle.actualizarFechaDivisa();
        }
    },
    calcularUTEDesdeDivisa: function () {
        if (vm.multiplicador() && vm.importeUTEDivisa()) {
            var importe = vm.importeUTEDivisa() / vm.multiplicador();
            vm.importeUTE(apiComunGeneral.redondeo2Decimales(importe));
        }
    },
    calcularAnualDesdeDivisa: function () {
        if (vm.multiplicador() && vm.importeAnualDivisa()) {
            var importe = vm.importeAnualDivisa() / vm.multiplicador();
            vm.importeAnual(apiComunGeneral.redondeo2Decimales(importe));
        }
    },
    calcularPrimerAnoDesdeDivisa: function () {
        if (vm.multiplicador() && vm.importePrimerAnoDivisa()) {
            var importe = vm.importePrimerAnoDivisa() / vm.multiplicador();
            vm.importePrimerAno(apiComunGeneral.redondeo2Decimales(importe));
        }
    },
    calcularInversionDesdeDivisa: function () {
        if (vm.importeInversionDivisa() && vm.importeInversionDivisa() != 0) {
            if (vm.multiplicador()) {
                var importe = vm.importeInversionDivisa() / vm.multiplicador();
                vm.importeInversion(apiComunGeneral.redondeo2Decimales(importe));
                apiPaginaOfertasDetalle.actualizarFechaDivisa();
            }
        }
    },
    actualizarFechaDivisa: function () {
        if (anteriorMultiplicador != vm.multiplicador()) vm.fechaDivisa(moment(new Date()).format('DD/MM/YYYY'));
    },
    cambioMultiplicador: function () {
        apiPaginaOfertasDetalle.calcularDivisaDesdeImporte();
        apiPaginaOfertasDetalle.calcularDivisaDesdeInversion();
        apiPaginaOfertasDetalle.calcularDivisaDesdeUTE();
        apiPaginaOfertasDetalle.calcularDivisaDesdeContribucion();
        apiPaginaOfertasDetalle.calcularDivisaDesdeAnual();
        apiPaginaOfertasDetalle.calcularDivisaDesdePrimerAno();
    },
    cargarAntiguosValores: function () {
        _importePresupuesto = vm.importePresupuesto();
        _importePresupuestoDivisa = vm.importePresupuestoDivisa();
        _importeUTE = vm.importeUTE();
        _importeUTEDivisa = vm.importeUTEDivisa();
        _importeTotal = vm.importeTotal();
        _importeTotalDivisa = vm.importeTotalDivisa();
        _margenContribucion = vm.margenContribucion();
        _importeContribucion = vm.importeContribucion();
        _importeContribucionDivisa = vm.importeContribucionDivisa();
        _importeAnual = vm.importeAnual();
        _importeAnualDivisa = vm.importeAnualDivisa();
        _importePrimerAno = vm.importePrimerAno();
        _importePrimerAnoDivisa = vm.importePrimerAnoDivisa();
        _importeInversion = vm.importeInversion();
        _importeInversionDivisa = vm.importeInversionDivisa();
        _divisaId = vm.sDivisa();
        _multiplicador = vm.multiplicador();
        if (vm.fechaDivisa()) _fechaDivisa = moment(vm.fechaDivisa(), 'DD/MM/YYYY').format('YYYY-MM-DD');
    },
    comprobarCambioDeImportes: function () {
        this.cambioImporte = false;
        if (_importePresupuesto != vm.importePresupuesto() ||
            _importeUTE != vm.importeUTE() ||
            _importeTotal != vm.importeTotal() ||
            _margenContribucion != vm.margenContribucion() ||
            _importeContribucion != vm.importeContribucion() ||
            _importeAnual != vm.importeAnual() ||
            _importePrimerAno != vm.importePrimerAno() ||
            _importeInversion != vm.importeInversion() ||
            _multiplicador != vm.multiplicador()) {
            this.cambioImporte = true;
        }
        return this.cambioImporte;
    },
    guardarVersion: function (version) {
        var data = {
            ofertaId: vm.ofertaId(),
            fechaCambio: moment(new Date()).format('YYYY-MM-DD'),
            usuarioId: usuario.usuarioId,
            importePresupuesto: _importePresupuesto,
            importePresupuestoDivisa: _importePresupuestoDivisa,
            importeUTE: _importeUTE,
            importeUTEDivisa: _importeUTEDivisa,
            importeTotal: _importeTotal,
            importeTotalDivisa: _importeTotalDivisa,
            margenContribucion: _margenContribucion,
            importeContribucion: _importeContribucion,
            importeContribucionDivisa: _importeContribucionDivisa,
            importeAnual: _importeAnual,
            importeAnualDivisa: _importeAnualDivisa,
            importePrimerAno: _importePrimerAno,
            importePrimerAnoDivisa: _importePrimerAnoDivisa,
            importeInversion: _importeInversion,
            importeInversionDivisa: _importeInversionDivisa,
            divisaId: _divisaId,
            multiplicador: _multiplicador,
            numVersion: version
        };
        if (_fechaDivisa) data.fechaDivisa = _fechaDivisa;
        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/versiones", data, function (err, data) {
            if (err) return;
        });
    },
    cargarDescriptoresError: function () {
        var descript = {
            cmbFasesOferta: i18n.t('ofertas.fasesOferta'),
            cmbPaiss: i18n.t('ofertas.pais'),
            cmbEmpresas: i18n.t('ofertas.empresa'),
            cmbAreas: i18n.t('ofertas.area'),
            txtUbicacion: i18n.t('ofertas.ubicacion'),
            txtCliente: i18n.t('ofertas.cliente'),
            txtNombreCorto: i18n.t('ofertas.nombreCorto'),
            cmbEstados: i18n.t('ofertas.estado'),
            txtFechaAdjudicacion: i18n.t('ofertas.fechaAdjudicacion'),
            txtFechaInicioContrato: i18n.t('ofertas.fechaInicioContrato'),
            txtDuracion: i18n.t('ofertas.duracion'),
            cmbRazonPerdida: i18n.t('ofertas.razonPerdida'),
            cmbProbabilidad: i18n.t('ofertas.probabilidad'),
            txtImportePresupuesto: i18n.t('ofertas.importePresupuesto'),
            txtDescripcion: i18n.t('ofertas.descripcion'),
            txtMultiplicador: i18n.t('ofertas.multiplicador'),
            txtImportePresupuestoDivisa: i18n.t('ofertas.importePresupuestoDivisa'),
            txtMargenContribucion: i18n.t('ofertas.margenContribucion'),
            txtMargenContribucion2: i18n.t('ofertas.margenContribucion2'),
            txtImporteContribucion: i18n.t('ofertas.importeContribucion'),
            txtImporteInversion: i18n.t('ofertas.importeInversion'),
            txtImporteImversionDivisa: i18n.t('ofertas.importeInversionDivisa'),
            txtImporteRetorno: i18n.t('ofertas.importeRetorno'),
            txtImporteUTE: i18n.t('ofertas.importeUTE'),
            txtImporteUTEDivisa: i18n.t('ofertas.importeUTEDivisa'),
            txtImporteAnual: i18n.t('ofertas.importeAnual'),
            txtImporteAnualDivisa: i18n.t('ofertas.importeAnualDivisa'),
            txtImportePrimerAno: i18n.t('ofertas.importePrimerAno'),
            txtImportePrimerAnoDivisa: i18n.t('ofertas.importePrimerAnoDivisa')
        }
        return descript;
    },
    datosOk1: function () {
        var descript = apiPaginaOfertasDetalle.cargarDescriptoresError();
        var lerrors = i18n.t('lerrors1') + "<br>";
        var mRules = {
            cmbFasesOferta: { required: true },
            cmbPaiss: { required: true },
            cmbEmpresas: { required: true },
            cmbAreas: { required: true },
            txtUbicacion: { required: true },
            txtCliente: { required: true },
            txtNombreCorto: { required: true },
            cmbEstados: { required: true },
            txtFechaAdjudicacion: { required: true },
            txtFechaInicioContrato: { required: true },
            txtDuracion: { required: true },
            cmbProbabilidad: { required: true }
        };
        if (vm.sEstado() == 5) mRules.cmbRazonPerdida = { required: true };
        var validator = $('#oferta-form').validate({
            rules: mRules,
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('aswselect2')) {
                    error.insertAfter(element);  // select2
                } else {
                    error.insertAfter(element.parent());               // default
                }
            },
            invalidHandler: function (e, validator) {
                for (var i in validator.errorMap) {
                    console.log(i, ":", validator.errorMap[i]);
                    lerrors += descript[i] + "<br>";
                }
            }
        });
        //var ofe1 = $('#oferta-form').valid();
        var ofe1 = validator.form();
        var validos = ofe1;
        if (!validos) {
            lerrors += i18n.t('lerrors2');
            apiComunNotificaciones.mensajeAdvertencia(lerrors);
            $('html,body').scrollTop(0);
        }
        return validos;
    },
    datosOk2: function () {
        var descript = apiPaginaOfertasDetalle.cargarDescriptoresError();
        var lerrors = i18n.t('lerrors1') + "<br>";
        var validator = $('#oferta-form2').validate({
            rules: {
                txtImportePresupuesto: { required: true, number: true },
                txtMultiplicador: { number: true },
                txtImportePresupuestoDivisa: { number: true },
                txtMargenContribucion: { required: true, number: true },
                txtMargenContribucion2: { number: true },
                txtImporteContribucion: { number: true },
                txtImporteInversion: { required: true, number: true },
                txtImporteInversionDivisa: { number: true },
                txtImporteRetorno: { number: true },
                txtImporteUTE: { number: true },
                txtImporteUTEDivisa: { number: true },
                txtImporteAnual: { number: true },
                txtImporteAnualDivisa: { number: true },
                txtImportePrimerAno: { required: true, number: true },
                txtImportePrimerAnoDivisa: { number: true }
            },
            errorPlacement: function (error, element) {
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());      // radio/checkbox?
                } else if (element.hasClass('aswselect2')) {
                    error.insertAfter(element);  // select2
                } else {
                    error.insertAfter(element.parent());               // default
                }
            },
            invalidHandler: function (e, validator) {
                for (var i in validator.errorMap) {
                    console.log(i, ":", validator.errorMap[i]);
                    lerrors += descript[i] + "<br>";
                }
            }
        });
        // var ofe2 = $('#oferta-form2').valid();
        var ofe2 = validator.form();
        var validos = ofe2;
        if (!validos) {
            lerrors += i18n.t('lerrors2');
            apiComunNotificaciones.mensajeAdvertencia(lerrors);
            $('html,body').scrollTop(0);
        }
        return validos;
    },
    copiar: function () {
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("ofertas.copiar"), function () {
            if (!apiPaginaOfertasDetalle.datosOk1()) return;
            if (!apiPaginaOfertasDetalle.datosOk2()) return;
            var data = {
                ofertaId: 0,
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
                tiempoEmpleado: vm.tiempoEmpleado(),
                personaContacto: vm.personaContacto(),
                descripcion: vm.descripcion(),
                observaciones: vm.observaciones(),
                autorizaciones: vm.autorizaciones(),
                ofertaSingular: vm.ofertaSingular(),
                periodo: vm.periodo(),
                colaboradores: vm.colaboradores(),
                centroEstablecidoId: vm.sCentroEstablecido(),
                nombreCorto: vm.nombreCorto(),
                cliente: vm.cliente(),
                version: 0,
                ubicacion: vm.ubicacion(),
                paisUbicacion: vm.paisUbicacion(),
                unidadNegocioId: vm.sUnidadNegocio(),
                duracion: vm.duracion(),
                probabilidad: vm.sProbabilidad(),
                notasPlanning: vm.notasPlanning(),
                faseOfertaId: vm.sFasesOferta(),
                tipoOportunidadId: vm.sTiposOportunidad(),
                tipoContratoId: vm.sTiposContrato(),
                notasEstado: vm.notasEstado(),
                codigoOferta: vm.codigoOferta(),
                subrogacionSN: vm.subrogacionSN(),
                subrogacionTXT: vm.subrogacionTXT(),
                subrogacionNum: vm.subrogacionNum(),
                uteSN: vm.uteSN(),
                uteTXT: vm.uteTXT(),
                gdesPor: vm.gdesPor(),
                subcontrataSN: vm.subcontrataSN(),
                subcontrataTXT: vm.subcontrataTXT(),
                condicionesPago: vm.condicionesPago(),
                alcance: vm.alcance(),
                requerimientos: vm.requerimientos(),
                puntosRelevantes: vm.puntosRelevantes(),
                condicionesEstandarSN: vm.condicionesEstandarSN(),
                condicionesEstandarTXT: vm.condicionesEstandarTXT(),
                garantiasEspecialesSN: vm.garantiasEspecialesSN(),
                garantiasEspecialesTXT: vm.garantiasEspecialesTXT(),
                segurosSN: vm.segurosSN(),
                segurosTXT: vm.segurosTXT(),
                penalizaciones: vm.penalizaciones(),
                riesgos: vm.riesgos(),
                proveedorActual: vm.proveedorActual(),
                competidores: vm.competidores(),
                principalCompetidor: vm.principalCompetidor(),
                criteriosEvaluacion: vm.criteriosEvaluacion(),
                datosComerciales: vm.datosComerciales(),
                diferencialGDES: vm.diferencialGDES(),
                estrategiaGDES: vm.estrategiaGDES(),
                sinergias: vm.sinergias(),
                usuarioId: vm.sUsuario()
            };
            if (vm.fechaOferta()) data.fechaOferta = moment(vm.fechaOferta(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaUltimoEstado()) data.fechaUltimoEstado = moment(vm.fechaUltimoEstado(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaLimiteProyecto()) data.fechaLimiteProyecto = moment(vm.fechaLimiteProyecto(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaEntrega()) data.fechaEntrega = moment(vm.fechaEntrega(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaDivisa()) data.fechaDivisa = moment(vm.fechaDivisa(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaCreacion()) data.fechaCreacion = moment(vm.fechaCreacion(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaAdjudicacion()) data.fechaAdjudicacion = moment(vm.fechaAdjudicacion(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaInicioContrato()) data.fechaInicioContrato = moment(vm.fechaInicioContrato(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.fechaFinContrato()) data.fechaFinContrato = moment(vm.fechaFinContrato(), i18n.t('util.date_format')).format(i18n.t('util.date_iso'));
            if (vm.selectedServicio().length > 0) {
                data.servicioId = vm.selectedServicio()[0];
                if (vm.selectedServicio()[1]) data.servicioId2 = vm.selectedServicio()[1]; else data.servicioId2 = null;
                if (vm.selectedServicio()[2]) data.servicioId3 = vm.selectedServicio()[2]; else data.servicioId3 = null;
            } else {
                data.servicioId = null;
                data.servicioId2 = null;
                data.servicioId3 = null;
            }
            verb = "POST";
            data.version = 0;
            apiComunAjax.llamadaGeneral(verb, myconfig.apiUrl + "/api/ofertas", data, function (err, data) {
                if (err) return;
                window.open('OfertasDetalle.html?id=' + data.ofertaId, '_blank');
            });
        }, function () {

        })
    },
    proposalReport: function () {
        var url = "infPR.html?ofertaId=" + vm.ofertaId() + "&type=" + vm.sTipoInforme();
        window.open(url, '_blank');
    }

}


