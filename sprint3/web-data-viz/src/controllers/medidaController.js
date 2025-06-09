var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var id = req.params.id;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(id, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var id = req.params.id;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasValidacaoAlerta(req, res) {

    var idEmpresa = req.params.idEmpresa;
    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas para validacão`);

    medidaModel.buscarMedidasDeValidacaoAlerta(idEmpresa, idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



function buscarTempoForaDoIdeal(req, res) {
    var idSensor = req.params.idSensor;
    var data = req.params.dataAtual;

    console.log(`Recuperando medidas para validacão`);

    medidaModel.buscarTempoForaDoIdeal(idSensor, data).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json({tempo: resultado[0].total_segundos});
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function gerarDados(req, res) {
    medidaModel.gerarDados()
    .then(function (dados) {
        console.log(dados);
        res.status(200).send(dados)
    }).catch(function (erro) {
        res.status(500).send(erro)
    })
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasValidacaoAlerta,
    buscarTempoForaDoIdeal,
    gerarDados

}