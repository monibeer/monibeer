CREATE DATABASE monibeer;
USE monibeer;

CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nomeEmpresa VARCHAR(50) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255),
    telefone VARCHAR(20)
);

INSERT INTO empresa VALUES  
    (DEFAULT, 'Moinho de Cevada', '11605819000107', 'contato@moinhodecevada.com.br', '(11)98765-4321'),
    (DEFAULT, 'Cervejaria Sertão Malteado', '01366303000195', 'contato@sertaomalteado.com.br', '(21)99876-5432'),
    (DEFAULT, 'Lupulândia Brewery', '04176513000109', 'contato@lupulandia.com.br', '(31)91234-5678'),
    (DEFAULT, 'Silva Beer', '33846612000159', 'contato@silvabeer.com.br', '(11)99123-4567'),
    (DEFAULT, 'Cervejaria Cervo da Mata', '56426771000108', 'contato@cervodamata.com.br', '(71)98765-1234');

CREATE TABLE endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(100),
    numero CHAR(5),
    cidade VARCHAR(45),
    uf CHAR(2),
    fkEmpresa INT,
    CONSTRAINT fkEmpresaEndereco 
    FOREIGN KEY(fkEmpresa) 
    REFERENCES empresa(idEmpresa)
);

CREATE TABLE funcionario (
    idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
    nomeFuncionario VARCHAR(45) NOT NULL,
    emailUsuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
	telefone VARCHAR(20),
    tipoUsuario VARCHAR(40) DEFAULT 'funcionario',
    CONSTRAINT chk_tipo CHECK (tipoUsuario IN ('administrador', 'funcionario')),
    fkEmpresa INT NULL,
    CONSTRAINT fkEmpresaFuncionario FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario VALUES
    (NULL, 'Silvana', 'silvana.batista@clubedomalte.com.br', 'a123456789b', '(11)91234-5678', 'administrador', 1),
    (NULL, 'Anderson', 'anderson.soares@colorado.com.br', 'c987654321d', '(21)98765-4321', 'administrador', 2),
    (NULL, 'Vitorino', 'vitorino.milchen@eisenbahn.com.br', 'e987654321f', '(31)99876-5432' , 'administrador', 3),
	(NULL, 'Rodrigo', 'rodrigo@hotmail.com', 'Monibeer123', '(11)99234-5678', 'administrador', 4),
	(NULL, 'Juan', 'juan.bento@ledmont.com.br', 'g987654321h', '(51)99123-4567', 'administrador', 5);

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(10),
    statusSensor VARCHAR(20) NOT NULL,
    CONSTRAINT chk_status CHECK (statusSensor in ('ativo', 'inativo', 'manutenção'))
);

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
    (DEFAULT, 'lm35', 'ativo')
;

CREATE TABLE estilo (
    idEstilo INT PRIMARY KEY AUTO_INCREMENT,
    estiloCerveja VARCHAR(45),
    limiteTempMax DECIMAL(4,2),
    limiteTempMin DECIMAL(4,2),
    CONSTRAINT chk_estilo 
    CHECK (estiloCerveja IN ('ipa', 'pilsen'))
);

INSERT INTO estilo (estiloCerveja, limiteTempMin, limiteTempMax) VALUES
    ('ipa', 18.00, 22.00),
    ('pilsen', 9.00, 12.00);
    
CREATE TABLE setor (
	idSetor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

INSERT INTO setor VALUES
 (DEFAULT, 'A'),
 (DEFAULT, 'B'),
 (DEFAULT, 'C'),
 (DEFAULT,'D');

CREATE TABLE fermentadora (
    idFermentadora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
    fkSensor INT,
	fkEmpresa INT,
	fkEstilo INT,
    fkSetor INT,
    CONSTRAINT fkSensorFermentadora 
    FOREIGN KEY (fkSensor) 
    REFERENCES sensor(idSensor),
    CONSTRAINT fkEmpresaFermentadora 
    FOREIGN KEY (fkEmpresa) 
    REFERENCES empresa(idEmpresa),
    CONSTRAINT fkEstiloFermentadora 
    FOREIGN KEY (fkEstilo)
    REFERENCES estilo(idEstilo),
	CONSTRAINT fkSetorFermentadora
    FOREIGN KEY (fkSetor)
    REFERENCES setor(idSetor)
);

INSERT INTO fermentadora (nome, fkSensor, fkEmpresa, fkEstilo, fkSetor) VALUES
    ('Fermentadora 1', 1, 1, 1, '1'),
    ('Fermentadora 2', 2, 1, 1, '1'),
    ('Fermentadora 3', 3, 1, 1, '1'),
    ('Fermentadora 4', 4, 1, 1, '1'),
    ('Fermentadora 5', 5, 1, 1, '1'),
    ('Fermentadora 6', 6, 1, 1, '1'),
    ('Fermentadora 7', 7, 1, 1, '1'),
    ('Fermentadora 8', 8, 1, 1, '1'),
    ('Fermentadora 9', 9, 1, 1, '1'),
    ('Fermentadora 10', 10, 1, 1, '1'),
    ('Fermentadora 11', 11, 1, 2, '1'),
    ('Fermentadora 12', 12, 1, 2, '1'),
    ('Fermentadora 13', 13, 1, 2, '1'),
    ('Fermentadora 14', 14, 1, 2, '1'),
    ('Fermentadora 15', 15, 1, 2, '1'),
    ('Fermentadora 16', 16, 1, 2, '1'),
    ('Fermentadora 17', 17, 1, 2, '1'),
    ('Fermentadora 18', 18, 1, 2, '1'),
    ('Fermentadora 19', 19, 1, 2, '1'),
    ('Fermentadora 20', 20, 1, 2, '1');


CREATE TABLE captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    dtHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT,
    CONSTRAINT fkSensorCaptura 
    FOREIGN KEY (fkSensor) 
    REFERENCES sensor(idSensor)
);

INSERT INTO captura (temperatura, fkSensor) VALUES
    (18.50, 1),
    (20.45, 2),
    (21.00, 3),
    (22.45, 4),
    (18.69, 5); 

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    dtHora DATETIME,
    nivel VARCHAR(45),
    mensagem VARCHAR(255),
    fkCaptura INT,
    CONSTRAINT fkCapturaAlerta FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    CONSTRAINT chk_alerta CHECK(nivel IN ('Cuidado', 'Atenção', 'Crítico'))
);

INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES
    ('2024-12-25 07:21:14', 'Cuidado', 'Atingiu o limite máximo do ideal 22°C ', 1),
	('2024-12-25 12:21:14', 'Cuidado', 'Atingiu o limite mínimo do ideal 18°C', 1),
    ('2024-04-01 08:24:01', 'Atenção', 'Está 2 graus celsius acima do limite máximo ideal', 2),
	('2024-04-01 14:24:01', 'Atenção', 'Está 2 graus celsius abaixo do limite mínimo ideal', 2),
    ('2024-12-25 07:21:14', 'Crítico', 'Ultrapassou o limite máximo permitido, temperatura acima de 26°C.', 3),
    ('2024-12-25 17:21:14', 'Crítico', 'Ultrapassou o limite mínimo permitido, temperatura abaixo de 14°C.', 3);

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM sensor;
SELECT * FROM estilo;
SELECT * FROM fermentadora;
SELECT * FROM captura;
SELECT * FROM alerta;
SHOW TABLES;

SELECT * FROM fermentadora JOIN sensor
ON fkSensor = idSensor;

SELECT empresa.nomeEmpresa as NomeEmpresa,
	funcionario.nomefuncionario as Funcionario
    FROM empresa JOIN funcionario
    ON idEmpresa = fkEmpresa;



