import React, { useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Listagem from '../../components/Listagem/Listagem';
import Button from '../../components/Button/Button';
import MonthPickerButton from '../../components/MonthPicker/MonthPickerButton'; // NOVO IMPORT
import './Agenda.css';
import '../../index.css';
import EditIcon from '../../assets/svg/lapiz.svg';
import TrashIcon from '../../assets/svg/lixo.svg';


// ===================================================================
// DADOS MOCK
// ===================================================================

const atendimentosDoMes = [
    { nome: 'Davidson Mendes', dia: '09/06/2025', horario: '15:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Gabriel Cordeiro', dia: '12/06/2025', horario: '12:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Luiz Gustavo', dia: '12/06/2025', horario: '15:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Márcio Ribeiro', dia: '13/10/2025', horario: '09:45', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Isabel C. Oliveira', dia: '14/06/2025', horario: '11:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Isabel C. Oliveira', dia: '14/06/2025', horario: '11:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
    { nome: 'Novo Cliente', dia: '15/10/2025', horario: '10:00', status: 'Agendado', editar: EditIcon, excluir: TrashIcon },
];

const colunasAtendimentoAgenda = [
    { key: 'checkbox', titulo: '' },
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
    { key: 'horario', titulo: 'Horário' },
    { key: 'status', titulo: 'Status' },
    { key: 'editar', titulo: 'Editar' },
    { key: 'excluir', titulo: 'Excluir' },
];

const aniversariantesDoMesMOCK = [
    { nome: 'Davidson Mendes', dia: '09/06/2025' },
    { nome: 'João Matos', dia: '10/06/2025' },
    { nome: 'Lilian Medeiros', dia: '16/06/2025' },
    { nome: 'Márcio Ribeiro', dia: '13/10/2025' }, // Aniversário em Outubro
    { nome: 'William Ferreira', dia: '23/06/2025' },
    { nome: 'Cesar Sampaio', dia: '24/06/2025' },
];

const colunasAniversarioAgenda = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
];

// Função utilitária para converter D/M/Y para timestamp
const parseDMY = (str) => {
    if (!str) return 0;
    const [d, m, y] = String(str).split('/').map(Number);
    return new Date(y, (m || 1) - 1, d || 1); // Retorna objeto Date
};


const Agenda = () => {
    // Estado que armazena o mês/ano selecionado para filtragem. Inicializa com a data atual.
    const [currentFilterDate, setCurrentFilterDate] = useState(new Date());

    // Função callback chamada pelo MonthPickerButton quando um novo mês é confirmado
    const handleMonthChange = (newDate) => {
        setCurrentFilterDate(newDate);
    };

    // ===================================================================
    // FILTRAGEM E ORDENAÇÃO DE DADOS
    // ===================================================================

    // Filtra os atendimentos para exibir apenas o mês selecionado
    const atendimentosFiltrados = useMemo(() => {
        const filterMonth = currentFilterDate.getMonth();
        const filterYear = currentFilterDate.getFullYear();

        // 1. Filtra
        const filtered = atendimentosDoMes.filter(atendimento => {
            const atendimentoDate = parseDMY(atendimento.dia);
            return (
                atendimentoDate.getMonth() === filterMonth &&
                atendimentoDate.getFullYear() === filterYear
            );
        });

        // 2. Ordena (por dia do mês)
        return filtered.sort((a, b) => {
            return parseDMY(a.dia).getDate() - parseDMY(b.dia).getDate();
        });
    }, [currentFilterDate]);


    // Filtra os aniversariantes para exibir apenas o mês selecionado
    const aniversariantesFiltrados = useMemo(() => {
        const filterMonth = currentFilterDate.getMonth();
        
        // 1. Filtra
        const filtered = aniversariantesDoMesMOCK.filter(aniversariante => {
            const birthdayDate = parseDMY(aniversariante.dia);
            // Compara apenas o mês (o ano não importa para aniversário, mas o parseDMY exige)
            return birthdayDate.getMonth() === filterMonth;
        });

        // 2. Ordena (por dia do mês)
        return filtered.sort((a, b) => {
            return parseDMY(a.dia).getDate() - parseDMY(b.dia).getDate();
        });

    }, [currentFilterDate]);


    return (
        <div className="agenda-container">
            {/* Note: O Sidebar provavelmente precisa receber 'isAdmin' do seu estado global de login */}
            <Sidebar nomeCompleto="Lismara Ribeiro" /> 
            <main className="main-content agenda-page">
                <header className="agenda-header">
                    <h1>Agenda & Relacionamento</h1>
                    <Button /> {/* Botão 'Novo Cliente' ou similar */}
                </header>

                <div className="agenda-layout-grid">
                    <div className="month-selector">
                        {/* NOVO COMPONENTE INTEGRADO */}
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
                                <Listagem
                                    dados={atendimentosFiltrados} // <-- USA DADOS FILTRADOS
                                    colunas={colunasAtendimentoAgenda}
                                    id="atendimento-list"
                                    isFullTable
                                />
                            </div>
                        </div>

                        {/* Bloco 2: Painel Lateral (Aniversariantes do Mês) */}
                        <aside className="aniversariantes-panel">
                            <div className="agenda-card-container-birthdays" id="agenda-birthdays-card">
                                <div className="agenda-card-header">
                                    <h2>Aniversariantes do Mês</h2>
                                </div>

                                <div className="agenda-listagem-container">
                                    <Listagem
                                        dados={aniversariantesFiltrados} // <-- USA DADOS FILTRADOS
                                        colunas={colunasAniversarioAgenda}
                                        id="agenda-birthdays-list"
                                    />
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