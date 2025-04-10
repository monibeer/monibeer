create database monibeer;
use monibeer;

create table empresa(
idempresa int primary key auto_increment,
nomeempresa varchar(50) not null,
email varchar(70),
cnpj char(14) not null unique
);

insert into empresa values
(default , 'clubedomalte' , 'clubemalte@outlook.com.br' , '11605819000107'),
(default , 'colorado', 'colorado@enterprise.com' , '01366303000195'),
(default , 'eisenbahn', 'eisen@eisenbahn.com' , '04176513000109'),
(default , 'ledmont', 'ledmont@led.com' , '33846612000159'),
(default , 'barestia', 'barestia@gmail.com.br' , '56426771000108');

select * from empresa;

create table funcionario(
idfuncionario int primary key auto_increment,
email varchar (250) not null,
senhaincriptada varchar (255) not null,
tipousuario varchar (40) default 'funcionario',
constraint chk_tipo check (tipousuario in ('administrador', 'funcionario')),
fkempresa int null,
constraint empresafuncionario
foreign key (fkempresa)
references empresa(idempresa)
);

insert into funcionario values
                                                                          -- supursur
(null , 'silvana.batista@clubedomalte.com.br', '1010011 1010101 1010000 1010101 1010010 1011101 1010011 1010101 1010010', 'administrador', 1),
                                                                         -- lmkstonnt
(null , 'anderson.soares@colorado.com.br', '1001100 1001101 1001011 1010011 1010100 1001111 1001110 1001110 1010100', 'administrador', 2),
                                                                         -- ritstpstn
(null , 'vitorino.milchen@eisenbahn.com.br', '1010010 1001001 1010100 1010011 1010100 1010000 1010011 1010100 1001110', 'administrador', 3),
                                                                         -- strqoutst
(null , 'juan.bento@ledmont.com.br', '1010011 1010100 1010010 1010001 1001111 1010101 1010100 1010011 1010100', 'administrador', 4),
                                                                         -- oorkourts
(null , 'icaro.educardo@barestia.com.br', '1001111 1001111 1010010 1001011 1001111 1010010 1010101 1010100 1010011', 'administrador', 5);

select * from funcionario;

select * from funcionario join
empresa on fkempresa;

create table sensor(
idsensor int primary key auto_increment,
nome varchar (10),
statussensor varchar(20),
constraint chkstatus check (statussensor in ('ativo', 'inativo', 'manutenção'))
);

insert into sensor values
(default, 'lm35', 'ativo'),
(default, 'lm35', 'ativo'),
(default, 'lm35', 'manutenção'),
(default, 'lm35', 'ativo'),
(default, 'lm35', 'inativo'),
(default, 'lm35', 'manutenção');

insert into sensor values
(default, 'lm35', 'ativo'),
(default, 'lm35' , 'inativo');

select * from sensor;

create table cerveja(
idcerveja int primary key auto_increment,
tipocerveja varchar (45),
tempmin decimal (4.2),
tempmax decimal (4.2),
constraint cnk_tipocerveja check (tipocerveja in('ipa' , 'pilsen'))
);

insert into cerveja(tipocerveja , tempmin , tempmax) values
('ipa' , 18.00 , 24.00 ),
('pilsen' , 07.00 , 13.00);

select * from cerveja;

create table fermentadora(
idfermentadora int primary key auto_increment,
nome varchar (40),
estagiofermentacao char (1),
constraint chkferm check (estagiofermentacao in ('a', 'b', 'c')),
fksensor int,
constraint sensorfermentadora
foreign key (fksensor)
references sensor(idsensor),
fkempresa int,
constraint empresafermentadora
foreign key (fkempresa)
references empresa(idempresa),
fkcerveja int,
constraint fermentadoracerveja 
foreign key (fkcerveja)
references cerveja(idcerveja)
);

insert into fermentadora values
(default, 'maquina 2', 'a' , 1 , 2 , 1),
(default, 'maquina 1', 'c' , 2 , 3 , 2),
(default, 'maquina 4', 'a' , 3 , 1 , 1),
(default, 'maquina 3', 'b' , 4 , 4 , 2),
(default, 'maquina 2', 'b' , 5 , 5 , 1),
(default, 'maquina 1', 'c' , 6 , 3 , 2),
(default, 'maquina 3', 'a' , 7 , 1 , 1),
(default, 'maquina 4', 'c' , 8 , 2 , 2);

select * from fermentadora;

create table captura(
idcaptura int primary key auto_increment,
sensor_analogico decimal (4.2),
dthora datetime
);

insert into captura(temperatura , dthora) values
(14.15 , '2025-04-05 05:45:30'),
(10.23 , '2025-02-05 06:10:15'),
(09.02 , '2025-03-10 14:45:32'),
(03.09 , '2025-01-05 08:00:00'),
(16.78 , '2025-02-05 16:15:24');

select * from captura;

create table alerta(
idalerta int primary key auto_increment,
dthora datetime,
nivel varchar(45),
mensagem varchar(200),
constraint cnk_alerta check(nivel in ('vericar o sensor' , 'atenção' , 'critico'))
);

insert into alerta ( dthora , nivel , mensagem) values
('2024-12-25 07:21:14' , 'vericar o sensor', 'o sensor 23 teve uma instabilidade bruta'),
('2024-04-01 08:24:01' , 'atenção' , 'estado de atenção certifique-se que está tudo certo com a fermentadora'),
('2024-12-25 07:21:14' , 'critico', 'a fermentadora precisa ser desligada ou sua produção será afetada totalmente');

select * from alerta;
select * from fermentadora;
select * from funcionario;
select * from sensor;
select * from empresa;
select *from captura;
select *from alerta;
show tables;

-- selecionando a tabela fermentadora com o id sendo igual a 01
select * from fermentadora where idfermentadora = 1;

-- selecionando a tabela empresa com o representante tendo como a segunda letra a
select * from empresa where  representanteempresa like '%_a';

-- atualizamos os dados da tabela sensor em que a máquina atribuida 2 do id 2 para máquina 6
update sensor set maquinaatribuida = 'maquina 6' where idsensor = 2;

-- selecionando o tipo de cerveja da tabela fermentadora em que caso o estagio de fermentacao for a aparecer 1 senão fermentação inicial.
select tipocerveja, case when estagiofermentacao = 'a' then 'fermentação inicial' else 'em outras etapas' end as etapahofermentacao from fermentadora;

-- delete de uma empresa 
delete from empresa where idempresa = 6; 
select * from empresa;

-- apelidando os campos empresa e representante para melhor visualização 
select empresa.nomeempresa as nomedaempresa, empresa.representanteempresa as representante from empresa;

-- alterando a tabela sensor, modificando a coluna maquinaatribuida para varchar(40).
alter table sensor modify column maquinaatribuida varchar(40);
