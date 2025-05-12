-- DROP DATABASE monibeer;
CREATE DATABASE monibeer;
USE monibeer;

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(100),
    numero CHAR(5),
    cidade VARCHAR(45),
    uf CHAR(2)
);

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(50) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    fkEndereco INT NOT NULL,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEndereco)
        REFERENCES endereco (idEndereco)
);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(45) NOT NULL,
    emailUsuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    tipoUsuario VARCHAR(40) DEFAULT 'funcionario',
    CONSTRAINT chk_tipo CHECK (tipoUsuario IN ('administrador' , 'funcionario')),
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkEmpresaFuncionario FOREIGN KEY (fkEmpresa)
        REFERENCES empresa (idEmpresa)
);

CREATE TABLE setor (
    idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkSetorEmpresa FOREIGN KEY (fkEmpresa)
        REFERENCES empresa (idEmpresa)
);

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(10),
    statusSensor VARCHAR(20) NOT NULL,
    CONSTRAINT chk_status CHECK (statusSensor IN ('ativo' , 'inativo', 'manutenção'))
);

CREATE TABLE fermentadora (
    idFermentadora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20),
    fkSensor INT UNIQUE NOT NULL,
    fkSetor INT NOT NULL,
    CONSTRAINT fkSensorFermentadora FOREIGN KEY (fkSensor)
        REFERENCES sensor (idSensor),
    CONSTRAINT fkSetorFermentadora FOREIGN KEY (fkSetor)
        REFERENCES setor (idSetor)
);

CREATE TABLE estilo (
    idEstilo INT PRIMARY KEY AUTO_INCREMENT,
    estiloCerveja VARCHAR(45) NOT NULL,
    limiteTempMax DECIMAL(4 , 2 ),
    limiteTempMin DECIMAL(4 , 2 ),
    CONSTRAINT chk_estilo CHECK (estiloCerveja IN ('ipa' , 'pilsen'))
);

CREATE TABLE historico_fermentadora (
    idHistorico INT AUTO_INCREMENT,
    fkFermentadora INT,
    fkEstilo INT,
    CONSTRAINT pkHistorico PRIMARY KEY (idHistorico, fkFermentadora , fkEstilo),
    dataInicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    dataFim DATETIME,
    CONSTRAINT fkHistoricoFermentadora FOREIGN KEY (fkFermentadora)
        REFERENCES fermentadora (idFermentadora),
    CONSTRAINT fkHistoricoEstilo FOREIGN KEY (fkEstilo)
        REFERENCES estilo (idEstilo)
);

CREATE TABLE captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4 , 2 ) NOT NULL,
    dtHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL,
    CONSTRAINT fkSensorCaptura FOREIGN KEY (fkSensor)
        REFERENCES sensor (idSensor)
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    dtHora DATETIME,
    nivel VARCHAR(45) NOT NULL,
    mensagem VARCHAR(255),
    fkCaptura INT UNIQUE,
    CONSTRAINT chk_alerta CHECK (nivel IN ('Cuidado' , 'Atenção', 'Crítico')),
    CONSTRAINT fkCapturaAlerta FOREIGN KEY (fkCaptura)
        REFERENCES captura (idCaptura)
);

INSERT INTO endereco VALUES
(DEFAULT, 'Rua João Goulart', '123', 'São Paulo', 'SP'),
(DEFAULT, 'Avenida das Américas', '456', 'Rio de Janeiro', 'RJ'),
(DEFAULT, 'Rua Padre Eustáquio', '789', 'Belo Horizonte', 'MG'),
(DEFAULT, 'Rua Barão de Itapetininga', '321', 'São Paulo', 'SP'),
(DEFAULT, 'Alameda Dom Pedro II', '654', 'Salvador', 'BA');

INSERT INTO empresa VALUES  
(DEFAULT, 'Moinho de Cevada', '11605819000107', 'contato@moinhodecevada.com.br', '(11)98765-4321', 1),
(DEFAULT, 'Cervejaria Sertão Malteado', '01366303000195', 'contato@sertaomalteado.com.br', '(21)99876-5432', 2),
(DEFAULT, 'Lupulândia Brewery', '04176513000109', 'contato@lupulandia.com.br', '(31)91234-5678', 3),
(DEFAULT, 'Silva Beer', '33846612000159', 'contato@silvabeer.com.br', '(11)99123-4567', 4),
(DEFAULT, 'Cervejaria Cervo da Mata', '56426771000108', 'contato@cervodamata.com.br', '(71)98765-1234', 5);

INSERT INTO funcionario VALUES
(NULL, 'Silvana', 'silvana.batista@clubedomalte.com.br', 'a123456789b', '(11)91234-5678', 'administrador', 1),
(NULL, 'Anderson', 'anderson.soares@colorado.com.br', 'c987654321d', '(21)98765-4321', 'administrador', 2),
(NULL, 'Vitorino', 'vitorino.milchen@eisenbahn.com.br', 'e987654321f', '(31)99876-5432', 'administrador', 3),
(NULL, 'Rodrigo', 'rodrigo@hotmail.com', 'Monibeer123', '(11)99234-5678', 'administrador', 4),
(NULL, 'Juan', 'juan.bento@ledmont.com.br', 'g987654321h', '(51)99123-4567', 'administrador', 5);

INSERT INTO setor VALUES
(DEFAULT, 'Setor A', 1),
(DEFAULT, 'Setor B', 1),
(DEFAULT, 'Setor C', 2),
(DEFAULT, 'Setor D', 3);

INSERT INTO sensor VALUES
(DEFAULT, 'sensor 1', 'ativo'),
(DEFAULT, 'sensor 2', 'ativo'),
(DEFAULT, 'sensor 3', 'manutenção'),
(DEFAULT, 'sensor 4', 'ativo'),
(DEFAULT, 'sensor 5', 'inativo'),
(DEFAULT, 'sensor 6', 'manutenção'),
(DEFAULT, 'sensor 7', 'ativo'),
(DEFAULT, 'sensor 8', 'ativo'),
(DEFAULT, 'sensor 9', 'inativo'),
(DEFAULT, 'sensor 10', 'inativo'),
(DEFAULT, 'sensor 11', 'ativo'),
(DEFAULT, 'sensor 12', 'ativo'),
(DEFAULT, 'sensor 13', 'inativo'),
(DEFAULT, 'sensor 14', 'ativo'),
(DEFAULT, 'sensor 15', 'inativo'),
(DEFAULT, 'sensor 16', 'manutenção'),
(DEFAULT, 'sensor 17', 'ativo'),
(DEFAULT, 'sensor 18', 'ativo'),
(DEFAULT, 'sensor 19', 'ativo'),
(DEFAULT, 'sensor 20', 'ativo');

INSERT INTO fermentadora (nome, fkSensor, fkSetor) VALUES
('Fermentadora 1', 1, 1),
('Fermentadora 2', 2, 1),
('Fermentadora 3', 3, 1),
('Fermentadora 4', 4, 1),
('Fermentadora 5', 5, 1),
('Fermentadora 6', 6, 1),
('Fermentadora 7', 7, 1),
('Fermentadora 8', 8, 1),
('Fermentadora 9', 9, 1),
('Fermentadora 10', 10, 1),
('Fermentadora 11', 11, 1),
('Fermentadora 12', 12, 1),
('Fermentadora 13', 13, 1),
('Fermentadora 14', 14, 1),
('Fermentadora 15', 15, 1),
('Fermentadora 16', 16, 1),
('Fermentadora 17', 17, 1),
('Fermentadora 18', 18, 1),
('Fermentadora 19', 19, 1),
('Fermentadora 20', 20, 1);

INSERT INTO estilo (estiloCerveja, limiteTempMin, limiteTempMax) VALUES
('ipa', 18.00, 22.00),
('pilsen', 9.00, 12.00);

INSERT INTO historico_fermentadora (fkFermentadora, fkEstilo, dataFim) VALUES
(1, 1, '2024-11-10 08:00:00'),
(2, 2, '2024-11-11 09:00:00'),
(3, 1, '2024-11-12 10:00:00'),
(4, 2, '2024-11-13 11:00:00'),
(5, 1, '2024-11-14 12:00:00'),
(6, 2, '2024-11-15 13:00:00'),
(7, 1, '2024-11-16 14:00:00'),
(8, 2, '2024-11-17 15:00:00'),
(9, 1, '2024-11-18 16:00:00'),
(10, 2, '2024-11-19 17:00:00'),
(11, 1, NULL),
(12, 2, NULL),
(13, 1, NULL),
(14, 2, NULL),
(15, 1, NULL),
(16, 2, NULL),
(17, 1, NULL),
(18, 2, NULL),
(19, 1, NULL),
(20, 2, NULL);


INSERT INTO captura (temperatura, fkSensor) VALUES
(22.10, 1),
(17.90, 2),
(24.45, 4),
(16.75, 7),
(27.50, 8),
(18.90, 11),
(19.20, 12),
(20.10, 14),
(21.50, 17),
(19.80, 18),
(20.75, 19),
(18.60, 20);

INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES -- definir mensagens melhores
('2024-12-25 07:21:14', 'Cuidado', 'Temperatura está acima do limite ideal de 22°C', 1), -- sensor 1
('2024-12-25 12:21:14', 'Cuidado', 'Temperatura está abaixo do limite ideal 18°C', 2), -- sensor 2
('2024-04-01 08:24:01', 'Atenção', 'Temperatura está acima de 23°C', 3), -- sensor 4
('2024-04-01 14:24:01', 'Atenção', 'Temperatura está abaixo de 17°C', 4), -- sensor 7
('2024-12-25 07:21:14', 'Crítico', 'Temperatura acima de 27°C', 5); -- sensor 8

SHOW TABLES;

SELECT * FROM endereco;
SELECT * FROM empresa;
SELECT * FROM funcionario;
SELECT * FROM setor;
SELECT * FROM sensor;
SELECT * FROM fermentadora;
SELECT * FROM estilo;
SELECT * FROM historico_fermentadora;
SELECT * FROM captura;
SELECT * FROM alerta;


---------- TEMPLATES PARA QUANDO PRECISAR (NÃO APAGUE!) -------------------------

-- ALTER TABLE exemplo ADD COLUMN x x; -- adicionando um campo/coluna
-- ALTER TABLE exemplo MODIFY COLUMN x x; -- modificando um campo/coluna
-- ALTER TABLE exemplo DROP COLUMN x; -- excluindo um campo/coluna
-- DROP TABLE exemplo;
-- UPDATE exemplo SET x = xx WHERE condição; -- alterar algum dado
-- DELETE FROM exemplo WHERE condição;
-- ALTER TABLE exemplo ADD CONSTRAINT chkExemplo CHECK (x in ('exemplo1', 'exemplo2')); -- adicionando check

SELECT * FROM sensor WHERE statusSensor = 'inativo';
SELECT * FROM empresa WHERE nomeEmpresa LIKE "M%"; -- filtra pela primeira letra
SELECT * FROM empresa WHERE nomeEmpresa LIKE "%a"; -- filtra pela última
SELECT * FROM empresa WHERE nomeEmpresa LIKE "%ee%"; -- filtra entre
SELECT * FROM funcionario ORDER BY nomeFuncionario DESC; -- ASC

-- JOIN
-- fermentadora, captura e sensor
SELECT	f.nome AS Fermentadora,
		c.temperatura AS Temperatura,
        s.nome AS Sensor,
       s.statusSensor AS StatusSensor
FROM fermentadora AS f
LEFT JOIN sensor AS s
ON f.fkSensor = s.idSensor
LEFT JOIN captura AS c
ON c.fkSensor = s.idSensor;

SELECT	f.nome AS Fermentadora,
		s.nome AS Sensor,
		c.temperatura AS Temperatura
FROM fermentadora AS f
JOIN sensor AS s
ON f.fkSensor = s.idSensor
JOIN captura AS c
ON c.fkSensor = s.idSensor;

SELECT	f.nome AS fermentadora,
		s.idSensor AS Sensor,
		c.temperatura AS Temperatura,
        c.dtHora AS Horario
FROM fermentadora AS f
JOIN sensor AS s
ON s.idSensor = f.fkSensor
JOIN captura AS c
ON s.idSensor = c.fkSensor;

-- sensor, captura
SELECT	s.idSensor AS Sensor,
		c.temperatura AS Temperatura,
        c.dtHora AS Horario
FROM sensor AS s
JOIN captura AS c
ON s.idSensor = c.fkSensor;

-- sensor, captura, alerta
SELECT	s.idSensor AS Sensor,
		c.temperatura AS Temperatura,
        c.dtHora AS Horario,
        a.nivel AS Alerta,
        a.mensagem AS Descrição
FROM sensor AS s
JOIN captura AS c
ON s.idSensor = c.fkSensor
JOIN alerta AS a
ON c.idCaptura = a.fkCaptura;

-- empresa, funcionario
SELECT e.nomeEmpresa AS Empresa,
	f.nomeFuncionario AS Funcionario
FROM empresa AS e
JOIN funcionario AS f
ON e.idEmpresa = f.fkEmpresa;

SELECT e.nomeEmpresa AS Empresa,
	f.nomeFuncionario AS Funcionario
FROM empresa AS e
JOIN funcionario AS f
ON e.idEmpresa = f.fkEmpresa
WHERE e.nomeEmpresa = 'Silva Beer';

-- empresa, endereço
SELECT e.nomeEmpresa AS Empresa,
	ed.rua AS Rua,
    ed.numero AS Numero,
    ed.cidade AS Cidade,
    ed.uf AS Estado
FROM empresa AS e
JOIN endereco AS ed
ON ed.idEndereco = e.fkEndereco;

-- empresa, setor, fermentadora, estilo
SELECT e.nomeEmpresa AS Empresa,
       s.nome AS Setor,
       f.nome AS Fermentadora,
       es.estiloCerveja AS Cerveja
FROM empresa AS e
JOIN setor AS s
ON e.idEmpresa = s.fkEmpresa
JOIN fermentadora AS f
ON s.idSetor = f.fkSetor
JOIN historico_fermentadora AS hf
ON f.idFermentadora = hf.fkFermentadora
JOIN estilo AS es
ON hf.fkEstilo = es.idEstilo;









