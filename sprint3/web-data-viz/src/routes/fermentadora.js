var express = require("express");
var router = express.Router();

var aquarioController = require("../controllers/fermentadoraController");

router.get("/:empresaId", function (req, res) {
  aquarioController.buscarFermentadorasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  fermentadoraController.cadastrar(req, res);
});

module.exports = router;