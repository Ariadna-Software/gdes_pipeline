/*
 seguidores_db_mysql.js
 Gestión del acceso a la base de datos para los seguidores de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun"),
    async = require("async");

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
    postSeguidoresOferta: function (ofertaId, usuarioId, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            // Obtener un vector de seguidores de esa oferta
            var seguidores = [];
            var sql = "SELECT u.usuarioId AS u1, u2.usuarioId AS u2, u3.usuarioId AS u3";
            sql += " FROM usuarios AS u";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = u.responsableId";
            sql += " LEFT JOIN usuarios AS u3 ON u3.grupoUsuarioId = u.grupoUsuarioId";
            sql += " WHERE u.usuarioId = ?";
            sql = mysql.format(sql, usuarioId);
            con.query(sql, function (err, regs) {
                if (err) { conn.end(); return done(err); }
                // si no pertenece a ningún grupo ni tiene responsable no habrá registros
                if (regs.length == 0) { conn.end(); return (null, 'OK') }
                // si tiene responsable lo ponemos en seguidores
                if (regs[0].u2) {
                    seguidores.push({
                        ofertaId: ofertaId,
                        usuarioId: regs[0].u2
                    });
                }
                // Ahora incluimos en la lista de seguidores a los de su grupo
                regs.forEach(function (e) {
                    // Evitamos ponerle a él mismo como seguidor
                    if (e.u3 != usuarioId && e.u3 != e.u2) {
                        // añadimos su compañero de grupo como seguidor
                        seguidores.push({
                            ofertaId: ofertaId,
                            usuarioId: e.u3
                        });
                    }
                });
                // Ya ahora que ya tenemos la lista damos de alta en la tabla de seguidores
                async.eachSeries(seguidores, function (s, callback) {
                    var sql = "INSERT INTO seguidores SET ?";
                    sql = mysql.format(sql, s);
                    con.query(sql, function (err, grupo) {
                        if (err) { return callback(err); }
                        callback();
                    });
                }, function (err) {
                    // ahora ya podemos cerrar la conexión
                    con.end();
                    if (err) return done(err);
                    done(null, 'OK');
                });
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