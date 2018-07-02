/*
 servicios.js
 Funciones propias de la página servicios.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaServiciosGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#servicios').attr('class', 'active');
        $('#servicios-form').submit(function () { return false; });
        apiPaginaServiciosGeneral.iniServiciosTabla();
        apiPaginaServiciosGeneral.cargarServicios();
        $('#btnNuevo').click(apiPaginaServiciosGeneral.nuevo);
    },
    iniServiciosTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_servicios', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "servicioId"
        }, {
            data: "nombre"
        }, {
            data: "areas"
        }, {
            data: "servicioId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaServiciosGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaServiciosGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_servicios').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarServicios: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/servicios", null, function (err, data) {
            if (err) return;
            apiPaginaServiciosGeneral.cargarServiciosTabla(data);
        });
    },
    cargarServiciosTabla: function (data) {
        var dt = $('#dt_servicios').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('ServiciosDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('ServiciosDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/servicios/" + id, null, function(err){
                if (err) return;
                apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/servicios-areas/" + id, null, function(err){
                    if (err) return;
                    apiPaginaServiciosGeneral.cargarServicios();
                })
            })
        }, function(){})
    }
}


