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

function buscarMedidasDeValidacaoAlerta(idAquario) {
    var instrucaoSql = `SELECT * FROM vw_ultimos_30_por_sensor WHERE fkEmpresa = ${idAquario};`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasDeValidacaoAlerta
}
