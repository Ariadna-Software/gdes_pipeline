/*
 servicios_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun"),
    async = require("async");
var serviciosAreaDb = require("../servicios-areas/servicios-areas.db_mysql");

var serviciosDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT s.*, a.nombre AS nombreArea FROM servicios AS s";
            sql += " LEFT JOIN areas AS a ON a.areaId = s.areaId"
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                var servicios = [];
                async.forEachSeries(rows, function (s, callback) {
                    serviciosAreaDb.getAreasServicio(s.servicioId, function(err, areas){
                        if (err) return callback(err);
                        s.areas = areas;
                        servicios.push(s);
                        callback();
                    });
                }, function (err) {
                    done(null, servicios);
                });
            });
        });
    },
    getMultiEN: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT servicioId, nombreEN as nombre FROM servicios";
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
            var sql = "SELECT servicioId, nombreFR as nombre FROM servicios";
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
    getByAreaId: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM servicios WHERE areaId = ? OR areaId IS NULL";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function (servicio, done) {
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
    put: function (servicio, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE servicios SET ? WHERE servicioId = ?";
            sql = mysql.format(sql, [servicio, servicio.servicioId]);
            con.query(sql, function (err, result) {
                con.end();
                if (err) return done(err);
                done(null, servicio);
            });
        });
    },
    delete: function (id, done) {
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