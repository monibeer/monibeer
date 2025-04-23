const dataGraphicMediaTempIPA = document.getElementById('graphic-tempMediaIPA');
const dataGraphicStatusFermentar = document.getElementById('graphic-statusFermenter')

new Chart(dataGraphicMediaTempIPA, {
    type: 'line',
    data: {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
        datasets: [{
            label: 'Temperatura',
            data: [18, 19, 22, 21, 19, 19, 20, 21, 18, 22, 21],
            borderWidth: 2,
            borderColor: 'green',
            backgroundColor: 'green'
        },
        {
            label: 'Limite Temp. Max',
            data: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
            borderWidth: 1,
            borderColor: '#ff0000',
            backgroundColor: '#ff0000',
            pointRadius: 0
        },
        {
            label: 'Limite Temp. Min',
            data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            borderWidth: 1,
            borderColor: '#0084ff',
            backgroundColor: '#0084ff',
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

new Chart(dataGraphicStatusFermentar, {
    type: 'doughnut',
    data: {
        labels: ['Ativo', 'Inativo', 'Manuten...'],
        datasets: [{
            data: [20, 5, 5],
            backgroundColor: [
                'rgb(0, 230, 88)',
                'rgb(225, 26, 0)',
                'rgb(0, 157, 255)'
            ],
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
            }
        }
    }
});