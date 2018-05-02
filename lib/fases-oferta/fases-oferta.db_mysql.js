/*
 fasesOferta_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var fasesOfertaDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM fases_oferta";
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
            var sql = "SELECT faseOfertaId, nombreEN as nombre FROM fases_oferta";
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
            var sql = "SELECT faseOfertaId, nombreFR as nombre FROM fases_oferta";
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
            var sql = "SELECT * FROM fases_oferta WHERE faseOfertaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(faseOferta, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO fases_oferta SET ?";
            sql = mysql.format(sql, faseOferta);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                faseOferta.faseOfertaId = grupo.insertId;
                done(null, faseOferta);
            });
        });
    },
    put: function(faseOferta, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE fases_oferta SET ? WHERE faseOfertaId = ?";
            sql = mysql.format(sql, [faseOferta, faseOferta.faseOfertaId]);
            con.query(sql, function (err, faseOferta) {
                con.end();
                if (err) return done(err);
                done(null, faseOferta);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM fases_oferta WHERE faseOfertaId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = fasesOfertaDbAPI;