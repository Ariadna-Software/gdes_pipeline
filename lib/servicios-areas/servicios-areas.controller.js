/*
 servicios-areas.controller.js
 Gestión de las rutas de servicios-areas de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var serviciosAreasDb = require("../servicios-areas/servicios-areas.db_mysql");

router.get('/', function (req, res) {
    serviciosAreasDb.get(function (err, servicios_areas) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios_areas);
    });
});


router.get('/:servicioId', function (req, res) {
    var servicioId = req.params.servicioId;
    if (!servicioId) return res.status(400).send('Debe indicar el identificador de servicio');
    serviciosAreasDb.getById(servicioId, function (err, servicios_areas) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios_areas);
    });
})

router.get('/area/:areaId', function (req, res) {
    var areaId = req.params.areaId;
    if (!areaId) return res.status(400).send('Debe indicar el identificador de área');
    serviciosAreasDb.getByAreaId(areaId, function (err, servicios_areas) {
        if (err) return res.status(500).send(err.message);
        res.json(servicios_areas);
    });
})

router.post('/', function (req, res) {
    var servicio = req.body;
    if (!servicio) return res.status(400).send('Debe incluir un objeto de servicio-area en el cuerpo del mensaje');
    serviciosAreasDb.post(servicio, function (err, servicio) {
        if (err) return res.status(500).send(err.message);
        res.json(servicio);
    });
});


router.post('/areas/:servicioId', function (req, res) {
    var areas = req.body;
    var servicioId = req.params.servicioId;
    if (!areas || !servicioId) return res.status(400).send('Debe indicar el servicio y las áreas relacionadas');
    serviciosAreasDb.postAreas(servicioId, areas, function (err, servicio) {
        if (err) return res.status(500).send(err.message);
        res.json(servicio);
    });
});

router.put('/', function (req, res) {
    var servicio = req.body;
    if (!servicio) return res.status(400).send('Debe incluir un objeto de servicio-are en el cuerpo del mensaje');
    serviciosAreasDb.put(servicio, function (err, servicio) {
        if (err) return res.status(500).send(err.message);
        res.json(servicio);
    });
});

router.delete('/:servicioId', function (req, res) {
    var servicioId = req.params.servicioId;
    if (!servicioId) return res.status(400).send('Debe indicar el identificador de servicio');
    serviciosAreasDb.delete(servicioId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;