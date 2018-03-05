/*
 razonPerdidaGeneral.js
 Funciones propias de la página RazonPerdidaGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaRazonPerdidaGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#razonPerdida').attr('class', 'active');
        $('#razonPerdida-form').submit(function () { return false; });
        apiPaginaRazonPerdidaGeneral.iniRazonPerdidaTabla();
        apiPaginaRazonPerdidaGeneral.cargarRazonPerdida();
        $('#btnNuevo').click(apiPaginaRazonPerdidaGeneral.nuevo);
    },
    iniRazonPerdidaTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_razonPerdida', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "razonPerdidaId"
        }, {
            data: "nombre"
        }, {
            data: "razonPerdidaId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaRazonPerdidaGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaRazonPerdidaGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_razonPerdida').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarRazonPerdida: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/razon-perdida", null, function (err, data) {
            if (err) return;
            apiPaginaRazonPerdidaGeneral.cargarRazonPerdidaTabla(data);
        });
    },
    cargarRazonPerdidaTabla: function (data) {
        var dt = $('#dt_razonPerdida').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('RazonPerdidaDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('RazonPerdidaDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/razon-perdida/" + id, null, function(err){
                if (err) return;
                apiPaginaRazonPerdidaGeneral.cargarRazonPerdida();
            })
        }, function(){})
    }
}


