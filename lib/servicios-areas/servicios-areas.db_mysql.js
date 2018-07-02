/*
 servicios_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun"),
    async = require("async");

var serviciosAreasDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT sa.*, a.nombre AS nombreArea, s.nombre as nombreServicio FROM servicios_areas AS sa";
            sql += " LEFT JOIN areas AS a ON a.areaId = sa.areaId";
            sql += " LEFT JOIN servicios AS s ON s.servicioId = sa.servicioId";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getAreasServicio: function (servicioId, done) {
        // Obtiene los descriptores de áreas de un servicio
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT a.* FROM servicios_areas AS sa"
            sql += " LEFT JOIN areas AS a ON a.areaId = sa.areaId"
            sql += " WHERE sa.servicioId = ?";
            sql = mysql.format(sql, servicioId);
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                areas = "";
                rows.forEach(function (r) {
                    areas = areas + r.nombre + " // ";
                });
                done(null, areas);
            });
        });
    },
    getById: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT sa.*, a.nombre AS nombreArea, s.nombre as nombreServicio FROM servicios_areas AS sa";
            sql += " LEFT JOIN areas AS a ON a.areaId = sa.areaId";
            sql += " LEFT JOIN servicios AS s ON s.servicioId = sa.servicioId";
            sql += " WHERE sa.servicioId = ?";
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
            var sql = "SELECT s.* FROM servicios_areas AS sa";
            sql += " LEFT JOIN areas AS a ON a.areaId = sa.areaId";
            sql += " LEFT JOIN servicios AS s ON s.servicioId = sa.servicioId";
            sql += " WHERE sa.areaId = ?";
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
            var sql = "INSERT INTO servicios_areas SET ?";
            sql = mysql.format(sql, servicio);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                servicio.servicioId = grupo.insertId;
                done(null, servicio);
            });
        });
    },
    postAreas: function (servicioId, areas, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM servicios_areas WHERE servicioId = ?";
            sql = mysql.format(sql, servicioId);
            con.query(sql, function (err, grupo) {
                if (err) { con.end(); return done(err); }
                async.forEachSeries(areas, function (area, callaback) {
                    servicio_area = {
                        servicioAreaId: 0,
                        servicioId: servicioId,
                        areaId: area
                    };
                    sql = "INSERT INTO servicios_areas SET ?";
                    sql = mysql.format(sql, servicio_area);
                    con.query(sql, function (err) {
                        if (err) return callaback(err);
                        callaback();
                    });
                }, function (err) {
                    if (err) { con.end(); return done(err); }
                    con.end();
                    done(null, true);
                });
            });
        });
    },
    put: function (servicio, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE servicios_areas SET ? WHERE servicioAreaId = ?";
            sql = mysql.format(sql, [servicio, servicio.servicioAreaId]);
            con.query(sql, function (err, servicio) {
                con.end();
                if (err) return done(err);
                done(null, servicio);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM servicios_areas WHERE servicioId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = serviciosAreasDbAPI;