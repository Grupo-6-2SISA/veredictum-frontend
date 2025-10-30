import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Listagem from "../../components/Listagem/Listagem";
import ModalLogs from "../../components/Modal_Logs/Modal_Logs"; // <-- uso do ModalLogs
import "./LogEnvioEmail.css";
import "../../index.css";

const COLUNAS_LOG_EMAIL = [
  { key: "tipo", titulo: "Tipo" },
  { key: "dataEnvio", titulo: "Data de Envio" },
  { key: "mensagem", titulo: "Mensagem" },
  { key: "clienteRelacionado", titulo: "Cliente Relacionado" },
  { key: "acoes", titulo: "Ações" },
];

const GRID_TEMPLATE_LOG_EMAIL = "1fr 2fr 1.5fr 2fr 1fr";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const LogEnvioEmail = () => {
  const [tiposLembrete, setTiposLembrete] = useState([]);
  const [logs, setLogs] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroCliente, setFiltroCliente] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [logSelecionado, setLogSelecionado] = useState(null);

  const nomeUsuario = localStorage.getItem("nomeUsuario") || "PLACEHOLDER";

  useEffect(() => {
    buscarTiposLembrete();
    buscarLogs();
  }, []);

  async function buscarTiposLembrete() {
    try {
      setCarregando(true);
      const resposta = await axios.get(`${API_BASE_URL}/tipo-lembrete`);
      setTiposLembrete(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar tipos de lembrete:", erro);
      setErro("Não foi possível carregar os tipos de lembrete.");
    } finally {
      setCarregando(false);
    }
  }

  async function buscarLogs() {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await axios.get(
        `${API_BASE_URL}/log-envio-lembrete/listagem-logs`
      );
      console.log("📩 Logs recebidos:", resposta.data);
      setLogs(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar logs:", erro);
      setErro("Não foi possível carregar os logs de envio.");
    } finally {
      setCarregando(false);
    }
  }

  const logsFiltrados = logs.filter((log) => {
    const nomeCliente = (log.clienteRelacionado || "").toLowerCase();
    const buscaCliente = filtroCliente.toLowerCase();
    const tipoOk = filtroTipo ? log.idTipo === parseInt(filtroTipo) : true;
    const clienteOk = nomeCliente.includes(buscaCliente);
    return tipoOk && clienteOk;
  });

  const handleVerMais = (log) => {
    setLogSelecionado(log);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setLogSelecionado(null);
  };

  const logsComAcoes = logsFiltrados.map((log) => ({
    ...log,
    acoes: (
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          handleVerMais(log);
        }}
      >
        Ver Mais
      </button>
    ),
  }));

  return (
    <div className="container">
      <Sidebar nomeCompleto={nomeUsuario} />
      <main className="main-content">
        <h1 className="page-title-logs">Histórico de Envio de Email</h1>
        <p className="page-description-logs">
          Visualize todos os logs de envio de email para lembretes de conta,
          nota e atendimento.
        </p>

        <div className="log-email-content-logs">
          <div className="log-email-filtro-logs">
            <div className="log-email-filtro-group-logs">
              <label htmlFor="filtroTipo">Filtrar por tipo:</label>
              <select
                id="filtroTipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="">Todos</option>
                {tiposLembrete.map((tipoLembrete) => (
                  <option
                    key={tipoLembrete.idTipoLembrete}
                    value={tipoLembrete.idTipoLembrete}
                  >
                    {tipoLembrete.tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="log-email-filtro-group-logs">
              <label htmlFor="filtroCliente">Filtrar por cliente:</label>
              <input
                type="text"
                id="filtroCliente"
                placeholder="Nome do Cliente"
                value={filtroCliente}
                onChange={(e) => setFiltroCliente(e.target.value)}
              />
            </div>
          </div>

          <div
            className="card-box-logs"
            role="region"
            aria-label="Logs de Email"
          >
            {carregando ? (
              <p>Carregando logs...</p>
            ) : erro ? (
              <p className="erro-text">{erro}</p>
            ) : logsComAcoes.length > 0 ? (
              <Listagem
                colunas={COLUNAS_LOG_EMAIL}
                dados={logsComAcoes}
                gridTemplateCustom={GRID_TEMPLATE_LOG_EMAIL}
              />
            ) : (
              <p>Nenhum log encontrado.</p>
            )}
          </div>
        </div>

        <ModalLogs
          isOpen={modalAberto}
          onClose={fecharModal}
          title="Informações sobre Logs"
          modalId="modal-log-detalhes"
          footer={
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                type="button"
                className="btn-new-appointment_P"
                onClick={fecharModal}
              >
                Fechar
              </button>
            </div>
          }
        >
          {logSelecionado ? (
            <div className="log-detalhes">
              <label className="col-left">
                <strong>Tipo:</strong>
                <input
                  type="text"
                  value={logSelecionado.tipo}
                  readOnly
                  className="input-modal"
                />
              </label>

              <label className="col-right">
                <strong>Data de Envio:</strong>
                <input
                  type="text"
                  value={logSelecionado.dataEnvio}
                  readOnly
                  className="input-modal"
                />
              </label>

              <label className="col-left">
                <strong>Mensagem:</strong>
                <textarea
                  value={logSelecionado.mensagem}
                  readOnly
                  className="input-modal"
                />
              </label>

              <label className="col-right">
                <strong>Cliente Relacionado:</strong>
                <input
                  type="text"
                  value={logSelecionado.clienteRelacionado}
                  readOnly
                  className="input-modal"
                />
              </label>
            </div>
          ) : null}
        </ModalLogs>
      </main>
    </div>
  );
};

export default LogEnvioEmail;