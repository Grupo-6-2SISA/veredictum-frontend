import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Listagem from '../../components/Listagem/Listagem';
import './LogEnvioEmail.css';
import '../../index.css';

const colunasLogEmail = [
    { key: 'tipo', titulo: 'Tipo' },
    { key: 'dataEnvio', titulo: 'Data de Envio' },
    { key: 'mensagem', titulo: 'Mensagem' },
    { key: 'clienteRelacionado', titulo: 'Cliente Relacionado' },
    { key: 'acoes', titulo: 'Ações' },
];

const dadosLogEmail = [
    { tipo: 'Confirmação de Consulta', dataEnvio: '01/06/2025 10:00', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
    { tipo: 'Lembrete de Consulta', dataEnvio: '07/06/2025 09:00', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
    { tipo: 'Confirmação de Consulta', dataEnvio: '02/06/2025 11:30', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
    { tipo: 'Lembrete de Consulta', dataEnvio: '08/06/2025 10:30', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
    { tipo: 'Confirmação de Consulta', dataEnvio: '01/06/2025 10:00', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
    { tipo: 'Lembrete de Consulta', dataEnvio: '07/06/2025 09:00', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
    { tipo: 'Confirmação de Consulta', dataEnvio: '02/06/2025 11:30', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
    { tipo: 'Lembrete de Consulta', dataEnvio: '08/06/2025 10:30', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
];

let nomeUsuario = localStorage.getItem('nomeUsuario');
if (!nomeUsuario) {
    nomeUsuario = 'Lismara Ribeiro';
}

const LogEnvioEmail = () => {
    return (
        <div className="container">
            <Sidebar nomeCompleto={nomeUsuario} />
            <main className="main-content">
                <h1 className="page-title">Histórico de Envio de Email</h1>
                <p className='page-description'>
                    Visualize todos os logs de envio de email para lembretes de conta, nota e atendimento.
                </p>
                <div className="log-email-content">
                    <div className="log-email-filtro">
                        <div className="log-email-filtro-group">
                            <label htmlFor="filtroTipo">Filtrar Por:</label>
                            <select id="filtroTipo">
                                <option value="">Todos</option>
                                <option value="aniversario_cliente">Aniversário (Cliente)</option>
                                <option value="aniversario_funcionario">Aniversário (Funcionário)</option>
                                <option value="atendimento_cliente">Atendimento (Cliente)</option>
                                <option value="atendimento_funcionario">Atendimento (Funcionário)</option>
                                <option value="pesquisa_satisfacao_cliente">Pesquisa Satisfação (Cliente)</option>
                                <option value="aniversario_inicio_cliente">Aniversário Início (Cliente)</option>
                                <option value="agradecimento_indicacao_funcionario">Agradecimento Indicação (Funcionário)</option>
                            </select>
                        </div>
                        <div className="log-email-filtro-group">
                            <label htmlFor="filtroCliente">Filtrar Por Cliente:</label>
                            <input type="text" id="filtroCliente" placeholder='Nome do Cliente' />
                        </div>
                    </div>

                    {/* substitui Card por div que imita o card e permite manipular tamanho */}
                    <div className="card-box-logs" role="region" aria-label="Logs de Email">
                        <Listagem colunas={colunasLogEmail} dados={dadosLogEmail} />
                    </div>

                    {/* <div className="log-email-listagem">
                        <Listagem colunas={colunasLogEmail} dados={dadosLogEmail} />
                    </div> */}
                </div>
            </main>
        </div>
    );
};

export default LogEnvioEmail;