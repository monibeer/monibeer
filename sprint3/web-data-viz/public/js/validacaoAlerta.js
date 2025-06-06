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
    var idSensor = 0;

    for (let i = 0; i < dados.length; i++) {
        const dado = dados[i];
        const sensorId = dado.fkSensor;
        idSensor = sensorId

        if (!sensores[sensorId]) {
            sensores[sensorId] = [];
        }
        sensores[sensorId].push(dado);
    }

    var idFermen = 0;
    JSON.parse(sessionStorage.FERMENTADORAS).forEach(element => {
        if (element.fkSensor == idSensor) {
            idFermen = element.idFermentadora;
        }
    });

    const listaSensores = Object.keys(sensores);

    for (let i = 0; i < listaSensores.length; i++) {
        var sensorId = listaSensores[i];
        var registros = sensores[sensorId];
        var total = registros.length;

        let alertas = {
            maxCritico: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minCritico: { contador: 0, idCapturaTemp: 0, temp: 0 },
            maxAtencao: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minAtencao: { contador: 0, idCapturaTemp: 0, temp: 0 },
            maxCuidado: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minCuidado: { contador: 0, idCapturaTemp: 0, temp: 0 }
        };

        for (let j = 0; j < registros.length; j++) {
            var r = registros[j];
            var temperatura = r.temperatura;
            var limiteMin = r.limiteTempMin;
            var limiteMax = r.limiteTempMax;
            var idCapturaTemp = r.idCaptura;

            if (temperatura < limiteMin || temperatura > limiteMax) {
                if (temperatura <= limiteMin - 5) {
                    alertas.minCritico.contador++;
                    alertas.minCritico.temp = temperatura;
                    if (!alertas.minCritico.idCapturaTemp) {
                        alertas.minCritico.idCapturaTemp = idCapturaTemp;
                    }
                } else if (temperatura >= limiteMax + 5) {
                    alertas.maxCritico.contador++;
                    alertas.maxCritico.temp = temperatura;
                    if (!alertas.maxCritico.idCapturaTemp) {
                        alertas.maxCritico.idCapturaTemp = idCapturaTemp;
                    }
                } else if (temperatura <= limiteMin - 3) {
                    alertas.minAtencao.contador++;
                    alertas.minAtencao.temp = temperatura;
                    if (!alertas.minAtencao.idCapturaTemp) {
                        alertas.minAtencao.idCapturaTemp = idCapturaTemp;
                    }
                } else if (temperatura >= limiteMax + 3) {
                    alertas.maxAtencao.contador++;
                    alertas.maxAtencao.temp = temperatura;
                    if (!alertas.maxAtencao.idCapturaTemp) {
                        alertas.maxAtencao.idCapturaTemp = idCapturaTemp;
                    }
                } else if (temperatura <= limiteMin - 1) {
                    alertas.minCuidado.contador++;
                    alertas.minCuidado.temp = temperatura;
                    if (!alertas.minCuidado.idCapturaTemp) {
                        alertas.minCuidado.idCapturaTemp = idCapturaTemp;
                    }
                } else if (temperatura >= limiteMax + 1) {
                    alertas.maxCuidado.contador++;
                    alertas.maxCuidado.temp = temperatura;
                    if (!alertas.maxCuidado.idCapturaTemp) {
                        alertas.maxCuidado.idCapturaTemp = idCapturaTemp;
                    }
                }
            }
        }


        let totalFora = alertas.maxCritico.contador + alertas.minCritico.contador + alertas.maxAtencao.contador + alertas.minAtencao.contador + alertas.maxCuidado.contador + alertas.minCuidado.contador;
        let percentual = (totalFora / total) * 100;

        if (percentual >= 80) {
            let categoria = "";
            let mensagem = '';
            let idCapturaTempAlerta = null;

            if (alertas.maxCritico.contador > alertas.minCritico.contador && alertas.maxCritico.contador > alertas.maxAtencao.contador && alertas.maxCritico.contador > alertas.maxCuidado.contador) {
                categoria = "Crítico";
                mensagem = `Urgente! Temperatura da fermentadora ${idFermen} (${alertas.maxCritico.temp}°C) está ${(alertas.maxCritico.temp - limiteMax).toFixed(1)}°C acima do limite ideal de ${limiteMax}°C`;
                idCapturaTempAlerta = alertas.maxCritico.idCapturaTemp;
            } else if (alertas.minCritico.contador > alertas.maxCritico.contador && alertas.minCritico.contador > alertas.minAtencao.contador && alertas.minCritico.contador > alertas.minCuidado.contador) {
                categoria = "Crítico";
                mensagem = `Urgente! Temperatura da fermentadora ${idFermen} (${alertas.minCritico.temp}°C) está ${(limiteMin - alertas.minCritico.temp).toFixed(1)}°C abaixo do limite ideal de ${limiteMin}°C`;
                idCapturaTempAlerta = alertas.minCritico.idCapturaTemp;
            } else if (alertas.maxAtencao.contador > alertas.minAtencao.contador && alertas.maxAtencao.contador > alertas.maxCuidado.contador) {
                categoria = "Atenção";
                mensagem = `Atenção! Temperatura da fermentadora ${idFermen} (${alertas.maxAtencao.temp}°C) está ${(alertas.maxAtencao.temp - limiteMax).toFixed(1)}°C acima do limite ideal de ${limiteMax}°C`;
                idCapturaTempAlerta = alertas.maxAtencao.idCapturaTemp;
            } else if (alertas.minAtencao.contador > alertas.maxAtencao.contador && alertas.minAtencao.contador > alertas.minCuidado.contador) {
                categoria = "Atenção";
                mensagem = `Atenção! Temperatura da fermentadora ${idFermen} (${alertas.minAtencao.temp}°C) está ${(limiteMin - alertas.minAtencao.temp).toFixed(1)}°C abaixo do limite ideal de ${limiteMin}°C`;
                idCapturaTempAlerta = alertas.minAtencao.idCapturaTemp;
            } else if (alertas.maxCuidado.contador > alertas.minCuidado.contador) {
                categoria = "Cuidado";
                mensagem = `Cuidado! Temperatura da fermentadora ${idFermen} (${alertas.maxCuidado.temp}°C) está ${(alertas.maxCuidado.temp - limiteMax).toFixed(1)}°C acima do limite ideal de ${limiteMax}°C`;
                idCapturaTempAlerta = alertas.maxCuidado.idCapturaTemp;
            } else if (alertas.minCuidado.contador > alertas.maxCuidado.contador) {
                categoria = "Cuidado";
                mensagem = `Cuidado! Temperatura da fermentadora ${idFermen} (${alertas.minCuidado.temp}°C) está ${(limiteMin - alertas.minCuidado.temp).toFixed(1)}°C abaixo do limite ideal de ${limiteMin}°C`;
                idCapturaTempAlerta = alertas.minCuidado.idCapturaTemp;
            }

            if (mensagem !== '' && idCapturaTempAlerta !== null) {
                mostrarAlerta(categoria, mensagem)
                cadastrarAlerta(categoria, mensagem, idCapturaTempAlerta);
            }
        }
    }

    function mostrarAlerta(tipo, mensagem, tempo = 1000) {
        var iconTipo = '';
        var classAlert = '';

        if (tipo == 'Cuidado') {
            iconTipo = '<i class="fa-solid fa-circle-info"></i>';
            classAlert = 'cuidado';
        } else if (tipo == 'Atenção') {
            iconTipo = '<i class="fa-solid fa-circle-exclamation"></i>';
            classAlert = 'atencao';
        } else if (tipo == 'Crítico') {
            iconTipo = '<i class="fa-solid fa-triangle-exclamation"></i>';
            classAlert = 'critico';
        }

        list_alert.innerHTML += `
        <div class="container-alerta ${classAlert} active">
            <div class="img-icon-alerta" aria-hidden="true">
                ${iconTipo}
            </div>
            <div class="text-alerta">
                <strong>${mensagem}</strong>
            </div>
        </div>
        `;


        list_alert.classList.add('active');

        setTimeout(() => {
            console.log(list_alert.classList)
            list_alert.classList.remove('active');
            console.log('olar')
        }, tempo);
    }

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
}

iniciarVerificacaoApos1Min30();