/*
 directores-areas_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var dirAreasDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT * FROM directores_area";
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
            var sql = "SELECT * FROM directores_area WHERE directorId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    post: function(dirArea, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO directores_area SET ?";
            sql = mysql.format(sql, dirArea);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                dirArea.directorId = grupo.insertId;
                done(null, dirArea);
            });
        });
    },
    put: function(dirArea, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE directores_area SET ? WHERE directorId = ?";
            sql = mysql.format(sql, [dirArea, dirArea.directorId]);
            con.query(sql, function (err, dirArea) {
                con.end();
                if (err) return done(err);
                done(null, dirArea);
            });
        });
    },
    delete: function(id, done){
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM directores_area WHERE directorId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    }
}

module.exports = dirAreasDbAPI;