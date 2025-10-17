
import React, { useState, useMemo, useEffect } from 'react';
import Listagem from '../../components/Listagem/Listagem';
import Button from '../../components/Button/Button';
import MonthPickerButton from '../../components/MonthPicker/MonthPickerButton';
import './Agenda.css';
import '../../index.css';
import EditIcon from '../../assets/svg/lapiz.svg';
import TrashIcon from '../../assets/svg/lixo.svg';

// ===================================================================
// IMPORT DA REQUISIÇÃO (SEGUNDA ETAPA: ANIVERSARIANTES)
// ===================================================================
import { 
    listarAtendimentosPorMesEAno,
    listarAniversariantesDoMes // CORRIGIDO O NOME DO IMPORT
} from './Agenda.js'; 


// ===================================================================
// DADOS / COLUNAS
// ===================================================================
const colunasAtendimentoAgenda = [
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

// Funções utilitárias
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
}


const Agenda = () => {
    // ATENDIMENTOS
    const [atendimentosBrutos, setAtendimentosBrutos] = useState([]);
    const [loadingAtendimentos, setLoadingAtendimentos] = useState(false);
    const [erroAtendimentos, setErroAtendimentos] = useState(null);

    // ANIVERSARIANTES
    const [aniversariantesBrutos, setAniversariantesBrutos] = useState([]);
    const [loadingAniversariantes, setLoadingAniversariantes] = useState(false);
    const [erroAniversariantes, setErroAniversariantes] = useState(null);

    // filtro de mês/ano
    const [currentFilterDate, setCurrentFilterDate] = useState(new Date());
    const handleMonthChange = (newDate) => setCurrentFilterDate(newDate);

    // ===================================================================
    // EFEITO 1: CARREGAMENTO DOS ATENDIMENTOS
    // ===================================================================
    useEffect(() => {
        const fetchAtendimentos = async () => {
            setLoadingAtendimentos(true);
            setErroAtendimentos(null);

            const ano = currentFilterDate.getFullYear();
            const mes = currentFilterDate.getMonth() + 1;

            try {
                const res = await listarAtendimentosPorMesEAno(ano, mes);
                if (res.status === 204) {
                    setAtendimentosBrutos([]);
                } else {
                    setAtendimentosBrutos(res.data || []);
                }
            } catch (error) {
                const message = error.response?.data?.message || "Falha ao carregar atendimentos do mês.";
                setErroAtendimentos(message);
                console.error("Erro ao carregar atendimentos:", error);
            } finally {
                setLoadingAtendimentos(false);
            }
        };

        fetchAtendimentos();
    }, [currentFilterDate]);


    // ===================================================================
    // EFEITO 2: CARREGAMENTO DOS ANIVERSARIANTES
    // ===================================================================
    useEffect(() => {
        const fetchAniversariantes = async () => {
            setLoadingAniversariantes(true);
            setErroAniversariantes(null);

            try {
                const res = await listarAniversariantesDoMes(); // GET /clientes/aniversariantes-do-mes
                if (res.status === 204) {
                    setAniversariantesBrutos([]);
                } else {
                    setAniversariantesBrutos(res.data || []);
                }
            } catch (error) {
                const message = error.response?.data?.message || "Falha ao carregar aniversariantes do mês.";
                setErroAniversariantes(message);
                console.error("Erro ao carregar aniversariantes:", error);
            } finally {
                setLoadingAniversariantes(false);
            }
        };

        fetchAniversariantes();
    }, [currentFilterDate]);


    // ===================================================================
    // MEMO: MAPEAR ATENDIMENTOS
    // ===================================================================
    const atendimentosFiltrados = useMemo(() => {
        return atendimentosBrutos.map(item => {
            const { dia, horario } = formatarDataHora(item.dataInicio || item.data);
            return {
                checkbox: item.idAtendimento ?? item.id,
                nome: item.nomeCliente || item.nome || 'Desconhecido',
                dia,
                horario,
                status: item.status || 'Agendado',
                editar: EditIcon,
                excluir: TrashIcon,
                ...item
            };
        });
    }, [atendimentosBrutos]);


    // ===================================================================
    // MEMO: MAPEAR ANIVERSARIANTES
    // ===================================================================
    const aniversariantesFiltrados = useMemo(() => {
        const filterMonth = currentFilterDate.getMonth();

        const isPessoaFisica = (item) => {
            // Normaliza campos de documento (cpf/cnpj/documento)
            const rawDoc = String(item.cpf || item.cnpj || item.documento || item.documentoFiscal || '').replace(/\D/g, '');
            // Se existir campo tipoPessoa use-o (PF = pessoa física, PJ = pessoa jurídica)
            if (item.tipoPessoa) {
                const t = String(item.tipoPessoa).toLowerCase();
                if (t === 'j' || t === 'pj') return false;
                if (t === 'f' || t === 'pf') return true;
            }
            // CNPJ tem 14 dígitos => empresa (excluir)
            if (rawDoc.length === 14) return false;
            // CPF tem 11 dígitos => pessoa física (incluir)
            if (rawDoc.length === 11) return true;
            // Fallback: se existir campo 'cnpj' explicitamente, trata como empresa
            if (item.cnpj) return false;
            // Caso não seja possível determinar, assume pessoa física
            return true;
        };

        const mapped = (aniversariantesBrutos || [])
            // 1) Excluir empresas (CNPJ) e manter apenas pessoas físicas (CPF)
            .filter(isPessoaFisica)
            // 2) Mapear para o formato esperado pela Listagem
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
            // 3) Filtrar pelo mês selecionado (se a API não retornar já filtrado)
            .filter(aniversariante => {
                if (!aniversariante.dataObj) return false;
                return aniversariante.dataObj.getMonth() === filterMonth;
            })
            // 4) Ordenar por dia do mês
            .sort((a, b) => {
                const [dA] = a.dia.split('/').map(Number);
                const [dB] = b.dia.split('/').map(Number);
                return dA - dB;
            });

        return mapped;
    }, [aniversariantesBrutos, currentFilterDate]);



    // Render helpers
    const renderAtendimentosList = () => {
        if (loadingAtendimentos) return <p className="loading-message">Carregando atendimentos...</p>;
        if (erroAtendimentos) return <p className="error-message">{erroAtendimentos}</p>;
        if (!atendimentosFiltrados || atendimentosFiltrados.length === 0) {
            const nomeMes = currentFilterDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
            return <p className="no-data-message">Nenhum atendimento agendado para {nomeMes}.</p>;
        }

        return (
            <Listagem
                dados={atendimentosFiltrados}
                colunas={colunasAtendimentoAgenda}
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
            {/* <Sidebar nomeCompleto="Lismara Ribeiro" /> */}
            <main className="main-content agenda-page">
                <header className="agenda-header">
                    <h1>Agenda & Relacionamento</h1>
                    <Button />
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
                                >
                                    <img src={TrashIcon} alt="Excluir" className="agenda-card-action-icon" />
                                </button>
                            </div>

                            <div className="agenda-listagem-container">
                                {renderAtendimentosList()}
                            </div>
                        </div>

                        {/* Bloco 2: Painel Lateral (Aniversariantes do Mês) */}
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
        </div>
    );
};

export default Agenda;
