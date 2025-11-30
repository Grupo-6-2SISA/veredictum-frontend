import React, { useState, useEffect } from "react";
import ModalContainer from './ModalContainer';
import { editarAtendimento, apiClient } from "../Agenda.js";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import SwitchAlert from "../../../components/SwitchAlert/SwitchAlert";

const formatDateTime = (isoDate) => {
  if (!isoDate) return { date: '', time: '' };
  try {
    const d = new Date(isoDate);
    return {
      date: format(d, 'yyyy-MM-dd'),
      time: format(d, 'HH:mm')
    };
  } catch (e) {
    console.error("Erro ao formatar data ISO:", isoDate, e);
    return { date: '', time: '' };
  }
};

export default function ModalEditarAtendimento({ show, onClose, atualizarLista, editingItem }) {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertState, setAlertState] = useState({ visible: false, message: "", type: "info", duration: 3000 });

  const [formState, setFormState] = useState({
    fkCliente: '',
    nomeCliente: '',
    fkUsuario: '',
    etiqueta: '',
    nota: '',
    status: 'Agendado',
    descricao: '',
    isPago: false,
    shouldEnviarEmail: false,
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Inicializa o formulário ao abrir
  useEffect(() => {
    if (!show) return;

    const baseDateIso = editingItem?.dataInicio || editingItem?.data || new Date().toISOString();
    const { date, time } = formatDateTime(baseDateIso);

    // Pega a nota de chaves alternativas, caso o backend use nomes diferentes
    const notaFromItem =
      editingItem?.nota ??
      editingItem?.notaFiscal ??
      editingItem?.observacao ??
      editingItem?.obs ??
      '';

    setFormState(prev => ({
      ...prev,
      fkCliente: editingItem?.fkCliente ? String(editingItem.fkCliente) : '',
      nomeCliente: editingItem?.fkCliente ? '' : (editingItem?.nomeCliente || ''),
      fkUsuario: editingItem?.fkUsuario ? String(editingItem.fkUsuario) : '',
      etiqueta: editingItem?.etiqueta || '',
      nota: typeof notaFromItem === 'string' ? notaFromItem : String(notaFromItem ?? ''),
      status: editingItem?.status || 'Agendado',
      descricao: editingItem?.descricao || '',
      isPago: !!editingItem?.isPago,
      shouldEnviarEmail: !!editingItem?.shouldEnviarEmail,
      date,
      time
    }));
  }, [show, editingItem]);

  // Busca listas (não altera o formState após carregar)
  useEffect(() => {
    if (!show) return;
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [show]);

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingItem || (!editingItem.idAgendamento && !editingItem.idAtendimento)) {
      // alert("ID do agendamento para edição não encontrado.");
      setAlertState({ visible: true, message: "ID do agendamento para edição não encontrado.", type: "error", duration: 3500 });
      return;
    }

    const idToEdit = editingItem.idAgendamento || editingItem.idAtendimento;

    const {
      etiqueta, descricao, fkCliente, fkUsuario, nota, status, time, date, shouldEnviarEmail, isPago
    } = formState;

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
    if (!date || !time) {
      // alert("Selecione data e hora de início.");
      setAlertState({ visible: true, message: "Selecione data e hora de início.", type: "error", duration: 3000 });
      return;
    }
    if (descricao && descricao.length < 3) {
      // alert("Descrição muito curta.");
      setAlertState({ visible: true, message: "Descrição muito curta.", type: "error", duration: 3000 });
      return;
    }

    const dataInicioISO = `${date}T${time}:00`;
    let dataFimISO = null;
    try {
      const d = new Date(dataInicioISO);
      d.setHours(d.getHours() + 1);
      dataFimISO = d.toISOString();
    } catch (err) {
      console.error('Erro ao calcular dataFim', err);
    }

    const clienteId = fkCliente ? Number(fkCliente) : null;
    const usuarioId = fkUsuario ? Number(fkUsuario) : null;

    const clienteSelecionado = clientes.find(c => String(c.idCliente ?? c.id) === String(fkCliente));
    const nomeClienteParaDTO = clienteSelecionado?.nome || clienteSelecionado?.nomeCliente || null;

    const atendimentoDTO = {
      fkCliente: clienteId,
      nomeCliente: nomeClienteParaDTO,
      fkUsuario: usuarioId,
      etiqueta: etiqueta || null,
      descricao: descricao || null,
      status: status,
      nota: (nota ?? '').trim() || null,
      dataInicio: dataInicioISO,
      dataFim: dataFimISO,
      dataVencimento: dataInicioISO,
      isPago: isPago,
      shouldEnviarEmail: shouldEnviarEmail
    };

    try {
      const res = await editarAtendimento(idToEdit, atendimentoDTO);
      console.log('Atendimento editado:', res?.data);
      // alert('Atendimento atualizado com sucesso!');
      setAlertState({ visible: true, message: 'Atendimento atualizado com sucesso!', type: 'success', duration: 3000 });
      if (typeof atualizarLista === 'function') await atualizarLista();
      onClose();
    } catch (err) {
      console.error('Erro ao editar atendimento:', err);
      const msg = err?.response?.data?.message || err?.message || 'Erro de conexão';
      // alert('Erro ao editar atendimento: ' + msg);
      setAlertState({ visible: true, message: 'Erro ao editar atendimento: ' + msg, type: 'error', duration: 5000 });
    }
  };

  return (
    <ModalContainer
      show={show}
      onClose={onClose}
      title="Editar Agendamento"
      modalId="ModalEditarAtendimento"
      variant="edit"
    >
      <SwitchAlert
        visible={alertState.visible}
        message={alertState.message}
        type={alertState.type}
        duration={alertState.duration}
        onClose={() => setAlertState(s => ({ ...s, visible: false }))}
      />
      {loading ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dados...</div>
      ) : (
        <form
          id="appointmentEditForm"
          className="appointment-form_L"
          onSubmit={handleSubmit}
          style={{ display: 'contents' }}
          autoComplete="off"
        >
          {/* LINHA 1: Cliente e Responsável */}
          <div className="form-group">
            <label htmlFor="fkCliente">Cliente</label>
            <select
              id="fkCliente"
              name="fkCliente"
              value={formState.fkCliente}
              onChange={handleChange}
              required
            >
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
            <select
              id="fkUsuario"
              name="fkUsuario"
              value={formState.fkUsuario}
              onChange={handleChange}
              required
            >
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
            <input
              type="text"
              id="etiqueta"
              name="etiqueta"
              placeholder="Digite uma etiqueta"
              value={formState.etiqueta}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nota">Nota</label>
            <input
              type="text"
              id="nota"
              name="nota"
              placeholder="Digite a nota"
              value={formState.nota}
              onChange={handleChange}
            />
          </div>

          {/* LINHA 3: Status e Descrição */}
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formState.status}
              onChange={handleChange}
            >
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
              placeholder="Digite a descrição"
              value={formState.descricao}
              onChange={handleChange}
            />
          </div>

          {/* LINHA 4: Hora e Data */}
          <div className="form-group">
            <label htmlFor="time">Selecione a hora de início</label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={formState.time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Selecione o dia</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={formState.date}
              onChange={handleChange}
            />
          </div>

          {/* LINHA FINAL: Checkbox e Botão Salvar */}
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
              checked={formState.shouldEnviarEmail}
              onChange={handleChange}
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
              }}>
              Enviar e-mail de lembrete?
            </label>
          </div>

          <div className="form-group" style={{
            marginTop: '15px',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            paddingBottom: '30px'
          }}>
            <button type="submit" className="btn-new_agenda">Salvar Alterações</button>
          </div>
        </form>
      )}
    </ModalContainer>
  );
}

ModalEditarAtendimento.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  atualizarLista: PropTypes.func,
  editingItem: PropTypes.object,
};