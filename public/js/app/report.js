/*
 index.js
 Funciones propias de la página index.html
*/

var usuario = apiComunGeneral.obtenerUsuario();

var apiReport = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);

        $('#inf').attr('class', 'active');
        // control de envío de formularios
        $('#frmT1TB1').submit(function () { return false; });
        $('#frmT1TB2').submit(function () { return false; });
        $('#frmT5TB1').submit(function () { return false; });
        $('#frmT3TB1').submit(function () { return false; });
        $('#frmT4TB1').submit(function () { return false; });

        // carga datos de la página
        vm = new apiReport.datosPagina();
        ko.applyBindings(vm);

        // formatear desplegables
        $('#cmbFasesOferta').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbPaiss').select2(select2_languages[usuario.codigoIdioma]);

        $('#cmbFasesOferta2').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbPaiss2').select2(select2_languages[usuario.codigoIdioma]);

        $('#cmbFasesOferta3').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbPaiss4').select2(select2_languages[usuario.codigoIdioma]);

        $('#cmbEstados').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbEstados2').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbEstados3').select2(select2_languages[usuario.codigoIdioma]);

        $('#cmbAreas').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbPaiss3').select2(select2_languages[usuario.codigoIdioma]);

        $('#cmbPaiss5').select2(select2_languages[usuario.codigoIdioma]);

        // carga desplegables
        apiReport.cargarFasesOferta();
        apiReport.cargarPaiss();
        apiReport.cargarEstados();
        apiReport.cargarAreas();

        // botones de acción
        $('#btnT1TB1').click(apiReport.aceptarT1TB1);
        $('#btnT1TB2').click(apiReport.aceptarT1TB2);
        $('#btnT5TB1').click(apiReport.aceptarT5TB1);
        $('#btnT3TB1').click(apiReport.aceptarT3TB1);
        $('#btnT4TB1').click(apiReport.aceptarT4TB1);
    },
    datosPagina: function () {
        var self = this;

        self.optionsFasesOferta = ko.observableArray([]);
        self.selectedFasesOferta = ko.observableArray([]);
        self.sFasesOferta = ko.observable();
        self.sFasesOferta2 = ko.observable();
        self.sFasesOferta3 = ko.observable();

        self.optionsPaiss = ko.observableArray([]);
        self.selectedPaiss = ko.observableArray([]);
        self.sPais = ko.observable();
        self.sPais2 = ko.observable();
        self.sPais3 = ko.observable();
        self.sPais4 = ko.observable();
        self.sPais5 = ko.observable();

        self.fechaCreacionDesde = ko.observable();
        self.fechaCreacionHasta = ko.observable();

        self.fechaCreacionDesde2 = ko.observable();
        self.fechaCreacionHasta2 = ko.observable();
        self.fechaCreacionDesde3 = ko.observable();
        self.fechaCreacionHasta3 = ko.observable();
        self.fechaCreacionDesde5 = ko.observable();
        self.fechaCreacionHasta5 = ko.observable();
        self.fechaCreacionDesde6 = ko.observable();
        self.fechaCreacionHasta6 = ko.observable();        

        self.optionsEstados = ko.observableArray([]);
        self.selectedEstados = ko.observableArray([]);
        self.sEstado = ko.observable();
        self.sEstado2 = ko.observable();
        self.sEstado3 = ko.observable();

        self.optionsAreas = ko.observableArray([]);
        self.selectedAreas = ko.observableArray([]);
        self.sArea = ko.observable();

        self.optT5TB2 = ko.observable();
    },
    aceptarT1TB1: function () {
        var fase = vm.sFasesOferta();
        var pais = vm.sPais();
        var dFecha = vm.fechaCreacionDesde();
        var hFecha = vm.fechaCreacionHasta();
        var estado = vm.sEstado3();
        if (!fase) fase = "";
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";
        if (!estado) estado = "";
        var url = "infT1TB1.html?fase=" + fase + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        window.open(url, '_new');

    },
    aceptarT1TB2: function () {
        var fase = vm.sFasesOferta2();
        var pais = vm.sPais2();
        var dFecha = vm.fechaCreacionDesde2();
        var hFecha = vm.fechaCreacionHasta2();
        var estado = vm.sEstado();
        if (!fase) fase = "";
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";
        if (!estado) estado = "";
        // var url = "infT1TB2.html?fase=" + fase + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        // Forzamos que la fase sea oferta
        var url = "infT1TB2.html?fase=0&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        window.open(url, '_new');
    },
    aceptarT3TB1: function () {
        var fase = vm.sFasesOferta3();
        var pais = vm.sPais4();
        var dFecha = vm.fechaCreacionDesde3();
        var hFecha = vm.fechaCreacionHasta3();
        var estado = vm.sEstado2();
        if (!fase) fase = "";
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";
        if (!estado) estado = "";
        //var url = "infT3TB1.html?fase=" + fase + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        var url = "infT3TB1.html?fase=0&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha + "&estado=" + estado;
        window.open(url, '_new');
    },
    aceptarT4TB1: function () {
        var pais = vm.sPais5();
        var dFecha = vm.fechaCreacionDesde5();
        var hFecha = vm.fechaCreacionHasta5();
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";
        var url = "infT4TB1.html?pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha;
        window.open(url, '_new');

    },
    aceptarT5TB1: function () {
        var area = vm.sArea();
        var pais = vm.sPais3();
        var dFecha = vm.fechaCreacionDesde6();
        var hFecha = vm.fechaCreacionHasta6();
        if (!area) area = "";
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";        
        var url = "infT5TB1.html?area=" + area + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha;
        if (vm.optT5TB2())
            url += "&detail=1";
        else
            url += "&detail=0";
        window.open(url, '_new');

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
    cargarPaiss: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/paises", null, function (err, data) {
            if (err) return;
            var options = [{ paisId: 0, nombre: " " }].concat(data);
            vm.optionsPaiss(options);
            $("#cmbPaiss").val([id]).trigger('change');
            if (!usuario.esAdministrador && usuario.paisId) {
                $("#cmbPaiss").val([usuario.paisId]).trigger('change');
                $('#cmbPaiss').prop('disabled', 'disabled');
                //
                $("#cmbPaiss2").val([usuario.paisId]).trigger('change');
                $('#cmbPaiss2').prop('disabled', 'disabled');
                //
                $("#cmbPaiss3").val([usuario.paisId]).trigger('change');
                $('#cmbPaiss3').prop('disabled', 'disabled');      
                //
                $("#cmbPaiss5").val([usuario.paisId]).trigger('change');
                $('#cmbPaiss5').prop('disabled', 'disabled');                             
            }
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
    }
}


