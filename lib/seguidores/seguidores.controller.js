/*
 seguidores.controller.js
 Gestión de las rutas de seguidores de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var seguidoresDb = require("../seguidores/seguidores.db_mysql");

router.get('/', function (req, res) {
    seguidoresDb.get(function (err, seguidores) {
        if (err) return res.status(500).send(err.message);
        res.json(seguidores);
    });
});

router.get('/:seguidorId', function (req, res) {
    var seguidorId = req.params.seguidorId;
    if (!seguidorId) return res.status(400).send('Debe indicar el identificador de seguidor');
    seguidoresDb.getById(seguidorId, function (err, seguidores) {
        if (err) return res.status(500).send(err.message);
        if (seguidores.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(seguidores[0]);
    });
})

router.get('/ofertas/:ofertaId', function (req, res) {
    var ofertaId = req.params.ofertaId;
    if (!ofertaId) return res.status(400).send('Debe indicar el identificador de seguidor');
    seguidoresDb.getByOfertaId(ofertaId, function (err, seguidores) {
        if (err) return res.status(500).send(err.message);
        res.json(seguidores);
    });
})

router.post('/', function (req, res) {
    var seguidor = req.body;
    if (!seguidor) return res.status(400).send('Debe incluir un objeto de seguidor en el cuerpo del mensaje');
    seguidoresDb.post(seguidor, function (err, seguidor) {
        if (err) return res.status(500).send(err.message);
        res.json(seguidor);
    });
});

router.put('/', function (req, res) {
    var seguidor = req.body;
    if (!seguidor) return res.status(400).send('Debe incluir un objeto de seguidor en el cuerpo del mensaje');
    seguidoresDb.put(seguidor, function (err, seguidor) {
        if (err) return res.status(500).send(err.message);
        res.json(seguidor);
    });
});

router.delete('/:seguidorId', function (req, res) {
    var seguidorId = req.params.seguidorId;
    if (!seguidorId) return res.status(400).send('Debe indicar el identificador de seguidor');
    seguidoresDb.delete(seguidorId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;