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
            WHEN a.nivel IN ('Cuidado', 'Atenção', 'Crítico') THEN f.idFermentadora
        END) AS fermentadoras_fora_do_ideal,
        COUNT(DISTINCT CASE
            WHEN a.nivel = 'Crítico' THEN f.idFermentadora
        END) AS fermentadoras_em_critico
    FROM fermentadora f
        JOIN sensor s ON f.fkSensor = s.idSensor
        JOIN setor st ON f.fkSetor = st.idSetor
        JOIN historico_fermentadora hf ON hf.fkFermentadora = f.idFermentadora
        JOIN estilo e ON hf.fkEstilo = e.idEstilo
        LEFT JOIN captura c 
        ON c.fkSensor = s.idSensor
            AND c.dtHora >= '${dataAtual} 00:00:00'
            AND c.dtHora <  '${dataAtual} 23:59:59'
        LEFT JOIN alerta a ON a.fkCaptura = c.idCaptura
    WHERE st.fkEmpresa = ${idEmpresa}
    GROUP BY e.estiloCerveja;

    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarHistoricoAlertasDash(idEmpresa) {

    var instrucaoSql = `
    SELECT
    	f.idFermentadora,
        a.nivel AS nivel_alerta,
        f.nome AS fermentadora,
        e.estiloCerveja AS tipo_fermentacao,
        c.temperatura,
        DATE_FORMAT(a.dtHora, '%d/%m/%y às %H:%i') AS horario_alerta,
        a.mensagem
    FROM alerta a
        JOIN captura c ON a.fkCaptura = c.idCaptura
        JOIN sensor s ON c.fkSensor = s.idSensor
        JOIN fermentadora f ON f.fkSensor = s.idSensor
        JOIN setor st ON f.fkSetor = st.idSetor
        JOIN historico_fermentadora hf 
        ON hf.fkFermentadora = f.idFermentadora
            AND (hf.dataFim IS NULL OR a.dtHora BETWEEN hf.dataInicio AND hf.dataFim)
        JOIN estilo e ON hf.fkEstilo = e.idEstilo
    WHERE st.fkEmpresa = ${idEmpresa}
    ORDER BY a.dtHora DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarSetoresDados(idEmpresa) {

    var instrucaoSql = `SELECT * FROM vw_fermentadoras_status_setor_empresa WHERE fkEmpresa = ${idEmpresa};`;

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
    pegarDadosHomeDash,
    pegarHistoricoAlertasDash,
    pegarSetoresDados
    // buscarMedidasEmTempoReal
}
