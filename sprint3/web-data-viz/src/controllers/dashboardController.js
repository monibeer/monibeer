var dashboardModel = require("../models/dashboardModel");
// var fermentadoraModel = require("../models/fermentadoraModel");

function pegarDashboardHome(req, res) {
    var idEmpresa = req.body.idEmpresaServer;
    var dataAtual = req.body.dataAtualServer;
    // var senha = req.body.senhaServer;

    // if (email == undefined) {
    //     res.status(400).send("Seu email está undefined!");
    // } else if (senha == undefined) {
    //     res.status(400).send("Sua senha está indefinida!");
    // } else {

    dashboardModel.pegarDadosHomeDash(idEmpresa, dataAtual)
        .then(
            function (resultadoDashHome) {
                console.log(`Resultados: ${JSON.stringify(resultadoDashHome)}`); // transforma JSON em String

                            res.json({
                                dadosDashHome: resultadoDashHome
                            });
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao pegar os dados da Dash! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );


}

// //CADASTRO
// function cadastrar(req, res) {
//     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
//     var nomeEmpresa = req.body.nomeServer;
//     var cnpj = req.body.cnpjServer;
//     var email = req.body.emailServer;
//     var telefone = req.body.telefoneServer;

//     // Faça as validações dos valores
//     if (nomeEmpresa == undefined) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (cnpj == undefined) {
//         res.status(400).send("Seu cnpj está undefined!");
//     } else if (email == undefined) {
//         res.status(400).send("Sua email está undefined!");
//     } else if (telefone == undefined) {
//         res.status(400).send("Seu telefone esta undefined!");
//     } else {

//         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
//         usuarioModel.cadastrar(nomeEmpresa, cnpj, email, telefone)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    pegarDashboardHome,
    // cadastrar
}