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
        // carga datos de la página
        vm = new apiReport.datosPagina();
        ko.applyBindings(vm);

        // formatear desplegables
        $('#cmbFasesOferta').select2(select2_languages[usuario.codigoIdioma]);
        $('#cmbPaiss').select2(select2_languages[usuario.codigoIdioma]);
        
        // carga desplegables
        apiReport.cargarFasesOferta();
        apiReport.cargarPaiss();

        // botones de acción
        $('#btnT1TB1').click(apiReport.aceptarT1TB1);        
    },
    datosPagina: function () {
        var self = this;

        self.optionsFasesOferta = ko.observableArray([]);
        self.selectedFasesOferta = ko.observableArray([]);
        self.sFasesOferta = ko.observable();

        self.optionsPaiss = ko.observableArray([]);
        self.selectedPaiss = ko.observableArray([]);
        self.sPais = ko.observable();

        self.fechaCreacionDesde = ko.observable();
        self.fechaCreacionHasta = ko.observable();
    },
    aceptarT1TB1: function() {
        var fase = vm.sFasesOferta();
        var pais = vm.sPais();
        var dFecha = vm.fechaCreacionDesde();
        var hFecha = vm.fechaCreacionHasta();
        if (!fase) fase = "";
        if (!pais) pais = "";
        if (!dFecha) dFecha = "";
        if (!hFecha) hFecha = "";
        var url = "infT1TB1.html?fase=" + fase + "&pais=" + pais + "&dFecha=" + dFecha + "&hFecha=" + hFecha;
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
        });
    }
}


