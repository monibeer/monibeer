const dataGraphicMediaTempIPA = document.getElementById('graphic-tempMediaIPA');
const dataGraphicIndividualTempIPA = document.getElementById('graphic-tempIndividualIPA');

// Gráfico de médias por fermentadora
var chartTempMedia = new Chart(dataGraphicMediaTempIPA, {
    type: 'line',
    data: {
        labels: ['Fermentadora 1', 'Fermentadora 2', 'Fermentadora 3', 'Fermentadora 4', 'Fermentadora 5', 'Fermentadora 6', 'Fermentadora 7', 'Fermentadora 8', 'Fermentadora 9', 'Fermentadora 10'],
        datasets: [
            {
                label: 'Temperatura',
                data: [19.2, 20.1, 21.7, 22, 19.6, 25.4, 24.2, 21.1, 19.7, 24.0],
                borderWidth: 2,
                backgroundColor: '#ff9f1c',
                borderColor: '#ff9f1c',
                stack: 'combined',
                type: 'bar',
                barThickness: 30
            },
            {
                label: 'Limite Temp. Max',
                data: [22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],
                borderWidth: 1,
                borderColor: '#d62828',
                backgroundColor: '#d62828',
                pointRadius: 0
            },
            {
                label: 'Limite Temp. Min',
                data: [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
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


// Gráfico de temperatura individual
var tempAtual = new Chart(dataGraphicIndividualTempIPA, {
    type: 'line',
    data: {
        labels: ['12:00', '12:01', '12:02', '12:03', '12:04', '12:05', '12:06', '12:07', '12:08', '12:09', '12:10', '12:11', '12:12', '12:13', '12:14', '12:15'],
        datasets: [
            {
                label: 'Temperatura',
                data: [18, 19, 22, 21, 19, 19, 20, 21, 18, 22, 21, 21, 19, 19, 20, 21],
                borderWidth: 2,
                borderColor: '#b64300',
                backgroundColor: '#b64300'
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


function setorB() {
    chartTempMedia.data.datasets[0].data = [20.8, 21.5, 19.9, 20.1, 21.3, 19.2, 20.0, 19.6, 21.7, 25.1];
    chartTempMedia.data.labels = ['Fermentadora 11', 'Fermentadora 12', 'Fermentadora 13', 'Fermentadora 14', 'Fermentadora 15', 'Fermentadora 16', 'Fermentadora 17', 'Fermentadora 18', 'Fermentadora 19', 'Fermentadora 20'];
    select_buttons.innerHTML = `
    <button class="" onclick="setorA()">Setor A</button>
    <button class="active" onclick="setorB()">Setor B</button>
    `
    chartTempMedia.update();
}

function setorA() {
    chartTempMedia.data.datasets[0].data = [19.2, 20.1, 21.7, 22, 19.6, 25.4, 24.2, 21.1, 19.7, 24.0];
    chartTempMedia.data.labels = ['Fermentadora 1', 'Fermentadora 2', 'Fermentadora 3', 'Fermentadora 4', 'Fermentadora 5', 'Fermentadora 6', 'Fermentadora 7', 'Fermentadora 8', 'Fermentadora 9', 'Fermentadora 10'];
    select_buttons.innerHTML = `
        <button class="active" onclick="setorA()">Setor A</button>
        <button class="" onclick="setorB()">Setor B</button>
    `
    chartTempMediaMedia.update();
}

function fermentadora1() {
    tempAtual.data.datasets[0].data = [18, 19, 22, 21, 19, 19, 20, 21, 18, 22, 21, 21, 19, 19, 20, 21];
    select_buttons_fermenter.innerHTML = `
        <button class="active" onclick="fermentadora1()"><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 1</button>
        <button onclick="fermentadora2()"><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 2</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 3</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 4</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 5</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 6</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 7</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 8</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 9</button>
        <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 10</button>
    `
    title_fermenter.innerHTML = 'Fermentadora IPA 01'
    tempAtual.update();
}

function fermentadora2() {
    tempAtual.data.datasets[0].data = [19, 21, 20, 18, 22, 19, 21, 20, 19, 22, 18, 21, 19, 20, 21, 22];
    select_buttons_fermenter.innerHTML = `
    <button class="" onclick="fermentadora1()"><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 1</button>
    <button class="active" onclick="fermentadora2()"><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 2</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 3</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 4</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 5</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 6</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 7</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 8</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 9</button>
    <button><i class="fa-solid fa-beer-mug-empty"></i> Fermentadora 10</button>
    `
    title_fermenter.innerHTML = 'Fermentadora IPA 02'
    tempAtual.update();
}