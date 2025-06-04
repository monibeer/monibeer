function iniciarVerificacaoApos1Min30() {
    const chave = "tempoEntrada";
    const agora = Date.now();

    if (!localStorage.getItem(chave)) {
        localStorage.setItem(chave, agora);
    }

    const tempoSalvo = parseInt(localStorage.getItem(chave), 10);
    const tempoDecorrido = agora - tempoSalvo;
    const umMinMeio = 1.5 * 60 * 1000;
    console.log(umMinMeio)

    if (tempoDecorrido >= umMinMeio) {
        console.log('oier if')
        buscarDadosEVerificar();
    } else {
        console.log('oier else')
        const restante = umMinMeio - tempoDecorrido;
        setTimeout(function () {
            buscarDadosEVerificar();
        }, restante);
    }
}

function buscarDadosEVerificar() {
    const session = sessionStorage.FERMENTADORAS;
    const idEmpresa = JSON.parse(session)[0].fkEmpresa;

    fetch(`/medidas/validacaoTemp/${idEmpresa}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            response.json().then(resposta => {
                verificarAlerta(resposta)
            });
        } else {
            console.error('Nenhum dado encontrado');
        }
    }).catch(error => {
        console.error('Erro na API:', error);
    });
}

function verificarAlerta(dados) {
    var sensores = {};

    // Agrupa dados por sensor
    for (var i = 0; i < dados.length; i++) {
        var dado = dados[i];
        var sensorId = dado.fkSensor;

        if (!sensores[sensorId]) {
            sensores[sensorId] = [];
        }
        sensores[sensorId].push(dado);
    }

    // Lista com os ids dos sensores
    var listaSensores = Object.keys(sensores);

    // Passa por cada sensor usando for simples
    for (var i = 0; i < listaSensores.length; i++) {
        var sensorId = listaSensores[i];
        var registros = sensores[sensorId];
        var total = registros.length;
        var fora = 0;

        for (var j = 0; j < registros.length; j++) {
            var r = registros[j];
            if (r.temperatura < r.limiteTempMin || r.temperatura > r.limiteTempMax) {
                fora++;
            }
        }

        var percentual = (fora / total) * 100;

        if (percentual >= 40) {
            alert("⚠️ Sensor " + sensorId + ": " + percentual.toFixed(1) + "% fora do ideal!");
        } else {
            console.log("Sensor " + sensorId + ": tudo certo (" + percentual.toFixed(1) + "% fora).");
        }
    }
}
