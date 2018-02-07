/*
 directoresAreasGeneral.js
 Funciones propias de la página DirectoresAreasGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var  apiPaginaDirectoresAreasGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#dirAreas').attr('class', 'active');
        $('#dirAreas-form').submit(function () { return false; });
        apiPaginaDirectoresAreasGeneral.iniDirAreasTabla();
        apiPaginaDirectoresAreasGeneral.cargarDirAreas();
        $('#btnNuevo').click(apiPaginaDirectoresAreasGeneral.nuevo);
    },
    iniDirAreasTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_dirAreas', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "directorId"
        }, {
            data: "nombre"
        }, {
            data: "directorId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaDirectoresAreasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaDirectoresAreasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_dirAreas').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarDirAreas: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/directores-areas", null, function (err, data) {
            if (err) return;
            apiPaginaDirectoresAreasGeneral.cargarDirAreasTabla(data);
        });
    },
    cargarDirAreasTabla: function (data) {
        var dt = $('#dt_dirAreas').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('DirectoresAreasDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('DirectoresAreasDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/directores-areas/" + id, null, function(err){
                if (err) return;
                apiPaginaDirectoresAreasGeneral.cargarDirAreas();
            })
        }, function(){})
    }
}


