
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
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    fkEndereco INT NOT NULL,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEndereco)
        REFERENCES endereco (idEndereco)
);

CREATE TABLE codigo_ativacao (
idCodigo_ativacao INT PRIMARY KEY AUTO_INCREMENT,
codigo INT, 
fkEmpresa INT,
	CONSTRAINT fkCodigoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa)
);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
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
(DEFAULT, 'Moinho de Cevada', '11605819000107', 1),
(DEFAULT, 'Cervejaria Sertão Malteado', '01366303000195', 2),
(DEFAULT, 'Lupulândia Brewery', '04176513000109', 3),
(DEFAULT, 'Silva Beer', '33846612000159',  4),
(DEFAULT, 'Cervejaria Cervo da Mata', '56426771000108', 5);

INSERT INTO funcionario VALUES
(NULL, 'Silvana', 'silvana.batista@clubedomalte.com.br', 'a123456789b', 'administrador', 1),
(NULL, 'Anderson', 'anderson.soares@colorado.com.br', 'c987654321d', 'administrador', 2),
(NULL, 'Vitorino', 'vitorino.milchen@eisenbahn.com.br', 'e987654321f','administrador', 3),
(NULL, 'Rodrigo', 'rodrigo@hotmail.com', 'Monibeer123', 'administrador', 4),
(NULL, 'Juan', 'juan.bento@ledmont.com.br', 'g987654321h', 'administrador', 5);

INSERT INTO setor VALUES
(DEFAULT, 'Setor A', 1),
(DEFAULT, 'Setor B', 1),
(DEFAULT, 'Setor C', 2),
(DEFAULT, 'Setor D', 3);

INSERT INTO sensor VALUES
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'manutenção'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'inativo'),
(DEFAULT, 'lm35', 'manutenção'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'inativo'),
(DEFAULT, 'lm35', 'inativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'inativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'inativo'),
(DEFAULT, 'lm35', 'manutenção'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo'),
(DEFAULT, 'lm35', 'ativo');

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

INSERT INTO historico_fermentadora (fkFermentadora, fkEstilo, dataInicio, dataFim) VALUES
(1, 1, '2024-11-01 08:00:00', '2024-11-10 08:00:00'),
(2, 2, '2024-11-02 09:00:00', '2024-11-11 09:00:00'),
(3, 1, '2024-11-03 10:00:00', '2024-11-12 10:00:00'),
(4, 2, '2024-11-04 11:00:00', '2024-11-13 11:00:00'),
(5, 1, '2024-11-05 12:00:00', '2024-11-14 12:00:00'),
(6, 2, '2024-11-06 13:00:00', '2024-11-15 13:00:00'),
(7, 1, '2024-11-07 14:00:00', '2024-11-16 14:00:00'),
(8, 2, '2024-11-08 15:00:00', '2024-11-17 15:00:00'),
(9, 1, '2024-11-09 16:00:00', '2024-11-18 16:00:00'),
(10, 2, '2024-11-10 17:00:00', '2024-11-19 17:00:00'),
(11, 1, '2024-12-01 08:30:00', NULL),
(12, 2, '2024-12-02 09:30:00', NULL),
(13, 1, '2024-12-03 10:30:00', NULL),
(14, 2, '2024-12-04 11:30:00', NULL),
(15, 1, '2024-12-05 12:30:00', NULL),
(16, 2, '2024-12-06 13:30:00', NULL),
(17, 1, '2024-12-07 14:30:00', NULL),
(18, 2, '2024-12-08 15:30:00', NULL),
(19, 1, '2024-12-09 16:30:00', NULL),
(20, 2, '2024-12-10 17:30:00', NULL);

INSERT INTO captura (temperatura, fkSensor) VALUES
(18.50, 1),
(20.45, 2),
(21.00, 3),
(22.45, 4),
(18.69, 5);

INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES
('2024-12-25 07:21:14', 'Cuidado', 'Atingiu o limite máximo do ideal 22°C ', 1),
('2024-12-25 12:21:14', 'Cuidado', 'Atingiu o limite mínimo do ideal 18°C', 2),
('2024-04-01 08:24:01', 'Atenção', 'Está 2 graus celsius acima do limite máximo ideal', 3),
('2024-04-01 14:24:01', 'Atenção', 'Está 2 graus celsius abaixo do limite mínimo ideal', 4),
('2024-12-25 07:21:14', 'Crítico', 'Ultrapassou o limite máximo permitido, temperatura acima de 26°C.', 5);

SELECT * FROM endereco;
SELECT * FROM empresa;
SELECT * FROM codigo_ativacao;
/*
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
*/