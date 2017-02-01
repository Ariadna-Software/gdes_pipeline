/*
 ofertas.js
 Funciones propias de la página Ofertas.html
*/

var usuario = JSON.parse(apiComunGeneral.getCookie('usuario'));
var data = null;

var apiPaginaOfertasGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#ofertas').attr('class', 'active');
        $('#ofertas-form').submit(function () { return false; });
        apiPaginaOfertasGeneral.iniOfertasTabla();
        apiPaginaOfertasGeneral.cargarOfertas();
        $('#btnNuevo').click(apiPaginaOfertasGeneral.nuevo);
    },
    iniOfertasTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_ofertas', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "ofertaId"
        }, {
            data: "numeroOferta"
        },{
            data: "fechaOferta",
            render: function (data, type, row) {
                if (data) return moment(data).format('DD/MM/YYYY');
            }
        },{
            data: "fechaLimiteProyecto",
            render: function (data, type, row) {
                if (data) return moment(data).format('DD/MM/YYYY');
            }
        },{
            data: "fechaUltimoEstado",
            render: function (data, type, row) {
                if (data) return moment(data).format('DD/MM/YYYY');
            }
        },{
            data: "importePresupuesto"
        },{
            data: "importePresupuestoDivisa"
        },{
            data: "codigoDivisa"
        },{
            data: "importeInversion"
        },{
            data: "importeRetorno"
        },{
            data: "descripcion"
        },{
            data: "observaciones"
        },{
            data: "autorizaciones"
        },{
            data: "numeroPedido"
        },{
            data: "personaContacto"
        },{
            data: "empresa"
        },{
            data: "proyecto"
        },{
            data: "area"
        },{
            data: "tipoActividad"
        },{
            data: "pais"
        },{
            data: "estado"
        },{
            data: "tipoSoporte"
        },{
            data: "responsable"
        },{
            data: "centro"
        }, {
            data: "ofertaId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaOfertasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaOfertasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        var tabla = $('#dt_ofertas').DataTable(options);
        tabla.columns(0).visible(false);
        tabla.columns(10).visible(false);
        tabla.columns(11).visible(false);
        tabla.columns(12).visible(false);
        tabla.columns(13).visible(false);
        tabla.columns(14).visible(false);
        tabla.columns(15).visible(false);
        tabla.columns(16).visible(false);
        tabla.columns(17).visible(false);
        tabla.columns(18).visible(false);
        tabla.columns(19).visible(false);
        tabla.columns(20).visible(false);
        tabla.columns(21).visible(false);
    },
    cargarOfertas: function () {
        apiComunAjax.llamadaGeneral("GET", myconfig.apiUrl + "/api/ofertas", null, function (err, data) {
            if (err) return;
            apiPaginaOfertasGeneral.cargarOfertasTabla(data);
        });
    },
    cargarOfertasTabla: function (data) {
        var dt = $('#dt_ofertas').dataTable();
        dt.fnClearTable();
        if (data.length > 0) dt.fnAddData(data);
        dt.fnDraw();
    },
    nuevo: function(){
        window.open(sprintf('OfertasDetalle.html?id=%s', 0), '_new');
    },
    editar: function(id){
        window.open(sprintf('OfertasDetalle.html?id=%s', id), '_new');
    },
    eliminar: function(id){
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"),function(){
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/ofertas/" + id, null, function(err){
                if (err) return;
                apiPaginaOfertasGeneral.cargarOfertas();
            })
        }, function(){})
    }
}


