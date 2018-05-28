/*
 importacion.controller.js
 Gestión de las rutas de areas de usuarios en la API
*/

var express = require("express");
var router = express.Router();
var XLSX = require('xlsx');
var path = require('path');
var async = require('async');

var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

router.get('/:filename', function (req, res) {
    var filename = req.params.filename;
    if (!filename) return res.status(400).send('Debe incluir el fichero en la URL');
    fnVerificarFichero(filename, function (err, msg) {
        if (err) return res.status(500).send(err.message);
        res.json(msg);
    });
});

// -- funciones de soporte
var fnVerificarFichero = function (filename, done) {
    var file = path.join(__dirname, '../../public/uploads/' + filename);
    var book = XLSX.readFile(file);
    var sheet_name = book.SheetNames[0];
    var sheet = book.Sheets[sheet_name];
    var hayDatos = true;
    var i = 3;
    var ofertasVirtuales = [];
    while (hayDatos) {
        var col = "B" + i;
        if (sheet[col] == undefined) {
            hayDatos = false;
        } else {
            var dt = sheet[col].v;
            var ofV = getOfertaVirtual();
            for (key in ofV) {
                col = ofV[key] + i;
                if (sheet[col] == undefined) {
                    ofV[key] = "";
                } else {
                    ofV[key] = sheet[col].v;
                }
            }
            ofertasVirtuales.push(ofV);
            i++;
        }
    }
    var ofertasParaAlta = [];
    async.eachSeries(ofertasVirtuales, function (oferta, callback) {
        // comprobar los campos de cada oferta individual
        comprobarTodosLosCamposCodificados(oferta, function (err, ofe) {
            if (err) return callback(err);
            ofertasParaAlta.push({
                mensaje: "",
                ofertaDb: "",
                oferta: ofe
            });
            callback();
        })
    }, function (err) {
        if (err) return done(err);
        actualizarMensajeOfertaDb(ofertasParaAlta, function (err, ofertas) {
            if (err) return done(err);
            done(null, ofertas);
        })
    });
};

var getOfertaVirtual = function () {
    var ofe = {
        responsable: "X", // B
        faseOferta: "E", // C
        ubicacion: "J", // D
        nombreCorto: "O", // E
        divisa: "T", // F
        area: "I", // G
        empresa: "D", // H
        pais: "C", // I
        tipoOportunidad: "F", // J
        numeroOferta: "B", // K
        fechaEntrega: "W", // L
        codigo: "N", // M
        licitacion: "M", // N
        cliente: "L", // O
        servicio: "Q", // P
        nombre: "P", // Q
        estado: "R", // R
        pedido: "Z", // S
        importe: "S", // T
        razonPerdida: "AG", // V
        fechaInicio: "AD", // W
        fechaFin: "AE", // Y 
        fechaAdjudicacion: "AC", // Y
        importeAnoActual: "U", // Z
        margen: "V", // AA
        probabilidad: "AB", // AB
        duracion: "AF", // AC
        tipoContratoId: "G",
        unidadNegocioId: "H",
        gdesPor: "Y",
        competidores: "AA",
        observaciones: "AH",
        paisUbicacion: "K"
    };
    return ofe;
}

var comprobarTodosLosCamposCodificados = function (ofe, done) {
    async.series({
        responsable: function (callback) {
            comprobarCampoCodificado(ofe['responsable'], 'usuarioId', 'usuarios', false, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        },
        faseOferta: function (callback) {
            comprobarCampoCodificado(ofe['faseOferta'], 'faseOfertaId', 'fases_oferta', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        },
        divisa: function (callback) {
            comprobarCampoCodificado(ofe['divisa'], 'divisaId', 'divisas', false, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        area: function (callback) {
            comprobarCampoCodificado(ofe['area'], 'areaId', 'areas', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        empresa: function (callback) {
            comprobarCampoCodificado(ofe['empresa'], 'empresaId', 'empresas', false, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        pais: function (callback) {
            comprobarCampoCodificado(ofe['pais'], 'paisId', 'paises', false, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        tipoOportunidad: function (callback) {
            comprobarCampoCodificado(ofe['tipoOportunidad'], 'tipoOportunidadId', 'tipos_oportunidad', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        servicio: function (callback) {
            comprobarCampoCodificado(ofe['servicio'], 'servicioId', 'servicios', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        estado: function (callback) {
            comprobarCampoCodificado(ofe['estado'], 'estadoId', 'estados', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        razonPerdida: function (callback) {
            comprobarCampoCodificado(ofe['razonPerdida'], 'razonPerdidaId', 'razon_perdida', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        tipoContratoId: function (callback) {
            comprobarCampoCodificado(ofe['tipoContratoId'], 'tipoContratoId', 'tipos_contrato', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        },
        unidadNegocioId: function (callback) {
            comprobarCampoCodificado(ofe['unidadNegocioId'], 'unidadNegocioId', 'unidades_negocio', true, function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        }
    }, function (err, results) {
        if (err) return done(err);
        ofe['responsable'] = results.responsable;
        ofe['faseOferta'] = results.faseOferta;
        ofe['divisa'] = results.divisa;
        ofe['area'] = results.area;
        ofe['empresa'] = results.empresa;
        ofe['pais'] = results.pais;
        ofe['tipoOportunidad'] = results.tipoOportunidad;
        ofe['servicio'] = results.servicio;
        ofe['estado'] = results.estado;
        ofe['razonPerdida'] = results.razonPerdida;
        ofe['tipoContratoId'] = results.tipoContratoId;
        ofe['unidadNegocioId'] = results.unidadNegocioId;
        done(null, ofe);
    })
}


var comprobarCampoCodificado = function (nombre, nomKey, nomTabla, multi, done) {
    comun.getConnectionCallback(function (err, con) {
        if (err) return done(err);
        var sql = "SELECT * FROM " + nomTabla + " WHERE nombre LIKE'%" + nombre + "%'";
        if (multi) {
            sql += " OR nombreEN LIKE'%" + nombre + "%'";
            sql += " OR nombreFR LIKE'%" + nombre + "%'";
        }
        con.query(sql, function (err, rows) {
            con.end();
            if (err) return done(err);
            if (rows.length == 0) {
                done(null, null);
            } else {
                done(null, rows[0][nomKey]);
            }
        });
    });
}

var listaDeOfertasPreparadas = function (ofertas, done) {

}

var verSiElCodigoDeUnaOfertaYaExiste = function (codigo, done) {
    comun.getConnectionCallback(function (err, con) {
        if (err) return done(err);
        var sql = "SELECT * FROM ofertas WHERE codigo = ? AND NOT codigo IS NULL";
        sql = mysql.format(sql, codigo);
        con.query(sql, function (err, rows) {
            con.end();
            if (err) return done(err);
            if (rows.length == 0) {
                done(null, 0);
            } else {
                done(null, rows[0].ofertaId);
            }
        });
    });
}

var actualizarMensajeOfertaDb = function (ofertas, done) {
    var ofertasActualizadas = [];
    var i = 0;
    async.eachSeries(ofertas, function (oferta, callback) {
        var msg = "<strong>[" + i + "]</strong>";
        oferta.ofertaDb = {};
        // numeroOferta
        if (oferta.oferta.numeroOferta) {
            msg += " N.OFERTA:" + oferta.oferta.numeroOferta;
            oferta.ofertaDb.numeroOferta = oferta.oferta.numeroOferta;
        } else {
            msg += " N.OFERTA:" + fnPonerEnRojo('VACIA');
            oferta.ofertaDb.numeroOferta = null;
        }
        // pais
        if (oferta.oferta.pais) {
            msg += " PAIS:" + oferta.oferta.pais;;
            oferta.ofertaDb.paisId = oferta.oferta.pais;
        } else {
            msg += " PAIS:" + fnPonerEnRojo('NO ENCONTRADO');
            oferta.ofertaDb.paisId = null;
        }
        // empresa
        if (oferta.oferta.empresa) {
            msg += " EMPRESA:" + oferta.oferta.empresa;
            oferta.ofertaDb.empresaId = oferta.oferta.empresa;
        } else {
            msg += " EMPRESA:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.empresaId = null;
        }
        // faseOferta
        if (oferta.oferta.faseOferta) {
            msg += " FASE OFERTA:" + oferta.oferta.faseOferta;
            oferta.ofertaDb.faseOfertaId = oferta.oferta.faseOferta;
        } else {
            msg += " FASE OFERTA:" + fnPonerEnRojo('NO ENCONTRADO');
            oferta.ofertaDb.faseOfertaId = null;
        }
        // tipoOportunidad
        if (oferta.oferta.tipoOportunidad) {
            msg += " TIPO OPORTUNIDAD:" + oferta.oferta.tipoOportunidad;
            oferta.ofertaDb.tipoOportunidadId = oferta.oferta.tipoOportunidad;
        } else {
            msg += " TIPO OPORTUNIDAD:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.tipoOportunidadId = null;
        }
        // tipoContratoId
        if (oferta.oferta.tipoContratoId) {
            msg += " TIPO CONTRATO:" + oferta.oferta.tipoContratoId;
            oferta.ofertaDb.tipoContratoId = oferta.oferta.tipoContratoId;
        } else {
            msg += " TIPO CONTRATO:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.tipoContratoId = null;
        }
        // unidadNegocioId
        if (oferta.oferta.unidadNegocioId) {
            msg += " UNIDAD NEGOCIO:" + oferta.oferta.unidadNegocioId;
            oferta.ofertaDb.unidadNegocioId = oferta.oferta.unidadNegocioId;
        } else {
            msg += " UNIDAD NEGOCIO:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.unidadNegocioId = null;
        }
        // area
        if (oferta.oferta.area) {
            msg += " AREA:" + oferta.oferta.area;
            oferta.ofertaDb.areaId = oferta.oferta.area;
        } else {
            msg += " AREA:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.areaId = null;
        }
        // ubicacion
        if (oferta.oferta.ubicacion) {
            msg += " UBICACION:" + oferta.oferta.ubicacion;
            oferta.ofertaDb.ubicacion = oferta.oferta.ubicacion;
        } else {
            msg += " UBICACION:" + fnPonerEnRojo('VACIA');
            oferta.ofertaDb.ubicacion = null;
        }
        // paisUbicacion
        if (oferta.oferta.paisUbicacion) {
            msg += " PAIS UBICACION:" + oferta.oferta.paisUbicacion;
            oferta.ofertaDb.paisUbicacion = oferta.oferta.paisUbicacion;
        } else {
            msg += " PAIS UBICACION:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.paisUbicacion = null;
        }
        // cliente
        if (oferta.oferta.cliente) {
            msg += " CLIENTE:" + oferta.oferta.cliente;
            oferta.ofertaDb.cliente = oferta.oferta.cliente;
        } else {
            msg += " PAIS UBICACION:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.cliente = null;
        }
        // licitacion
        if (oferta.oferta.licitacion) {
            msg += " N.LICITACION:" + oferta.oferta.licitacion;
            oferta.ofertaDb.numeroLicitacion = oferta.oferta.licitacion;
        } else {
            msg += " N.LICITACION:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.numeroLicitacion = null;
        }
        // codigo
        if (oferta.oferta.codigo) {
            msg += " CODIGO:" + oferta.oferta.codigo;
            oferta.ofertaDb.codigoOferta = oferta.oferta.codigo;
        } else {
            msg += " CODIGO:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.codigoOferta = null;
        }
        // nombre corto
        if (oferta.oferta.nombreCorto) {
            msg += " NOMBRE CORTO:" + oferta.oferta.nombreCorto;
            oferta.ofertaDb.nombreCorto = oferta.oferta.nombreCorto;
        } else {
            msg += " NOMBRE CORTO:" + fnPonerEnRojo('VACIA');
            oferta.ofertaDb.nombreCorto = null;
        }
        // nombre 
        if (oferta.oferta.nombre) {
            msg += " NOMBRE:" + oferta.oferta.nombre;
            oferta.ofertaDb.descripcion = oferta.oferta.nombre;
        } else {
            msg += " NOMBRE:" + fnPonerEnRojo('VACIA');
            oferta.ofertaDb.descripcion = null;
        }
        // servicio 
        if (oferta.oferta.servicio) {
            msg += " SERVICIO:" + oferta.oferta.servicio;
            oferta.ofertaDb.servicioId = oferta.oferta.servicio;
        } else {
            msg += " SERVICIO:" + fnPonerEnRojo('NO ENCONTRADO');
            oferta.ofertaDb.servicioId = null;
        }
        // estado
        if (oferta.oferta.estado) {
            msg += " ESTADO:" + oferta.oferta.estado;
            oferta.ofertaDb.estadoId = oferta.oferta.estado;
        } else {
            msg += " ESTADO:" + fnPonerEnRojo('NO ENCONTRADO');
            oferta.ofertaDb.estadoId = null;
        }
        // importe
        if (oferta.oferta.importe) {
            msg += " IMPORTE:" + oferta.oferta.importe;
            oferta.ofertaDb.importePresupuesto = oferta.oferta.importe;
        } else {
            msg += " IMPORTE:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.importePresupuesto = null;
        }
        // divisa
        if (oferta.oferta.divisa) {
            msg += " DIVISA:" + oferta.oferta.divisa;
            oferta.ofertaDb.divisaId = oferta.oferta.divisa;
        } else {
            msg += " DIVISA:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.divisaId = null;
        }
        // importeAnoActual
        if (oferta.oferta.importeAnoActual) {
            msg += " IMPORTE AÑO ACT.:" + oferta.oferta.importeAnoActual;
            oferta.ofertaDb.importePrimerAno = oferta.oferta.importeAnoActual;
        } else {
            msg += " IMPORTE AÑO ACT:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.importePrimerAno = null;
        }
        // margen
        if (oferta.oferta.margen) {
            msg += " MARGEN:" + oferta.oferta.margen;
            oferta.ofertaDb.margenContribucion = oferta.oferta.margen;
        } else {
            msg += " MARGEN:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.margenContribucion = null;
        }
        // fechaEntrega
        var vfecha = fnVerificarFechaCorrecta(oferta.oferta.fechaEntrega);
        if (vfecha != "") {
            msg += " FECHA ENTREGA:" + vfecha;;
            oferta.ofertaDb.fechaEntrega = vfecha;
        } else {
            msg += " FECHA ENTREGA:" + fnPonerEnRojo('VACIA O INCORRECTA');
            oferta.ofertaDb.fechaEntrega = null;
        }
        // responsable
        if (oferta.oferta.responsable) {
            msg += " RESPONSABLE:" + oferta.oferta.responsable;
            oferta.ofertaDb.responsableId = oferta.oferta.responsable;
        } else {
            msg += " RESPONSABLE:" + fnPonerEnRojo('NO ENCONTRADO');
            oferta.ofertaDb.responsableId = null;
        }
        // gdesPor
        if (oferta.oferta.gdesPor && oferta.oferta.gdesPor != "-") {
            msg += " UTE%:" + oferta.oferta.gdesPor;
            oferta.ofertaDb.gdesPor = oferta.oferta.gdesPor;
        } else {
            msg += " UTE%:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.gdesPor = null;
        }
        // pedido
        if (oferta.oferta.pedido) {
            msg += " PEDIDO:" + oferta.oferta.pedido;
            oferta.ofertaDb.numeroPedido = oferta.oferta.pedido;
        } else {
            msg += " PEDIDO:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.numeroPedido = null;
        }
        // competidores
        if (oferta.oferta.competidores) {
            msg += " COMPETIDORES:" + oferta.oferta.competidores;
            oferta.ofertaDb.competidores = oferta.oferta.competidores;
        } else {
            msg += " COMPETIDORES:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.competidores = null;
        }
        // probabilidad
        if (oferta.oferta.probabilidad) {
            msg += " PROBABILIDAD:" + oferta.oferta.probabilidad;
            oferta.ofertaDb.probabilidad = oferta.oferta.probabilidad;
        } else {
            msg += " PROBABILIDAD:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.probabilidad = null;
        }
        // fechaAdjudicacion
        var vfecha = fnVerificarFechaCorrecta(oferta.oferta.fechaAdjudicacion);
        if (vfecha != "") {
            msg += " FECHA INICIO:" + vfecha;;
            oferta.ofertaDb.fechaAdjudicacion = vfecha;
        } else {
            msg += " FECHA INICIO:" + fnPonerEnRojo('VACIA O INCORRECTA');
            oferta.ofertaDb.fechaAdjudicacion = null;
        }
        // fechaInicio
        var vfecha = fnVerificarFechaCorrecta(oferta.oferta.fechaInicio);
        if (vfecha != "") {
            msg += " FECHA INICIO:" + vfecha;;
            oferta.ofertaDb.fechaInicioContrato = vfecha;
        } else {
            msg += " FECHA INICIO:" + fnPonerEnRojo('VACIA O INCORRECTA');
            oferta.ofertaDb.fechaInicioContrato = null;
        }
        // fechaFin
        var vfecha = fnVerificarFechaCorrecta(oferta.oferta.fechaFin);
        if (vfecha != "") {
            msg += " FECHA FIN:" + vfecha;;
            oferta.ofertaDb.fechaFinContrato = vfecha;
        } else {
            msg += " FECHA FIN:" + fnPonerEnRojo('VACIA O INCORRECTA');
            oferta.ofertaDb.fechaFinContrato = null;
        }
        // duracion
        if (oferta.oferta.duracion) {
            msg += " CODIGO:" + oferta.oferta.duracion;
            oferta.ofertaDb.duracion = oferta.oferta.duracion;
        } else {
            msg += " CODIGO:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.duracion = null;
        }
        // razonPerdida
        if (oferta.oferta.razonPerdida) {
            msg += " RAZON PERDIDA:" + oferta.oferta.razonPerdida;
            oferta.ofertaDb.razonPerdidaId = oferta.oferta.razonPerdida;
        } else {
            msg += " RAZON PERDIDA:" + fnPonerEnRojo('NO ENCONTRADA');
            oferta.ofertaDb.razonPerdidaId = null;
        }
        // observaciones
        if (oferta.oferta.observaciones) {
            msg += " OBSERVACIONES:" + oferta.oferta.observaciones;
            oferta.ofertaDb.observaciones = oferta.oferta.observaciones;
        } else {
            msg += " OBSERVACIONES:" + fnPonerEnRojo('VACIO');
            oferta.ofertaDb.observaciones = null;
        }
        // ------------------- REORGANIZACION


        verSiElCodigoDeUnaOfertaYaExiste(oferta.oferta.codigo, function (err, cod) {
            if (err) return callback(err);
            oferta.ofertaDb.ofertaId = cod;
            msg += " OFERTA_ID:" + cod;
            if (cod == 0) {
                msg += fnPonerEnAzul(' [CREAR OFERTA]');
            } else {
                msg += fnPonerEnVerde(' [MODIFICAR OFERTA]');
            }
            // cargar en actualizadas
            i++;
            oferta.mensaje = msg;
            ofertasActualizadas.push(oferta);
            callback();
        });
    }, function (err) {
        if (err) return done(err);
        done(null, ofertasActualizadas);
    });
}


var verSiElCodigoDeUnaOfertaYaExiste = function (codigo, done) {
    comun.getConnectionCallback(function (err, con) {
        if (err) return done(err);
        var sql = "SELECT * FROM ofertas WHERE codigoOferta = ? AND NOT codigoOferta IS NULL";
        sql = mysql.format(sql, codigo);
        con.query(sql, function (err, rows) {
            con.end();
            if (err) return done(err);
            if (rows.length == 0) {
                done(null, 0);
            } else {
                done(null, rows[0].ofertaId);
            }
        });
    });
}

var fnVerificarFechaCorrecta = function (vfecha) {
    if (!vfecha || vfecha == "") return "";
    var v2fecha = ExcelDateToJSDate(vfecha);
    return moment(v2fecha).format("YYYY-MM-DD");
}

var fnPonerEnRojo = function (msg) {
    return "<span style='color:red;'>" + msg + "</span>";
}

var fnPonerEnAzul = function (msg) {
    return "<span style='color:blue;'>" + msg + "</span>";
}

var fnPonerEnVerde = function (msg) {
    return "<span style='color:green;'>" + msg + "</span>";
}


var ExcelDateToJSDate = function (serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
}
module.exports = router;