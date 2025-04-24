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
    (DEFAULT, 'Cervejaria Cervo da Mata', '33846612000159', 'contato@cervodamata.com.br', '(48)99123-4567'),
    (DEFAULT, 'BodeBier', '56426771000108', 'contato@bodebier.com.br', '(71)98765-1234');

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
    emailUsuario VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipoUsuario VARCHAR(40) DEFAULT 'funcionario',
    CONSTRAINT chk_tipo CHECK (tipoUsuario IN ('administrador', 'funcionario')),
    fkEmpresa INT NULL,
    CONSTRAINT fkEmpresaFuncionario FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario VALUES
    (NULL, 'silvana.batista@clubedomalte.com.br', 'a123456789b', 'administrador', 1),
    (NULL, 'anderson.soares@colorado.com.br', 'c987654321d', 'administrador', 2),
    (NULL, 'vitorino.milchen@eisenbahn.com.br', 'e987654321f', 'administrador', 3),
    (NULL, 'juan.bento@ledmont.com.br', 'g987654321h', 'administrador', 4),
    (NULL, 'icaro.educardo@barestia.com.br', 'i987654321j', 'administrador', 5);

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(10),
    statusSensor VARCHAR(20),
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
    (DEFAULT, 'lm35', 'inativo');

CREATE TABLE estilo (
    idEstilo INT PRIMARY KEY AUTO_INCREMENT,
    estiloCerveja VARCHAR(45),
    limiteTempMax DECIMAL(4,2),
    limiteTempMin DECIMAL(4,2),
    CONSTRAINT chk_estilo CHECK (estiloCerveja IN ('ipa', 'pilsen'))
);

INSERT INTO estilo (estiloCerveja, limiteTempMin, limiteTempMax) VALUES
    ('ipa', 18.00, 24.00),
    ('pilsen', 7.00, 13.00);

CREATE TABLE fermentadora (
    idFermentadora INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40),
    estagioFermentacao CHAR(1),
    CONSTRAINT chk_ferm CHECK (estagioFermentacao IN ('a', 'b', 'c')),
    fkSensor INT,
    CONSTRAINT sensorFermentadora FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor),
    fkEmpresa INT,
    CONSTRAINT fkEmpresaFermentadora FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkEstilo INT,
    CONSTRAINT fermentadoraEstilo FOREIGN KEY (fkEstilo) REFERENCES estilo(idEstilo)
);

INSERT INTO fermentadora (nome, estagioFermentacao, fkSensor, fkEmpresa, fkEstilo) VALUES
    ('maquina 2', 'a', 1, 2, 1),
    ('maquina 1', 'c', 2, 3, 2),
    ('maquina 4', 'a', 3, 1, 1),
    ('maquina 3', 'b', 4, 4, 2),
    ('maquina 2', 'b', 5, 5, 1),
    ('maquina 1', 'c', 6, 3, 2),
    ('maquina 3', 'a', 7, 1, 1),
    ('maquina 4', 'c', 8, 2, 2);

CREATE TABLE captura (
    idCaptura INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    dtHora DATETIME,
    fkSensor INT,
    CONSTRAINT fkSensorCaptura FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

INSERT INTO captura (temperatura, dtHora, fkSensor) VALUES
    (14.15, '2025-04-05 05:45:30', 1),
    (10.23, '2025-02-05 06:10:15', 2),
    (9.02,  '2025-03-10 14:45:32', 3),
    (3.09,  '2025-01-05 08:00:00', 4),
    (16.78, '2025-02-05 16:15:24', 5);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    dtHora DATETIME,
    nivel VARCHAR(45),
    mensagem VARCHAR(45),
    fkCaptura INT,
    CONSTRAINT fkCapturaAlerta FOREIGN KEY (fkCaptura) REFERENCES captura(idCaptura),
    CONSTRAINT chk_alerta CHECK(nivel IN ('verificar o sensor', 'atenção', 'critico'))
);

INSERT INTO alerta (dtHora, nivel, mensagem, fkCaptura) VALUES
    ('2024-12-25 07:21:14', 'verificar o sensor', 'o sensor 23 teve uma instabilidade bruta', 1),
    ('2024-04-01 08:24:01', 'atenção', 'estado de atenção certifique-se que está tudo certo', 2),
    ('2024-12-25 07:21:14', 'critico', 'fermentadora precisa ser desligada', 3);

SELECT * FROM empresa;
SELECT * FROM endereco;
SELECT * FROM funcionario;
SELECT * FROM sensor;
SELECT * FROM estilo;
SELECT * FROM fermentadora;
SELECT * FROM captura;
SELECT * FROM alerta;
SHOW TABLES;

-- Selecionando a tabela fermentadora com o id sendo igual a 01
SELECT * FROM fermentadora WHERE idFermentadora = 1;

-- Selecionando o estilo de cerveja da tabela fermentadora com case no estágio de fermentação
SELECT e.estiloCerveja, 
    CASE 
        WHEN f.estagioFermentacao = 'a' THEN 'fermentação inicial' 
        ELSE 'em outras etapas' 
    END AS etapaDeFermentacao 
FROM fermentadora f
JOIN estilo e ON f.fkEstilo = e.idEstilo;

-- Delete de uma empresa
DELETE FROM empresa WHERE idEmpresa = 6; 
SELECT * FROM empresa;

SELECT temperatura FROM captura;