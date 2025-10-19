import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import Listagem from '../../components/Listagem/Listagem';
import './LogEnvioEmail.css';
import '../../index.css';

const COLUNAS_LOG_EMAIL = [
    { key: 'tipo', titulo: 'Tipo' },
    { key: 'dataEnvio', titulo: 'Data de Envio' },
    { key: 'mensagem', titulo: 'Mensagem' },
    { key: 'clienteRelacionado', titulo: 'Cliente Relacionado' },
    { key: 'acoes', titulo: 'Ações' },
];

// precisará montar um select com joins para pegar nome de cliente e montar o backend para isto
// const dadosLogEmail = [
//     { tipo: 'Confirmação de Consulta', dataEnvio: '01/06/2025 10:00', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
//     { tipo: 'Lembrete de Consulta', dataEnvio: '07/06/2025 09:00', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
//     { tipo: 'Confirmação de Consulta', dataEnvio: '02/06/2025 11:30', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
//     { tipo: 'Lembrete de Consulta', dataEnvio: '08/06/2025 10:30', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
//     { tipo: 'Confirmação de Consulta', dataEnvio: '01/06/2025 10:00', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
//     { tipo: 'Lembrete de Consulta', dataEnvio: '07/06/2025 09:00', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 14:00.', clienteRelacionado: 'Davidson Mendes' },
//     { tipo: 'Confirmação de Consulta', dataEnvio: '02/06/2025 11:30', mensagem: 'Sua consulta está confirmada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
//     { tipo: 'Lembrete de Consulta', dataEnvio: '08/06/2025 10:30', mensagem: 'Lembrete: Você tem uma consulta agendada para 09/06/2025 às 17:30.', clienteRelacionado: 'Gabriel Cordeiro' },
// ];

let nomeUsuario = localStorage.getItem('nomeUsuario');
if (!nomeUsuario) {
    nomeUsuario = 'PLACEHOLDER';
}




const LogEnvioEmail = () => {

    useEffect(() => {

        buscarTiposLembrete();
        buscarLogs();

    }, []);

    const [tiposLembrete, setTiposLembrete] = useState([]);
    const [logs, setLogs] = useState([]);

    async function buscarTiposLembrete() {


        const resposta = await axios.get('http://localhost:8080/tipo-lembrete');
        console.log('resposta: ', resposta.data);
        setTiposLembrete(resposta.data);

    }


    async function buscarLogs() {
        const resposta = await axios.get('http://localhost:8080/log-envio-lembrete/listagem-logs');
        console.log('resposta: ', resposta.data);
        setLogs(resposta.data)
    }

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
                                {
                                    tiposLembrete.map(tipoLembrete =>
                                        <option key={tipoLembrete.idTipoLembrete} value={tipoLembrete.idTipoLembrete}>
                                            {tipoLembrete.tipo}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="log-email-filtro-group">
                            <label htmlFor="filtroCliente">Filtrar Por Cliente:</label>
                            <input type="text" id="filtroCliente" placeholder='Nome do Cliente' />
                        </div>
                    </div>

                    <div className="card-box-logs" role="region" aria-label="Logs de Email">
                        <Listagem colunas={COLUNAS_LOG_EMAIL} dados={logs} />
                    </div>

                </div>
            </main>
        </div>
    );
};

export default LogEnvioEmail;