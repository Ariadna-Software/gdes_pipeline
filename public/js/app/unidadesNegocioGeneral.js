/*
 unidadesNegocio.js
 Funciones propias de la página UnidadesNegocio.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaUnidadesNegocioGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#unidadesNegocio').attr('class', 'active');
        $('#unidadesNegocio-form').submit(function () { return false; });
        apiPaginaUnidadesNegocioGeneral.iniUnidadesNegocioTabla();
        apiPaginaUnidadesNegocioGeneral.cargarUnidadesNegocio();
        $('#btnNuevo').click(apiPaginaUnidadesNegocioGeneral.nuevo);
    },
    iniUnidadesNegocioTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_unidadesNegocio', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "unidadNegocioId"
        }, {
            data: "nombre"
        }, {
            data: "unidadNegocioId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaUnidadesNegocioGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaUnidadesNegocioGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_unidadesNegocio').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarUnidadesNegocio: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/unidades-negocio", null, function (err, data) {
            if (err) return;
            apiPaginaUnidadesNegocioGeneral.cargarUnidadesNegocioTabla(data);
        });
    },
    cargarUnidadesNegocioTabla: function (data) {
        var dt = $('#dt_unidadesNegocio').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('UnidadesNegocioDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('UnidadesNegocioDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/unidades-negocio/" + id, null, function(err){
                if (err) return;
                apiPaginaUnidadesNegocioGeneral.cargarUnidadesNegocio();
            })
        }, function(){})
    }
}


