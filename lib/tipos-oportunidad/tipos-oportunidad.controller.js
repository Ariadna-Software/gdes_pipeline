/*
 tiposOportunidad.controller.js
 Gestión de las rutas de tiposOportunidad de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var tiposOportunidadDb = require("../tipos-oportunidad/tipos-oportunidad.db_mysql");

router.get('/', function (req, res) {
    tiposOportunidadDb.get(function (err, tiposOportunidad) {
        if (err) return res.status(500).send(err.message);
        res.json(tiposOportunidad);
    });
});

router.get('/:tipoOportunidadId', function (req, res) {
    var tipoOportunidadId = req.params.tipoOportunidadId;
    if (!tipoOportunidadId) return res.status(400).send('Debe indicar el identificador de tipo oportunidad');
    tiposOportunidadDb.getById(tipoOportunidadId, function (err, tiposOportunidad) {
        if (err) return res.status(500).send(err.message);
        if (tiposOportunidad.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(tiposOportunidad[0]);
    });
})

router.post('/', function (req, res) {
    var tipoOportunidad = req.body;
    if (!tipoOportunidad) return res.status(400).send('Debe incluir un objeto de tipo oportunidad en el cuerpo del mensaje');
    tiposOportunidadDb.post(tipoOportunidad, function (err, tipoOportunidad) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoOportunidad);
    });
});

router.put('/', function (req, res) {
    var tipoOportunidad = req.body;
    if (!tipoOportunidad) return res.status(400).send('Debe incluir un objeto de tipo oportunidad en el cuerpo del mensaje');
    tiposOportunidadDb.put(tipoOportunidad, function (err, tipoOportunidad) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoOportunidad);
    });
});

router.delete('/:tipoOportunidadId', function (req, res) {
    var tipoOportunidadId = req.params.tipoOportunidadId;
    if (!tipoOportunidadId) return res.status(400).send('Debe indicar el identificador de tipo oportunidad');
    tiposOportunidadDb.delete(tipoOportunidadId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;