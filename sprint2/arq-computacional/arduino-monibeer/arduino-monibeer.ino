// Define PINO_SENSOR_TEMPERATURA como uma constante de número inteiro, e atribui o valor da porta análogica a 0.
const int PINO_SENSOR_TEMPERATURA = A0;
// Define temperaturaCelsius como um número com casas decimais.
float temperaturaCelsius;

// Define a função setup a porta do arduino e sua taxa de tranferencia de bits a 9600.
void setup() {
  Serial.begin(9600);
}

// Define função loop
void loop() {
  // Atribui a ValorLeitura a receber um número inteiro da leitura do sensor analogRead.
  int valorLeitura = analogRead(PINO_SENSOR_TEMPERATURA);
  // Define temperaturaCelsius a uma equação matemática que devolve a temperatura desejada.
  // temperaturaCelsius = (valorLeitura * 5.0 / 1023.0) / 0.01;
  temperaturaCelsius = ((valorLeitura * 5.8 / 1023.0) / 0.01)- 10;
  
  // Comandos usados para exibirem o gráfico inserindo um limite máximo de 36°C e mínimo de 32°C, temperaturaCelsius é o número da leitura do arduino.
  // Serial.print("Temperatura_Máxima:");
  // Serial.print(36);
  // Serial.print(" ");
  // Serial.print("Temperatura_Atual:");
  Serial.print(temperaturaCelsius);
  Serial.println(";");
  // Serial.print("Temperatura_Mínima:");
  // Serial.println(32);

// Define um tempo de espera até o programa poder ser reiniciado, em 2 segundos.
  delay(2000);
}
