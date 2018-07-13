/*
 ofertas_db_mysql.js
 Gestión del acceso a la base de datos para los grupos de usuarios
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun"),
    async = require("async");

var seguidoresDb = require("../seguidores/seguidores.db_mysql");

var ofertasDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getCortas: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.tipoOferta = 1";
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
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.ofertaId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getPorResponsable: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.responsableId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getPorGrupoResponsable: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.responsableId IN ";
            sql += " (SELECT r.responsableId";
            sql += " FROM responsables AS r";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = r.usuarioId";
            sql += " WHERE u.grupoUsuarioId IN (SELECT gu.grupoUsuarioId";
            sql += " FROM responsables AS r";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = r.usuarioId";
            sql += " LEFT JOIN grupos_usuarios AS gu ON gu.grupoUsuarioId = u.grupoUsuarioId";
            sql += " WHERE r.responsableId = ?))"
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },
    getPorResponsableSeguidores: function (id, id2, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.responsableId = ?";
            sql += " OR o.usuarioId = ?";
            sql += " OR o.ofertaId IN (SELECT ofertaId FROM seguidores WHERE usuarioId = ?)";
            sql += " OR o.usuarioId IN (SELECT usuarioId FROM usuarios WHERE responsableId = ?)";
            sql += " OR o.responsableId IN (SELECT usuarioId FROM usuarios WHERE responsableId = ?)"
            sql = mysql.format(sql, [id2,id2, id2, id2, id2]);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },  
    getPorResponsableSeguidoresCorta: function (id, id2, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT o.*, "
            sql += " a.nombre AS nomArea, un.nombre AS nomUnidadNegocio, e.nombre AS nomEmpresa, p.nombre AS pais,";
            sql += " fo.nombre AS faseOferta, top.nombre AS tipoOportunidad, tcn.nombre AS tipoContrato,";
            sql += " es.nombre AS estado, rz.nombre AS razonPerdida,  d.nombre AS divisa, ser.nombre as servicio, u2.nombre as responsable";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = o.unidadNegocioId";
            sql += " LEFT JOIN empresas AS e ON e.empresaId = o.empresaId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = o.faseOfertaId";
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = o.tipoOportunidadId";
            sql += " LEFT JOIN tipos_contrato AS tcn ON tcn.tipoContratoId = o.tipoContratoId";
            sql += " LEFT JOIN estados AS es ON es.estadoId = o.estadoId";
            sql += " LEFT JOIN razon_perdida AS rz ON rz.razonPerdidaId = o.razonPerdidaId";
            sql += " LEFT JOIN divisas AS d ON d.divisaId = o.divisaId";
            sql += " LEFT JOIN servicios AS ser ON ser.servicioId = o.servicioId";
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = o.responsableId";
            sql += " WHERE o.tipoOferta = 1 AND o.responsableId = ?";
            sql += " OR o.usuarioId = ?";
            sql += " OR o.ofertaId IN (SELECT ofertaId FROM seguidores WHERE usuarioId = ?)"
            sql = mysql.format(sql, [id,id2, id2]);
            con.query(sql, function (err, grupos) {
                con.end();
                if (err) return done(err);
                done(null, grupos);
            });
        });
    },      
    post: function (oferta, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "INSERT INTO ofertas SET ?";
            sql = mysql.format(sql, oferta);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                oferta.ofertaId = grupo.insertId;
                seguidoresDb.postSeguidoresOferta(oferta.ofertaId, oferta.usuarioId, function(err){
                    if (err) return done(err);
                    done(null, oferta);
                })
            });
        });
    },
    put: function (oferta, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "UPDATE ofertas SET ? WHERE ofertaId = ?";
            sql = mysql.format(sql, [oferta, oferta.ofertaId]);
            con.query(sql, function (err, oferta) {
                con.end();
                if (err) return done(err);
                done(null, oferta);
            });
        });
    },
    delete: function (id, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "DELETE FROM ofertas WHERE ofertaId =  ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, grupo) {
                con.end();
                if (err) return done(err);
                done(null, 'OK');
            });
        });
    },
    postFexcel: function(ofertas, done){
        var ofertas2 = [];
        async.eachSeries(ofertas, function(ofe, callback){
            if (ofe.ofertaId == 0) {
                // alta
                ofertasDbAPI.post(ofe, function(err, row){
                    if (err) return callback(err);
                    ofertas2.push(row);
                    callback();
                });
            }else {
                // modificación
                ofertasDbAPI.put(ofe, function(err, row){
                    if (err) return callback(err);
                    ofertas2.push(row);
                    callback();
                });
            }
        }, function(err){
            if (err) return done(err);
            done(null, ofertas2);
        })
    }
}

module.exports = ofertasDbAPI;