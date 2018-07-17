/*
 pwbi.controller.js
 Gestión de las rutas de pwbi de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var pwbiDb = require("../pwbi/pwbi.db_mysql");

router.get('/', function (req, res) {
    pwbiDb.get(function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T1TB1', function (req, res) {
    var fase = req.query.fase;
    var pais = req.query.pais;
    var dFecha = req.query.dFecha;
    var hFecha = req.query.hFecha;
    var estado = req.query.estado;
    if (!estado) estado = "";
    pwbiDb.getT1TB1(fase, pais, dFecha, hFecha, estado, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T1TB2', function (req, res) {
    var fase = req.query.fase;
    var pais = req.query.pais;
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    var estado = req.query.estado;
    pwbiDb.getT1TB2(fase, pais, dFecha, hFecha, estado, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T3TB1', function (req, res) {
    var fase = req.query.fase;
    var pais = req.query.pais;
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    var estado = req.query.estado;
    pwbiDb.getT3TB1(fase, pais, dFecha, hFecha, estado, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T4TB1', function (req, res) {
    var pais = req.query.pais;
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    if (!dFecha) dFecha = "";
    if (!hFecha) hFecha = "";
    pwbiDb.getT4TB1(pais, dFecha, hFecha, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T5TB1', function (req, res) {
    var area = req.query.area;
    var pais = req.query.pais;
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    if (!dFecha) dFecha = "";
    if (!hFecha) hFecha = "";
    pwbiDb.getT5TB1(area, pais, dFecha, hFecha, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/config', function (req, res) {
    pwbiDb.getConfig(function (err, config) {
        res.json(config);
    });
});

router.get('/T5TB2', function (req, res) {
    var area = req.query.area;
    var pais = req.query.pais;
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    if (!dFecha) dFecha = "";
    if (!hFecha) hFecha = "";
    pwbiDb.getT5TB2(area, pais, dFecha, hFecha, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/dim-users', (req, res) => {
    pwbiDb.getDimUsers((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-areas', (req, res) => {
    pwbiDb.getDimAreas((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-business-units', (req, res) => {
    pwbiDb.getDimBusinessUnits((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-services', (req, res) => {
    pwbiDb.getDimServices((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-deal-stages', (req, res) => {
    pwbiDb.getDimDealStages((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-offer-types', (req, res) => {
    pwbiDb.getDimOfferTypes((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-contract-types', (req, res) => {
    pwbiDb.getDimContractTypes((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-status', (req, res) => {
    pwbiDb.getDimStatus((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-reasons-lost', (req, res) => {
    pwbiDb.getDimReasonsLost((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/dim-currencies', (req, res) => {
    pwbiDb.getDimCurrencies((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
;
router.get('/dim-countries', (req, res) => {
    pwbiDb.getDimCountries((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});
router.get('/mesures-offers', (req, res) => {
    pwbiDb.getMesuresOffers((err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

module.exports = router;