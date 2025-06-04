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
    var instrucaoSql = `
            SELECT 
                c.fkSensor,
                c.dtHora,
                c.temperatura,
                e.estiloCerveja AS nomeCerveja,
                e.limiteTempMin,
                e.limiteTempMax
            FROM captura c
                JOIN sensor s ON s.idSensor = c.fkSensor
                JOIN fermentadora f ON f.fkSensor = s.idSensor
                JOIN setor st ON f.fkSetor = st.idSetor
                JOIN historico_fermentadora hf ON hf.fkFermentadora = f.idFermentadora
                    AND hf.dataFim IS NULL
                JOIN estilo e ON e.idEstilo = hf.fkEstilo
            WHERE st.fkEmpresa = ${idAquario}
            ORDER BY c.dtHora DESC
            LIMIT 30;`;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarMedidasDeValidacaoAlerta
}
