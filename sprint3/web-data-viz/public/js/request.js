function verDashPorAlerta() {
    const credenciais = sessionStorage.CREDENCIAIS_DASH;
    console.log(credenciais)

    if (credenciais) {
        const idFermen = JSON.parse(credenciais);

        obterDadosGrafico(idFermen);
        atualizarInfoFermenterKpi(idFermen);
        exibirFermentadora();

        selecionarBotaoFermentadora(idFermen);
        pegarKpiTempoForaDoIdeal(idFermen)

        sessionStorage.removeItem('CREDENCIAIS_DASH');
    } else {
        obterDadosGrafico(1);
        atualizarInfoFermenterKpi(1);
        exibirFermentadora();
        selecionarBotaoFermentadora(1);
        pegarKpiTempoForaDoIdeal(1)
    }
}

function selecionarBotaoFermentadora(idFermen) {
    const fermenters = document.querySelectorAll('.fermenter-item');
    fermenters.forEach(el => el.classList.remove('selected'));
    const selecionado = document.querySelector(`.fermenter-item[data-id='${idFermen}']`);
    if (selecionado) selecionado.classList.add('selected');
}

verDashPorAlerta();
