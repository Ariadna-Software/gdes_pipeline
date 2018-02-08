/*
 ubicacionesGeneral.js
 Funciones propias de la página UbicacionesGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaUbicacionesGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#ubicaciones').attr('class', 'active');
        $('#ubicaciones-form').submit(function () { return false; });
        apiPaginaUbicacionesGeneral.iniUbicacionesTabla();
        apiPaginaUbicacionesGeneral.cargarUbicaciones();
        $('#btnNuevo').click(apiPaginaUbicacionesGeneral.nuevo);
    },
    iniUbicacionesTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_ubicaciones', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "ubicacionId"
        }, {
            data: "nombre"
        }, {
            data: "ubicacionId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaUbicacionesGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaUbicacionesGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_ubicaciones').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarUbicaciones: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/ubicaciones", null, function (err, data) {
            if (err) return;
            apiPaginaUbicacionesGeneral.cargarUbicacionesTabla(data);
        });
    },
    cargarUbicacionesTabla: function (data) {
        var dt = $('#dt_ubicaciones').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('UbicacionesDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('UbicacionesDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/ubicaciones/" + id, null, function(err){
                if (err) return;
                apiPaginaUbicacionesGeneral.cargarUbicaciones();
            })
        }, function(){})
    }
}


