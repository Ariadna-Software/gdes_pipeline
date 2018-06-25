/*
 versiones_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var versionesDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT v.*, u.nombre AS usuario, d.nombre as divisa FROM versiones AS v";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = v.usuarioId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = v.divisaId";
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
            var sql = "SELECT v.*, u.nombre AS usuario, d.nombre as divisa FROM versiones AS v";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = v.usuarioId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = v.divisaId";
            sql += " WHERE v.versionId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getByOfertaId: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT v.*, u.nombre AS usuario, d.nombre as divisa FROM versiones AS v";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = v.usuarioId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = v.divisaId";
            sql += " WHERE v.ofertaId = ? ORDER BY numVersion DESC";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function (version, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO versiones SET ?";
            sql = mysql.format(sql, version);
            con.query(sql, function (err, grupo) {
                if (err) { con.end(); return done(err); }
                version.versionId = grupo.insertId;
                sql = "UPDATE ofertas SET version = " + version.numVersion + " WHERE ofertaId = " + version.ofertaId;
                con.query(sql, function (err, grupo) {
                    con.end();
                    if (err) return done(err);
                    done(null, version);
                });
            });
        });
    },
    put: function (version, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE versiones SET ? WHERE versionId = ?";
            sql = mysql.format(sql, [version, version.versionId]);
            con.query(sql, function (err, version) {
                con.end();
                if (err) return done(err);
                done(null, version);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM versiones WHERE versionId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = versionesDbAPI;