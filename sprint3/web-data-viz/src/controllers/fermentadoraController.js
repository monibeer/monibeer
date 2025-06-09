var fermentadoraModel = require("../models/fermentadoraModel");

function buscarFermentadorasPorEmpresa(req, res) {
  var idUsuario = req.params.idUsuario;

  fermentadoraModel.buscarFermentadorasPorEmpresa(idUsuario).then((resultado) => {
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


function cadastrarFermentadora(req, res) {
  const { nome, fkSetor } = req.body;

  if (!nome || !fkSetor) {
    return res.status(400).json({ erro: "Nome e fkSetor são obrigatórios." });
  }

  fermentadoraModel.cadastrarFermentadora(nome, fkSetor)
    .then(() => res.status(201).json({ mensagem: "Fermentadora cadastrada com sucesso!" }))
    .catch(erro => {
      console.error("Erro ao cadastrar fermentadora:", erro);
      res.status(500).json({ erro: "Erro interno ao cadastrar fermentadora." });
    });
}

async function cadastrarCompleto(req, res) {
  const { nome, fkSetor, estilo } = req.body;

  if (!nome || !fkSetor || !estilo) {
    return res.status(400).json({ erro: "Campos obrigatórios: nome, fkSetor e estilo." });
  }

  try {
    await fermentadoraModel.cadastrarSensorPadrao();

    const sensorResultado = await fermentadoraModel.obterUltimoSensor();
    const fkSensor = sensorResultado[0].idSensor;

    await fermentadoraModel.cadastrarFermentadora(nome, fkSetor, fkSensor);

    const fermentadoraResultado = await fermentadoraModel.obterUltimaFermentadora();
    const fkFermentadora = fermentadoraResultado[0].idFermentadora;

    const estiloResultado = await fermentadoraModel.obterEstiloPorNome(estilo.toLowerCase());
    if (estiloResultado.length === 0) {
      return res.status(404).json({ erro: "Estilo não encontrado." });
    }
    const fkEstilo = estiloResultado[0].idEstilo;

    await fermentadoraModel.cadastrarHistorico(fkFermentadora, fkEstilo);

    res.status(201).json({ mensagem: "Fermentadora cadastrada com sucesso!" });

  } catch (erro) {
    console.error("Erro no cadastro completo da fermentadora:", erro);
    res.status(500).json({ erro: "Erro interno ao cadastrar fermentadora." });
  }
}

function listarFermentadorasPorEmpresa(req, res) {
  const fkEmpresa = req.params.fkEmpresa;

  if (!fkEmpresa) {
    return res.status(400).json({ erro: "fkEmpresa é obrigatório." });
  }

  fermentadoraModel.buscarDadosFermentadorasPorEmpresa(fkEmpresa)
    .then(resultado => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(200).json([]);
      }
    })
    .catch(erro => {
      console.error("Erro ao buscar fermentadoras:", erro);
      res.status(500).json({ erro: "Erro interno ao buscar fermentadoras." });
    });
}


module.exports = {
  buscarFermentadorasPorEmpresa,
  cadastrarFermentadora,
  cadastrarCompleto,
  listarFermentadorasPorEmpresa
}