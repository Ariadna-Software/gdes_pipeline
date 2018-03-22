/*
 seguidores_db_mysql.js
 Gestión del acceso a la base de datos para los seguidores de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var seguidoresDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT s.*, u.nombre FROM seguidores AS s";
            sql += " LEFT JOIN usuarios as u ON u.usuarioId = s.usuarioId"
            con.query(sql, function (err, seguidores) {
                con.end();
                if (err) return done(err);
                done(null, seguidores);
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT s.*, u.nombre FROM seguidores AS s";
            sql += " LEFT JOIN usuarios as u ON u.usuarioId = s.usuarioId"
            sql += "  WHERE s.seguidorId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, seguidores) {
                con.end();
                if (err) return done(err);
                done(null, seguidores);
            });
        });
    },
    getByOfertaId: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT s.*, u.nombre FROM seguidores AS s";
            sql += " LEFT JOIN usuarios as u ON u.usuarioId = s.usuarioId"
            sql += "  WHERE s.ofertaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, seguidores) {
                con.end();
                if (err) return done(err);
                done(null, seguidores);
            });
        });
    },    
    post: function (seguidor, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO seguidores SET ?";
            sql = mysql.format(sql, seguidor);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                seguidor.seguidorId = grupo.insertId;
                done(null, seguidor);
            });
        });
    },
    put: function (seguidor, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE seguidores SET ? WHERE seguidorId = ?";
            sql = mysql.format(sql, [seguidor, seguidor.seguidorId]);
            con.query(sql, function (err, seguidor) {
                con.end();
                if (err) return done(err);
                done(null, seguidor);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM seguidores WHERE seguidorId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = seguidoresDbAPI;