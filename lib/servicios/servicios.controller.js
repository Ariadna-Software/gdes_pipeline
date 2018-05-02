/*
 servicios.controller.js
 Gestión de las rutas de servicios de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var serviciosDb = require("../servicios/servicios.db_mysql");

router.get('/', function (req, res) {
    serviciosDb.get(function (err, servicios) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios);
    });
});

router.get('/multi/en', function (req, res) {
    serviciosDb.getMultiEN(function (err, servicios) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios);
    });
});

router.get('/multi/fr', function (req, res) {
    serviciosDb.getMultiFR(function (err, servicios) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios);
    });
});

router.get('/:servicioId', function (req, res) {
    var servicioId = req.params.servicioId;
    if (!servicioId) return res.status(400).send('Debe indicar el identificador de servicio');
    serviciosDb.getById(servicioId, function (err, servicios) {
        if (err) return res.status(500).send(err.message);
        if (servicios.length == 0) return res.status(404).send("Servicio no encontrado");
        res.json(servicios[0]);
    });
})

router.get('/area/:areaId', function (req, res) {
    var areaId = req.params.areaId;
    if (!areaId) return res.status(400).send('Debe indicar el identificador de servicio');
    serviciosDb.getByAreaId(areaId, function (err, servicios) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios);
    });
})

router.post('/', function (req, res) {
    var servicio = req.body;
    if (!servicio) return res.status(400).send('Debe incluir un objeto de servicio en el cuerpo del mensaje');
    serviciosDb.post(servicio, function (err, servicio) {
        if (err) return res.status(500).send(err.message);
        res.json(servicio);
    });
});

router.put('/', function (req, res) {
    var servicio = req.body;
    if (!servicio) return res.status(400).send('Debe incluir un objeto de servicio en el cuerpo del mensaje');
    serviciosDb.put(servicio, function (err, servicio) {
        if (err) return res.status(500).send(err.message);
        res.json(servicio);
    });
});

router.delete('/:servicioId', function (req, res) {
    var servicioId = req.params.servicioId;
    if (!servicioId) return res.status(400).send('Debe indicar el identificador de servicio');
    serviciosDb.delete(servicioId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;