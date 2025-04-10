CREATE DATABASE MoniBeer;
USE MoniBeer;

CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
NomeEmpresa VARCHAR(50) NOT NULL,
Email VARCHAR(70),
CNPJ CHAR(14) NOT NULL UNIQUE
);

INSERT INTO Empresa VALUES	
(DEFAULT , 'ClubeDoMalte' , 'clubemalte@outlook.com.br' , '11605819000107'),
(DEFAULT , 'Colorado', 'colorado@enterprise.com' , '01366303000195'),
(DEFAULT , 'Eisenbahn', 'eisen@eisenbahn.com' , '04176513000109'),
(DEFAULT , 'Ledmont', 'ledmont@led.com' , '33846612000159'),
(DEFAULT , 'Barestia', 'Barestia@gmail.com.br' , '56426771000108');

SELECT * FROM Empresa;


CREATE TABLE Funcionario(
idFuncionario INT PRIMARY KEY auto_increment,
Email VARCHAR (250) NOT NULL,
SenhaIncriptada VARCHAR (255) NOT NULL,
TipoUsuario VARCHAR (40) DEFAULT 'Funcionario',
CONSTRAINT chk_tipo CHECK (TipoUsuario in ('Administrador', 'Funcionario')),
fkEmpresa INT NULL,
CONSTRAINT EmpresaFuncionario
FOREIGN KEY (fkEmpresa)
REFERENCES Empresa(idEmpresa)
);

INSERT INTO Funcionario VALUES 
                                                                       -- SUPURSUR
(NULL , 'silvana.batista@clubedomalte.com.br', '1010011 1010101 1010000 1010101 1010010 1011101 1010011 1010101 1010010', 'Administrador', 1),
                                                                      -- LMKSTONNT
(NULL , 'anderson.soares@colorado.com.br', '1001100 1001101 1001011 1010011 1010100 1001111 1001110 1001110 1010100', 'Administrador', 2),
																	  -- RITSTPSTN
(NULL , 'vitorino.milchen@eisenbahn.com.br', '1010010 1001001 1010100 1010011 1010100 1010000 1010011 1010100 1001110', 'Administrador', 3),
																	  -- STRQOUTST
(NULL , 'juan.bento@ledmont.com.br', '1010011 1010100 1010010 1010001 1001111 1010101 1010100 1010011 1010100', 'Administrador', 4),
                                                                      -- OORKOURTS
(NULL , 'icaro.educardo@barestia.com.br', '1001111 1001111 1010010 1001011 1001111 1010010 1010101 1010100 1010011', 'Administrador', 5);

SELECT * FROM Funcionario;

SELECT * FROM funcionario JOIN
empresa ON fkEmpresa;

CREATE TABLE Sensor(
idSensor INT PRIMARY KEY auto_increment,
Nome VARCHAR (10),
StatusSensor varchar(20),
CONSTRAINT chkStatus CHECK (statusSensor in ('Ativo', 'Inativo', 'Manutenção'))
);

INSERT INTO Sensor VALUES
(DEFAULT, 'LM35', 'Ativo'),
(DEFAULT, 'LM35', 'Ativo'),
(DEFAULT, 'LM35', 'Manutenção'),
(DEFAULT, 'LM35', 'Ativo'),
(DEFAULT, 'LM35', 'Inativo'),
(DEFAULT, 'LM35', 'Manutenção');

INSERT INTO Sensor VALUES

(DEFAULT, 'LM35', 'Ativo'),
(DEFAULT, 'LM35' , 'Inativo');

SELECT * FROM sensor;

CREATE TABLE Cerveja(
idCerveja INT PRIMARY KEY AUTO_INCREMENT,
tipoCerveja VARCHAR (45),
tempMin DECIMAL (4.2),
tempMax DECIMAL (4.2),
CONSTRAINT cnk_tipoCerveja CHECK (tipoCerveja IN('IPA' , 'PILSEN'))
);

INSERT INTO Cerveja(tipoCerveja , tempMin , tempMax) VALUES

('IPA' , 18.00 , 24.00 ),
('PILSEN' , 07.00 , 13.00);

SELECT * FROM Cerveja;

CREATE TABLE Fermentadora(
idFermentadora INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (40),
EstagioFermentacao CHAR (1),
CONSTRAINT chkferm CHECK (EstagioFermentacao in ('A', 'B', 'C')),
fkSensor INT,
CONSTRAINT SensorFermentadora
FOREIGN KEY (fkSensor)
REFERENCES Sensor(idSensor),
fkEmpresa INT,
CONSTRAINT EmpresaFermentadora
FOREIGN KEY (fkEmpresa)
REFERENCES Empresa(idEmpresa),
fkCerveja INT,
CONSTRAINT FermentadoraCerveja 
FOREIGN KEY (fkCerveja)
REFERENCES Cerveja(idCerveja)
);

INSERT INTO Fermentadora VALUES
(DEFAULT, 'Maquina 2', 'A' , 1 , 2 , 1),
(DEFAULT, 'Maquina 1', 'C' , 2 , 3 , 2),
(DEFAULT, 'Maquina 4', 'A' , 3 , 1 , 1),
(DEFAULT, 'Maquina 3', 'B' , 4 , 4 , 2),
(DEFAULT, 'Maquina 2', 'B' , 5 , 5 , 1),
(DEFAULT, 'Maquina 1', 'C' , 6 , 3 , 2),
(DEFAULT, 'Maquina 3', 'A' , 7 , 1 , 1),
(DEFAULT, 'Maquina 4', 'C' , 8 , 2 , 2);

SELECT * FROM Fermentadora;

CREATE TABLE Captura(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
sensor_analogico DECIMAL (4.2),
dtHora DATETIME
);

INSERT INTO Captura(Temperatura , dtHora) VALUES

(14.15 , '2025-04-05 05:45:30'),
(10.23 , '2025-02-05 06:10:15'),
(09.02 , '2025-03-10 14:45:32'),
(03.09 , '2025-01-05 08:00:00'),
(16.78 , '2025-02-05 16:15:24');

SELECT * FROM Captura;

CREATE TABLE Alerta(
idAlerta INT PRIMARY KEY AUTO_INCREMENT,
dtHora DATETIME,
nivel VARCHAR(45),
mensagem VARCHAR(200),
CONSTRAINT cnk_alerta CHECK(nivel IN ('Vericar o Sensor' , 'Atenção' , 'Critico'))
);

INSERT INTO Alerta ( dtHora , nivel , mensagem) VALUES

('2024-12-25 07:21:14' , 'Vericar o Sensor', 'O Sensor 23 teve uma instabilidade bruta'),
('2024-04-01 08:24:01' , 'Atenção' , 'Estado de atenção certifique-se que está tudo certo com a fermentadora'),
('2024-12-25 07:21:14' , 'Critico', 'A fermentadora precisa ser desligada ou sua produção será afetada totalmente');

SELECT * FROM Alerta;
SELECT * FROM FERMENTADORA;
SELECT * FROM FUNCIONARIO;
SELECT * FROM SENSOR;
SELECT * FROM EMPRESA;
SELECT *FROM CAPTURA;
SELECT *FROM ALERTA;
SHOW TABLES;

-- Selecionando a tabela Fermentadora com o id sendo igual a 01
SELECT * FROM FERMENTADORA WHERE idFermentadora = 1;

-- Selecionando a tabela Empresa com o representante tendo como a segunda letra A
SELECT * FROM EMPRESA WHERE  RepresentanteEmpresa LIKE '%_A';

-- Atualizamos os dados da tabela sensor em que a máquina atribuida 2 do id 2 para máquina 6
UPDATE SENSOR SET MaquinaAtribuida = 'Maquina 6' WHERE idSensor = 2;

-- Selecionando o tipo de cerveja da tabela fermentadora em que caso o estagio de fermentacao for A aparecer 1 senão Fermentação Inicial.
SELECT TipoCerveja, CASE WHEN EstagioFermentacao = 'A' THEN 'Fermentação Inicial' ELSE 'Em outras Etapas' END AS EtapaFermentacao FROM Fermentadora;

-- DELETE DE UMA EMPRESA 
DELETE FROM EMPRESA WHERE idEmpresa = 6; 
SELECT * FROM EMPRESA;

-- Apelidando os campos empresa e representante para melhor visualização 
SELECT Empresa.nomeEmpresa AS nomeDaEmpresa, Empresa.RepresentanteEmpresa AS Representante FROM Empresa;

-- Alterando a tabela sensor, modificando a coluna MaquinaAtribuida para VARCHAR(40).
ALTER TABLE SENSOR MODIFY COLUMN MaquinaAtribuida VARCHAR(40);
