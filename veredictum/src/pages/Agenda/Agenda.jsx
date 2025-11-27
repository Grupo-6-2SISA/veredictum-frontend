import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Listagem from '../../components/Listagem/Listagem';
import ButtonAgenda from '../../components/ButtonAgenda/ButtonAgenda';
import MonthPickerButton from '../../components/MonthPicker/MonthPickerButton';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Agenda.css';
import '../../index.css';
import EditIcon from '../../assets/svg/lapiz.svg';
import TrashIcon from '../../assets/svg/lixo.svg';

import {
    listarAtendimentosPorMesEAno,
    listarAniversariantesDoMes,
    criarAtendimento,
    editarAtendimento,
    excluirAtendimento,
    listarClientes,
    excluirAtendimentoLote
} from './Agenda.js';

import ModalContainer from './Support/ModalContainer';
import ModalAdicionarAtendimento from './Support/ModalAdicionarAtendimento';
import ModalEditarAtendimento from './Support/ModalEditarAtendimento';
import ConfirmacaoExclusao from './Support/ConfirmacaoExclusao';
import ModalExcluirAtendimento from './Support/ModalExcluirAtendimento';

// ===================================================================
// DADOS / COLUNAS
// ===================================================================
const baseColunasAtendimentoAgenda = [
    { key: 'checkbox', titulo: '' },
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
    { key: 'horario', titulo: 'Horário' },
    { key: 'status', titulo: 'Status' },
    { key: 'editar', titulo: 'Editar' },
    { key: 'excluir', titulo: 'Excluir' },
];

const colunasAniversarioAgenda = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
];

// Utils
const formatarDataHora = (isoString) => {
    if (!isoString) return { dia: '', horario: '' };
    try {
        const date = new Date(isoString);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        const hora = String(date.getHours()).padStart(2, '0');
        const minuto = String(date.getMinutes()).padStart(2, '0');

        return {
            dia: `${dia}/${mes}/${ano}`,
            horario: `${hora}:${minuto}`,
            dataCompleta: date
        };
    } catch (e) {
        console.error("Erro ao formatar data:", isoString, e);
        return { dia: 'Erro', horario: 'Erro', dataCompleta: null };
    }
};

export default function Agenda() {
    // ESTADOS
    const [atendimentosBrutos, setAtendimentosBrutos] = useState([]);
    const [loadingAtendimentos, setLoadingAtendimentos] = useState(false);
    const [erroAtendimentos, setErroAtendimentos] = useState(null);

    const [aniversariantesBrutos, setAniversariantesBrutos] = useState([]);
    const [loadingAniversariantes, setLoadingAniversariantes] = useState(false);
    const [erroAniversariantes, setErroAniversariantes] = useState(null);

    const [clientes, setClientes] = useState([]);

    // FILTRO
    const [currentFilterDate, setCurrentFilterDate] = useState(new Date());
    const handleMonthChange = (newDate) => setCurrentFilterDate(newDate);

    // SELEÇÃO / MODAIS
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [deleteMode, setDeleteMode] = useState('single'); // 'single' | 'bulk'

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false); // para bulk
    const [deletingItem, setDeletingItem] = useState(null);        // item para single

    // ===================================================================
    // FETCHERS
    // ===================================================================
    const fetchClientes = useCallback(async () => {
        try {
            const res = await listarClientes();
            setClientes(res?.data || []);
        } catch (err) {
            console.error('Erro ao carregar clientes:', err);
        }
    }, []);

    const fetchAtendimentos = useCallback(async () => {
        setLoadingAtendimentos(true);
        setErroAtendimentos(null);
        const ano = currentFilterDate.getFullYear();
        const mes = currentFilterDate.getMonth() + 1;
        try {
            const res = await listarAtendimentosPorMesEAno(ano, mes);
            setAtendimentosBrutos(res?.data || []);
        } catch (err) {
            setErroAtendimentos(err?.response?.data?.message || 'Erro ao carregar atendimentos');
        } finally {
            setLoadingAtendimentos(false);
        }
    }, [currentFilterDate]);

    useEffect(() => {
        fetchClientes();
        fetchAtendimentos();
    }, [fetchClientes, fetchAtendimentos]);

    useEffect(() => {
        const fetchAniversariantes = async () => {
            setLoadingAniversariantes(true);
            setErroAniversariantes(null);
            try {
                const res = await listarAniversariantesDoMes();
                setAniversariantesBrutos(res.status === 204 ? [] : res.data || []);
            } catch (error) {
                setErroAniversariantes(error.response?.data?.message || "Falha ao carregar aniversariantes do mês.");
            } finally {
                setLoadingAniversariantes(false);
            }
        };
        fetchAniversariantes();
    }, [currentFilterDate]);

    useEffect(() => {
        setSelectedIds(new Set());
    }, [currentFilterDate, atendimentosBrutos]);

    // ===================================================================
    // SELEÇÃO
    // ===================================================================
    const toggleSelect = useCallback((id, checked) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (checked) next.add(id);
            else next.delete(id);
            return next;
        });
    }, []);

    const isAllSelected = useMemo(() => {
        if (!atendimentosBrutos || atendimentosBrutos.length === 0) return false;
        return selectedIds.size > 0 && selectedIds.size === atendimentosBrutos.length;
    }, [selectedIds, atendimentosBrutos]);

    const toggleSelectAll = useCallback((checked) => {
        if (checked) {
            const allIds = new Set(
                atendimentosBrutos
                    .map(item => Number(item.idAtendimento ?? item.idAgendamento ?? item.id))
                    .filter(id => id > 0)
            );
            setSelectedIds(allIds);
        } else {
            setSelectedIds(new Set());
        }
    }, [atendimentosBrutos]);

    // ===================================================================
    // EXCLUSÃO
    // ===================================================================
    const handleBulkDeleteClick = useCallback(() => {
        if (selectedIds.size === 0) {
            alert('Selecione ao menos um atendimento para excluir.');
            return;
        }
        setDeleteMode('bulk');
        setDeletingItem(null);
        setShowDeleteModal(true);
    }, [selectedIds]);

    const handleDeleteConfirm = async () => {
        try {
            if (deleteMode === 'bulk') {
                const ids = Array.from(selectedIds);
                await excluirAtendimentoLote(ids);
                alert(`Foram excluídos ${ids.length} atendimentos.`);
            } else if (deletingItem) {
                await excluirAtendimento(deletingItem.idAtendimento ?? deletingItem.idAgendamento ?? deletingItem.id);
                alert('Atendimento excluído!');
            }
            // refresh
            closeAllDelete();
            setSelectedIds(new Set());
            await fetchAtendimentos();
        } catch (err) {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir: ' + (err?.response?.data?.message || err?.message));
        }
    };

    const openDeleteModal = (item) => {
        const id = item?.idAtendimento ?? item?.idAgendamento ?? item?.id;
        if (id == null) return;
        setDeleteMode('single');
        setDeletingItem(item);
    };

    const closeAllDelete = () => {
        setShowDeleteModal(false);
        setDeletingItem(null);
        setDeleteMode('single');
    };

    // ===================================================================
    // CRUD
    // ===================================================================
    const openAddModal = () => setShowAddModal(true);
    const closeModalAdd = () => setShowAddModal(false);

    const openEditModal = (item) => {
        const id = item?.idAtendimento ?? item?.idAgendamento ?? item?.id;
        if (id == null) {
            alert('Não foi possível identificar o ID do atendimento para edição.');
            return;
        }
        const itemToEdit = atendimentosBrutos.find(a => (a.idAtendimento ?? a.idAgendamento ?? a.id) === id);
        setEditingItem(itemToEdit || item);
        setShowEditModal(true);
    };

    const [editingItem, setEditingItem] = useState(null);
    const closeModalEdit = () => {
        setShowEditModal(false);
        setEditingItem(null);
    };

    const handleCreateSubmit = async (atendimentoDTO) => {
        try {
            await criarAtendimento(atendimentoDTO, 1);
            closeModalAdd();
            await fetchAtendimentos();
            alert('Atendimento criado com sucesso!');
        } catch (err) {
            alert('Erro ao criar atendimento: ' + (err?.response?.data?.message || err?.message || 'Erro de conexão.'));
        }
    };

    const handleEditSubmit = async (atendimentoDTO) => {
        if (!editingItem) return;
        try {
            await editarAtendimento(editingItem.idAtendimento ?? editingItem.id, atendimentoDTO);
            closeModalEdit();
            await fetchAtendimentos();
            alert('Atendimento atualizado!');
        } catch (err) {
            alert('Erro ao atualizar atendimento: ' + (err?.response?.data?.message || err?.message));
        }
    };

    // ===================================================================
    // MAPA DE LISTAGENS
    // ===================================================================
    const atendimentosFiltrados = useMemo(() => {
        return (atendimentosBrutos || [])
            .map(item => {
                const { dia, horario } = formatarDataHora(item.dataInicio || item.data);

                const rawId = item.idAtendimento ?? item.idAgendamento ?? item.id;
                const idAtendimento = parseInt(rawId, 10);
                if (isNaN(idAtendimento) || idAtendimento <= 0) return null;

                // Resolve nome
                let nomeCliente = 'Cliente não informado';
                if (item.fkCliente && clientes.length > 0) {
                    const cliente = clientes.find(c => c.idCliente === item.fkCliente || c.id === item.fkCliente);
                    if (cliente) nomeCliente = cliente.nome || cliente.nomeCliente || 'Cliente não informado';
                } else {
                    nomeCliente = item.nomeCliente || item.nome || item.cliente?.nome || item.cliente?.nomeCliente || item.clienteNome || 'Cliente não informado';
                }

                const base = { ...item, idAtendimento, nomeCliente };

                const row = {
                    checkbox: (
                        <input
                            type="checkbox"
                            aria-label={`Selecionar atendimento ${nomeCliente}`}
                            checked={selectedIds.has(idAtendimento)}
                            onChange={(e) => toggleSelect(idAtendimento, e.target.checked)}
                        />
                    ),
                    nome: nomeCliente,
                    dia,
                    horario,
                    status: item.status || 'Agendado',
                    editar: (
                        <button type="button" onClick={() => openEditModal(base)} aria-label="Editar atendimento" className="btn-icon-plain">
                            <img src={EditIcon} alt="Editar" />
                        </button>
                    ),
                    excluir: (
                        <button
                            type="button"
                            onClick={() => openDeleteModal({ ...base, dia, horario })}
                            aria-label="Excluir atendimento"
                            className="btn-icon-plain"
                        >
                            <img src={TrashIcon} alt="Excluir" />
                        </button>
                    ),
                    ...base,
                    dia,
                    horario
                };
                return row;
            })
            .filter(Boolean);
    }, [atendimentosBrutos, clientes, selectedIds, toggleSelect]);

    const aniversariantesFiltrados = useMemo(() => {
        const filterMonth = currentFilterDate.getMonth();

        const isPessoaFisica = (item) => {
            const rawDoc = String(item.cpf || item.cnpj || item.documento || item.documentoFiscal || '').replace(/\D/g, '');
            if (item.tipoPessoa) {
                const t = String(item.tipoPessoa).toLowerCase();
                if (t === 'j' || t === 'pj') return false;
                if (t === 'f' || t === 'pf') return true;
            }
            if (rawDoc.length === 14) return false;
            if (rawDoc.length === 11) return true;
            if (item.cnpj) return false;
            return true;
        };

        const mapped = (aniversariantesBrutos || [])
            .filter(isPessoaFisica)
            .map(item => {
                const dataAniversario = item.dataNascimento || item.dataAniversario || item.dataCriacao || null;
                const date = dataAniversario ? new Date(dataAniversario) : null;
                const dia = date ? String(date.getDate()).padStart(2, '0') : '--';
                const mes = date ? String(date.getMonth() + 1).padStart(2, '0') : '--';

                return {
                    nome: item.nome || item.nomeCliente || 'Nome Indisponível',
                    dia: date ? `${dia}/${mes}` : 'Data Indisponível',
                    dataObj: date,
                    ...item
                };
            })
            .filter(aniversariante => aniversariante.dataObj && aniversariante.dataObj.getMonth() === filterMonth)
            .sort((a, b) => {
                const [dA] = a.dia.split('/').map(Number);
                const [dB] = b.dia.split('/').map(Number);
                return dA - dB;
            });

        return mapped;
    }, [aniversariantesBrutos, currentFilterDate]);

    // ===================================================================
    // RENDER
    // ===================================================================
    const renderAtendimentosList = () => {
        if (loadingAtendimentos) return <p className="loading-message">Carregando atendimentos...</p>;
        if (erroAtendimentos) return <p className="error-message">{erroAtendimentos}</p>;
        if (!atendimentosFiltrados || atendimentosFiltrados.length === 0) {
            const nomeMes = currentFilterDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            return <p className="no-data-message">Nenhum atendimento agendado para {nomeMes}.</p>;
        }

        const colunasComSelecao = baseColunasAtendimentoAgenda.map(col => {
            if (col.key === 'checkbox') {
                return {
                    ...col,
                    titulo: (
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={(e) => toggleSelectAll(e.target.checked)}
                            aria-label="Selecionar todos"
                        />
                    )
                };
            }
            return col;
        });

        return (
            <Listagem
                dados={atendimentosFiltrados}
                colunas={colunasComSelecao}
                id="atendimento-list"
                isFullTable
            />
        );
    };

    const renderAniversariantesList = () => {
        if (loadingAniversariantes) return <p className="loading-message">Carregando aniversariantes...</p>;
        if (erroAniversariantes) return <p className="error-message">{erroAniversariantes}</p>;
        if (!aniversariantesFiltrados || aniversariantesFiltrados.length === 0) {
            const nomeMes = currentFilterDate.toLocaleString('pt-BR', { month: 'long' });
            return <p className="no-data-message">Nenhum aniversariante em {nomeMes}.</p>;
        }

        return (
            <Listagem
                dados={aniversariantesFiltrados}
                colunas={colunasAniversarioAgenda}
                id="agenda-birthdays-list"
            />
        );
    };

    return (
        <div className="agenda-container">
            <Sidebar />
            <main className="main-content agenda-page">
                <header className="agenda-header">
                    <h1>Agenda & Relacionamento</h1>
                    <ButtonAgenda onClick={openAddModal} text="Novo Agendamento" />
                </header>

                <div className="agenda-layout-grid">
                    <div className="month-selector">
                        <MonthPickerButton onMonthChange={handleMonthChange} />
                    </div>

                    <section className="atendimento-container">
                        {/* Bloco 1: Atendimento do Mês */}
                        <div className="agenda-card-container-atendimento" id="agenda-attendance-card">
                            <div className="agenda-card-header">
                                <h2>Atendimento do mês</h2>
                                <button
                                    type="button"
                                    className="agenda-card-action-btn"
                                    aria-label="Excluir atendimentos"
                                    onClick={handleBulkDeleteClick}
                                    title={selectedIds.size === 0 ? 'Selecione itens para excluir' : 'Excluir selecionados'}
                                >
                                    <img src={TrashIcon} alt="Excluir" className="agenda-card-action-icon" />
                                </button>
                            </div>

                            <div className="agenda-listagem-container">
                                {renderAtendimentosList()}
                            </div>
                        </div>

                        {/* Bloco 2: Aniversariantes */}
                        <aside className="aniversariantes-panel">
                            <div className="agenda-card-container-birthdays" id="agenda-birthdays-card">
                                <div className="agenda-card-header">
                                    <h2>Aniversariantes do Mês</h2>
                                </div>

                                <div className="agenda-listagem-container">
                                    {renderAniversariantesList()}
                                </div>
                            </div>
                        </aside>
                    </section>
                </div>
            </main>

            {/* MODAIS */}
            <ModalAdicionarAtendimento 
                show={showAddModal} 
                onClose={closeModalAdd}
                atualizarLista={fetchAtendimentos} 
            />

            <ModalEditarAtendimento
                show={showEditModal}
                onClose={closeModalEdit}
                editingItem={editingItem}
                atualizarLista={fetchAtendimentos}
            />

            {/* Modal de exclusão individual (visual padrão da imagem) */}
            {deletingItem && (
                <ModalExcluirAtendimento
                    open={Boolean(deletingItem)}
                    info={{
                        nome: deletingItem.nomeCliente || deletingItem.nome,
                        date: deletingItem.dia,    // dd/MM/yyyy
                        time: deletingItem.horario // HH:mm
                    }}
                    onClose={closeAllDelete}
                    onConfirm={handleDeleteConfirm}
                />
            )}

            {/* Modal de exclusão em lote (mantém título/estilo do delete) */}
            <ModalContainer
                show={showDeleteModal}
                onClose={closeAllDelete}
                title="Cancelamento de atendimentos"
                variant="delete" // 👈 Aplica o estilo de modal de deleção
                modalId="modal-delete-atendimentos-lote"
            >
                <ConfirmacaoExclusao // 👈 Renderiza apenas o conteúdo (mensagem + botões)
                    message={`Deseja cancelar ${selectedIds.size} atendimento(s) selecionado(s)?`}
                    onConfirm={handleDeleteConfirm}
                    onCancel={closeAllDelete}
                    cancelText="Não"
                    confirmText="Sim"
                />
            </ModalContainer>
        </div>
    );
};

export { Agenda };