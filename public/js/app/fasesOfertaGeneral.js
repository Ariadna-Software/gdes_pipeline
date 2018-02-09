/*
 fasesOfertageneral.js
 Funciones propias de la página fasesOfertaGeneral.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var apiPaginaFasesOfertaGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#fasesOferta').attr('class', 'active');
        $('#fasesOferta-form').submit(function () { return false; });
        apiPaginaFasesOfertaGeneral.iniFasesOfertaTabla();
        apiPaginaFasesOfertaGeneral.cargarFasesOferta();
        $('#btnNuevo').click(apiPaginaFasesOfertaGeneral.nuevo);
    },
    iniFasesOfertaTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_fasesOferta', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "faseOfertaId"
        }, {
            data: "nombre"
        }, {
            data: "faseOfertaId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaFasesOfertaGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaFasesOfertaGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_fasesOferta').DataTable(options);
        tabla.columns(0).visible(false);
    },
    cargarFasesOferta: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/fases-oferta", null, function (err, data) {
            if (err) return;
            apiPaginaFasesOfertaGeneral.cargarFasesOfertaTabla(data);
        });
    },
    cargarFasesOfertaTabla: function (data) {
        var dt = $('#dt_fasesOferta').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('FasesOfertaDetalle.html?id=%s', 0), '_self');
    },
    editar: function(id){
        window.open(sprintf('FasesOfertaDetalle.html?id=%s', id), '_self');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/fases-oferta/" + id, null, function(err){
                if (err) return;
                apiPaginaFasesOfertaGeneral.cargarFasesOferta();
            })
        }, function(){})
    }
}


