var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idEmpresa, razaoSocial, cnpj, codigoAtivacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrarEndereco(rua, numero, cidade, uf) {
  var instrucaoSql = `INSERT INTO endereco (rua, numero, cidade, uf) VALUES ('${rua}','${numero}','${cidade}','${uf}')`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj, fkEndereco) {
  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj, fkEndereco) VALUES ('${razaoSocial}', '${cnpj}', '${fkEndereco}')`;

  return database.executar(instrucaoSql);
}

function buscarCodigo() {
  var instrucaoSql = `SELECT * FROM codigo_ativacao`;

  return database.executar(instrucaoSql);
}

function cadastrarCodigo(codigoAtivacao, fkEmpresa) {
  var instrucaoSql = `INSERT INTO codigo_ativacao (codigo, fkEmpresa) VALUES ('${codigoAtivacao}', '${fkEmpresa}')`;

  return database.executar(instrucaoSql);
}

function buscarCodigoEspecifico(codigoAtivacao) {
  const instrucaoSql = `
    SELECT idCodigo_ativacao, codigo, fkEmpresa, status 
    FROM codigo_ativacao 
    WHERE codigo = ${codigoAtivacao};
  `;
  return database.executar(instrucaoSql);
}

function atualizarStatusCodigo(idCodigo) {
  const instrucaoSql = `
    UPDATE codigo_ativacao 
    SET status = 1 
    WHERE idCodigo_ativacao = ${idCodigo};
  `;
  return database.executar(instrucaoSql);
}

function buscarSetores(fkEmpresa) {
  var instrucaoSql = `SELECT nome FROM setor WHERE fkEmpresa = '${fkEmpresa}'`;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  cadastrarEndereco,
  buscarCodigo,
  cadastrarCodigo,
  listar,
  buscarCodigoEspecifico,
  atualizarStatusCodigo,
  buscarSetores
};
