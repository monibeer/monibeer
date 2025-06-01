var database = require("../database/config")

// LOGIN
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idFuncionario, nome, email, fkEmpresa as empresaId 
        FROM funcionario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

// CADASTRO
function cadastrar(nome, email, senha, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO funcionario (nome, email, senha, fkEmpresa) 
        VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa});
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};