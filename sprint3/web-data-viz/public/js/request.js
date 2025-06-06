function verDashPorAlerta() {
    const credenciais = sessionStorage.CREDENCIAIS_DASH;
    console.log(credenciais)

    if (credenciais) {
        const idFermen = JSON.parse(credenciais);

        // Atualiza tudo pra essa fermentadora
        obterDadosGrafico(idFermen);
        atualizarInfoFermenterKpi(idFermen);
        exibirFermentadora();

        // Seleciona o botão correto
        selecionarBotaoFermentadora(idFermen);

        // Remove a credencial para "matar a sessão"
        sessionStorage.removeItem('CREDENCIAIS_DASH');
    } else {
        // Se não tiver credencial, exibe fermentadora 1 por padrão
        obterDadosGrafico(1);
        atualizarInfoFermenterKpi(1);
        exibirFermentadora();
        selecionarBotaoFermentadora(1);
    }
}

function selecionarBotaoFermentadora(idFermen) {
    const fermenters = document.querySelectorAll('.fermenter-item');
    fermenters.forEach(el => el.classList.remove('selected'));
    const selecionado = document.querySelector(`.fermenter-item[data-id='${idFermen}']`);
    if (selecionado) selecionado.classList.add('selected');
}

verDashPorAlerta();
