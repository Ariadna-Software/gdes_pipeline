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
    var dFecha = req.query.dFecha
    var hFecha = req.query.hFecha
    pwbiDb.getT1TB1(fase, pais, dFecha, hFecha, function (err, pwbi) {
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
    pwbiDb.getT4TB1(pais, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T5TB1', function (req, res) {
    var area = req.query.area;
    var pais = req.query.pais;
    pwbiDb.getT5TB1(area, pais, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

router.get('/T5TB2', function (req, res) {
    var area = req.query.area;
    var pais = req.query.pais;
    pwbiDb.getT5TB2(area, pais, function (err, pwbi) {
        if (err) return res.status(500).send(err.message);
        res.json(pwbi);
    });
});

module.exports = router;