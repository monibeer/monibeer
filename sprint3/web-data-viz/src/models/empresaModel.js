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

function cadastrar(razaoSocial, cnpj, codigoAtivacao) {
  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj, codigoAtivacao ) VALUES ('${razaoSocial}', '${cnpj}', '${codigoAtivacao}')`;

  return database.executar(instrucaoSql);
}

function buscarCodigo(codigoAtivacao) {
  var instrucaoSql = `SELECT * FROM codigo_ativacao`;

  return database.executar(instrucaoSql);
}

function cadastrarCodigo(codigoAtivacao, fkEmpresa) {
  var instrucaoSql = `INSERT INTO codigo (codigo, fkEmpresa ) VALUES ('${codigoAtivacao}', '${fkEmpresa}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, buscarCodigo, cadastrarCodigo, listar };
