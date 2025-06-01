var aquarioModel = require("../models/fermentadoraModel");

function buscarFermentadorasPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  aquarioModel.buscarFermentadorasPorEmpresa(idUsuario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as fermentadoras: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var nome = req.body.nome;
  var fkSensor = req.body.fkSensor;
  var fkSetor = req.body.fkSetor;

  if (!nome || !fkSensor || !fkSetor) {
      return res.status(400).send("Campos obrigatórios não informados.");
  }

  fermentadoraModel.cadastrar(nome, fkSensor, fkSetor)
      .then(resultado => {
          res.status(201).json({ mensagem: "Fermentadora cadastrada com sucesso!", resultado });
      })
      .catch(erro => {
          console.error("Erro ao cadastrar fermentadora:", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

module.exports = {
  buscarFermentadorasPorEmpresa,
  cadastrar
}