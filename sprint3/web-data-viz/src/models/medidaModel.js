var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
            c.temperatura,
            c.dtHora,
            DATE_FORMAT(c.dtHora, '%H:%i:%s') AS momento_grafico
            FROM captura c
                WHERE c.fkSensor = ${idAquario}
                ORDER BY c.idCaptura DESC
                LIMIT ${limite_linhas};
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {
    var instrucaoSql = `SELECT 
            c.temperatura,
            c.dtHora,
            DATE_FORMAT(c.dtHora,'%H:%i:%s') AS momento_grafico,
            c.fkSensor
            FROM captura AS c
                WHERE c.fkSensor = ${idAquario}
                ORDER BY c.idCaptura DESC
                LIMIT 1`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasDeValidacaoAlerta(fkEmpresa, fkSensor) {
    var instrucaoSql = `SELECT * FROM vw_captura_estilo WHERE fkSensor = ${fkSensor} AND fkEmpresa = ${fkEmpresa} ORDER BY dtHora DESC LIMIT 30;
`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasDeValidacaoAlerta
}
