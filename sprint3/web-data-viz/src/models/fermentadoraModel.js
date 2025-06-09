var database = require("../database/config");

function buscarFermentadorasPorEmpresa(empresaId) {

  var instrucaoSql = `
    SELECT
      f.*,
      s.*,
      sen.*,
      e.estiloCerveja
    FROM fermentadora AS f
	    JOIN setor AS s 
      ON f.fkSetor = s.idSetor
	    JOIN sensor AS sen 
      ON f.fkSensor = sen.idSensor
	    JOIN historico_fermentadora AS hf 
      ON hf.fkFermentadora = f.idFermentadora
	    JOIN estilo AS e ON e.idEstilo = hf.fkEstilo
	  WHERE s.fkEmpresa = ${empresaId}
	  ORDER BY f.idFermentadora ASC;
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

function cadastrarSensorPadrao() {
  const instrucao = `INSERT INTO sensor (nome, statusSensor) VALUES ('lm35', 'inativo');`;
  return database.executar(instrucao);
}

function obterUltimoSensor() {
  const instrucao = `SELECT idSensor FROM sensor ORDER BY idSensor DESC LIMIT 1;`;
  return database.executar(instrucao);
}

function cadastrarFermentadora(nome, fkSetor, fkSensor) {
  const instrucao = `
    INSERT INTO fermentadora (nome, fkSetor, fkSensor)
    VALUES ('${nome}', ${fkSetor}, ${fkSensor});
  `;
  return database.executar(instrucao);
}

function obterUltimaFermentadora() {
  return database.executar(`SELECT idFermentadora FROM fermentadora ORDER BY idFermentadora DESC LIMIT 1;`);
}

function obterEstiloPorNome(nomeEstilo) {
  return database.executar(`SELECT idEstilo FROM estilo WHERE estiloCerveja = '${nomeEstilo}';`);
}

function cadastrarHistorico(fkFermentadora, fkEstilo) {
  const instrucao = `
    INSERT INTO historico_fermentadora (fkFermentadora, fkEstilo)
    VALUES (${fkFermentadora}, ${fkEstilo});
  `;
  return database.executar(instrucao);
}

function buscarDadosFermentadorasPorEmpresa(fkEmpresa) {
  const instrucao = `
    SELECT
  f.idFermentadora,
  f.nome AS nomeFermentadora,
  s.nome AS nomeSetor,        
  e.estiloCerveja AS estilo,
  se.statusSensor AS statusSensor
FROM fermentadora f
INNER JOIN setor s ON f.fkSetor = s.idSetor
INNER JOIN sensor se ON f.fkSensor = se.idSensor
INNER JOIN historico_fermentadora h ON h.fkFermentadora = f.idFermentadora
INNER JOIN estilo e ON h.fkEstilo = e.idEstilo
WHERE s.fkEmpresa = ${fkEmpresa};`


  return database.executar(instrucao);
}


module.exports = {
  buscarFermentadorasPorEmpresa,
  cadastrarSensorPadrao,
  obterUltimoSensor,
  cadastrarFermentadora,
  obterUltimaFermentadora,
  obterEstiloPorNome,
  cadastrarHistorico,
  buscarDadosFermentadorasPorEmpresa
}
