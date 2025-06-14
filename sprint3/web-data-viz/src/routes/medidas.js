var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:id", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:id", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/validacaoTemp/:idEmpresa/:idSensor", function (req, res) {
    medidaController.buscarMedidasValidacaoAlerta(req, res);
})

router.get("/tempo-foraIdeal/:idSensor/:dataAtual", function (req, res) {
    medidaController.buscarTempoForaDoIdeal(req, res);
})

router.post('/gerar-dados', function (req, res) {
    medidaController.gerarDados(req, res);
}, )

module.exports = router;