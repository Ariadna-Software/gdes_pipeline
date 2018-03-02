/*
 servicios_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var serviciosDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT s.*, a.nombre AS nombreArea FROM servicios AS s";
            sql += " LEFT JOIN areas AS a ON a.areaId = s.areaId"
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
            var sql = "SELECT * FROM servicios WHERE servicioId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(servicio, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO servicios SET ?";
            sql = mysql.format(sql, servicio);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                servicio.servicioId = grupo.insertId;
                done(null, servicio);
            });
        });
    },
    put: function(servicio, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE servicios SET ? WHERE servicioId = ?";
            sql = mysql.format(sql, [servicio, servicio.servicioId]);
            con.query(sql, function (err, servicio) {
                con.end();
                if (err) return done(err);
                done(null, servicio);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM servicios WHERE servicioId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = serviciosDbAPI;