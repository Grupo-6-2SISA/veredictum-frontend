import React, { useState, useEffect } from "react";
import FecharIcon from "../../../assets/svg/fechar.svg";
import './ModalContainer.css'; // <-- usar CSS centralizado
import { criarAtendimento, apiClient } from "../Agenda.js"; // usar criarAtendimento existente

export default function ModalAdicionarAtendimento({ show, onClose, atualizarLista }) {
  const [isPago, setIsPago] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (!show) return;
    let mounted = true;
    const fetchLists = async () => {
      try {
        const [cRes, uRes] = await Promise.all([
          apiClient.get('/clientes').catch(() => ({ data: [] })),
          apiClient.get('/usuarios').catch(() => ({ data: [] })),
        ]);
        if (!mounted) return;
        setClientes(cRes.data || []);
        setUsuarios(uRes.data || []);
      } catch (e) {
        console.error('Erro ao buscar listas:', e);
      }
    };
    fetchLists();
    return () => { mounted = false; };
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const etiqueta = e.target.etiqueta.value.trim();
    const valorRaw = e.target.valor.value;
    const valor = valorRaw === "" ? null : parseFloat(valorRaw);
    const descricao = e.target.descricao.value.trim();
    const fkCliente = e.target.fkCliente?.value || "";
    const nomeClienteManual = e.target.nomeCliente?.value?.trim() || "";
    const fkUsuario = e.target.fkUsuario?.value || "";
    const hora = e.target.hora.value;
    const data = e.target.data.value;
    const shouldEnviarEmail = !!e.target.shouldEnviarEmail.checked;

    // validações básicas
    const somenteTexto = /^[A-Za-zÀ-ú0-9\s\-\.,()\/]+$/; // permite texto comum
    if (!fkCliente && !nomeClienteManual) {
      alert("Informe o cliente (selecione ou digite o nome).");
      return;
    }
    if (!fkUsuario) {
      alert("Selecione o responsável.");
      return;
    }
    if (!data || !hora) {
      alert("Selecione data e hora de início.");
      return;
    }
    if (descricao && descricao.length < 3) {
      alert("Descrição muito curta.");
      return;
    }
    if (valor !== null && (isNaN(valor) || valor < 0)) {
      alert("Valor inválido.");
      return;
    }
    if (nomeClienteManual && !somenteTexto.test(nomeClienteManual)) {
      alert("Nome do cliente possui caracteres inválidos.");
      return;
    }

    const dataInicioISO = `${data}T${hora}:00`;
    let dataFimISO = null;
    try {
      const d = new Date(dataInicioISO);
      d.setHours(d.getHours() + 1);
      dataFimISO = d.toISOString();
    } catch (err) {
      console.error('Erro ao calcular dataFim', err);
    }

    const atendimentoDTO = {
      fkCliente: fkCliente ? Number(fkCliente) : null,
      nomeCliente: nomeClienteManual || (clientes.find(c => String(c.idCliente ?? c.id) === String(fkCliente))?.nome || nomeClienteManual),
      fkUsuario: fkUsuario ? Number(fkUsuario) : null,
      etiqueta: etiqueta || null,
      valor: valor === null ? null : Number(valor),
      descricao: descricao || null,
      dataInicio: dataInicioISO,
      dataFim: dataFimISO,
      // backend exige dataVencimento não-nulo -> usar dataInicio como fallback
      dataVencimento: dataInicioISO,
      isPago,
      shouldEnviarEmail
    };

    console.debug('ModalAdicionarAtendimento - payload:', atendimentoDTO);

    try {
      const res = await criarAtendimento(atendimentoDTO, 1);
      console.log('Atendimento criado:', res?.data);
      alert('Atendimento criado com sucesso!');
      if (typeof atualizarLista === 'function') await atualizarLista();
      onClose();
    } catch (err) {
      console.error('Erro ao criar atendimento:', err);
      const msg = err?.response?.data?.message || err?.message || 'Erro de conexão';
      alert('Erro ao criar atendimento: ' + msg);
    }
  };

  return (
    <div id="ModalAdicionarAtendimento" className="modal">
      <div className="modal_add_despesas" style={{ maxWidth: 980 }}>
        <div className="modal-header">
          <h2>Novo Agendamento</h2>
          <button className="modal-close-btn" onClick={onClose} type="button">
            <img src={FecharIcon} alt="Fechar" />
          </button>
        </div>

        <form id="appointmentForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fkCliente">Cliente</label>
              {clientes.length > 0 ? (
                <select id="fkCliente" name="fkCliente" defaultValue="">
                  <option value="">Selecione...</option>
                  {clientes.map(c => (
                    <option key={c.idCliente ?? c.id} value={c.idCliente ?? c.id}>
                      {c.nome || c.nomeCliente || `#${c.idCliente ?? c.id}`}
                    </option>
                  ))}
                </select>
              ) : (
                <input id="nomeCliente" name="nomeCliente" placeholder="Nome do cliente" />
              )}
              {clientes.length > 0 && <input name="nomeCliente" placeholder="Nome (opcional)" />}
            </div>

            <div className="form-group">
              <label htmlFor="fkUsuario">Responsável</label>
              <select id="fkUsuario" name="fkUsuario" defaultValue="">
                <option value="">Selecione...</option>
                {usuarios.map(u => (
                  <option key={u.idUsuario ?? u.id} value={u.idUsuario ?? u.id}>
                    {u.nome || u.nomeUsuario || `#${u.idUsuario ?? u.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="etiqueta">Etiqueta</label>
              <input type="text" id="etiqueta" name="etiqueta" />
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor</label>
              <input type="number" step="0.01" id="valor" name="valor" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" name="descricao" rows="3" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hora">Selecione a hora de início</label>
              <input type="time" id="hora" name="hora" required />
            </div>

            <div className="form-group">
              <label htmlFor="data">Selecione o dia</label>
              <input type="date" id="data" name="data" required />
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <label>
              <input type="checkbox" id="shouldEnviarEmail" name="shouldEnviarEmail" />
              {' '}Enviar e-mail de lembrete?
            </label>
          </div>

          <div className="form-footer-notas" style={{ marginTop: 16 }}>
            <div id="div_para_checkbox">
              <label className="pagamento-label">Pago?</label>
              <div className="switch-row">
                <span className="switch-text off">Não</span>
                <label className="switch">
                  <input type="checkbox" checked={isPago} onChange={() => setIsPago(!isPago)} />
                  <span className="slider"></span>
                </label>
                <span className="switch-text on">Sim</span>
              </div>
            </div>

            <div id="div_para_botao">
              <button type="submit" className="btn-new-appointment">Adicionar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}