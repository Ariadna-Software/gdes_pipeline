﻿/*
 ofertas.js
 Funciones propias de la página Ofertas.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var estado = [];
estado = getCookie('confOferta'+usuario.nombre);
var tabla;

var apiPaginaOfertasGeneral = {
    ini: function () {
        apiComunGeneral.initPage(usuario);
        apiComunAjax.establecerClave(usuario.apiKey);
        $('#ofertas').attr('class', 'active');
        $('#ofertas-form').submit(function () { return false; });
        apiPaginaOfertasGeneral.iniOfertasTabla();
        apiPaginaOfertasGeneral.cargarOfertas();
        $('#btnNuevo').click(apiPaginaOfertasGeneral.nuevo);

        //evento de guardado de configuración
        $(window).unload(apiPaginaOfertasGeneral.guardarConfiguracion);
        $('.ColVis').blur(apiPaginaOfertasGeneral.guardarConfiguracion)

    },
    iniOfertasTabla: function () {
        var options = apiComunGeneral.initTableOptions('dt_ofertas', usuario.codigoIdioma);
        options.data = data;
        options.columns = [{
            data: "ofertaId"
        }, {
            data: "tipoOferta"
        }, {
            data: "area"
        }, {
            data: "pais"
        }, {
            data: "nombreCorto"
        }, {
            data: "importePresupuesto",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "margenContribucion",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "estado"
        }, {
            data: "centro"
        }, {
            data: "cliente"
        }, {
            data: "autorizaciones"
        }, {
            data: "observaciones"
        }, {
            data: "responsable"
        }, {
            data: "empresa"
        }, {
            data: "centroEstablecido"
        }, {
            data: "tipoActividad"
        }, {
            data: "numeroOferta"
        }, {
            data: "codigoGdes"
        }, {
            data: "descripcion"
        }, {
            data: "fechaUltimoEstado",
            render: function (data) {
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "importeInversion",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "importeRetorno",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "divisa"
        }, {
            data: "importePresupuestoDivisa",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "multiplicador",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "fechaDivisa",
            render: function (data) {
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "periodo"
        }, {
            data: "fechaEntrega",
            render: function (data) {
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "version"
        }, {
            data: "numeroLicitacion"
        }, {
            data: "periodo"
        }, {
            data: "ofertaSingular",
            render: function (data) {
                var html = i18n.t('no');
                if (data == 1) html = i18n.t('si');
                return html;
            }
        }, {
            data: "colaboradores"
        }, {
            data: "numeroPedido"
        }, {
            data: "proyecto"
        }, {
            data: "ofertaId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger btn-lg' onclick='apiPaginaOfertasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success btn-lg' onclick='apiPaginaOfertasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        tabla = $('#dt_ofertas').DataTable(options);
        tabla.columns(0).visible(false);
        if(!estado){
            estado = [];
            estado.push("true", "true", "true", "true", "true", "true", "true", "true", "true", "true", "true");
            for (var i = 11; i < 35; i++) {
                tabla.columns(i).visible(false);
                estado.push(tabla.columns(i).visible()[0]);
            }
            estado.push("true");
        }else{
            var booleana = estado.split(",")
            for (var j = 0; j < 36; j++){
                if(booleana[j] == "true") booleana[j] = true;
                else if (booleana[j] == "false") booleana[j] = false;
                tabla.columns(j).visible(booleana[j]);
            }
        }
    },
    cargarOfertas: function () {
        var url = myconfig.apiUrl + "/api/ofertas/responsable/" + usuario.responsableId;
        if (usuario.verOfertasGrupo) url = myconfig.apiUrl + "/api/ofertas/responsable/grupo/" + usuario.responsableId;
        if (usuario.esAdministrador) url = myconfig.apiUrl + "/api/ofertas";
        apiComunAjax.llamadaGeneral("GET", url, null, function (err, data) {
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
    nuevo: function () {
        window.open(sprintf('OfertasDetalle.html?id=%s', 0), '_new');
    },
    editar: function (id) {
        window.open(sprintf('OfertasDetalle.html?id=%s', id), '_new');
    },
    eliminar: function (id) {
        apiComunNotificaciones.mensajeAceptarCancelar(i18n.t("eliminar_pregunta"), function () {
            apiComunAjax.llamadaGeneral("DELETE", myconfig.apiUrl + "/api/ofertas/" + id, null, function (err) {
                if (err) return;
                apiPaginaOfertasGeneral.cargarOfertas();
            })
        }, function () { })
    },

    guardarConfiguracion: function() {
        var conf = [];
        for(var i = 0; i < 36; i++){
            conf.push(tabla.columns(i).visible()[0]);
        }
        setCookie('confOferta'+usuario.nombre, conf, 10000);
    }

}


