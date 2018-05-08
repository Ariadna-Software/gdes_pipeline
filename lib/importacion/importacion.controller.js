/*
 importacion.controller.js
 Gestión de las rutas de areas de usuarios en la API
*/

var express = require("express");
var router = express.Router();
var XLSX = require('xlsx');
var path = require('path');

router.get('/:filename', function (req, res) {
    var filename = req.params.filename;
    if (!filename) return res.status(400).send('Debe incluir el fichero en la URL');
    fnVerificarFichero(filename, function (err, msg) {
        if (err) return res.status(500).send(err.message);
    });
});

// -- funciones de soporte
var fnVerificarFichero = function (filename, done) {
    var file = path.join(__dirname, '../../public/uploads/' + filename);
    var book = XLSX.readFile(file);
    var sheet_name = book.SheetNames[0];
    var sheet = book.Sheets[sheet_name];
    var hayDatos = true;
    var i = 3;
    var ofertasVirtuales = [];
    while(hayDatos) {
        var col = "B" + i;
        if (sheet[col] == undefined){
            hayDatos = false;
        }else {
            var dt = sheet[col].v;
            var ofV = getOfertaVirtual();
            
            console.log('papapa');
        }
    }

};

var getOfertaVirtual = function() {
    var ofe = {
        responsable: "B",
        faseOferta: "C",
        ubicacion: "D",
        nombreCorto: "E",
        divisa: "F",
        area: "G",
        empresa: "H",
        pais: "I",
        tipoOportunidad: "J",
        numOferta: "K",
        fechaEntrega: "L",
        codigo: "M",
        licitacion: "N",
        cliente: "O",
        servicio: "P",
        nombre: "Q",
        estado: "R",
        pedido: "S",
        importe: "T",
        notas: "U",
        razonPerdida: "V",
        fechaInicio: "W",
        fechaFin: "X",
        fechaAdjudicacion: "Y",
        importeAnoActual: "Z",
        margen: "AA",
        probabilidad: "AB",
        duracion: "AC"
    };
    return ofe;
}

module.exports = router;