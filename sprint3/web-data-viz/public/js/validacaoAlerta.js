function iniciarVerificacaoApos1Min30() {
    const chave = "tempoEntrada";
    const agora = Date.now();

    if (!localStorage.getItem(chave)) {
        localStorage.setItem(chave, agora);
    }

    const tempoSalvo = parseInt(localStorage.getItem(chave), 10);
    const tempoDecorrido = agora - tempoSalvo;
    const umMinMeio = 1.5 * 60 * 1000;
    console.log("Tempo necessário:", umMinMeio, "ms");

    if (tempoDecorrido >= umMinMeio) {
        console.log('Executando verificação imediatamente');
        buscarDadosEVerificar();
        iniciarRepeticao();
        atualizarDataHoraAtualizacao()
    } else {
        console.log('Aguardando o tempo restante antes da primeira execução');
        const restante = umMinMeio - tempoDecorrido;
        setTimeout(() => {
            buscarDadosEVerificar();
            iniciarRepeticao();
            atualizarDataHoraAtualizacao()
        }, restante);
    }
}

function iniciarRepeticao() {
    setInterval(() => {
        buscarDadosEVerificar()
        div_fermentadora.innerHTML = ''
        exibirFermentadora()
    }, 1.5 * 60 * 1000);
}

function buscarDadosEVerificar() {
    console.log('Buscando dados e verificando...');
    const session = sessionStorage.getItem('FERMENTADORAS');

    if (!session || session === "undefined") {
        console.warn('FERMENTADORAS não encontrada ou inválida no sessionStorage');
        return;
    }

    const fermentadoras = JSON.parse(session);
    if (!Array.isArray(fermentadoras) || fermentadoras.length === 0) {
        console.warn('Array FERMENTADORAS vazio ou inválido');
        return;
    }

    const idEmpresa = fermentadoras[0].fkEmpresa;

    fermentadoras.forEach(fermentadora => {
        if (fermentadora.statusSensor == 'ativo') {
            fetch(`/medidas/validacaoTemp/${idEmpresa}/${fermentadora.idSensor}`, { cache: 'no-store' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro HTTP ${response.status}`);
                    }
                    return response.text();
                })
                .then(texto => {
                    let dados;
                    try {
                        dados = JSON.parse(texto);
                        console.log(dados)
                    } catch (e) {
                        console.error('JSON inválido:', texto);
                        return;
                    }

                    if (!Array.isArray(dados) || dados.length === 0) {
                        console.log(`Sem dados JSON para sensor ${idSensor}`);
                        return;
                    }

                    verificarAlerta(dados);
                })
                .catch(error => {
                    console.error('Erro na API:', error.message);
                });
        }
    });
}

function verificarAlerta(dados) {
    let sensores = {};
    let idSensorUltimo = 0;

    dados.forEach(dado => {
        const sensorId = dado.fkSensor;
        idSensorUltimo = sensorId;

        if (!sensores[sensorId]) {
            sensores[sensorId] = [];
        }
        sensores[sensorId].push(dado);
    });

    let idFermen = 0;
    const fermentadoras = sessionStorage.getItem('FERMENTADORAS');
    if (!fermentadoras || fermentadoras === "undefined") {
        console.warn('FERMENTADORAS não encontrada ou inválida no sessionStorage');
        return;
    }

    const fermentadorasArray = JSON.parse(fermentadoras);
    fermentadorasArray.forEach(element => {
        if (element.fkSensor == idSensorUltimo) {
            idFermen = element.idFermentadora;
        }
    });

    Object.keys(sensores).forEach(sensorId => {
        const registros = sensores[sensorId];
        const total = registros.length;

        let alertas = {
            maxCritico: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minCritico: { contador: 0, idCapturaTemp: 0, temp: 0 },
            maxAtencao: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minAtencao: { contador: 0, idCapturaTemp: 0, temp: 0 },
            maxCuidado: { contador: 0, idCapturaTemp: 0, temp: 0 },
            minCuidado: { contador: 0, idCapturaTemp: 0, temp: 0 }
        };

        registros.forEach(r => {
            const temperatura = r.temperatura;
            const limiteMin = r.limiteTempMin;
            const limiteMax = r.limiteTempMax;
            const idCapturaTemp = r.idCaptura;

            if (temperatura < limiteMin || temperatura > limiteMax) {
                if (temperatura <= limiteMin - 5) {
                    alertas.minCritico.contador++;
                    alertas.minCritico.temp = temperatura;
                    if (!alertas.minCritico.idCapturaTemp) alertas.minCritico.idCapturaTemp = idCapturaTemp;
                } else if (temperatura >= limiteMax + 5) {
                    alertas.maxCritico.contador++;
                    alertas.maxCritico.temp = temperatura;
                    if (!alertas.maxCritico.idCapturaTemp) alertas.maxCritico.idCapturaTemp = idCapturaTemp;
                } else if (temperatura <= limiteMin - 3) {
                    alertas.minAtencao.contador++;
                    alertas.minAtencao.temp = temperatura;
                    if (!alertas.minAtencao.idCapturaTemp) alertas.minAtencao.idCapturaTemp = idCapturaTemp;
                } else if (temperatura >= limiteMax + 3) {
                    alertas.maxAtencao.contador++;
                    alertas.maxAtencao.temp = temperatura;
                    if (!alertas.maxAtencao.idCapturaTemp) alertas.maxAtencao.idCapturaTemp = idCapturaTemp;
                } else if (temperatura <= limiteMin - 1) {
                    alertas.minCuidado.contador++;
                    alertas.minCuidado.temp = temperatura;
                    if (!alertas.minCuidado.idCapturaTemp) alertas.minCuidado.idCapturaTemp = idCapturaTemp;
                } else if (temperatura >= limiteMax + 1) {
                    alertas.maxCuidado.contador++;
                    alertas.maxCuidado.temp = temperatura;
                    if (!alertas.maxCuidado.idCapturaTemp) alertas.maxCuidado.idCapturaTemp = idCapturaTemp;
                }
            }
        });

        const totalFora = alertas.maxCritico.contador + alertas.minCritico.contador + alertas.maxAtencao.contador + alertas.minAtencao.contador + alertas.maxCuidado.contador + alertas.minCuidado.contador;
        const percentual = (totalFora / total) * 100;

        if (percentual >= 80) {
            let categoria = "";
            let mensagem = '';
            let idCapturaTempAlerta = null;

            if (alertas.maxCritico.contador > alertas.minCritico.contador &&
                alertas.maxCritico.contador > alertas.maxAtencao.contador &&
                alertas.maxCritico.contador > alertas.maxCuidado.contador) {
                categoria = "Crítico";
                mensagem = `Urgente! Temperatura da fermentadora ${idFermen} (${alertas.maxCritico.temp}°C) está ${(alertas.maxCritico.temp - registros[0].limiteTempMax).toFixed(1)}°C acima do limite ideal de ${registros[0].limiteTempMax}°C`;
                idCapturaTempAlerta = alertas.maxCritico.idCapturaTemp;
            } else if (alertas.minCritico.contador > alertas.maxCritico.contador &&
                alertas.minCritico.contador > alertas.minAtencao.contador &&
                alertas.minCritico.contador > alertas.minCuidado.contador) {
                categoria = "Crítico";
                mensagem = `Urgente! Temperatura da fermentadora ${idFermen} (${alertas.minCritico.temp}°C) está ${(registros[0].limiteTempMin - alertas.minCritico.temp).toFixed(1)}°C abaixo do limite ideal de ${registros[0].limiteTempMin}°C`;
                idCapturaTempAlerta = alertas.minCritico.idCapturaTemp;
            } else if (alertas.maxAtencao.contador > alertas.minAtencao.contador &&
                alertas.maxAtencao.contador > alertas.maxCuidado.contador) {
                categoria = "Atenção";
                mensagem = `Atenção! Temperatura da fermentadora ${idFermen} (${alertas.maxAtencao.temp}°C) está ${(alertas.maxAtencao.temp - registros[0].limiteTempMax).toFixed(1)}°C acima do limite ideal de ${registros[0].limiteTempMax}°C`;
                idCapturaTempAlerta = alertas.maxAtencao.idCapturaTemp;
            } else if (alertas.minAtencao.contador > alertas.maxAtencao.contador &&
                alertas.minAtencao.contador > alertas.minCuidado.contador) {
                categoria = "Atenção";
                mensagem = `Atenção! Temperatura da fermentadora ${idFermen} (${alertas.minAtencao.temp}°C) está ${(registros[0].limiteTempMin - alertas.minAtencao.temp).toFixed(1)}°C abaixo do limite ideal de ${registros[0].limiteTempMin}°C`;
                idCapturaTempAlerta = alertas.minAtencao.idCapturaTemp;
            } else if (alertas.maxCuidado.contador > alertas.minCuidado.contador) {
                categoria = "Cuidado";
                mensagem = `Cuidado! Temperatura da fermentadora ${idFermen} (${alertas.maxCuidado.temp}°C) está ${(alertas.maxCuidado.temp - registros[0].limiteTempMax).toFixed(1)}°C acima do limite ideal de ${registros[0].limiteTempMax}°C`;
                idCapturaTempAlerta = alertas.maxCuidado.idCapturaTemp;
            } else if (alertas.minCuidado.contador > alertas.maxCuidado.contador) {
                categoria = "Cuidado";
                mensagem = `Cuidado! Temperatura da fermentadora ${idFermen} (${alertas.minCuidado.temp}°C) está ${(registros[0].limiteTempMin - alertas.minCuidado.temp).toFixed(1)}°C abaixo do limite ideal de ${registros[0].limiteTempMin}°C`;
                idCapturaTempAlerta = alertas.minCuidado.idCapturaTemp;
            }

            if (mensagem !== '') {
                mostrarAlerta(categoria, mensagem);
                cadastrarAlerta(categoria, mensagem, idCapturaTempAlerta)
            }
        } else {
            console.log(`Temperatura dentro do limite para fermentadora ${idFermen}`);
        }
    });
}

const filaAlertas = [];
let exibindoAlerta = false;

function enfileirarAlerta(tipo, mensagem) {
    filaAlertas.push({ tipo, mensagem });
    if (!exibindoAlerta) {
        processarFilaAlertas();
    }
}

function processarFilaAlertas() {
    if (filaAlertas.length === 0) {
        exibindoAlerta = false;
        return;
    }
    exibindoAlerta = true;
    const alerta = filaAlertas.shift();

    mostrarAlerta(alerta.tipo, alerta.mensagem);


    setTimeout(() => {
        processarFilaAlertas();
    }, 4000);
}


function mostrarAlerta(tipo, mensagem, tempo = 15000) {
    var iconTipo = '';
    var classAlert = '';

    if (tipo === 'Cuidado') {
        iconTipo = '<i class="fa-solid fa-circle-info"></i>';
        classAlert = 'cuidado';
    } else if (tipo === 'Atenção') {
        iconTipo = '<i class="fa-solid fa-circle-exclamation"></i>';
        classAlert = 'atencao';
    } else if (tipo === 'Crítico') {
        iconTipo = '<i class="fa-solid fa-triangle-exclamation"></i>';
        classAlert = 'critico';
    }

    const alerta = document.createElement('div');
    alerta.className = `container-alerta ${classAlert} active`;
    alerta.innerHTML = `
        <div class="img-icon-alerta" aria-hidden="true">${iconTipo}</div>
        <div class="text-alerta"><strong>${mensagem}</strong></div>
    `;

    const list_alert = document.getElementById('list_alert');
    if (!list_alert) {
        console.error('Container de alertas (list_alert) não encontrado no HTML');
        return;
    }
    list_alert.appendChild(alerta);
    list_alert.classList.add('active');

    setTimeout(() => {
        alerta.classList.remove('active');
        setTimeout(() => alerta.remove(), 300);
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


iniciarVerificacaoApos1Min30();


function atualizarDataHoraAtualizacao() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    const texto = `Última Atualização - ${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    const dataUltimaAtt = document.querySelector('.datatime-update');
    console.log(dataUltimaAtt)

    dataUltimaAtt.textContent = texto;
}
