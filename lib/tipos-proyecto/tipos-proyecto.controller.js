/*
 tiposProyecto.controller.js
 Gestión de las rutas de tiposProyecto de usuarios en la API
*/
var express = require("express");
var router = express.Router();
var tiposProyectoDb = require("../tipos-proyecto/tipos-proyecto.db_mysql");

router.get('/', function (req, res) {
    tiposProyectoDb.get(function (err, tiposProyecto) {
        if (err) return res.status(500).send(err.message);
        res.json(tiposProyecto);
    });
});

router.get('/:tipoProyectoId', function (req, res) {
    var tipoProyectoId = req.params.tipoProyectoId;
    if (!tipoProyectoId) return res.status(400).send('Debe indicar el identificador de tipo proyecto');
    tiposProyectoDb.getById(tipoProyectoId, function (err, tiposProyecto) {
        if (err) return res.status(500).send(err.message);
        if (tiposProyecto.length == 0) return res.status(404).send("Grupo no encontrado");
        res.json(tiposProyecto[0]);
    });
})

router.post('/', function (req, res) {
    var tipoProyecto = req.body;
    if (!tipoProyecto) return res.status(400).send('Debe incluir un objeto de tipo proyecto en el cuerpo del mensaje');
    tiposProyectoDb.post(tipoProyecto, function (err, tipoProyecto) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoProyecto);
    });
});

router.put('/', function (req, res) {
    var tipoProyecto = req.body;
    if (!tipoProyecto) return res.status(400).send('Debe incluir un objeto de tipo proyecto en el cuerpo del mensaje');
    tiposProyectoDb.put(tipoProyecto, function (err, tipoProyecto) {
        if (err) return res.status(500).send(err.message);
        res.json(tipoProyecto);
    });
});

router.delete('/:tipoProyectoId', function (req, res) {
    var tipoProyectoId = req.params.tipoProyectoId;
    if (!tipoProyectoId) return res.status(400).send('Debe indicar el identificador de tipo proyecto');
    tiposProyectoDb.delete(tipoProyectoId, function (err, result) {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

module.exports = router;