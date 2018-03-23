/*
 versiones.controller.js
 Gestión de las rutas de versiones de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var versionesDb = require("../versiones/versiones.db_mysql");

router.get('/', function (req, res) {
    versionesDb.get(function (err, versiones) {
        if (err) return res.status(500).send(err.message);
        res.json(versiones);
    });
});

router.get('/:versionId', function (req, res) {
    var versionId = req.params.versionId;
    if (!versionId) return res.status(400).send('Debe indicar el identificador de version');
    versionesDb.getById(versionId, function (err, versiones) {
        if (err) return res.status(500).send(err.message);
        if (versiones.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(versiones[0]);
    });
})

router.get('/oferta/:ofertaId', function (req, res) {
    var ofertaId = req.params.ofertaId;
    if (!ofertaId) return res.status(400).send('Debe indicar el identificador de oferta');
    versionesDb.getByOfertaId(ofertaId, function (err, versiones) {
        if (err) return res.status(500).send(err.message);
        res.json(versiones);
    });
})

router.post('/', function (req, res) {
    var version = req.body;
    if (!version) return res.status(400).send('Debe incluir un objeto de version en el cuerpo del mensaje');
    versionesDb.post(version, function (err, version) {
        if (err) return res.status(500).send(err.message);
        res.json(version);
    });
});

router.put('/', function (req, res) {
    var version = req.body;
    if (!version) return res.status(400).send('Debe incluir un objeto de version en el cuerpo del mensaje');
    versionesDb.put(version, function (err, version) {
        if (err) return res.status(500).send(err.message);
        res.json(version);
    });
});

router.delete('/:versionId', function (req, res) {
    var versionId = req.params.versionId;
    if (!versionId) return res.status(400).send('Debe indicar el identificador de version');
    versionesDb.delete(versionId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;