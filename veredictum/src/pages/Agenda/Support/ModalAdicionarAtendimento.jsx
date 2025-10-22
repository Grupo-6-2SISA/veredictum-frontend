import React, { useState, useEffect } from "react";
import ModalContainer from './ModalContainer';
import { criarAtendimento, apiClient } from "../Agenda.js";
import PropTypes from 'prop-types';

export default function ModalAdicionarAtendimento({ show, onClose, atualizarLista }) {
  // Mantendo states para lógica de agendamento (incluindo isPago, mesmo que não esteja na UI da imagem)
  const [isPago, setIsPago] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if (!show) return;
    let mounted = true;
    const fetchLists = async () => {
      try {
        // Busca REAL dos clientes e usuários, mantendo a estrutura original
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
    const valorRaw = e.target.valor?.value; // O valor não está na imagem, mas mantemos a lógica
    const valor = valorRaw === "" || valorRaw === undefined ? null : parseFloat(valorRaw);
    const descricao = e.target.descricao.value.trim();
    const fkCliente = e.target.fkCliente?.value || "";
    // REMOVIDO: const nomeClienteManual = e.target.nomeCliente?.value?.trim() || "";
    const fkUsuario = e.target.fkUsuario?.value || "";
    const nota = e.target.nota?.value?.trim() || null; // Campo Nota adicionado
    const status = e.target.status?.value || "Agendado"; // Campo Status
    const hora = e.target.hora.value;
    const data = e.target.data.value;
    const shouldEnviarEmail = !!e.target.shouldEnviarEmail.checked;

    // --- Validações básicas ---
    const somenteTexto = /^[A-Za-zÀ-ú0-9\s\-\.,()\/]+$/;

    // NOVO: Exige apenas fkCliente
    if (!fkCliente) {
      alert("Selecione o cliente.");
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
      // Esta validação pode ser ignorada se o campo valor for removido da UI
    }
    // REMOVIDO: Validação de nomeClienteManual
    // -----------------------------------------------------------

    const dataInicioISO = `${data}T${hora}:00`;
    let dataFimISO = null;
    try {
      const d = new Date(dataInicioISO);
      d.setHours(d.getHours() + 1); // Exemplo de 1h de duração
      dataFimISO = d.toISOString();
    } catch (err) {
      console.error('Erro ao calcular dataFim', err);
    }

    // Encontra o nome do cliente no array (para preencher o DTO)
    const clienteSelecionado = clientes.find(c => String(c.idCliente ?? c.id) === String(fkCliente));
    const nomeClienteParaDTO = clienteSelecionado?.nome || clienteSelecionado?.nomeCliente || null;


    const atendimentoDTO = {
      fkCliente: fkCliente ? Number(fkCliente) : null,
      // NOVO: Apenas o nome do cliente selecionado (ou null)
      nomeCliente: nomeClienteParaDTO,
      fkUsuario: fkUsuario ? Number(fkUsuario) : null,
      etiqueta: etiqueta || null,
      // Mantendo valor e isPago para compatibilidade com o DTO
      valor: valor === null ? null : Number(valor),
      descricao: descricao || null,
      status: status, // Adicionado Status
      nota: nota, // Adicionado Nota
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
    <ModalContainer
      show={show}
      onClose={onClose}
      title="Novo Agendamento"
      modalId="ModalAdicionarAtendimento"
      variant="add"
    >
      <form id="appointmentForm" className="appointment-form_P" onSubmit={handleSubmit} style={{
        display: 'contents'
      }}>

        {/* LINHA 1: Cliente e Responsável */}
        <div className="form-group">
          <label htmlFor="fkCliente">Cliente</label>
          {/* Simplificado para apenas o SELECT, removendo a lógica de input manual */}
          <select id="fkCliente" name="fkCliente" defaultValue="" required={true}>
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
          <select id="fkUsuario" name="fkUsuario" defaultValue="" required={true}>
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

        {/* LINHA 4: Hora e Data */}
        <div className="form-group">
          <label htmlFor="hora">Selecione a hora de início</label>
          <input
            type="time"
            id="hora"
            name="hora"
            required
            defaultValue="08:00"
          />
        </div>
        <div className="form-group">
          <label htmlFor="data">Selecione o dia</label>
          <input
            type="date"
            id="data"
            name="data"
            required
            defaultValue="2025-09-06"
          />
        </div>

        {/* LINHA 5: Checkbox (Coluna 1) e Espaço Vazio (Coluna 2) */}
        <div className="form-group" style={{
          marginTop: '10px'
        }}>
          <label style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 'normal',
            fontSize: '14px',
            color: '#e9e9e9'
          }}>
            <input type="checkbox" id="shouldEnviarEmail" name="shouldEnviarEmail" />
            Enviar e-mail de lembrete?
          </label>
        </div>

        {/* Div Vazia para preencher a Coluna 2 da última linha de inputs/checkbox */}
        <div style={{ /* Coluna 2 vazia */ }}></div>


        {/* RODAPÉ: Botão Adicionar (Centralizado) */}
        <div className="form-footer-agenda">
          <button type="submit" className="btn-new-appointment">Adicionar</button>
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