// ModalEditarAtendimento.jsx

import React, { useState, useEffect } from "react";
import ModalContainer from './ModalContainer'; // Componente de container genérico
// O apiClient é importado, mas não usado diretamente aqui, mas ok
import { editarAtendimento, apiClient } from "../Agenda.js"; 
import PropTypes from 'prop-types';
import { format } from 'date-fns'; // Para formatar datas

// Função auxiliar para formatar datas para os campos input
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
    // Estados para carregar dados externos
    const [clientes, setClientes] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para o formulário, inicializados a partir de editingItem
    const [formState, setFormState] = useState({
        fkCliente: '',
        nomeCliente: '',
        fkUsuario: '',
        etiqueta: '',
        nota: '',
        status: 'Agendado',
        descricao: '',
        valor: '',
        isPago: false,
        shouldEnviarEmail: false,
        date: '',
        time: '',
        // idAgendamento/idAtendimento é o identificador, não precisa de state
    });

    // Efeito para carregar clientes, usuários e preencher o formulário
    useEffect(() => {
        if (!show) return;
        let mounted = true;
        
        const fetchData = async () => {
            setLoading(true);
            // 1. Carregar Clientes e Usuários
            try {
                // Seu `apiClient` está definido, mas usei a sintaxe mais robusta para fallback
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

            // 2. Preencher o Formulário com editingItem
            if (editingItem) {
                const { date, time } = formatDateTime(editingItem.dataInicio);
                
                // Determina se o cliente é um cliente registrado (tem fkCliente) ou um nome manual
                const isRegisteredClient = !!editingItem.fkCliente;

                setFormState({
                    fkCliente: isRegisteredClient ? String(editingItem.fkCliente) : '', // Preenche fkCliente se for registrado
                    nomeCliente: !isRegisteredClient ? editingItem.nomeCliente || '' : '', // Preenche nomeCliente se for manual
                    fkUsuario: editingItem.fkUsuario || '',
                    etiqueta: editingItem.etiqueta || '',
                    nota: editingItem.nota || '',
                    status: editingItem.status || 'Agendado',
                    descricao: editingItem.descricao || '',
                    valor: editingItem.valor !== undefined && editingItem.valor !== null ? String(editingItem.valor) : '',
                    isPago: !!editingItem.isPago,
                    shouldEnviarEmail: !!editingItem.shouldEnviarEmail,
                    date: date,
                    time: time
                });
            } else {
                console.warn("ModalEditarAtendimento aberto sem item para edição.");
            }

            setLoading(false);
        };
        
        fetchData();
        
        return () => { mounted = false; };
    }, [show, editingItem]);


    if (!show) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Se o usuário selecionar um cliente na lista, limpa o nome manual.
        if (name === 'fkCliente' && value) {
            setFormState(prev => ({
                ...prev,
                [name]: value,
                nomeCliente: '' // Limpa o nome manual
            }));
            return;
        }
        // Se o usuário digitar no nome manual, limpa o fkCliente
        if (name === 'nomeCliente' && value) {
            setFormState(prev => ({
                ...prev,
                [name]: value,
                fkCliente: '' // Limpa o cliente selecionado
            }));
            return;
        }

        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handlePagoChange = () => {
        setFormState(prev => ({ ...prev, isPago: !prev.isPago }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editingItem || (!editingItem.idAgendamento && !editingItem.idAtendimento)) {
            alert("ID do agendamento para edição não encontrado.");
            return;
        }

        const idToEdit = editingItem.idAgendamento || editingItem.idAtendimento;

        const {
            etiqueta, valor, descricao, fkCliente, nomeCliente, fkUsuario, nota, status, time, date, shouldEnviarEmail, isPago
        } = formState;

        // --- Validações ---
        const somenteTexto = /^[A-Za-zÀ-ú0-9\s\-\.,()\/]+$/;
        if (!fkCliente && !nomeCliente) {
            alert("Informe o cliente (selecione ou digite o nome).");
            return;
        }
        if (!fkUsuario) {
            alert("Selecione o responsável.");
            return;
        }
        if (!date || !time) {
            alert("Selecione data e hora de início.");
            return;
        }
        if (descricao && descricao.length < 3) {
            alert("Descrição muito curta.");
            return;
        }
        const valorFloat = valor === "" || valor === undefined ? 0 : parseFloat(valor);
        if (isNaN(valorFloat) || valorFloat < 0) {
            alert("Valor inválido."); 
            return;
        }
        if (nomeCliente && !somenteTexto.test(nomeCliente)) {
            alert("Nome do cliente possui caracteres inválidos.");
            return;
        }
        // -----------------------------------------------------------

        const dataInicioISO = `${date}T${time}:00`;
        let dataFimISO = null;
        try {
            const d = new Date(dataInicioISO);
            d.setHours(d.getHours() + 1); // Exemplo de 1h de duração (Manter consistente)
            dataFimISO = d.toISOString();
        } catch (err) {
            console.error('Erro ao calcular dataFim', err);
        }
        
        // Define o ID e Nome para o DTO
        let clienteId = fkCliente ? Number(fkCliente) : null;
        // let clienteNome = nomeCliente || null;
        let usuarioId = fkUsuario ? Number(fkUsuario) : null;
        
        // Se o fkUsuario também estiver dando erro de 'non-nullable type', 
        // talvez precise ser aninhado como 'usuario: { idUsuario: ID }'.
        // Por hora, mantemos fkUsuario plano, pois o erro principal é no 'cliente'.
        
        // DTO final (usando spread para incluir as propriedades cliente/nomeCliente)
        const atendimentoDTO = {
            fkCliente: clienteId, // Adiciona 'cliente: { idCliente: ID }' OU 'nomeCliente: Nome'
            
            // fkUsuario é enviado plano. Se der erro, deve ser aninhado.
            fkUsuario: usuarioId, 

            etiqueta: etiqueta || null,
            valor: Number(valorFloat), 
            descricao: descricao || null,
            status: status,
            nota: nota || null,
            dataInicio: dataInicioISO,
            dataFim: dataFimISO,
            dataVencimento: dataInicioISO, 
            isPago: isPago,
            shouldEnviarEmail: shouldEnviarEmail
        };

        console.debug('ModalEditarAtendimento - payload ajustado (PUT):', atendimentoDTO);

        try {
            // Usa a função editarAtendimento (que executa o PUT)
            const res = await editarAtendimento(idToEdit, atendimentoDTO);
            console.log('Atendimento editado:', res?.data);
            alert('Atendimento atualizado com sucesso!');
            if (typeof atualizarLista === 'function') await atualizarLista();
            onClose();
        } catch (err) {
            console.error('Erro ao editar atendimento:', err);
            // Mensagem de erro mais detalhada
            const msg = err?.response?.data?.message || err?.message || 'Erro de conexão';
            alert('Erro ao editar atendimento: ' + msg);
        }
    };


    return (
        <ModalContainer
            show={show}
            onClose={onClose}
            title="Editar Agendamento"
            modalId="ModalEditarAtendimento"
            variant="edit" // Se tiver um CSS específico para edição
        >
            {loading ? (
                <div style={{ padding: '20px', textAlign: 'center' }}>Carregando dados...</div>
            ) : (
                <form id="appointmentEditForm" className="appointment-form_P" onSubmit={handleSubmit} style={{
                    display: 'contents'
                }}>
                    
                    {/* LINHA 1: Cliente e Responsável */}
                    <div className="form-group">
                        <label htmlFor="fkCliente">Cliente</label>
                        {clientes.length > 0 ? (
                            <>
                                <select 
                                    id="fkCliente" 
                                    name="fkCliente" 
                                    value={formState.fkCliente} 
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione...</option>
                                    {clientes.map(c => (
                                        <option key={c.idCliente ?? c.id} value={c.idCliente ?? c.id}>
                                            {c.nome || c.nomeCliente || `#${c.idCliente ?? c.id}`}
                                        </option>
                                    ))}
                                </select>
                                <input 
                                    name="nomeCliente" 
                                    placeholder="Nome manual (opcional)" 
                                    style={{ marginTop: '-8px' }} 
                                    value={formState.nomeCliente}
                                    onChange={handleChange}
                                    // A lógica de disable/enable foi movida para o handleChange
                                    disabled={!!formState.fkCliente && formState.fkCliente !== ''} 
                                />
                            </>
                        ) : (
                            <input 
                                id="nomeCliente" 
                                name="nomeCliente" 
                                placeholder="Nome do cliente" 
                                value={formState.nomeCliente}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    {/* ... (o restante do código JSX não foi alterado) ... */}
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
                            placeholder="Pensão alimentícia" 
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
                            placeholder="NF-e 1287364672828382998" 
                            value={formState.nota}
                            onChange={handleChange}
                        />
                    </div>

                    {/* LINHA 3: Status, Descrição e Valor (Substituí a Descrição pela Coluna 2) */}
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
                        <label htmlFor="valor">Valor (R$)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            id="valor" 
                            name="valor" 
                            placeholder="0.00" 
                            value={formState.valor}
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* LINHA 4: Descrição (Ocupando 2 Colunas) */}
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            rows="3"
                            placeholder="Detalhes do agendamento"
                            value={formState.descricao}
                            onChange={handleChange}
                        />
                    </div>

                    {/* LINHA 5: Hora e Data */}
                    <div className="form-group">
                        <label htmlFor="time">Hora de início</label>
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
                        <label htmlFor="date">Dia</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={formState.date}
                            onChange={handleChange}
                        />
                    </div>

                    {/* LINHA 6: Checkbox e Toggle Switch Pago */}
                    <div className="form-group" style={{ marginTop: '10px' }}>
                        <label style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: 'normal',
                            fontSize: '14px',
                            color: '#e9e9e9'
                        }}>
                            <input 
                                type="checkbox" 
                                id="shouldEnviarEmail" 
                                name="shouldEnviarEmail"
                                checked={formState.shouldEnviarEmail}
                                onChange={handleChange} 
                            />
                            Enviar e-mail de lembrete?
                        </label>
                    </div>
                    
                    <div className="form-group" style={{ marginTop: '10px' }}>
                        <div className="switch-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <label style={{ fontWeight: 'normal', fontSize: '14px', color: '#e9e9e9' }}>Pago?</label>
                            <span className="switch-text off" style={{ color: formState.isPago ? '#666' : '#fff' }}>Não</span>
                            <label className="switch">
                                <input type="checkbox" checked={formState.isPago} onChange={handlePagoChange} />
                                <span className="slider"></span>
                            </label>
                            <span className="switch-text on" style={{ color: formState.isPago ? '#fff' : '#666' }}>Sim</span>
                        </div>
                    </div>


                    {/* RODAPÉ: Botão Salvar (Centralizado) */}
                    <div className="form-footer-agenda">
                        <button type="submit" className="btn-new-appointment">Salvar Alterações</button>
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