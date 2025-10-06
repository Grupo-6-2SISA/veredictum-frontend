ESTE SCRIPT ESTÁ DESATUALIZADO. CARECE DE ATUALIZAÇÕES PARA FUNCIONAMENTO. (PEGAR LOGS DE EXECUCACO SQL PELO JPA/HIBERNATE E COLOCAR AQUI)

CREATE DATABASE IF NOT EXISTS veredictum;

USE veredictum;

-- Hibernate:
drop table if exists atendimento
    -- Hibernate:
drop table if exists cliente
    -- Hibernate:
drop table if exists conta
    -- Hibernate:
drop table if exists historico_status_agendamento
    -- Hibernate:
drop table if exists log_envio_lembrete
    -- Hibernate:
drop table if exists log_execucao_rotina
    -- Hibernate:
drop table if exists nota_fiscal
    -- Hibernate:
drop table if exists rotina
    -- Hibernate:
drop table if exists status_agendamento
    -- Hibernate:
drop table if exists tipo_lembrete
    -- Hibernate:
drop table if exists usuario
    -- Hibernate:
create table atendimento (
                             fk_cliente integer,
                             fk_usuario integer,
                             id_atendimento integer not null auto_increment,
                             is_pago bit not null,
                             valor float(53) not null,
                             data_fim datetime(6),
                             data_inicio datetime(6),
                             data_vencimento datetime(6),
                             etiqueta varchar(30) not null,
                             descricao varchar(255) not null,
                             primary key (id_atendimento)
) engine=InnoDB
-- Hibernate:
create table cliente (
                         data_inicio date not null,
                         data_nascimento date not null,
                         fk_indicador integer,
                         id_cliente integer not null auto_increment,
                         is_ativo bit not null,
                         is_juridico bit,
                         is_pro_bono bit,
                         cep varchar(8),
                         inscricao_estadual varchar(9),
                         rg varchar(10),
                         cpf varchar(11),
                         cnpj varchar(14),
                         descricao varchar(255),
                         email varchar(255) not null,
                         endereco varchar(255),
                         nome varchar(255) not null,
                         primary key (id_cliente)
) engine=InnoDB
-- Hibernate:
create table conta (
                       data_criacao date,
                       data_vencimento date,
                       fk_usuario integer,
                       id_conta integer not null auto_increment,
                       is_pago bit,
                       valor float(53),
                       descricao varchar(255),
                       etiqueta varchar(255),
                       url_nuvem varchar(255),
                       primary key (id_conta)
) engine=InnoDB
-- Hibernate:
create table historico_status_agendamento (
                                              fk_atendimento integer,
                                              fk_conta integer,
                                              fk_nota_fiscal integer,
                                              fk_status_agendamento integer not null,
                                              id_historico_agendamento integer not null auto_increment,
                                              data_hora_alteracao datetime(6),
                                              primary key (id_historico_agendamento)
) engine=InnoDB
-- Hibernate:
create table log_envio_lembrete (
                                    fk_atendimento integer,
                                    fk_conta integer,
                                    fk_nota_fiscal integer,
                                    fk_tipo_lembrete integer,
                                    id_log_envio_lembrete integer not null auto_increment,
                                    data_hora_criacao datetime(6),
                                    mensagem varchar(255) not null,
                                    primary key (id_log_envio_lembrete)
) engine=InnoDB
-- Hibernate:
create table log_execucao_rotina (
                                     fk_rotina integer,
                                     id_log_execucao_rotina integer not null auto_increment,
                                     is_bloqueado bit not null,
                                     data_hora_fim_execucao datetime(6),
                                     data_hora_ini_execucao datetime(6),
                                     status_execucao varchar(255),
                                     primary key (id_log_execucao_rotina)
) engine=InnoDB
-- Hibernate:
create table nota_fiscal (
                             data_criacao date,
                             data_vencimento date,
                             fk_cliente integer,
                             id_nota_fiscal integer not null auto_increment,
                             is_emitida bit,
                             valor float(53),
                             descricao varchar(255),
                             etiqueta varchar(255),
                             url_nuvem varchar(255),
                             primary key (id_nota_fiscal)
) engine=InnoDB
-- Hibernate:
create table rotina (
                        data_hora date,
                        data_inicio date,
                        id_rotina integer not null auto_increment,
                        is_ativo bit not null,
                        nome_rotina varchar(255),
                        rotina_chamada varchar(255),
                        primary key (id_rotina)
) engine=InnoDB
-- Hibernate:
create table status_agendamento (
                                    id_status_agendamento integer not null auto_increment,
                                    descricao varchar(45) not null,
                                    primary key (id_status_agendamento)
) engine=InnoDB
-- Hibernate:
create table tipo_lembrete (
                               id_tipo_lembrete integer not null auto_increment,
                               tipo varchar(255) not null,
                               primary key (id_tipo_lembrete)
) engine=InnoDB
-- Hibernate:
create table usuario (
                         fk_adm integer,
                         id_usuario integer not null auto_increment,
                         is_adm bit not null,
                         is_ativo bit not null,
                         email varchar(255) not null,
                         nome varchar(255) not null,
                         senha varchar(255) not null,
                         primary key (id_usuario)
) engine=InnoDB
-- Hibernate:
alter table atendimento
    add constraint FKjl0dig5gg90xwbwfdy9x7rd21
        foreign key (fk_cliente)
            references cliente (id_cliente)
    -- Hibernate:
alter table atendimento
    add constraint FKdv48c1tramwk1levuswifbhql
        foreign key (fk_usuario)
            references usuario (id_usuario)
    -- Hibernate:
alter table cliente
    add constraint FKfl5it7wsmbtn4d7yq3wi90p9o
        foreign key (fk_indicador)
            references cliente (id_cliente)
    -- Hibernate:
alter table conta
    add constraint FKdkjwn3i8nck24xoyeitxw7vtu
        foreign key (fk_usuario)
            references usuario (id_usuario)
    -- Hibernate:
alter table historico_status_agendamento
    add constraint FKcovw3h60qhohxm1inmoxpgr4j
        foreign key (fk_atendimento)
            references atendimento (id_atendimento)
    -- Hibernate:
alter table historico_status_agendamento
    add constraint FK320k3nbnlydvf9xnc207anq7i
        foreign key (fk_conta)
            references conta (id_conta)
    -- Hibernate:
alter table historico_status_agendamento
    add constraint FK8ousepuuj3yui5axfew945elb
        foreign key (fk_nota_fiscal)
            references nota_fiscal (id_nota_fiscal)
    -- Hibernate:
alter table historico_status_agendamento
    add constraint FKfhxjxh8prsigmmjlu7102ditc
        foreign key (fk_status_agendamento)
            references status_agendamento (id_status_agendamento)
    -- Hibernate:
alter table log_envio_lembrete
    add constraint FK97hl0d196inqoukmhscajt9bu
        foreign key (fk_atendimento)
            references atendimento (id_atendimento)
    -- Hibernate:
alter table log_envio_lembrete
    add constraint FKelswjt3pb31nxjo1ke21q6e02
        foreign key (fk_conta)
            references conta (id_conta)
    -- Hibernate:
alter table log_envio_lembrete
    add constraint FKbi9y3hdlnultq8jrv7no0lify
        foreign key (fk_nota_fiscal)
            references nota_fiscal (id_nota_fiscal)
    -- Hibernate:
alter table log_envio_lembrete
    add constraint FKnladfmva8b46i9wmb5sr75wwv
        foreign key (fk_tipo_lembrete)
            references tipo_lembrete (id_tipo_lembrete)
    -- Hibernate:
alter table log_execucao_rotina
    add constraint FKlgww4db7ajxri6l7ep7x20dbk
        foreign key (fk_rotina)
            references rotina (id_rotina)
    -- Hibernate:
alter table nota_fiscal
    add constraint FKnkgehtnrhfwbloiesc70ru7i3
        foreign key (fk_cliente)
            references cliente (id_cliente)
    -- Hibernate:
alter table usuario
    add constraint FKss79l37u17ftikbgclmlya91c
        foreign key (fk_adm)
            references usuario (id_usuario)