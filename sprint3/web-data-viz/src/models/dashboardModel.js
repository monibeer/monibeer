var database = require("../database/config");

function pegarDadosHomeDash(idEmpresa, dataAtual) {

    var instrucaoSql = `
    SELECT
        e.estiloCerveja,
        COUNT(DISTINCT f.idFermentadora) AS total_ferm,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'ativo') AS sensor_ativo,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'inativo') AS sensor_inativo,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'manutenção') AS sensor_manutencao,
        COUNT(DISTINCT CASE 
            WHEN (c.temperatura < e.limiteTempMin OR c.temperatura > e.limiteTempMax) THEN f.idFermentadora
        END) AS fermentadoras_fora_do_ideal,
        COUNT(DISTINCT CASE
            WHEN (
                c.temperatura < (e.limiteTempMin - 5) OR
                c.temperatura > (e.limiteTempMax + 5)
            ) THEN f.idFermentadora
        END) AS fermentadoras_em_critico
    FROM fermentadora f 
    JOIN sensor s ON f.fkSensor = s.idSensor
    JOIN setor st ON f.fkSetor = st.idSetor
    JOIN historico_fermentadora hf 
        ON hf.fkFermentadora = f.idFermentadora
    JOIN estilo e ON hf.fkEstilo = e.idEstilo
    LEFT JOIN captura c 
        ON c.fkSensor = s.idSensor
        AND c.dtHora >= '${dataAtual} 00:00:00' 
        AND c.dtHora < '${dataAtual} 00:00:00'
    LEFT JOIN alerta a ON a.fkCaptura = c.idCaptura
    WHERE st.fkEmpresa = ${idEmpresa}
    GROUP BY e.estiloCerveja;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarMedidasEmTempoReal(idAquario) {

//     var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         FROM medida WHERE fk_aquario = ${idAquario} 
//                     ORDER BY id DESC LIMIT 1`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    pegarDadosHomeDash
    // buscarMedidasEmTempoReal
}
