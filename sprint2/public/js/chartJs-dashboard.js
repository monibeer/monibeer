const dataGraphicMediaTempIPA = document.getElementById('graphic-tempMediaIPA');
const dataGraphicIndividualTempIPA = document.getElementById('graphic-tempIndividualIPA');

// Gráfico de médias por fermentadora
new Chart(dataGraphicMediaTempIPA, {
    type: 'line',
    data: {
        labels: ['Fermentadora 1', 'Fermentadora 2', 'Fermentadora 3', 'Fermentadora 4', 'Fermentadora 5', 'Fermentadora 6', 'Fermentadora 7', 'Fermentadora 8', 'Fermentadora 9', 'Fermentadora 10'],
        datasets: [
            {
                label: 'Temperatura',
                data: [19.2, 24.1, 21.7, 24.3, 19.6, 19.4, 20.2, 21.1, 19.7, 24.0],
                borderWidth: 2,
                backgroundColor: '#ff9f1c', // laranja vibrante
                borderColor: '#ff9f1c',
                stack: 'combined',
                type: 'bar',
                barThickness: 30
            },
            {
                label: 'Limite Temp. Max',
                data: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                borderWidth: 1,
                borderColor: '#d62828', // vermelho escuro
                backgroundColor: '#d62828',
                pointRadius: 0
            },
            {
                label: 'Limite Temp. Min',
                data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                borderWidth: 1,
                borderColor: '#1d3557', // azul escuro
                backgroundColor: '#1d3557',
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 17,
                max: 23
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 13,
                    }
                }
            }
        }
    }
});


// Gráfico de temperatura individual
new Chart(dataGraphicIndividualTempIPA, {
    type: 'line',
    data: {
        labels: ['12:00', '12:01', '12:02', '12:03', '12:04', '12:05', '12:06', '12:07', '12:08', '12:09', '12:10', '12:11', '12:12', '12:13', '12:14', '12:15'],
        datasets: [
            {
                label: 'Temperatura',
                data: [18, 19, 22, 21, 19, 19, 20, 21, 18, 22, 21, 21, 19, 19, 20, 21],
                borderWidth: 2,
                borderColor: '#6a4c93', // roxo forte
                backgroundColor: '#6a4c93'
            },
            {
                label: 'Limite Temp. Max',
                data: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                borderWidth: 1,
                borderColor: '#d62828',
                backgroundColor: '#d62828',
                pointRadius: 0
            },
            {
                label: 'Limite Temp. Min',
                data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
                borderWidth: 1,
                borderColor: '#1d3557',
                backgroundColor: '#1d3557',
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 17,
                max: 23
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 13,
                    }
                }
            }
        }
    }
});
