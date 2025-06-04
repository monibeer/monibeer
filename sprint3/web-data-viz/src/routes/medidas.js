var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:id", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:id", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/validacaoTemp/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasValidacaoAlerta(req, res);
})

module.exports = router;