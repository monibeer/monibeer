var usuarioModel = require("../models/usuarioModel");
var fermentadoraModel = require("../models/fermentadoraModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        fermentadoraModel.buscarFermentadorasPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoFermentadoras) => {
                                res.json({
                                    id: resultadoAutenticar[0].idFuncionario,
                                    email: resultadoAutenticar[0].email,
                                    nome: resultadoAutenticar[0].nome,
                                    senha: resultadoAutenticar[0].senha,
                                    fermentadoras: resultadoFermentadoras
                                });
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

//CADASTRO
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeEmpresa = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    // Faça as validações dos valores
    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone esta undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nomeEmpresa, cnpj, email, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}