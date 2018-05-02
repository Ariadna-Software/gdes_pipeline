/*
 tiposContrato.controller.js
 Gestión de las rutas de tiposContrato de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var tiposContratoDb = require("../razon-perdida/razon-perdida.db_mysql");

router.get('/', function (req, res) {
    tiposContratoDb.get(function (err, tiposContrato) {
        if (err) return res.status(500).send(err.message);
        res.json(tiposContrato);
    });
});

router.get('/multi/en', function (req, res) {
    tiposContratoDb.getMultiEN(function (err, tiposContrato) {
        if (err) return res.status(500).send(err.message);
        res.json(tiposContrato);
    });
});

router.get('/multi/fr', function (req, res) {
    tiposContratoDb.getMultiFR(function (err, tiposContrato) {
        if (err) return res.status(500).send(err.message);
        res.json(tiposContrato);
    });
});

router.get('/:tipoContratoId', function (req, res) {
    var tipoContratoId = req.params.tipoContratoId;
    if (!tipoContratoId) return res.status(400).send('Debe indicar el identificador de tipo contrato');
    tiposContratoDb.getById(tipoContratoId, function (err, tiposContrato) {
        if (err) return res.status(500).send(err.message);
        if (tiposContrato.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(tiposContrato[0]);
    });
})

router.post('/', function (req, res) {
    var tipoContrato = req.body;
    if (!tipoContrato) return res.status(400).send('Debe incluir un objeto de tipo contrato en el cuerpo del mensaje');
    tiposContratoDb.post(tipoContrato, function (err, tipoContrato) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoContrato);
    });
});

router.put('/', function (req, res) {
    var tipoContrato = req.body;
    if (!tipoContrato) return res.status(400).send('Debe incluir un objeto de tipo contrato en el cuerpo del mensaje');
    tiposContratoDb.put(tipoContrato, function (err, tipoContrato) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoContrato);
    });
});

router.delete('/:tipoContratoId', function (req, res) {
    var tipoContratoId = req.params.tipoContratoId;
    if (!tipoContratoId) return res.status(400).send('Debe indicar el identificador de tipo contrato');
    tiposContratoDb.delete(tipoContratoId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;