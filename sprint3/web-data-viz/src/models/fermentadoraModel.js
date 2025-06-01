var database = require("../database/config");

function buscarFermentadorasPorEmpresa(empresaId) {

  var instrucaoSql = `
    SELECT
      f.*,
      s.*,
      sen.* 
    FROM fermentadora AS f JOIN setor AS s
	    ON f.fkSetor = s.idSetor
      JOIN sensor AS sen
      ON f.fkSensor = sen.idSensor
    WHERE s.fkEmpresa = ${empresaId};
      `;

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

function cadastrar(nome, fkSensor, fkSetor) {
  var instrucaoSql = `
      INSERT INTO fermentadora (nome, fkSensor, fkSetor)
      VALUES ('${nome}', ${fkSensor}, ${fkSetor});
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarFermentadorasPorEmpresa,
  cadastrar
}
