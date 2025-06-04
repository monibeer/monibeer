var database = require("../database/config")

// LOGIN
function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT idFuncionario, nome, email, fkEmpresa as empresaId, tipoUsuario
        FROM funcionario 
        WHERE email = '${email}' AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

// CADASTRO
// function cadastrar(nome, email, senha, fkEmpresa) {
//     var instrucaoSql = `
//         INSERT INTO funcionario (nome, email, senha, fkEmpresa) 
//         VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa});
//     `;
//     return database.executar(instrucaoSql);
// }
function cadastrar(nome, email, senha, fkEmpresa, tipoUsuario = 'funcionario') {
    const instrucaoSql = `
        INSERT INTO funcionario (nome, email, senha, fkEmpresa, tipoUsuario) 
        VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, '${tipoUsuario}');
    `;
    return database.executar(instrucaoSql);
}

//LISTAR TODOS USUÁRIOS DE UMA EMPRESA
function listarPorEmpresa(fkEmpresa) {
    const instrucaoSql = `
        SELECT idFuncionario, nome, email, tipoUsuario
        FROM funcionario
        WHERE fkEmpresa = ${fkEmpresa};
    `;
    return database.executar(instrucaoSql);
}

//DELETAR FUNCIONÁRIO
function deletar(idFuncionario) {
    const instrucaoSql = `
        DELETE FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `;
    return database.executar(instrucaoSql);
}

//ATUALIZAR FUNCIONÁRIO
function atualizar(idFuncionario, nome, email, senha, tipoUsuario) {
    const instrucaoSql = `
        UPDATE funcionario 
        SET nome = '${nome}', email = '${email}', senha = '${senha}', tipoUsuario = '${tipoUsuario}'
        WHERE idFuncionario = ${idFuncionario};
    `;
    return database.executar(instrucaoSql);
}

function buscarPorId(idFuncionario) {
    const instrucaoSql = `
        SELECT * FROM funcionario WHERE idFuncionario = ${idFuncionario};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listarPorEmpresa,
    deletar,
    atualizar,
    buscarPorId
};