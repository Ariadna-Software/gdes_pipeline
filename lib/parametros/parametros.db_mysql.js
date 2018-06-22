/*
 parametros_db_mysql.js
 Gestión del acceso a la base de datos para los parametros de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun"),
    async = require("async");

var pad = function (num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

var parametrosDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM parametros";
            con.query(sql, function (err, parametros) {
                con.end();
                if (err) return done(err);
                done(null, parametros);
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM parametros WHERE parametrosId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, parametros) {
                con.end();
                if (err) return done(err);
                done(null, parametros);
            });
        });
    },
    post: function (parametros, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO parametros SET ?";
            sql = mysql.format(sql, parametros);
            con.query(sql, function (err, parametro) {
                con.end();
                if (err) return done(err);
                parametros.parametrosId = parametro.insertId;
                done(null, parametros);
            });
        });
    },
    put: function (parametros, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE parametros SET ? WHERE parametrosId = ?";
            sql = mysql.format(sql, [parametros, parametros.parametrosId]);
            con.query(sql, function (err, parametros) {
                con.end();
                if (err) return done(err);
                done(null, parametros);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM parametros WHERE parametrosId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, parametro) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    },
    getContador: function (empresaId, areaId, ano, done) {
        contadores = {};
        async.waterfall([
            // Leer los valores actuales
            function (callback) {
                comun.getConnectionCallback(function (err, con) {
                    if (err) return callback(err);
                    var sql = "SELECT * FROM parametros WHERE parametrosId = 0";
                    con.query(sql, function (err, parametros) {
                        con.end();
                        if (err) return callback(err);
                        callback(null, parametros[0]);
                    });
                });
            },
            // Comprobar si hay o no coincidencia de años
            function (parametros, callback) {
                contadores.contador = parametros.valorActualAno;
                if (parametros.anoEnCurso == ano) {
                    // solo hay que incrementar el contador
                    parametros.valorActualAno++;
                } else {
                    // ha cambiado de año
                    parametros.anoEnCurso = ano;
                    parametros.valorActualAno = parametros.valorInicialAno + 1;
                    contadores.contador = parametros.valorInicialAno;
                }
                callback(null, parametros);
            },
            // Actualizar los parámetros con los nuevos valores
            function (parametros, callback) {
                comun.getConnectionCallback(function (err, con) {
                    if (err) return callback(err);
                    var sql = "UPDATE parametros SET ? WHERE parametrosId = 0";
                    sql = mysql.format(sql, parametros);
                    con.query(sql, function (err, parametros) {
                        con.end();
                        if (err) return callback(err);
                        callback(null);
                    });
                });
            },
            // Obtener los valores numeroOferta y codigoOferta
            function (callback) {
                contadores.numeroOferta = ano.toString().slice(-2) + pad(contadores.contador, 4);
                // Leer los valores de abreviatura de empresa y area para montar el codigo Oferta
                async.waterfall([
                    // Leer COD de empresa
                    function (callback2) {
                        comun.getConnectionCallback(function (err, con) {
                            if (err) return callback2(err);
                            var sql = "SELECT * FROM empresas WHERE empresaId = ?";
                            sql = mysql.format(sql, empresaId);
                            con.query(sql, function (err, empresas) {
                                con.end();
                                if (err) return callback2(err);
                                cod = "XXX";
                                if (empresas.length != 0) cod = empresas[0].cod;
                                callback2(null, cod);
                            });
                        });
                    },
                    // Leer COD de area
                    function (cod1, callback2) {
                        comun.getConnectionCallback(function (err, con) {
                            if (err) return callback2(err);
                            var sql = "SELECT * FROM areas WHERE areaId = ?";
                            sql = mysql.format(sql, areaId);
                            con.query(sql, function (err, areas) {
                                con.end();
                                if (err) return callback2(err);
                                var cod2 = "XXX";
                                if (areas.length != 0) cod2 = areas[0].cod
                                contadores.codigoOferta = cod1 + "-" + cod2 + "-" + contadores.numeroOferta + ".R0";
                                callback2();
                            });
                        });
                    }
                ], function (err) {
                    if (err) return callback(err);
                    callback();
                });
            }
        ], function (err) {
            if (err) return done(err);
            done(null, contadores);
        });

    }
}



module.exports = parametrosDbAPI;