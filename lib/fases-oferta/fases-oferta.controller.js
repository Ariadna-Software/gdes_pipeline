/*
 fasesOferta.controller.js
 Gestión de las rutas de fasesOferta de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var fasesOfertaDb = require("../fases-oferta/fases-oferta.db_mysql");

router.get('/', function (req, res) {
    fasesOfertaDb.get(function (err, fasesOferta) {
        if (err) return res.status(500).send(err.message);
        res.json(fasesOferta);
    });
});

router.get('/multi/en', function (req, res) {
    fasesOfertaDb.getMultiEN(function (err, fasesOferta) {
        if (err) return res.status(500).send(err.message);
        res.json(fasesOferta);
    });
});

router.get('/multi/fr', function (req, res) {
    fasesOfertaDb.getMultiFR(function (err, fasesOferta) {
        if (err) return res.status(500).send(err.message);
        res.json(fasesOferta);
    });
});

router.get('/:faseOfertaId', function (req, res) {
    var faseOfertaId = req.params.faseOfertaId;
    if (!faseOfertaId) return res.status(400).send('Debe indicar el identificador de faseOferta');
    fasesOfertaDb.getById(faseOfertaId, function (err, fasesOferta) {
        if (err) return res.status(500).send(err.message);
        if (fasesOferta.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(fasesOferta[0]);
    });
})

router.post('/', function (req, res) {
    var faseOferta = req.body;
    if (!faseOferta) return res.status(400).send('Debe incluir un objeto de faseOferta en el cuerpo del mensaje');
    fasesOfertaDb.post(faseOferta, function (err, faseOferta) {
        if (err) return res.status(500).send(err.message);
        res.json(faseOferta);
    });
});

router.put('/', function (req, res) {
    var faseOferta = req.body;
    if (!faseOferta) return res.status(400).send('Debe incluir un objeto de faseOferta en el cuerpo del mensaje');
    fasesOfertaDb.put(faseOferta, function (err, faseOferta) {
        if (err) return res.status(500).send(err.message);
        res.json(faseOferta);
    });
});

router.delete('/:faseOfertaId', function (req, res) {
    var faseOfertaId = req.params.faseOfertaId;
    if (!faseOfertaId) return res.status(400).send('Debe indicar el identificador de faseOferta');
    fasesOfertaDb.delete(faseOfertaId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;