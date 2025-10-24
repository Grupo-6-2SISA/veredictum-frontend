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

let nomeUsuario = localStorage.getItem('nomeUsuario');
if (!nomeUsuario) {
  nomeUsuario = 'PLACEHOLDER';
}

// Tipo (1fr) | Data de Envio (2fr - maior) | Mensagem (1.5fr) | Cliente (2fr) | Ações (1fr)
const GRID_TEMPLATE_LOG_EMAIL = '1fr 2fr 1.5fr 2fr 1fr';

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
    setLogs(resposta.data);
  }

  return (
    <div className="container">
      <Sidebar nomeCompleto={nomeUsuario} />
      <main className="main-content">
        <h1 className="page-title-logs">Histórico de Envio de Email</h1>
        <p className="page-description-logs">
          Visualize todos os logs de envio de email para lembretes de conta, nota e atendimento.
        </p>

        <div className="log-email-content-logs">
          <div className="log-email-filtro-logs">
            <div className="log-email-filtro-group-logs">
              <label htmlFor="filtroTipo">Filtrar Por:</label>
              <select id="filtroTipo">
                <option value="">Todos</option>
                {tiposLembrete.map((tipoLembrete) => (
                  <option key={tipoLembrete.idTipoLembrete} value={tipoLembrete.idTipoLembrete}>
                    {tipoLembrete.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="log-email-filtro-group-logs">
              <label htmlFor="filtroCliente">Filtrar Por Cliente:</label>
              <input type="text" id="filtroCliente" placeholder="Nome do Cliente" />
            </div>
          </div>

          <div className="card-box-logs" role="region" aria-label="Logs de Email">
            <Listagem
              colunas={COLUNAS_LOG_EMAIL}
              dados={logs}
              gridTemplateCustom={GRID_TEMPLATE_LOG_EMAIL}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LogEnvioEmail;