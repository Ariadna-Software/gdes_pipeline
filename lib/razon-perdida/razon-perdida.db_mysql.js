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
            var sql = "SELECT * FROM razon_perdida";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getMultiEN: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT razonPerdidaId, nombreEN as nombre FROM razon_perdida";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },    
    getMultiFR: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT razonPerdidaId, nombreFR as nombre FROM razon_perdida";
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
            var sql = "SELECT * FROM razon_perdida WHERE razonPerdidaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(razonPerdida, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO razon_perdida SET ?";
            sql = mysql.format(sql, razonPerdida);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                razonPerdida.razonPerdidaId = grupo.insertId;
                done(null, razonPerdida);
            });
        });
    },
    put: function(razonPerdida, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE razon_perdida SET ? WHERE razonPerdidaId = ?";
            sql = mysql.format(sql, [razonPerdida, razonPerdida.razonPerdidaId]);
            con.query(sql, function (err, razonPerdida) {
                con.end();
                if (err) return done(err);
                done(null, razonPerdida);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM razon_perdida WHERE razonPerdidaId =  ?";
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