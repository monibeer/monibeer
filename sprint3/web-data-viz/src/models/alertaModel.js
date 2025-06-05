var database = require("../database/config")

function inserirAlertaTemp(idCaptura, mensagem, nivelAlerta) {
    var instrucaoSql = `INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES (now(), '${nivelAlerta}', '${mensagem}', ${idCaptura})`;
    return database.executar(instrucaoSql);
}

function validarStatusFermen(idFermentadora) {
    var instrucaoSql = `
    SELECT
  CASE
    WHEN EXISTS (
      SELECT 1
      FROM alerta a
      JOIN captura c ON a.fkCaptura = c.idCaptura
      JOIN sensor sen ON c.fkSensor = sen.idSensor
      JOIN fermentadora f ON f.fkSensor = sen.idSensor
      WHERE f.idFermentadora = 1
        AND DATE(a.dtHora) = CURRENT_DATE
        AND a.nivel = 'Crítico'
    ) THEN 3
    WHEN EXISTS (
      SELECT 1
      FROM alerta a
      JOIN captura c ON a.fkCaptura = c.idCaptura
      JOIN sensor sen ON c.fkSensor = sen.idSensor
      JOIN fermentadora f ON f.fkSensor = sen.idSensor
      WHERE f.idFermentadora = 1
        AND DATE(a.dtHora) = CURRENT_DATE
    ) THEN 1
    ELSE 0
  END AS status;
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    inserirAlertaTemp,
    validarStatusFermen
};