// importa os bibliotecas necessários
const serialport = require("serialport");/*---------------1° BLOCO------------------*/
const express = require("express");
const mysql = require("mysql2");

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true; /*---------------2° BLOCO------------------*/

// função para comunicação serial
const serial = async (
  valoresSensorAnalogico
  // valoresSensorDigital,
) => {
  // conexão com o banco de dados MySQL
  let poolBancoDados = mysql
    .createPool({
      host: "10.18.33.19",
      user: "aluno",
      password: "Sptech#2024",
      database: "monibeer",
      port: 3307,
    })
    .promise();



  // lista as portas seriais disponíveis e procura pelo Arduino
  const portas = await serialport.SerialPort.list(); /*---------------3° BLOCO------------------*/
  const portaArduino = portas.find(
    (porta) => porta.vendorId == 2341 && porta.productId == 43
  );
  if (!portaArduino) {
    throw new Error("O arduino não foi encontrado em nenhuma porta serial");
  }

  // configura a porta serial com o baud rate especificado /*---------------4° BLOCO------------------*/

  const arduino = new serialport.SerialPort({
    path: portaArduino.path,
    baudRate: SERIAL_BAUD_RATE,
  });

  // evento quando a porta serial é aberta
  arduino.on("open", () => {
    console.log(
      `A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`
    );
  });

  // processa os dados recebidos do Arduino  /*---------------5° BLOCO------------------*/
  arduino
    .pipe(new serialport.ReadlineParser({ delimiter: "\r\n" }))
    .on("data", async (data) => {
      console.log(data);
      const valores = data.split(";");
      // const sensorDigital = parseInt(valores[0]);
      // const sensorAnalogico = parseFloat(valores[1]);
      const sensorAnalogico = parseFloat(valores[0]);

      // armazena os valores dos sensores nos arrays correspondentes
      valoresSensorAnalogico.push(sensorAnalogico);
      // valoresSensorDigital.push(sensorDigital);

      // insere os dados no banco de dados (se habilitado)
      if (HABILITAR_OPERACAO_INSERIR) {  /*---------------6° BLOCO------------------*/ 
        // este insert irá inserir os dados na tabela "medida"

// Captura 1


        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (1, ?)",
          [sensorAnalogico]
        );

//Captura 2
        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (2, ?)",
          [sensorAnalogico - 0.8]
        );

//Captura 3

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (3, ?)",
          [sensorAnalogico + 0.2]
        );

// Captura 4
      await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (4, ?)",
          [sensorAnalogico + 0.4]
        );

// Captura 5

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (5, ?)",
          [sensorAnalogico - 0.4]
        );

// Captura 6 

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (6, ?)",
          [sensorAnalogico - 0.6]
        );

// Captura 7
      
        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (7, ?)",
          [sensorAnalogico + 0.9]
        );

// Captura 8

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (8, ?)",
          [sensorAnalogico - 0.85]
        );

// Captura 9

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (9, ?)",
          [sensorAnalogico + 0.63]
        );

// Captura 10

        await poolBancoDados.execute(
          //'INSERT INTO medida (sensor_analogico, sensor_digital) VALUES (?, ?)',
          "INSERT INTO captura (fkSensor , temperatura) VALUES (10, ?)",
          [sensorAnalogico - 0.15]
        );
        console.log("valores inseridos no banco: ", sensorAnalogico);
      }
    });
  // evento para lidar com erros na comunicação serial
  arduino.on('error', (mensagem) => {
    console.error(`Erro no arduino (Mensagem: ${mensagem}`)
  });
}

// função para criar e configurar o servidor web
const servidor = (  /*---------------7° BLOCO------------------*/
  valoresSensorAnalogico
  // valoresSensorDigital
) => {
  const app = express();

  // configurações de requisição e resposta
  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // inicia o servidor na porta especificada
  app.listen(SERVIDOR_PORTA, () => {
    console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
  });

  // define os endpoints da API para cada tipo de sensor
  app.get("/sensores/analogico", (_, response) => {
    return response.json(valoresSensorAnalogico);
  });
  // app.get('/sensores/digital', (_, response) => {
  //     return response.json(valoresSensorDigital);
  // });
};

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
  // arrays para armazenar os valores dos sensores
  const valoresSensorAnalogico = [];
  // const valoresSensorDigital = [];

  // inicia a comunicação serial
  await serial(
    valoresSensorAnalogico
    // valoresSensorDigital
  );

  // inicia o servidor web
  servidor(
    valoresSensorAnalogico
    // valoresSensorDigital
  );
})();
