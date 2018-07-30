/*
 pwbi_db_mysql.js
*/
var mysql = require("mysql"),
    moment = require("moment"),
    comun = require("../comun/comun");
var config = require("../../configMySQL.json"); //  leer la configurción de MySQL    

var pwbiDbAPI = {
    get: function (done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            done(null, "PWBI working");
        });
    },
    getT1TB1: function (fase, pais, dFecha, hFecha, estado, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT"
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN as areaEN, o.estadoId";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " WHERE (o.tipoOportunidadId <> 1 OR o.tipoOportunidadId IS NULL)";
            //if (fase != "") sql += " AND o.faseOfertaId = " + fase; (FORZADO)
            sql += " AND o.faseOfertaId = 3";
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
    getT1TB2: function (fase, pais, dFecha, hFecha, estado, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT"
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN as areaEN, o.estadoId, o.notasEstado";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " WHERE (o.tipoOportunidadId <> 1 OR o.tipoOportunidadId IS NULL)";
            // if (fase != "") sql += " AND o.faseOfertaId = " + fase; (FORZADO)
            sql += " AND o.faseOfertaId = 3";
            if (pais != "") sql += " AND o.paisId = " + pais;
            if (dFecha != "") {
                vFecha = moment(dFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion >= '" + vFecha + "'";
            }
            if (hFecha != "") {
                vFecha = moment(hFecha, "DD/MM/YYYY").format("YYYY-MM-DD");
                sql += " AND fechaCreacion <= '" + vFecha + "'";
            }
            // if (estado != "") sql += " AND o.estadoId = " + estado; (FORZADO)
            sql += " AND o.estadoId = 1";
            con.query(sql, function (err, rows) {
                con.end();
                if (err) return done(err);
                done(null, fnCalculateExpectedRevenew(rows));
            });
        });
    },
    getT5TB1: function (area, pais, dFecha, hFecha, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
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
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.responsableId";
            sql += " LEFT JOIN versiones AS v ON v.ofertaId = o.ofertaId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE (o.tipoOportunidadId <> 1 OR o.tipoOportunidadId IS NULL) AND o.faseOfertaId = 3"; // (FORZADO)
            if (area != "") sql += " AND o.areaId = " + area;
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
    getT5TB2: function (area, pais, dFecha, hFecha, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err); 1
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
            sql += " o.duracion, o.probabilidad, o.importePrimerAno, o.importeInversion,";
            sql += " p.codPais, a.nombreEN AS areaEN, o.estadoId, o.notasEstado, o.cliente,";
            sql += " o.numeroOferta, u.nombre AS usuario, DATE_FORMAT(o.fechaEntrega, '%Y-%m-%d') AS fechaEntrega,";
            sql += " o.competidores, o.subcontrataSN AS reclutamientoSN, o.subcontrataTXT AS subcontrataTXT,";
            sql += " f.nombreEN AS fase, o.puntosRelevantes"
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN estados AS e ON e.estadoId = o.estadoId";
            sql += " LEFT JOIN paises AS p ON p.paisId = o.paisId";
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.responsableId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE (o.tipoOportunidadId <> 1 OR o.tipoOportunidadId IS NULL) AND o.faseOfertaId = 3"; // (FORZADO)
            if (area != "") sql += " AND o.areaId = " + area;
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
    getT3TB1: function (fase, pais, dFecha, hFecha, estado, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, p.nombre AS pais, a.orden, o.areaId, a.nombre AS areaServicio, o.ubicacion, o.nombreCorto, e.nombreEN AS estado,";
            sql += " o.importeAnual, o.importePresupuesto AS importeGdes, o.margenContribucion AS margen, o.uteSN, o.gdesPor AS utePor,";
            sql += " DATE_FORMAT(o.fechaAdjudicacion, '%Y-%m-%d') AS fechaAdjudicacion,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
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
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = o.responsableId";
            sql += " LEFT JOIN fases_oferta AS f ON f.faseOfertaId = o.faseOfertaId"
            sql += " WHERE (o.tipoOportunidadId <> 1 OR o.tipoOportunidadId IS NULL)";
            //if (fase != "") sql += " AND o.faseOfertaId = " + fase; (FORZADO)
            sql += " AND o.faseOfertaId IN (1,2)";
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
    getT4TB1: function (pais, dFecha, hFecha, done) {
        comun.getConnectionCallback(function (err, con) {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " o.ofertaId, o.cliente, o.nombreCorto, o.importePresupuesto AS importeGdes, a.nombreEN AS areaEN,";
            sql += " DATE_FORMAT(o.fechaInicioContrato, '%Y-%m-%d') AS fechaInicioContrato,";
            sql += " DATE_FORMAT(o.fechaFinContrato, '%Y-%m-%d') AS fechaFinContrato,";
            sql += " DATE_FORMAT(o.fechaCreacion, '%Y-%m-%d') AS fechaCreacion,";
            sql += " p.nombre as pais, p.codPais, a.nombre as areaServicio, o.ubicacion";
            sql += " FROM ofertas AS o";
            sql += " LEFT JOIN areas AS a ON a.areaId = o.areaId";
            sql += " LEFT JOIN paises as p ON p.paisId = o.paisId"
            sql += " WHERE estadoId = 2";
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
                done(null, fnFiveYearsResults(rows));
            });
        });
    },
    getConfig: function (done) {
        done(null, fnEnvConf(config));
    },
    getDimUsers: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT usuarioId AS userId, nombre AS userName FROM usuarios";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimAreas: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT areaId, nombre AS areaName FROM areas";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimBusinessUnits: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT unidadNegocioId AS businessUnitId, nombre AS businessUnitName FROM unidades_negocio";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimServices: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT servicioId AS serviceId, nombre AS serviceName FROM servicios";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimDealStages: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT faseOfertaId AS dealStageId, nombre AS dealStageName FROM fases_oferta";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimOfferTypes: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT tipoOportunidadId AS offerTypeId, nombre AS offerTypeName FROM tipos_oportunidad";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimContractTypes: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT tipoContratoId AS contractTypeId, nombreEN AS contractTypeName FROM tipos_contrato";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimStatus: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT estadoId AS statusId, nombre AS statusName FROM estados";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimReasonsLost: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT razonPerdidaId AS reasonLostId, nombre AS reasonLostName FROM razon_perdida";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimCurrencies: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT divisaId AS currencyId, nombre AS currencyName FROM divisas";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getDimCountries: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT paisId AS countryId, nombre AS countryName, codPais AS countryCode FROM paises";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    },
    getMesuresOffers: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " ofertaId AS offerID,";
            sql += " numeroOferta AS offerNumber,";
            sql += " codigoOferta AS offerCode,";
            sql += " fechaCreacion AS offerCreationDate,";
            sql += " fechaOferta AS offerDate,";
            sql += " fechaUltimoEstado AS offerLastUpdateDate,";
            sql += " descripcion AS offerDescription,";
            sql += " paisId AS countryId,";
            sql += " nombreCorto AS offerShortName,";
            sql += " cliente AS offerClient,";
            sql += " ubicacion AS offerLocation,";
            sql += " periodo AS offerPeriod,";
            sql += " numeroLicitacion AS offerTenderNumber,";
            sql += "paisUbicacion AS offerCountryLocation,";
            sql += " fechaEntrega AS offerDeliveryDate,";
            sql += " fechaAdjudicacion AS offerAwardDate,";
            sql += " fechaInicioContrato AS offerContractStartDate,";
            sql += " fechaFinContrato AS offerContractEndDate,";
            sql += " duracion AS offerDuration,";
            sql += " notasPlanning AS offerPlaningNotes,";
            sql += " usuarioId AS userId,";
            sql += " areaId AS areaId,";
            sql += " unidadNegocioId AS businessUnitId,";
            sql += " responsableId AS reponsableId,";
            sql += " servicioId AS serviceId,";
            sql += " servicioId2 AS serviceId2,";
            sql += " servicioId3 AS serviceId3,";
            sql += " faseOfertaId AS dealStageId,";
            sql += " tipoOportunidadId AS offerTypeId,";
            sql += " tipoContratoId AS contractTypeId,";
            sql += " probabilidad AS estimatedProbability,";
            sql += " ofertaSingular AS singularDeal,";
            sql += " subrogacionSN AS tupe,";
            sql += " subrogacionNum AS tupeQuantity,";
            sql += " uteSN AS jv,";
            sql += " gdesPor AS jvPct,";
            sql += " subcontrataSN AS recruitment,";
            sql += " estadoId AS statusId,";
            sql += " razonPerdidaId AS reasonLostId,";
            sql += " numeroPedido AS orderNumber,";
            sql += " importePresupuesto AS gdesRevenue,";
            sql += " importeUTE AS partnerRevenue,";
            sql += " importeTotal AS totalRevenue,";
            sql += " margenContribucion AS contributionMargin,";
            sql += " importeContribucion  AS margin,";
            sql += " importeAnual AS yearlyRevenue,";
            sql += " importePrimerAno AS currentYearRevenue,";
            sql += " importeInversion AS investmentValue,";
            sql += " divisaId AS currencyId,";
            sql += " multiplicador AS factor";
            sql += " FROM ofertas";
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
    }, getMesuresOffersExtended: done => {
        comun.getConnectionCallback((err, con) => {
            if (err) return done(err);
            var sql = "SELECT";
            sql += " ofertaId AS offerID, numeroOferta AS offerNumber, codigoOferta AS offerCode, fechaCreacion AS offerCreationDate, fechaOferta AS offerDate,";
            sql += " fechaUltimoEstado AS offerLastUpdateDate, descripcion AS offerDescription,";
            sql += " ofertas.paisId AS countryId, p.codPais AS countryName,";
            sql += " nombreCorto AS offerShortName, cliente AS offerClient, ofertas.ubicacion AS offerLocation, periodo AS offerPeriod, numeroLicitacion AS offerTenderNumber,";
            sql += " paisUbicacion AS offerCountryLocation, fechaEntrega AS offerDeliveryDate, fechaAdjudicacion AS offerAwardDate, fechaInicioContrato AS offerContractStartDate,";
            sql += " fechaFinContrato AS offerContractEndDate, duracion AS offerDuration, notasPlanning AS offerPlaningNotes, ";
            sql += " ofertas.usuarioId AS userId, u.nombre AS userName,";
            sql += " ofertas.areaId AS areaId, a.nombre AS areaName,";
            sql += " ofertas.unidadNegocioId AS businessUnitId, un.nombre AS businessUnitName,";
            sql += " ofertas.responsableId AS reponsableId, u2.nombre AS responsableName,";
            sql += "ofertas.servicioId AS serviceId, s1.nombre AS service1Name,";
            sql += " ofertas.servicioId2 AS serviceId2, s2.nombre AS serviceName2,";
            sql += " ofertas.servicioId3 AS serviceId3, s3.nombre AS serviceName3,";
            sql += " ofertas.faseOfertaId AS dealStageId, fo.nombre AS dealStageName,";
            sql += " ofertas.tipoOportunidadId AS offerTypeId, top.nombre AS offerTypeName,";
            sql += " ofertas.tipoContratoId AS contractTypeId, tc.nombre AS contractTypeName,";
            sql += " probabilidad AS estimatedProbability,";
            sql += " ofertaSingular AS singularDeal,";
            sql += " subrogacionSN AS tupe,";
            sql += " subrogacionNum AS tupeQuantity,";
            sql += " uteSN AS joinVenture,";
            sql += " gdesPor AS joinVenturePercentage,";
            sql += " subcontrataSN AS recruitment,";
            sql += " ofertas.estadoId AS statusId, st.nombre AS statusName,";
            sql += " ofertas.razonPerdidaId AS reasonLostId, rp.nombre AS reasonLostName,";
            sql += " numeroPedido AS orderNumber,";
            sql += " importePresupuesto AS gdesRevenue,";
            sql += " importeUTE AS partnerRevenue,";
            sql += " importeTotal AS totalRevenue,";
            sql += " margenContribucion AS contributionMargin,";
            sql += " importeContribucion  AS margin,";
            sql += " importeAnual AS yearlyRevenue,";
            sql += " importePrimerAno AS currentYearRevenue,";
            sql += " importeInversion AS investmentValue,";
            sql += " ofertas.divisaId AS currencyId, d.nombre AS currencyName,";
            sql += " multiplicador AS factor";
            sql += " FROM ofertas";
            sql += " LEFT JOIN paises AS p ON p.paisId = ofertas.paisId"; // -- Countries
            sql += " LEFT JOIN usuarios AS u ON u.usuarioId = ofertas.usuarioId"; // -- Users
            sql += " LEFT JOIN areas AS a ON a.areaId = ofertas.areaId"; // -- Areas
            sql += " LEFT JOIN unidades_negocio AS un ON un.unidadNegocioId = ofertas.unidadNegocioId"; // -- Business Units
            sql += " LEFT JOIN usuarios AS u2 ON u2.usuarioId = ofertas.responsableId"; //-- Offer responsible
            sql += " LEFT JOIN servicios AS s1 ON s1.servicioId = ofertas.servicioId"; // -- First related service
            sql += " LEFT JOIN servicios AS s2 ON s2.servicioId = ofertas.servicioId2"; // -- Second related service
            sql += " LEFT JOIN servicios AS s3 ON s3.servicioId = ofertas.servicioId3"; // -- Third related service
            sql += " LEFT JOIN fases_oferta AS fo ON fo.faseOfertaId = ofertas.faseOfertaId"; // -- Deal stages
            sql += " LEFT JOIN tipos_oportunidad AS top ON top.tipoOportunidadId = ofertas.tipoOportunidadId" // -- Deal stages;
            sql += " LEFT JOIN tipos_contrato AS tc ON tc.tipoContratoId = ofertas.tipoContratoId" // -- Deal stages;
            sql += " LEFT JOIN estados AS st ON st.estadoId = ofertas.estadoId"; // -- Status
            sql += " LEFT JOIN razon_perdida AS rp ON rp.razonPerdidaId = ofertas.razonPerdidaId"; // -- Reason to lost
            sql += " LEFT JOIN divisas AS d ON d.divisaId = ofertas.divisaId"; // -- Currencies
            con.query(sql, (err, rows) => {
                if (err) return done(err);
                done(null, rows);
            });
        })
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

//---------------
var fnEnvConf = function () {
    var cfg1 = {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port
    };
    var cfg2 = {};
    cfg2.host = process.env.MYSQL_HOST || cfg1.host;
    cfg2.user = process.env.MYSQL_USER || cfg1.user;
    cfg2.password = process.env.MYSQL_PASSWORD || cfg1.password;
    cfg2.database = process.env.MYSQL_DATABASE || cfg1.database;
    cfg2.port = process.env.MYSQL_PORT || cfg1.port;
    return cfg2;
}