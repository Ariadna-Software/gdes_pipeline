/*
 unidades-negocio.controller.js
 Gestión de las rutas de unidades de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var unidadesNegocioDb = require("../unidades-negocio/unidades-negocio.db_mysql");

router.get('/', function (req, res) {
    unidadesNegocioDb.get(function (err, unidades) {
        if (err) return res.status(500).send(err.message);
        res.json(unidades);
    });
});

router.get('/multi/en', function (req, res) {
    unidadesNegocioDb.getMultiEN(function (err, unidades) {
        if (err) return res.status(500).send(err.message);
        res.json(unidades);
    });
});

router.get('/multi/fr', function (req, res) {
    unidadesNegocioDb.getMultiFR(function (err, unidades) {
        if (err) return res.status(500).send(err.message);
        res.json(unidades);
    });
});

router.get('/:unidadNegocioId', function (req, res) {
    var unidadNegocioId = req.params.unidadNegocioId;
    if (!unidadNegocioId) return res.status(400).send('Debe indicar el identificador de unidad');
    unidadesNegocioDb.getById(unidadNegocioId, function (err, unidades) {
        if (err) return res.status(500).send(err.message);
        if (unidades.length == 0) return res.status(404).send("Unidad no encontrado");
        res.json(unidades[0]);
    });
})

router.post('/', function (req, res) {
    var unidadNegocios = req.body;
    if (!unidadNegocios) return res.status(400).send('Debe incluir un objeto de unidad en el cuerpo del mensaje');
    unidadesNegocioDb.post(unidadNegocios, function (err, unidad) {
        if (err) return res.status(500).send(err.message);
        res.json(unidad);
    });
});

router.put('/', function (req, res) {
    var unidadNegocios = req.body;
    if (!unidadNegocios) return res.status(400).send('Debe incluir un objeto de unidad en el cuerpo del mensaje');
    unidadesNegocioDb.put(unidadNegocios, function (err, unidad) {
        if (err) return res.status(500).send(err.message);
        res.json(unidad);
    });
});

router.delete('/:unidadNegocioId', function (req, res) {
    var unidadNegocioId = req.params.unidadNegocioId;
    if (!unidadNegocioId) return res.status(400).send('Debe indicar el identificador de unidad');
    unidadesNegocioDb.delete(unidadNegocioId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;