/*
 directores-areas.controller.js
 Gestión de las rutas de los directores de area de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var dirAreasDb = require("../directores-areas/directores-areas.db_mysql");

router.get('/', function (req, res) {
    dirAreasDb.get(function (err, dirAreas) {
        if (err) return res.status(500).send(err.message);
        res.json(dirAreas);
    });
});

router.get('/:dirAreaId', function (req, res) {
    var dirAreaId = req.params.dirAreaId;
    if (!dirAreaId) return res.status(400).send('Debe indicar el identificador del director de área');
    dirAreasDb.getById(dirAreaId, function (err, dirAreas) {
        if (err) return res.status(500).send(err.message);
        if (dirAreas.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(dirAreas[0]);
    });
})

router.post('/', function (req, res) {
    var dirArea = req.body;
    if (!dirArea) return res.status(400).send('Debe incluir un objeto de director de area en el cuerpo del mensaje');
    dirAreasDb.post(dirArea, function (err, dirArea) {
        if (err) return res.status(500).send(err.message);
        res.json(dirArea);
    });
});

router.put('/', function (req, res) {
    var dirArea = req.body;
    if (!dirArea) return res.status(400).send('Debe incluir un objeto de dirtector de area en el cuerpo del mensaje');
    dirAreasDb.put(dirArea, function (err, dirArea) {
        if (err) return res.status(500).send(err.message);
        res.json(dirArea);
    });
});

router.delete('/:dirAreaId', function (req, res) {
    var dirAreaId = req.params.dirAreaId;
    if (!dirAreaId) return res.status(400).send('Debe indicar el identificador del director de  area');
    dirAreasDb.delete(dirAreaId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;