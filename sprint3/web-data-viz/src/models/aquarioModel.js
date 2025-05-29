var database = require("../database/config");

function buscarAquariosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM fermentadora a WHERE fkEmpresa = ${empresaId}`;

  /*
  add empresa 
  SELECT f.*, s.*, sen.* FROM fermentadora AS f JOIN setor AS s
	ON f.fkSetor = s.idSetor
    JOIN sensor AS sen
    ON f.fkSensor = sen.idSensor;
  */

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}
