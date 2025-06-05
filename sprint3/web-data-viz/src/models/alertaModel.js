var database = require("../database/config")

function inserirAlertaTemp(idCaptura, mensagem, nivelAlerta) {
    var instrucaoSql = `INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES (now(), '${nivelAlerta}', '${mensagem}', ${idCaptura})`;
    return database.executar(instrucaoSql);
}


module.exports = {
    inserirAlertaTemp
};