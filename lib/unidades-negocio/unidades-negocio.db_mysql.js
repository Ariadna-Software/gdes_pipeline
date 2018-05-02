/*
 unidades-negocio_db_mysql.js
 Gestión del acceso a la base de datos para los unidades de negocio
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var unidadesNegocioDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM unidades_negocio";
            con.query(sql, function (err, unidades) {
                con.end(function (err2) {
                    if (err) return done(err);
                    done(null, unidades);
                });
            });
        });
    },
    getMultiEN: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT unidadNegocioId, nombreEN as nombre FROM unidades_negocio";
            con.query(sql, function (err, unidades) {
                con.end(function (err2) {
                    if (err) return done(err);
                    done(null, unidades);
                });
            });
        });
    },
    getMultiFR: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT unidadNegocioId, nombreFR as nombre FROM unidades_negocio";
            con.query(sql, function (err, unidades) {
                con.end(function (err2) {
                    if (err) return done(err);
                    done(null, unidades);
                });
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM unidades_negocio WHERE unidadNegocioId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, unidades) {
                con.end();
                if (err) return done(err);
                done(null, unidades);
            });
        });
    },
    post: function (unidadNegocios, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO unidades_negocio SET ?";
            sql = mysql.format(sql, unidadNegocios);
            con.query(sql, function (err, unidad) {
                con.end();
                if (err) return done(err);
                unidadNegocios.unidadNegocioId = unidad.insertId;
                done(null, unidadNegocios);
            });
        });
    },
    put: function (unidadNegocios, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE unidades_negocio SET ? WHERE unidadNegocioId = ?";
            sql = mysql.format(sql, [unidadNegocios, unidadNegocios.unidadNegocioId]);
            con.query(sql, function (err, unidad) {
                con.end();
                if (err) return done(err);
                done(null, unidadNegocios);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM unidades_negocio WHERE unidadNegocioId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, unidad) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = unidadesNegocioDbAPI;