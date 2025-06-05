function iniciarVerificacaoApos1Min30() {
    const chave = "tempoEntrada";
    const agora = Date.now();

    if (!localStorage.getItem(chave)) {
        localStorage.setItem(chave, agora);
    }

    const tempoSalvo = parseInt(localStorage.getItem(chave), 10);
    const tempoDecorrido = agora - tempoSalvo;
    const umMinMeio = 1.5 * 60 * 1000; // 1 minuto e meio em milissegundos
    console.log("Tempo necessário:", umMinMeio, "ms");

    if (tempoDecorrido >= umMinMeio) {
        console.log('Executando verificação imediatamente');
        buscarDadosEVerificar();
        iniciarRepeticao(); // inicia repetição após 1ª execução
    } else {
        console.log('Aguardando o tempo restante antes da primeira execução');
        const restante = umMinMeio - tempoDecorrido;
        setTimeout(function () {
            buscarDadosEVerificar();
            iniciarRepeticao(); // inicia repetição após o delay
        }, restante);
    }
}

function iniciarRepeticao() {
    // Repete buscarDadosEVerificar a cada 1.5 minutos
    setInterval(buscarDadosEVerificar, 1.5 * 60 * 1000);
}

function buscarDadosEVerificar() {
    console.log('Buscando dados e verificando...');
    const session = sessionStorage.FERMENTADORAS;

    const idEmpresa = JSON.parse(session)[0].fkEmpresa;

    fetch(`/medidas/validacaoTemp/${idEmpresa}`, { cache: 'no-store' })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Nenhum dado encontrado');
            }
        })
        .then(resposta => {
            verificarAlerta(resposta);
        })
        .catch(error => {
            console.error('Erro na API:', error);
        });
}

function verificarAlerta(dados) {
    const sensores = {};

    for (let i = 0; i < dados.length; i++) {
        const dado = dados[i];
        const sensorId = dado.fkSensor;

        if (!sensores[sensorId]) {
            sensores[sensorId] = [];
        }
        sensores[sensorId].push(dado);
    }

    const listaSensores = Object.keys(sensores);

    for (let i = 0; i < listaSensores.length; i++) {
        var sensorId = listaSensores[i];
        var registros = sensores[sensorId];
        var total = registros.length;

        // Inicializa os contadores
        let maxCritico = 0;
        let minCritico = 0;
        let maxAtencao = 0;
        let minAtencao = 0;
        let maxCuidado = 0;
        let minCuidado = 0;

        for (let j = 0; j < registros.length; j++) {
            var r = registros[j];
            var idCapturaTemp = registros[0].idCaptura
            var temp = r.temperatura;
            var min = r.limiteTempMin;
            var max = r.limiteTempMax;

            if (temp < min || temp > max) {
                if (temp <= min - 5) {
                    minCritico++;
                } else if (temp >= max + 5) {
                    maxCritico++;
                } else if (temp <= min - 3) {
                    minAtencao++;
                } else if (temp >= max + 3) {
                    maxAtencao++;
                } else if (temp <= min - 1) {
                    minCuidado++;
                } else if (temp >= max + 1) {
                    maxCuidado++;
                }
            }
        }

        let totalFora = maxCritico + minCritico + maxAtencao + minAtencao + maxCuidado + minCuidado;
        let percentual = (totalFora / total) * 100;

        if (percentual >= 80) {
            // Total de alertas por grupo
            let totalMax = maxCritico + maxAtencao + maxCuidado;
            let totalMin = minCritico + minAtencao + minCuidado;

            let tipoPrincipal = "";
            let categoria = "";
            let mensagem = '';

            if (totalMax > totalMin) {
                if (maxCritico >= maxAtencao && maxCritico >= maxCuidado) {
                    categoria = "Crítico";
                    mensagem = 'Ultrapassou o limite máximo permitido, temperatura 5°C graus acima do ideal';
                } else if (maxAtencao >= maxCritico && maxAtencao >= maxCuidado) {
                    categoria = "Atenção";
                    mensagem = 'Atenção! Temperatura 3°C graus acima do ideal.';
                } else {
                    categoria = "Cuidado";
                    mensagem = 'Cuidado! Temperatura 1°C grau levemente acima do ideal.';
                }
            } else if (totalMin > totalMax) {
                if (minCritico >= minAtencao && minCritico >= minCuidado) {
                    categoria = "Crítico";
                    mensagem = 'Ultrapassou o limite mínimo permitido, temperatura 5°C graus abaixo do ideal.';
                } else if (minAtencao >= minCritico && minAtencao >= minCuidado) {
                    categoria = "Atenção";
                    mensagem = 'Atenção! Temperatura 3°C graus bem abaixo do ideal.';
                } else {
                    categoria = "Cuidado";
                    mensagem = 'Cuidado! Temperatura 1°C grau levemente abaixo do ideal.';
                }
            }

            if (mensagem != '') {
                // cadastrarAlerta(categoria, mensagem, idCapturaTemp)
                console.log('to cadastrando viu')
            }

        }
    }
}

// Inicia o processo
iniciarVerificacaoApos1Min30();

function cadastrarAlerta(categoriaAlerta, mensagem, idCaptura) {
    fetch('/alerta/cadastrarAlerta', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idCapturaServer: idCaptura,
            mensagemServer: mensagem,
            nivelServer: categoriaAlerta
        }),
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}