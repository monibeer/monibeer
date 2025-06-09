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
  var cnpj = req.body.cnpjServer;
  var razaoSocial = req.body.nomeServer;
  var rua = req.body.ruaServer;
  var numero = req.body.numeroServer;
  var cidade = req.body.cidadeServer;
  var uf = req.body.ufServer;

  var codigoAtivacao = "";

  for (var i = 0; i < 8; i++) {
    var num = parseInt(Math.random() * 10);
    codigoAtivacao += num;
  }


  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      return res.status(409).json({ mensagem: `A empresa com o CNPJ ${cnpj} já existe.` });
    }

    empresaModel.cadastrarEndereco(rua, numero, cidade, uf).then((resultadoEndereco) => {
      if (!resultadoEndereco.insertId) {
        return res.status(500).json({ mensagem: "Erro ao cadastrar endereço." });
      }

      let fkEndereco = resultadoEndereco.insertId;
      console.log("Resultado do cadastro do endereço:", resultadoEndereco);

      empresaModel.cadastrar(razaoSocial, cnpj, fkEndereco).then((resultadoEmpresa) => {
        if (!resultadoEmpresa.insertId) {
          return res.status(500).json({ mensagem: "Erro ao cadastrar empresa." });
        }

        let fkEmpresa = resultadoEmpresa.insertId;

        empresaModel.buscarCodigo().then((codigosExistentes) => {
          let codigoAtivacao = gerarCodigo();
          let validacaoCod = false;

          while (validacaoCod != true) {
            validacaoCod = true;

            for (let i = 0; i < codigosExistentes.length; i++) {
              if (codigosExistentes[i].codigo == codigoAtivacao) {
                codigoAtivacao = gerarCodigo();
                validacaoCod = false;
                break;
              }
            }
          }

          empresaModel.cadastrarCodigo(codigoAtivacao, fkEmpresa).then((resultadoCodigo) => {
            if (!resultadoCodigo.insertId) {
              return res.status(500).json({ mensagem: "Erro ao cadastrar código de ativação." });
            }

            res.status(201).json({
              mensagem: "Empresa cadastrada com sucesso!",
              empresa: resultadoEmpresa,
              codigoAtivacao: codigoAtivacao
            });
          }).catch(() => {
            res.status(500).json({ mensagem: "Erro ao salvar o código de ativação." });
          });

        }).catch(() => {
          res.status(500).json({ mensagem: "Erro ao buscar códigos existentes." });
        });
      }).catch(() => {
        res.status(500).json({ mensagem: "Erro ao cadastrar empresa." });
      });
    }).catch(() => {
      res.status(500).json({ mensagem: "Erro ao cadastrar endereço." });
    });
  });


  // função auxiliar para gerar código de ativação
  function gerarCodigo() {
    let codigo = "";
    for (let i = 0; i < 8; i++) {
      codigo += Math.floor(Math.random() * 10);
    }
    return codigo;
  }

}

function ativarCodigo(req, res) {
  const codigoAtivacao = req.body.codigoServer;

  empresaModel.buscarCodigoEspecifico(codigoAtivacao)
    .then((resultado) => {
      if (resultado.length > 0) {
        const codigoEncontrado = resultado[0];

        if (codigoEncontrado.status == 0) {
          empresaModel.atualizarStatusCodigo(codigoEncontrado.idCodigo_ativacao)
            .then(() => {
              empresaModel.buscarCodigoEspecifico(codigoAtivacao)
                .then((codigoAtualizado) => {
                  res.status(200).json({
                    mensagem: "Código ativado com sucesso!",
                    codigoAtivado: codigoAtualizado[0]
                  });
                })
                .catch(erro => {
                  console.error("Erro ao buscar código atualizado:", erro);
                  res.status(500).json({ mensagem: "Erro ao buscar código atualizado." });
                });
            })
            .catch((erro) => {
              console.error("Erro ao ativar código:", erro);
              res.status(500).json({ mensagem: "Erro ao ativar código." });
            });
        } else {
          res.status(409).json({ mensagem: "Este código já foi ativado anteriormente." });
        }
      } else {
        res.status(404).json({ mensagem: "Código inválido. Nenhum resultado encontrado." });
      }
    })
    .catch((erro) => {
      console.error("Erro ao buscar código:", erro);
      res.status(500).json({ mensagem: "Erro ao buscar código." });
    });
}


function buscarSetores(req, res) {
  var fkEmpresa = req.params.id;

  empresaModel.buscarSetores(fkEmpresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}


module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  ativarCodigo,
  buscarSetores
};
