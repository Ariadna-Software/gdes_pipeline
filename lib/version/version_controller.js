// version controller
// simplemente muestra la versión de programa
var express = require('express');
var router = express.Router();
var pck = require('../../package.json')

router.get('/', function(req, res) {
    var env = process.env.GDESPIPELINE_ENV || "LOCAL";
    var message = "VRS: " + pck.version + " [" + env + "]";
    var version = {
    	version: message
    };
    res.json(version);
	// another
});

module.exports = router;
