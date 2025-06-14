var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarAlerta", function (req, res) {
    empresaController.cadastrarAlertaTemp(req, res);
})

router.get("/validarStatusFermenAlerta/:idFermentadora", function (req, res) {
    empresaController.validarStatusFermenAlerta(req, res);
})

// router.get("/buscar", function (req, res) {
//     empresaController.buscarPorCnpj(req, res);
// });

// router.get("/buscar/:id", function (req, res) {
//   empresaController.buscarPorId(req, res);
// });

// router.get("/listar", function (req, res) {
//   empresaController.listar(req, res);
// });

module.exports = router;