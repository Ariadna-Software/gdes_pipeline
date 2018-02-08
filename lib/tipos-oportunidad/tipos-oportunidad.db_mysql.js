/*
 tiposOportunidad_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var tiposOportunidadDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM tipos_oportunidad";
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
            var sql = "SELECT * FROM tipos_oportunidad WHERE tipoOportunidadId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(tipoOportunidad, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO tipos_oportunidad SET ?";
            sql = mysql.format(sql, tipoOportunidad);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                tipoOportunidad.tipoOportunidadId = grupo.insertId;
                done(null, tipoOportunidad);
            });
        });
    },
    put: function(tipoOportunidad, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE tipos_oportunidad SET ? WHERE tipoOportunidadId = ?";
            sql = mysql.format(sql, [tipoOportunidad, tipoOportunidad.tipoOportunidadId]);
            con.query(sql, function (err, tipoOportunidad) {
                con.end();
                if (err) return done(err);
                done(null, tipoOportunidad);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM tipos_oportunidad WHERE tipoOportunidadId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = tiposOportunidadDbAPI;