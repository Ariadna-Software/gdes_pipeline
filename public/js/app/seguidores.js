var apiSeguidores = {
    init: function () {
        $('#seguidores-form').submit(function () { return false; });
        $('#modalSeguidores-form').submit(function () { return false; });
        apiSeguidores.iniSeguidoresTabla();
        $('#cmbUsuarios').select2(select2_languages[usuario.codigoIdioma]);
        apiSeguidores.cargarUsuarios();
        $('#btnGuardarSeguidor').click(apiSeguidores.guardarSeguidor);
    },
    iniSeguidoresTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_seguidores', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "nombre"
        }, {
            data: "seguidorId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger' onclick='apiSeguidores.eliminar(" + data + ");' title='Eliminar seguidor'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + "</div>";
                return html;
            }
        }];
        tabla = $('#dt_seguidores').DataTable(options);
    },
    cargarSeguidores: function (id) {
        var url = myconfig.apiUrl + "/api/seguidores/ofertas/" + id;
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
            if (err) return;
            apiSeguidores.cargarSeguidoresTabla(data);
        });
    },
    cargarSeguidoresTabla: function (data) {
        var dt = $('#dt_seguidores').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    cargarUsuarios: function (id) {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/usuarios", null, function (err, data) {
            if (err) return;
            var options = [{ usuarioId: 0, nombre: " " }].concat(data);
            vm.optionsUsuarios(options);
            $("#cmbUsuarios").val([id]).trigger('change');
        });
    },
    guardarSeguidor: function() {
        if (!apiSeguidores.datosOk()) return;
        if (!vm.ofertaId()) {
            apiComunNotificaciones.mensajeAyuda( i18n.t('seguidores.noOferta'));
            return;
        }
        var data = {
            ofertaId: vm.ofertaId(),
            usuarioId: vm.sUsuario()
        };
        apiComunAjax.llamadaGeneral("POST", myconfig.apiUrl + "/api/seguidores", data, function (err, data) {
            if (err) return;
            $('#modalSeguidores').modal('hide');
            apiSeguidores.cargarSeguidores(vm.ofertaId());
        });
    },
    datosOk: function () {
        $('#modalSeguidores-form').validate({
            rules: {
                cmbUsuarios: { required: true }
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
        var ofe1 = $('#modalSeguidores-form').valid();
        return ofe1;
    },
    eliminar: function (id) {
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"), function () {
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/seguidores/" + id, null, function (err) {
                if (err) return;
                apiSeguidores.cargarSeguidores(vm.ofertaId());
            })
        }, function () { })
    }
}