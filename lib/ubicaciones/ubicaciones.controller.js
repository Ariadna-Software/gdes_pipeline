/*
 ubicaciones.controller.js
 Gestión de las rutas de Ubicaciones de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var ubicacionesDb = require("../ubicaciones/ubicaciones.db_mysql");

router.get('/', function (req, res) {
    ubicacionesDb.get(function (err, ubicaciones) {
        if (err) return res.status(500).send(err.message);
        res.json(ubicaciones);
    });
});

router.get('/:ubicacionId', function (req, res) {
    var ubicacionId = req.params.ubicacionId;
    if (!ubicacionId) return res.status(400).send('Debe indicar el identificador de ubicacion');
    ubicacionesDb.getById(ubicacionId, function (err, ubicaciones) {
        if (err) return res.status(500).send(err.message);
        if (ubicaciones.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(ubicaciones[0]);
    });
})

router.post('/', function (req, res) {
    var ubicacion = req.body;
    if (!ubicacion) return res.status(400).send('Debe incluir un objeto de ubicacion en el cuerpo del mensaje');
    ubicacionesDb.post(ubicacion, function (err, ubicacion) {
        if (err) return res.status(500).send(err.message);
        res.json(ubicacion);
    });
});

router.put('/', function (req, res) {
    var ubicacion = req.body;
    if (!ubicacion) return res.status(400).send('Debe incluir un objeto de ubicacion en el cuerpo del mensaje');
    ubicacionesDb.put(ubicacion, function (err, ubicacion) {
        if (err) return res.status(500).send(err.message);
        res.json(ubicacion);
    });
});

router.delete('/:ubicacionId', function (req, res) {
    var ubicacionId = req.params.ubicacionId;
    if (!ubicacionId) return res.status(400).send('Debe indicar el identificador de ubicacion');
    ubicacionesDb.delete(ubicacionId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;