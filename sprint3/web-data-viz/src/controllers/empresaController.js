var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;
  var codigoAtivacao = "";

  for (var i = 0; i < 8; i++) {
    var num = parseInt(Math.random() * 10);
    codigoAtivacao += num;
  }


  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {

      empresaModel.cadastrar(razaoSocial, cnpj, codigoAtivacao).then((resultado) => {
        res.status(201).json(resultado);
        var fkEmpresa = resultado.idEmpresa;
        //id pra fkEmpresa
        empresaModel.buscarCodigo().then((resultado) => {
          //enquanto código(bd) igual ao codigoAtivacao gerado, gere um novo
          var validacao = false;
          while (validacao == false) {
              for(var i = 0; i < resultado.length; i++ ){
                if (codigoAt.codigo = codigoAtivacao) {
                  codigoAtivacao = "";
                  for (var j = 0; j < 8; j++) {
                    var num = parseInt(Math.random() * 10);
                    codigoAtivacao += num;
                  }
                  break;
                } else{
                  validacao == true;
                }
              }
          }

          empresaModel.cadastrarCodigo(codigoAtivacao, fkEmpresa).then((resultado) => {
              res.status(201).json(resultado);
          })
        })
      });
    }
  });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
