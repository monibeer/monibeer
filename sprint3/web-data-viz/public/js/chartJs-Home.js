function gerarDadosGrafico() {
    const dashboard = JSON.parse(sessionStorage.DASHBOARDHOME || '[]');

    let totalAtivo = 0;
    let totalInativo = 0;
    let totalManutencao = 0;

    dashboard.forEach(estilo => {
        const total = estilo.total_ferm || 0;
        const inativo = estilo.sensor_inativo || 0;
        const manutencao = estilo.sensor_manutencao || 0;

        totalInativo += inativo;
        totalManutencao += manutencao;
        totalAtivo += total - (inativo + manutencao);
    });

    return [totalAtivo, totalInativo, totalManutencao];
}

// Obtém os dados dinâmicos
const dadosGrafico = gerarDadosGrafico();

// Seleciona o canvas do gráfico
const ctx = document.getElementById('graphic-statusFermenter').getContext('2d');

// Cria o gráfico
new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Ativo', 'Inativo', 'Manutenção'],
        datasets: [{
            data: dadosGrafico,
            backgroundColor: ['#66BB6A', '#EF5350', '#FFCA28'],
            hoverOffset: 3
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: 11,
                        weight: 800
                    }
                }
            },
            datalabels: {
                color: '#000',
                font: {
                    weight: 'bold',
                    size: 16,
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});
