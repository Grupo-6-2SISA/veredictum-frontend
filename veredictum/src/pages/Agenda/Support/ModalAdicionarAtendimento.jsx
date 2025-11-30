import React, { useState, useEffect } from "react";
import ModalContainer from './ModalContainer';
import { criarAtendimento, apiClient } from "../Agenda.js";
import PropTypes from 'prop-types';
import SwitchAlert from "../../../components/SwitchAlert/SwitchAlert";

// Helpers: data e hora local no formato dos inputs
const pad2 = (n) => String(n).padStart(2, '0');
const nowLocalDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};
const nowLocalTime = () => {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

export default function ModalAdicionarAtendimento({ show, onClose, atualizarLista }) {
  // Mantendo states para lógica de agendamento (inclui isPago p/ compatibilidade)
  const [isPago, setIsPago] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [alertState, setAlertState] = useState({
    visible: false,
    message: '',
    type: 'info',
    duration: 3000,
  });

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
    const valor = null; // sem campo 'valor' na UI
    const descricao = e.target.descricao.value.trim();
    const fkCliente = e.target.fkCliente?.value || "";
    const fkUsuario = e.target.fkUsuario?.value || "";
    const nota = e.target.nota?.value?.trim() || null;
    const status = e.target.status?.value || "Agendado";
    const hora = e.target.hora.value;
    const data = e.target.data.value;
    const shouldEnviarEmail = !!e.target.shouldEnviarEmail.checked;

    // Validações
    if (!fkCliente) {
      // alert("Selecione o cliente.");
      setAlertState({ visible: true, message: "Selecione o cliente.", type: "error", duration: 3000 });
      return;
    }
    if (!fkUsuario) {
      // alert("Selecione o responsável.");
      setAlertState({ visible: true, message: "Selecione o responsável.", type: "error", duration: 3000 });
      return;
    }
    if (!data || !hora) {
      // alert("Selecione data e hora de início.");
      setAlertState({ visible: true, message: "Selecione data e hora de início.", type: "error", duration: 3000 });
      return;
    }
    if (descricao && descricao.length < 3) {
      // alert("Descrição muito curta.");
      setAlertState({ visible: true, message: "Descrição muito curta.", type: "error", duration: 3000 });
      return;
    }

    const dataInicioISO = `${data}T${hora}:00`;
    let dataFimISO = null;
    try {
      const d = new Date(dataInicioISO);
      d.setHours(d.getHours() + 1); // duração padrão 1h
      dataFimISO = d.toISOString();
    } catch (err) {
      console.error('Erro ao calcular dataFim', err);
    }

    // Nome do cliente selecionado (para DTO)
    const clienteSelecionado = clientes.find(c => String(c.idCliente ?? c.id) === String(fkCliente));
    const nomeClienteParaDTO = clienteSelecionado?.nome || clienteSelecionado?.nomeCliente || null;

    const atendimentoDTO = {
      fkCliente: fkCliente ? Number(fkCliente) : null,
      nomeCliente: nomeClienteParaDTO,
      fkUsuario: fkUsuario ? Number(fkUsuario) : null,
      etiqueta: etiqueta || null,
      valor: valor === null ? null : Number(valor),
      descricao: descricao || null,
      status: status,
      nota: nota,
      dataInicio: dataInicioISO,
      dataFim: dataFimISO,
      dataVencimento: dataInicioISO,
      isPago: isPago,
      shouldEnviarEmail
    };

    console.debug('ModalAdicionarAtendimento - payload:', atendimentoDTO);

    try {
      const res = await criarAtendimento(atendimentoDTO, 1);
      console.log('Atendimento criado:', res?.data);
      // alert('Atendimento criado com sucesso!');
      setAlertState({ visible: true, message: 'Atendimento criado com sucesso!', type: 'success', duration: 3000 });
      if (typeof atualizarLista === 'function') await atualizarLista();
      onClose();
    } catch (err) {
      console.error('Erro ao criar atendimento:', err);
      const msg = err?.response?.data?.message || err?.message || 'Erro de conexão';
      // alert('Erro ao criar atendimento: ' + msg);
      setAlertState({ visible: true, message: 'Erro ao criar atendimento: ' + msg, type: 'error', duration: 5000 });
    }
  };

  return (
    <ModalContainer
      show={show}
      onClose={onClose}
      title="Novo Agendamento"
      modalId="ModalAdicionarAtendimento"
      variant="add"
    >
      <SwitchAlert
        visible={alertState.visible}
        message={alertState.message}
        type={alertState.type}
        duration={alertState.duration}
        onClose={() => setAlertState(s => ({ ...s, visible: false }))}
      />
      <form
        id="appointmentForm"
        className="appointment-form_L"
        onSubmit={handleSubmit}
        style={{ display: 'contents' }}
        autoComplete="off"
      >

        {/* LINHA 1: Cliente e Responsável */}
        <div className="form-group">
          <label htmlFor="fkCliente">Cliente</label>
          <select id="fkCliente" name="fkCliente" defaultValue="" required>
            <option value="">Selecione...</option>
            {clientes.map(c => (
              <option key={c.idCliente ?? c.id} value={c.idCliente ?? c.id}>
                {c.nome || c.nomeCliente || `#${c.idCliente ?? c.id}`}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fkUsuario">Responsável</label>
          <select id="fkUsuario" name="fkUsuario" defaultValue="" required>
            <option value="">Selecione...</option>
            {usuarios.map(u => (
              <option key={u.idUsuario ?? u.id} value={u.idUsuario ?? u.id}>
                {u.nome || u.nomeUsuario || `#${u.idUsuario ?? u.id}`}
              </option>
            ))}
          </select>
        </div>

        {/* LINHA 2: Etiqueta e Nota */}
        <div className="form-group">
          <label htmlFor="etiqueta">Etiqueta</label>
          <input type="text" id="etiqueta" name="etiqueta" placeholder="Pensão alimentícia" />
        </div>
        <div className="form-group">
          <label htmlFor="nota">Nota</label>
          <input type="text" id="nota" name="nota" placeholder="NF-e 1287364672828382998" />
        </div>

        {/* LINHA 3: Status e Descrição */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue="Agendado">
            <option value="Agendado">Agendado</option>
            <option value="Concluido">Concluído</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            rows="3"
            placeholder="Pensão alimentícia de 3 filhos e 1 cachorro"
          />
        </div>

        {/* LINHA 4: Hora e Data (pré-preenchidos com agora) */}
        <div className="form-group">
          <label htmlFor="hora">Selecione a hora de início</label>
          <input
            type="time"
            id="hora"
            name="hora"
            required
            defaultValue={nowLocalTime()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Selecione o dia</label>
          <input
            type="date"
            id="data"
            name="data"
            required
            defaultValue={nowLocalDate()}
          />
        </div>

        {/* LINHA 5: Checkbox e Botão */}
        <div className="form-group" style={{
          marginTop: '15px',
          gap: '0',
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: '30px'
        }}>
          <input
            type="checkbox"
            id="shouldEnviarEmail"
            name="shouldEnviarEmail"
            style={{ width: '16px', height: '16px', margin: 0 }}
          />
          <label
            htmlFor="shouldEnviarEmail"
            style={{
              fontWeight: 'normal',
              fontSize: '14px',
              color: '#e9e9e9',
              margin: 0,
              cursor: 'pointer'
            }}
          >
            Enviar e-mail de lembrete?
          </label>
        </div>

        <div className="form-group" style={{
          marginTop: '15px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingBottom: '30px'
        }}>
          <button type="submit" className="btn-new_agenda">Adicionar</button>
        </div>

      </form>
    </ModalContainer>
  );
}

ModalAdicionarAtendimento.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  atualizarLista: PropTypes.func,
};