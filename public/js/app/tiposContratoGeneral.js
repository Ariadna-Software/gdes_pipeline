/*
 tiposContratoGeneral.js
 Funciones propias de la página TiposContratoGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaTiposContratoGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#tiposContrato').attr('class', 'active');
        $('#tiposContrato-form').submit(function () { return false; });
        apiPaginaTiposContratoGeneral.iniTiposContratoTabla();
        apiPaginaTiposContratoGeneral.cargarTiposContrato();
        $('#btnNuevo').click(apiPaginaTiposContratoGeneral.nuevo);
    },
    iniTiposContratoTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_tiposContrato', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "tipoContratoId"
        }, {
            data: "nombre"
        }, {
            data: "tipoContratoId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaTiposContratoGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaTiposContratoGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_tiposContrato').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarTiposContrato: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-contrato", null, function (err, data) {
            if (err) return;
            apiPaginaTiposContratoGeneral.cargarTiposContratoTabla(data);
        });
    },
    cargarTiposContratoTabla: function (data) {
        var dt = $('#dt_tiposContrato').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('TiposContratoDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('TiposContratoDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/tipos-contrato/" + id, null, function(err){
                if (err) return;
                apiPaginaTiposContratoGeneral.cargarTiposContrato();
            })
        }, function(){})
    }
}


