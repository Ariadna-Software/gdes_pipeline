/*
 tiposOportunidadGeneral.js
 Funciones propias de la página TiposOportunidadGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaTiposOportunidadGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#tiposOportunidad').attr('class', 'active');
        $('#tiposOportunidad-form').submit(function () { return false; });
        apiPaginaTiposOportunidadGeneral.iniTiposOportunidadTabla();
        apiPaginaTiposOportunidadGeneral.cargarTiposOportunidad();
        $('#btnNuevo').click(apiPaginaTiposOportunidadGeneral.nuevo);
    },
    iniTiposOportunidadTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_tiposOportunidad', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "tipoOportunidadId"
        }, {
            data: "nombre"
        }, {
            data: "tipoOportunidadId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaTiposOportunidadGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaTiposOportunidadGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_tiposOportunidad').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarTiposOportunidad: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-Oportunidad", null, function (err, data) {
            if (err) return;
            apiPaginaTiposOportunidadGeneral.cargarTiposOportunidadTabla(data);
        });
    },
    cargarTiposOportunidadTabla: function (data) {
        var dt = $('#dt_tiposOportunidad').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('TiposOportunidadDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('TiposOportunidadDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/tipos-Oportunidad/" + id, null, function(err){
                if (err) return;
                apiPaginaTiposOportunidadGeneral.cargarTiposOportunidad();
            })
        }, function(){})
    }
}


