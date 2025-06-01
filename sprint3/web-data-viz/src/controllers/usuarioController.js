var usuarioModel = require("../models/usuarioModel");
var fermentadoraModel = require("../models/fermentadoraModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length === 1) {
                    let usuario = resultadoAutenticar[0];

                    fermentadoraModel.buscarFermentadorasPorEmpresa(usuario.empresaId)
                        .then((resultadoFermentadoras) => {
                            res.json({
                                id: usuario.idFuncionario,
                                email: usuario.email,
                                nome: usuario.nome,
                                tipoUsuario: usuario.tipoUsuario,
                                fermentadoras: resultadoFermentadoras
                            });
                        });
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log("Erro ao autenticar:", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

// CADASTRO
// function cadastrar(req, res) {
//     var nome = req.body.nomeServer;
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;
//     var fkEmpresa = req.body.empresaServer;

//     if (!nome) {
//         res.status(400).send("Seu nome está undefined!");
//     } else if (!email) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (!senha) {
//         res.status(400).send("Sua senha está undefined!");
//     } else if (!fkEmpresa) {
//         res.status(400).send("O ID da empresa está undefined!");
//     } else {
//         usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
//             .then(function (resultado) {
//                 res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!", resultado });
//             })
//             .catch(function (erro) {
//                 console.log("Erro ao cadastrar funcionário:", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             });
//     }
// }

function cadastrar(req, res) {
    const nome = req.body.nomeServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;
    const fkEmpresa = req.body.empresaServer;
    const tipoUsuario = req.body.tipoUsuarioServer || 'funcionario'; 

    if (!nome || !email || !senha || !fkEmpresa) {
        return res.status(400).send("Dados incompletos para cadastro!");
    }

    usuarioModel.cadastrar(nome, email, senha, fkEmpresa, tipoUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!", resultado });
        })
        .catch(erro => {
            console.log("Erro ao cadastrar funcionário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    autenticar,
    cadastrar
};