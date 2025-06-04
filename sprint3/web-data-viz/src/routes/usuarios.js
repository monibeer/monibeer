var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    usuarioController.listarPorEmpresa(req, res);
});

router.delete("/deletar/:idFuncionario", function (req, res) {
    usuarioController.deletar(req, res);
});

router.put("/atualizar/:idFuncionario", function (req, res) {
    usuarioController.atualizar(req, res);
});

router.get("/buscar/:idFuncionario", function (req, res) {
    usuarioController.buscarPorId(req, res);
});

module.exports = router;