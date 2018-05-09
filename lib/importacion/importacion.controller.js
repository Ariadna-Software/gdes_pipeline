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
                console.log("K: %s, V: %s", key, col);
                if (sheet[col] == undefined) {
                    ofV[key] = "";
                } else {
                    ofV[key] = sheet[col].v;
                }
                ofertasVirtuales.push(ofV);
            }
            i++;
        }
    }
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
            comprobarCampoCodificado(ofe['empresa'],'empresaId', 'empresas', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
        pais: function (callback) {
            comprobarCampoCodificado(ofe['pais'],'paisId', 'paises', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
        tipoOportunidad: function (callback) {
            comprobarCampoCodificado(ofe['tipoOportunidad'],'tipoOportunidadId', 'tipos_oportunidad', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
        servicio: function (callback) {
            comprobarCampoCodificado(ofe['servicio'],'servicioId', 'servicios', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
        estado: function (callback) {
            comprobarCampoCodificado(ofe['estado'],'estadoId', 'estados', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
        razonPerdida: function (callback) {
            comprobarCampoCodificado(ofe['razonPerdida'],'razonPerdidaId', 'razon_perdida', function(err, val){
                if (err) return callback(err);
                callback(null, val);
            });

        },
    }, function (err, results) {
        if (err) return done(err);
        ofe['responsable'] = results[0];
        ofe['faseOferta'] = results[1];
        ofe['divisa'] = results[2];
        ofe['area'] = results[3];
        ofe['empresa'] = results[4];
        ofe['pais'] = results[5];
        ofe['tipoOportunidad'] = results[6];
        ofe['servicio'] = results[7];
        ofe['estado'] = results[9];
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

module.exports = router;