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
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    fkEndereco INT NOT NULL,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEndereco)
        REFERENCES endereco (idEndereco)
);

CREATE TABLE codigo_ativacao (
idCodigo_ativacao INT PRIMARY KEY AUTO_INCREMENT,
codigo INT, 
status TINYINT default 0,
fkEmpresa INT,
	CONSTRAINT fkCodigoEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
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

INSERT INTO codigo_ativacao (codigo, fkEmpresa) VALUES 
(12345678, 1),
(12345677, 2);

-- Para Fermentadora 1 (histórico: 2024-11-01 até 2024-11-10)
UPDATE alerta SET dtHora = '2024-11-05 07:21:14' WHERE idAlerta = 1;

-- Para Fermentadora 2 (histórico: 2024-11-02 até 2024-11-11)
UPDATE alerta SET dtHora = '2024-11-06 12:21:14' WHERE idAlerta = 2;

-- Para Fermentadora 3 (histórico: 2024-11-03 até 2024-11-12)
UPDATE alerta SET dtHora = '2024-11-07 08:24:01' WHERE idAlerta = 3;

-- Para Fermentadora 4 (histórico: 2024-11-04 até 2024-11-13)
UPDATE alerta SET dtHora = '2024-11-08 14:24:01' WHERE idAlerta = 4;

-- Para Fermentadora 5 (histórico: 2024-11-05 até 2024-11-14)
UPDATE alerta SET dtHora = '2024-11-09 07:21:14' WHERE idAlerta = 5;

-- Fermentadora 1 (IPA): ALERTA CUIDADO (acima do ideal)
UPDATE captura SET temperatura = 22.30 WHERE idCaptura = 1;
UPDATE alerta SET dtHora = '2024-11-05 07:21:14', mensagem = 'Atingiu o limite máximo do ideal 22°C' WHERE idAlerta = 1;

-- Fermentadora 2 (PILSEN): ALERTA CUIDADO (abaixo do ideal)
UPDATE captura SET temperatura = 8.70 WHERE idCaptura = 2;
UPDATE alerta SET dtHora = '2024-11-06 12:21:14', mensagem = 'Atingiu o limite mínimo do ideal 9°C' WHERE idAlerta = 2;

-- Fermentadora 3 (IPA): ALERTA ATENÇÃO (acima do ideal em 2°C)
UPDATE captura SET temperatura = 24.00 WHERE idCaptura = 3;
UPDATE alerta SET dtHora = '2024-11-07 08:24:01', mensagem = 'Está 2 graus celsius acima do limite máximo ideal' WHERE idAlerta = 3;

-- Fermentadora 4 (PILSEN): ALERTA ATENÇÃO (abaixo do ideal em 2°C)
UPDATE captura SET temperatura = 7.00 WHERE idCaptura = 4;
UPDATE alerta SET dtHora = '2024-11-08 14:24:01', mensagem = 'Está 2 graus celsius abaixo do limite mínimo ideal' WHERE idAlerta = 4;

-- Fermentadora 5 (IPA): ALERTA CRÍTICO (bem acima do permitido)
UPDATE captura SET temperatura = 28.00 WHERE idCaptura = 5;
UPDATE alerta SET dtHora = '2024-11-09 07:21:14', mensagem = 'Ultrapassou o limite máximo permitido, temperatura acima de 27°C.' WHERE idAlerta = 5;


SHOW TABLES;

SELECT * FROM endereco;
SELECT * FROM empresa;
SELECT * FROM funcionario;
SELECT * FROM setor;
SELECT * FROM sensor;
SELECT * FROM fermentadora;
SELECT * FROM codigo_ativacao;
SELECT * FROM estilo;
SELECT * FROM historico_fermentadora;
SELECT * FROM captura;
SELECT * FROM alerta;

SELECT idCodigo_ativacao, codigo, fkEmpresa, status FROM codigo_ativacao WHERE codigo = 12345678;
UPDATE codigo_ativacao SET status = 1 WHERE idCodigo_ativacao = 1;

 SELECT
        e.estiloCerveja,
        COUNT(DISTINCT f.idFermentadora) AS total_ferm,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'ativo') AS sensor_ativo,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'inativo') AS sensor_inativo,
        (SELECT COUNT(*) FROM sensor WHERE statusSensor = 'manutenção') AS sensor_manutencao,
        COUNT(DISTINCT CASE 
            WHEN (c.temperatura < e.limiteTempMin OR c.temperatura > e.limiteTempMax) THEN f.idFermentadora
        END) AS fermentadoras_fora_do_ideal,
        COUNT(DISTINCT CASE
            WHEN (
                c.temperatura < (e.limiteTempMin - 5) OR
                c.temperatura > (e.limiteTempMax + 5)
            ) THEN f.idFermentadora
        END) AS fermentadoras_em_critico
    FROM fermentadora f 
    JOIN sensor s ON f.fkSensor = s.idSensor
    JOIN setor st ON f.fkSetor = st.idSetor
    JOIN historico_fermentadora hf 
        ON hf.fkFermentadora = f.idFermentadora
    JOIN estilo e ON hf.fkEstilo = e.idEstilo
    LEFT JOIN captura c 
        ON c.fkSensor = s.idSensor
        AND c.dtHora >= '2025-06-03 00:00:00' 
        AND c.dtHora < '2025-06-03 00:00:00'
    LEFT JOIN alerta a ON a.fkCaptura = c.idCaptura
    WHERE st.fkEmpresa = 1
    GROUP BY e.estiloCerveja;
    


SELECT 
    a.nivel AS nivel_alerta,
    f.nome AS fermentadora,
    e.estiloCerveja AS tipo_fermentacao,
    c.temperatura,
    DATE_FORMAT(a.dtHora, '%d/%m/%y às %H:%i') AS horario_alerta,
    a.mensagem
FROM alerta a
JOIN captura c ON a.fkCaptura = c.idCaptura
JOIN sensor s ON c.fkSensor = s.idSensor
JOIN fermentadora f ON f.fkSensor = s.idSensor
JOIN setor st ON f.fkSetor = st.idSetor
JOIN historico_fermentadora hf 
    ON hf.fkFermentadora = f.idFermentadora
    AND (hf.dataFim IS NULL OR a.dtHora BETWEEN hf.dataInicio AND hf.dataFim)
JOIN estilo e ON hf.fkEstilo = e.idEstilo
WHERE st.fkEmpresa = 1
ORDER BY a.dtHora DESC;


CREATE OR REPLACE VIEW vw_fermentadoras_status_setor_empresa AS
SELECT 
    s.idSetor,
    s.nome AS nome_setor,
    s.fkEmpresa,
    COUNT(DISTINCT f.idFermentadora) AS total_fermentadoras,
    COUNT(DISTINCT CASE 
        WHEN sn.statusSensor = 'ativo' THEN f.idFermentadora 
    END) AS total_fermentadoras_ativas,
    COUNT(DISTINCT CASE 
        WHEN a.nivel = 'moderado' AND DATE(a.dtHora) = CURRENT_DATE THEN f.idFermentadora
    END) AS fermentadoras_fora_do_ideal,
    COUNT(DISTINCT CASE 
        WHEN a.nivel = 'crítico' AND DATE(a.dtHora) = CURRENT_DATE THEN f.idFermentadora
    END) AS fermentadoras_em_alerta_critico
FROM setor s
LEFT JOIN fermentadora f ON f.fkSetor = s.idSetor
LEFT JOIN sensor sn ON sn.idSensor = f.fkSensor
LEFT JOIN captura c ON c.fkSensor = sn.idSensor
LEFT JOIN alerta a ON a.fkCaptura = c.idCaptura
GROUP BY s.idSetor, s.nome, s.fkEmpresa;


SELECT * FROM vw_fermentadoras_status_setor_empresa WHERE fkEmpresa = 1;
  
INSERT INTO captura (temperatura, fkSensor) VALUES
(18.50, 1),
(18.70, 1),
(19.10, 1),



(19.50, 1),
(20.00, 1),
(20.30, 1),
(20.60, 1),
(21.00, 1),
(21.20, 1),
(21.50, 1);

INSERT INTO captura (temperatura, fkSensor) VALUES
(24.70, 2),
(24.00, 2),
(24.30, 2),
(24.50, 2),
(24.70, 1),

(23.00, 1),
(24.20, 1),
(24.50, 1),
(24.70, 1),
(24.00, 1);


INSERT INTO historico_fermentadora (idHistorico, fkFermentadora, fkEstilo, dataInicio, dataFim)
VALUES (default, 1, 1, '2025-06-01 08:00:00', NULL);

CREATE VIEW vw_captura_estilo AS
SELECT 
    c.fkSensor, 
    c.dtHora, 
    c.temperatura, 
    e.estiloCerveja AS nomeCerveja, 
    e.limiteTempMin, 
    e.limiteTempMax,
    st.fkEmpresa
FROM captura c
JOIN fermentadora f ON f.fkSensor = c.fkSensor
JOIN setor st ON f.fkSetor = st.idSetor
JOIN historico_fermentadora hf ON hf.fkFermentadora = f.idFermentadora AND hf.dataFim IS NULL
JOIN estilo e ON e.idEstilo = hf.fkEstilo;

CREATE VIEW vw_ultimos_30_por_sensor AS
SELECT fkSensor, dtHora, temperatura, nomeCerveja, limiteTempMin, limiteTempMax, fkEmpresa
FROM (
    SELECT *,
        ROW_NUMBER() OVER (PARTITION BY fkSensor ORDER BY dtHora DESC) AS rn
    FROM vw_captura_estilo
) sub
WHERE rn <= 30
ORDER BY fkSensor, dtHora DESC;


SELECT * FROM vw_ultimos_30_por_sensor;
