/*
 tiposProyectoGeneral.js
 Funciones propias de la página TiposProyectoGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaTiposProyectoGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#tiposProyecto').attr('class', 'active');
        $('#tiposProyecto-form').submit(function () { return false; });
        apiPaginaTiposProyectoGeneral.iniTiposProyectoTabla();
        apiPaginaTiposProyectoGeneral.cargarTiposProyecto();
        $('#btnNuevo').click(apiPaginaTiposProyectoGeneral.nuevo);
    },
    iniTiposProyectoTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_tiposProyecto', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "tipoProyectoId"
        }, {
            data: "nombre"
        }, {
            data: "tipoProyectoId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaTiposProyectoGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaTiposProyectoGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_tiposProyecto').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarTiposProyecto: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/tipos-proyecto", null, function (err, data) {
            if (err) return;
            apiPaginaTiposProyectoGeneral.cargarTiposProyectoTabla(data);
        });
    },
    cargarTiposProyectoTabla: function (data) {
        var dt = $('#dt_tiposProyecto').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('TiposProyectoDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('TiposProyectoDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/tipos-proyecto/" + id, null, function(err){
                if (err) return;
                apiPaginaTiposProyectoGeneral.cargarTiposProyecto();
            })
        }, function(){})
    }
}


