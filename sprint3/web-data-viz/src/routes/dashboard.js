var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/pegarDashboardHome", function (req, res) {
    empresaController.pegarDashboardHome(req, res);
})

router.post("/pegarHistoricoAlerta", function (req, res) {
    empresaController.pegarHistoricoAlerta(req, res);
})

router.post("/pegarDadosSetores", function (req, res) {
    empresaController.pegarSetorDadosDash(req, res);
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