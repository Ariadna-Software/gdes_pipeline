var apiVersiones = {
    init: function () {
        apiVersiones.iniVersionesTabla();
    },
    iniVersionesTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_versiones', usuario.codigoIdioma);
        options.data = data;
        options.ordering = false;
        options.columns = [{
            data: "numVersion"
        }, {
            data: "usuario"
        }, {
            data: "fechaCambio",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "importePresupuesto"
        }, {
            data: "importeUTE"
        }, {
            data: "importeTotal"
        }, {
            data: "margenContribucion"
        }, {
            data: "importeContribucion"
        }, {
            data: "importeAnual"
        }, {
            data: "importePrimerAno"
        }, {
            data: "importeInversion"
        }, {
            data: "divisa"
        }, {
            data: "multiplicador"
        }, {
            data: "fechaDivisa",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "importePresupuestoDivisa"
        }, {
            data: "importeUTEDivisa"
        }, {
            data: "importeTotalDivisa"
        }, {
            data: "importeContribucionDivisa"
        }, {
            data: "importeAnualDivisa"
        }, {
            data: "importePrimerAnoDivisa"
        }, {
            data: "importeInversionDivisa"
        }, {
            data: "versionId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger' onclick='apiVersiones.eliminar(" + data + ");' title='Eliminar version'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + "</div>";
                return html;
            }
        }];
        tabla = $('#dt_versiones').DataTable(options);
        for (var i = 11; i < 21; i++) {
            tabla.columns(i).visible(false);
        }        
    },
    cargarVersiones: function (id) {
        var url = myconfig.apiUrl + "/api/versiones/oferta/" + id;
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            apiVersiones.cargarVersionesTabla(data);
        });
    },
    cargarVersionesTabla: function (data) {
        var dt = $('#dt_versiones').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    eliminar: function (id) {
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"), function () {
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/versiones/" + id, null, function (err) {
                if (err) return;
                apiVersiones.cargarVersiones(vm.ofertaId());
            })
        }, function () { })
    }
}