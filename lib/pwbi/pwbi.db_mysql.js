/*
 pwbi_db_mysql.js
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");

var pwbiDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            done(null, "PWBI working");
        });
    },
    getT1TB1: function (fase, pais, dFecha, hFecha, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT"
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN as areaEN, o.estadoId";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " WHERE TRUE";
            if (fase != "") sql += " AND o.faseOfertaId = " + fase;
            if (pais != "") sql += " AND o.paisId = " + pais;
            if (dFecha != "") {
                vFecha = moment(dFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion >= '" + vFecha + "'";
            }
            if (hFecha != "") {
                vFecha = moment(hFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion <= '" + vFecha + "'";
            }
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT1TB2: function (fase, pais, dFecha, hFecha, estado, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT"
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN as areaEN, o.estadoId, o.notasEstado";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " WHERE TRUE";
            if (fase != "") sql += " AND o.faseOfertaId = " + fase;
            if (pais != "") sql += " AND o.paisId = " + pais;
            if (dFecha != "") {
                vFecha = moment(dFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion >= '" + vFecha + "'";
            }
            if (hFecha != "") {
                vFecha = moment(hFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion <= '" + vFecha + "'";
            }
            if (estado != "") sql += " AND o.estadoId = " + estado;
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT5TB1: function (area, pais, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN AS areaEN, o.estadoId, o.notasEstado, o.cliente,";
            sql += " o.numeroOferta, u.nombre AS usuario, DATE_FORMAT(o.fechaEntrega, '%Y-%m-%d') AS fechaEntrega,";
            sql += " o.competidores, o.subcontrataSN AS reclutamientoSN, o.subcontrataTXT AS subcontrataTXT,";
            sql += " DATE_FORMAT(v.fechaCambio, '%Y-%m-%d') AS fechaVersion, v.importePresupuesto AS importeVersion,";
            sql += " f.nombreEN AS fase, o.puntosRelevantes"
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.usuarioId";
            sql += " LEFT JOIN versiones AS v ON v.ofertaId = o.ofertaId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE TRUE";
            if (area != "") sql += " AND o.areaId = " + area;
            if (pais != "") sql += " AND o.paisId = " + pais;
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT5TB2: function (area, pais, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN AS areaEN, o.estadoId, o.notasEstado, o.cliente,";
            sql += " o.numeroOferta, u.nombre AS usuario, DATE_FORMAT(o.fechaEntrega, '%Y-%m-%d') AS fechaEntrega,";
            sql += " o.competidores, o.subcontrataSN AS reclutamientoSN, o.subcontrataTXT AS subcontrataTXT,";
            sql += " f.nombreEN AS fase, o.puntosRelevantes"
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.usuarioId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE TRUE";
            if (area != "") sql += " AND o.areaId = " + area;
            if (pais != "") sql += " AND o.paisId = " + pais;
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT3TB1: function (fase, pais, dFecha, hFecha, estado, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN AS areaEN, o.estadoId, o.notasEstado, o.cliente,";
            sql += " o.numeroOferta, u.nombre AS usuario, DATE_FORMAT(o.fechaEntrega, '%Y-%m-%d') AS fechaEntrega,";
            sql += " o.competidores, o.subcontrataSN AS reclutamientoSN, o.subcontrataTXT AS subcontrataTXT,";
            sql += " f.nombreEN AS fase, o.puntosRelevantes,"
            sql += " o.actividadesrealizadas, o.actividadesPlanificadas"
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.usuarioId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE TRUE";
            if (fase != "") sql += " AND o.faseOfertaId = " + fase;
            if (pais != "") sql += " AND o.paisId = " + pais;
            if (dFecha != "") {
                vFecha = moment(dFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion >= '" + vFecha + "'";
            }
            if (hFecha != "") {
                vFecha = moment(hFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion <= '" + vFecha + "'";
            }
            if (estado != "") sql += " AND o.estadoId = " + estado;
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT4TB1: function (pais, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, o.cliente, o.nombreCorto, o.importePresupuesto AS importeGdes, a.nombreEN AS areaEN,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " p.nombre as pais, p.codPais, a.nombre as areaServicio, o.ubicacion";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN paises as p ON p.paisId = o.paisId"
            sql += " WHERE estadoId = 2";
            if (pais != "") sql += " AND o.paisId = " + pais;
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnFiveYearsResults(rows));
            });
        });
    },
}

module.exports = pwbiDbAPI;

var fnCalculateExpectedRevenew = function (rows) {
    var rows2 = [];
    rows.forEach(function (r) {
        r.expRevenue = 0;
        // solo ganadas o abiertas
        if (r.estadoId == 1 || r.estadoId == 2) {
            if (r.estadoId == 2) {
                // ganada to pa ella.
                r.expRevenue = r.importeGdes
            } else {
                if (r.probabilidad == 50) r.expRevenue = r.importeGdes * 0.5;
                if (r.probabilidad >= 80) r.expRevenue = r.importeGdes;
            }
        }
        rows2.push(r);
    });
    return rows2;
}

var fnFiveYearsResults = function (rows) {
    var currentYear = moment().year();
    var rows2 = [];
    rows.forEach(function (r) {
        var a = 0;
        for (var i = currentYear; i < (currentYear + 5); i++) {
            r['Y' + a] = i;
            r['I' + a] = fnCalculateAmountForYear(r.fechaInicioContrato, r.fechaFinContrato, r.importeGdes, i);
            a++;
        }
        rows2.push(r);
    });
    return rows2;
}

var fnCalculateAmountForYear = function (fDate, tDate, amount, year) {
    // Si no hay fechas no hay cálculo
    if (!fDate || !tDate) return 0;
    // calcular el año final de contrato
    var firstYear = moment(fDate).year();
    var lastYear = moment(tDate).year();
    // Si ya se acabó el contrato importe cero
    if (year > lastYear) return 0;
    // Ahora habrá que calcular un importe cogemos costo dia
    var contractDays = moment(tDate).diff(moment(fDate), 'days');
    var costDay = amount / contractDays;
    // caso el contrato empieza y acaba en el año
    if (year == firstYear && year == lastYear) {
        return amount;
    }
    // caso el contrato empieza en el año, pero no acaba en él
    if (year == firstYear && year < lastYear) {
        contractDays = moment(year + '-12-31').diff(moment(fDate), 'days');
        return (contractDays * costDay);
    }
    // caso el contrato no empieza ni acaba en el año
    if (year > firstYear && year < lastYear) {
        contractDays = moment(year + '-12-31').diff(moment(year + '-01-01'), 'days');
        return (contractDays * costDay);
    }
    // caso el contrato no empieza, pero acaba en el año
    if (year > firstYear && year == lastYear) {
        contractDays = moment(tDate).diff(moment(year + '-01-01'), 'days');
        return (contractDays * costDay);
    }
    // si escapa a cero
    return 0;
}