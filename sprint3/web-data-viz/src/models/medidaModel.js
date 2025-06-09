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

function buscarTempoForaDoIdeal(fkSensor, dataAtual) {
    var instrucaoSql = `
    SELECT 
        ROUND(COUNT(*) * 90) AS total_segundos
    FROM alerta a JOIN captura c ON a.fkCaptura = c.idCaptura
    WHERE c.dtHora >= '${dataAtual} 00:00:00'
            AND c.dtHora <  '${dataAtual} 23:59:59'
            AND c.fkSensor = ${fkSensor};
`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function gerarDados() {
    const dado = parseInt(Math.random() * 5 + 8);
    const dados = [];

    for (var i = 0; i < 20; i++) {
        const variacao = parseInt(Math.random() * 20 - 10);
        
        dados.push(dado + (dado * variacao/100));
    }

    let instrucaoSql = "INSERT INTO captura (fkSensor, temperatura) values";
    
    
    for (let i = 0; i < dados.length; i++) {
        const dado = dados[i];

        instrucaoSql += ` (${i+1}, ${dado})`;

        if (i < dados.length -1) {
            instrucaoSql += `,`;
        }
    }

    instrucaoSql += `;`;

    console.log(instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasDeValidacaoAlerta,
    buscarTempoForaDoIdeal,
    gerarDados
}
