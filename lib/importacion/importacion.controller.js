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
        responsable: "B",
        faseOferta: "C",
        ubicacion: "D",
        nombreCorto: "E",
        divisa: "F",
        area: "G",
        empresa: "H",
        pais: "I",
        tipoOportunidad: "J",
        numOferta: "K",
        fechaEntrega: "L",
        codigo: "M",
        licitacion: "N",
        cliente: "O",
        servicio: "P",
        nombre: "Q",
        estado: "R",
        pedido: "S",
        importe: "T",
        notas: "U",
        razonPerdida: "V",
        fechaInicio: "W",
        fechaFin: "X",
        fechaAdjudicacion: "Y",
        importeAnoActual: "Z",
        margen: "AA",
        probabilidad: "AB",
        duracion: "AC"
    };
    return ofe;
}

var comprobarTodosLosCamposCodificados = function (ofe, done) {
    async.series({
        responsable: function (callback) {
            comprobarCampoCodificado(ofe['responsable'], 'userId', 'usuarios', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        },
        faseOferta: function (callback) {
            comprobarCampoCodificado(ofe['faseOferta'], 'faseOfertaId', 'fases_oferta', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });
        },
        divisa: function (callback) {
            comprobarCampoCodificado(ofe['divisa'], 'divisaId', 'divisas', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        area: function (callback) {
            comprobarCampoCodificado(ofe['area'], 'areaId', 'areas', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        empresa: function (callback) {
            comprobarCampoCodificado(ofe['empresa'], 'empresaId', 'empresas', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        pais: function (callback) {
            comprobarCampoCodificado(ofe['pais'], 'paisId', 'paises', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        tipoOportunidad: function (callback) {
            comprobarCampoCodificado(ofe['tipoOportunidad'], 'tipoOportunidadId', 'tipos_oportunidad', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        servicio: function (callback) {
            comprobarCampoCodificado(ofe['servicio'], 'servicioId', 'servicios', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        estado: function (callback) {
            comprobarCampoCodificado(ofe['estado'], 'estadoId', 'estados', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
        razonPerdida: function (callback) {
            comprobarCampoCodificado(ofe['razonPerdida'], 'razonPerdidaId', 'razon_perdida', function (err, val) {
                if (err) return callback(err);
                callback(null, val);
            });

        },
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
        done(null, ofe);
    })
}


var comprobarCampoCodificado = function (nombre, nomKey, nomTabla, done) {
    comun.getConnectionCallback(function (err, con) {
        if (err) return done(err);
        var sql = "SELECT * FROM " + nomTabla + " WHERE nombre = '" + nombre + "'";
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
        var msg = "LINEA " + i;
        oferta.ofertaDb = {};
        // responsable
        if (oferta.oferta.responsable) {
            msg += " RESPONSABLE: CORRECTO";
            oferta.ofertaDb.responsableId = oferta.oferta.responsable;
        } else {
            msg += " RESPONSABLE: NO ENCONTRADO";
            oferta.ofertaDb.responsableId = null;
        }
        // faseOferta
        if (oferta.oferta.faseOferta) {
            msg += " FASE OFERTA: CORRECTO";
            oferta.ofertaDb.faseOfertaId = oferta.oferta.faseOferta;
        } else {
            msg += " FASE OFERTA: NO ENCONTRADO";
            oferta.ofertaDb.faseOfertaId = null;
        }
        // ubicacion
        if (oferta.oferta.ubicacion) {
            msg += " UBICACION: CORRECTO";
            oferta.ofertaDb.ubicacion = oferta.oferta.ubicacion;
        } else {
            msg += " UBICACION: VACIA";
            oferta.ofertaDb.ubicacion = null;
        }

        // cargar en actualizadas
        oferta.mensaje = msg;
        ofertasActualizadas.push(oferta);
        callback();
    }, function (err) {
        if (err) return done(err);
        done(null, ofertasActualizadas);
    });
}

module.exports = router;