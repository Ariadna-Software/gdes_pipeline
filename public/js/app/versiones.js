var apiVersiones = {
    init: function () {
        $('#versiones-form').submit(function () { return false; });
        $('#modalVersiones-form').submit(function () { return false; });
        $('#btnNuevaVersion').click(apiVersiones.nuevaVersion);
        $('#btnGuardarVersion').click(apiVersiones.guardarVersion);
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
            data: "fechaEntrega",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "observaciones"
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
                var bt0 = "<button class='btn btn-circle btn-success' onclick='apiVersiones.editar(" + data + ");' title='Eliminar version'> <i class='fa fa-edit fa-fw'></i> </button>";
                var bt1 = "<button class='btn btn-circle btn-danger' onclick='apiVersiones.eliminar(" + data + ");' title='Eliminar version'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + bt0 + "</div>";
                return html;
            }
        }];
        tabla = $('#dt_versiones').DataTable(options);
        for (var i = 6; i < 23; i++) {
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
    },
    nuevaVersion: function () {
        if (!vm.ofertaId()) {
            $('#modalVersiones').modal('hide');
            apiComunNotificaciones.mensajeAyuda(i18n.t('seguidores.noOferta'));
            return;
        }
        $('#modalVersiones').modal('show');
        vm.nroVersion(vm.version() + 1);
        vm.fechaCambioVersion(moment(new Date()).format('DD/MM/YYYY'));
        vm.importePresupuestoVersion(vm.importePresupuesto());
        vm.observacionesVersion(null);
        vm.fechaEntregaVersion(null);
        _versionEnEdicion = null;
    },
    editar: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/versiones/" + id, null, function (err, data) {
            if (err) return;
            delete data.usuario;
            delete data.divisa;
            _versionEnEdicion = data;
            vm.nroVersion(data.numVersion);
            vm.fechaCambioVersion(moment(new Date()).format('DD/MM/YYYY'));
            if (data.fechaEntrega) vm.fechaEntregaVersion(moment(data.fechaEntrega).format('DD/MM/YYYY'));
            vm.importePresupuestoVersion(data.importePresupuesto);
            vm.observacionesVersion(data.observaciones);
            $('#modalVersiones').modal('show');
        });
    },
    datosOk: function () {
        $('#modalVersiones-form').validate({
            rules: {
                txtObservacionesVersion: { required: true }
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
        var ofe1 = $('#modalVersiones-form').valid();
        return ofe1;
    },
    guardarVersion: function () {
        if (!_versionEnEdicion) {
            apiVersiones.guardarVersionNueva();
        } else {
            if (!apiVersiones.datosOk()) return;
            var data = _versionEnEdicion;
            data.fechaCambio = moment(new Date()).format('YYYY-MM-DD');
            data.observaciones = vm.observacionesVersion();
            if (vm.fechaEntregaVersion()) data.fechaEntrega = moment(vm.fechaEntregaVersion(), 'DD/MM/YYYY').format('YYYY-MM-DD');
            apiComunAjax.llamadaGeneral("PUT", myconfig.apiUrl + "/api/versiones", data, function (err, data) {
                if (err) return;
                $('#modalVersiones').modal('hide');
                apiVersiones.cargarVersiones(vm.ofertaId());
            });
        }
    },
    guardarVersionNueva: function () {
        if (!vm.ofertaId()) {
            $('#modalVersiones').modal('hide');
            apiComunNotificaciones.mensajeAyuda(i18n.t('seguidores.noOferta'));
            return;
        }
        if (!apiVersiones.datosOk()) return;
        var data = {
            ofertaId: vm.ofertaId(),
            fechaCambio: moment(new Date()).format('YYYY-MM-DD'),
            usuarioId: usuario.usuarioId,
            importePresupuesto: vm.importePresupuesto(),
            importePresupuestoDivisa: vm.importePresupuestoDivisa(),
            importeUTE: vm.importeUTE(),
            importeUTEDivisa: vm.importeUTEDivisa(),
            importeTotal: vm.importeTotal(),
            importeTotalDivisa: vm.importeTotalDivisa(),
            margenContribucion: vm.margenContribucion(),
            importeContribucion: vm.importeContribucion(),
            importeContribucionDivisa: vm.importeContribucionDivisa(),
            importeAnual: vm.importeAnual(),
            importeAnualDivisa: vm.importeAnualDivisa(),
            importePrimerAno: vm.importePrimerAno(),
            importePrimerAnoDivisa: vm.importePrimerAnoDivisa(),
            importeInversion: vm.importeInversion(),
            importeInversionDivisa: vm.importeInversionDivisa(),
            divisaId: vm.sDivisa(),
            multiplicador: vm.multiplicador(),
            numVersion: vm.nroVersion(),
            observaciones: vm.observacionesVersion()
        };
        if (vm.fechaDivisa()) data.fechaDivisa = vm.fechaDivisa();
        if (vm.fechaEntregaVersion()) data.fechaEntrega = moment(vm.fechaEntregaVersion(), 'DD/MM/YYYY').format('YYYY-MM-DD');
        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/versiones", data, function (err, data) {
            if (err) return;
            vm.version(vm.nroVersion());
            $('#modalVersiones').modal('hide');
            apiVersiones.cargarVersiones(vm.ofertaId());
        });
    }
}