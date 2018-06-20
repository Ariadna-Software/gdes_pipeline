/*
 parametros.controller.js
 Gestión de las rutas de parametros de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var parametrosDb = require("../parametros/parametros.db_mysql");


router.get('/', function (req, res) {
    parametrosDb.get(function (err, parametros) {
        if (err) return res.status(500).send(err.message);
        res.json(parametros);
    });
});

router.get('/:parametrosId', function (req, res) {
    var parametrosId = req.params.parametrosId;
    if (!parametrosId) return res.status(400).send('Debe indicar el identificador de parametros');
    parametrosDb.getById(parametrosId, function (err, parametros) {
        if (err) return res.status(500).send(err.message);
        if (parametros.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(parametros[0]);
    });
});

router.get('/contadores/:empresaId/:areaId', function (req, res) {
    var empresaId = req.params.empresaId;
    var areaId = req.params.areaId;
    if (!empresaId || !areaId) return res.status(400).send('Debe indicar la empresa y el área');
    parametrosDb.getContador(empresaId, areaId, (new Date()).getFullYear(), function (err, contadores) {
        if (err) return res.status(500).send(err.message);
        res.json(contadores);
    });
});


router.post('/', function (req, res) {
    var parametros = req.body;
    if (!parametros) return res.status(400).send('Debe incluir un objeto de parametros en el cuerpo del mensaje');
    parametrosDb.post(parametros, function (err, parametros) {
        if (err) return res.status(500).send(err.message);
        res.json(parametros);
    });
});

router.put('/', function (req, res) {
    var parametros = req.body;
    if (!parametros) return res.status(400).send('Debe incluir un objeto de parametros en el cuerpo del mensaje');
    parametrosDb.put(parametros, function (err, parametros) {
        if (err) return res.status(500).send(err.message);
        res.json(parametros);
    });
});

router.delete('/:parametrosId', function (req, res) {
    var parametrosId = req.params.parametrosId;
    if (!parametrosId) return res.status(400).send('Debe indicar el identificador de parametros');
    parametrosDb.delete(parametrosId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;