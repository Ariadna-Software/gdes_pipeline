/*
 tiposContrato_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var tiposContratoDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM tipos_contrato";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM tipos_contrato WHERE tipoContratoId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(tipoContrato, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO tipos_contrato SET ?";
            sql = mysql.format(sql, tipoContrato);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                tipoContrato.tipoContratoId = grupo.insertId;
                done(null, tipoContrato);
            });
        });
    },
    put: function(tipoContrato, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE tipos_contrato SET ? WHERE tipoContratoId = ?";
            sql = mysql.format(sql, [tipoContrato, tipoContrato.tipoContratoId]);
            con.query(sql, function (err, tipoContrato) {
                con.end();
                if (err) return done(err);
                done(null, tipoContrato);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM tipos_contrato WHERE tipoContratoId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = tiposContratoDbAPI;