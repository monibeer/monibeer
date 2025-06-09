var express = require("express");
var router = express.Router();

var fermentadoraController = require("../controllers/fermentadoraController");

router.get("/:empresaId", function (req, res) {
  fermentadoraController.buscarFermentadorasPorEmpresa(req, res);
});


router.post('/cadastrar', fermentadoraController.cadastrarFermentadora);

router.post("/cadastrarCompleto", fermentadoraController.cadastrarCompleto);

router.get("/empresa/:fkEmpresa", fermentadoraController.listarFermentadorasPorEmpresa);



module.exports = router;