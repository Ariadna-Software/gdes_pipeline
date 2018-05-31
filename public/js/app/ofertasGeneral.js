/*
 ofertas.js
 Funciones propias de la página Ofertas.html
*/

var usuario = apiComunGeneral.obtenerUsuario();
var data = null;

var estado = [];
estado = getCookie('confOferta' + usuario.nombre);
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
        options.order = ['0', 'desc']
        options.columns = [{
            data: "ofertaId"
        }, {
            data: "numeroOferta"
        }, {
            data: "nomEmpresa"
        }, {
            data: "pais"
        }, {
            data: "faseOferta"
        }, {
            data: "tipoOportunidad"
        }, {
            data: "tipoContrato"
        }, {
            data: "nomUnidadNegocio"
        }, {
            data: "nomArea"
        }, {
            data: "ubicacion"
        }, {
            data: "paisUbicacion"
        }, {
            data: "cliente"
        }, {
            data: "nombreCorto"
        }, {
            data: "servicio"
        }, {
            data: "estado"
        }, {
            data: "importePresupuesto",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "divisa"
        }, {
            data: "margenContribucion",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "importePrimerAno",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "fechaEntrega",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "responsable"
        }, {
            data: "autorizaciones"
        }, {
            data: "uteSN"
        }, {
            data: "gdesPor",
            render: function (data) {
                return numeral(data).format('0,0');
            }
        }, {
            data: "numeroPedido"
        }, {
            data: "competidores"
        }, {
            data: "probabilidad"
        }, {
            data: "fechaAdjudicacion",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "fechaInicioContrato",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "fechaFinContrato",
            render: function (data) {
                if (!data) return "";
                return moment(data).format('DD/MM/YYYY');
            }
        }, {
            data: "duracion"
        }, {
            data: "razonPerdida"
        }, {
            data: "ofertaId",
            render: function (data, type, row) {
                var bt1 = "<button class='btn btn-circle btn-danger' onclick='apiPaginaOfertasGeneral.eliminar(" + data + ");' title='Eliminar registro'> <i class='fa fa-trash-o fa-fw'></i> </button>";
                var bt2 = "<button class='btn btn-circle btn-success' onclick='apiPaginaOfertasGeneral.editar(" + data + ");' title='Editar registro'> <i class='fa fa-edit fa-fw'></i> </button>";
                var html = "<div class='pull-right'>" + bt1 + " " + bt2 + "</div>";
                return html;
            }
        }];
        tabla = $('#dt_ofertas').DataTable(options);

        // Apply the filter
        $("#dt_ofertas thead th input[type=text]").on('keyup change', function () {
            tabla
                .column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });


        if (!estado) {
            estado = [];
            estado.push("true", "true", "true", "true", "true", "true", "true", "true");
            for (var i = 8; i < 31; i++) {
                tabla.columns(i).visible(false);
                estado.push(tabla.columns(i).visible()[0]);
            }
            estado.push("true");
        } else {
            var booleana = estado.split(",")
            for (var j = 0; j < 31; j++) {
                if (booleana[j] == "true") booleana[j] = true;
                else if (booleana[j] == "false") booleana[j] = false;
                tabla.columns(j).visible(booleana[j]);
            }
        }
    },
    cargarOfertas: function () {
        var url = myconfig.apiUrl + "/api/ofertas/seguidores/" + usuario.responsableId + "/" + usuario.usuarioId;
        // if (usuario.verOfertasGrupo) url = myconfig.apiUrl + "/api/ofertas/responsable/grupo/" + usuario.responsableId;
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

    guardarConfiguracion: function () {
        var conf = [];
        for (var i = 0; i < 26; i++) {
            conf.push(tabla.columns(i).visible()[0]);
        }
        setCookie('confOferta' + usuario.nombre, conf, 10000);
    }

}


