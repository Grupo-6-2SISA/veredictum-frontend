import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card'; 
import Listagem from '../../components/Listagem/Listagem';
import Button from '../../components/Button/Button';
import './Agenda.css'; // Novo CSS para esta tela
import '../../index.css';

// ===================================================================
// DADOS MOCK (Adaptados da imagem da Agenda)
// ===================================================================

const atendimentosDoMes = [
    { nome: 'Davidson Mendes', dia: '09/06/2025', horario: '15:00', status: 'Agendado' },
    { nome: 'Gabriel Cordeiro', dia: '12/06/2025', horario: '12:00', status: 'Agendado' },
    { nome: 'Luiz Gustavo', dia: '12/06/2025', horario: '15:00', status: 'Agendado' },
    { nome: 'Márcio Ribeiro', dia: '13/06/2025', horario: '09:45', status: 'Agendado' },
    { nome: 'Isabel C. Oliveira', dia: '14/06/2025', horario: '11:00', status: 'Agendado' },
];

const colunasAtendimentoAgenda = [
    // Colunas personalizadas para a Agenda (incluindo checkbox, status e botões)
    { key: 'checkbox', titulo: '' }, // Checkbox
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
    { key: 'horario', titulo: 'Horário' },
    { key: 'status', titulo: 'Status' },
    { key: 'editar', titulo: 'Editar' }, // Ícone/Botão
    { key: 'excluir', titulo: 'Excluir' }, // Ícone/Botão
];

const aniversariantesDoMes = [
    { nome: 'Davidson Mendes', dia: '09/06/2025' },
    { nome: 'João Matos', dia: '10/06/2025' },
    { nome: 'Lilian Medeiros', dia: '16/06/2025' },
    { nome: 'William Ferreira', dia: '23/06/2025' },
    { nome: 'Cesar Sampaio', dia: '24/06/2025' },
];

const colunasAniversarioAgenda = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
];


const Agenda = () => {
    return (
        <div className="agenda-container"> 
            <Sidebar nomeCompleto="Lismara Ribeiro" /> 
            <main className="main-content agenda-page">
                <header className="agenda-header">
                    <h1>Agenda & Relacionamento</h1>
                    <Button  />
                </header>
                
                <div className="agenda-layout-grid">
                    {/* Bloco 1: Atendimentos do Mês (Listagem principal) */}
                    <section className="atendimento-container">
                        <div className="month-selector">
                            <button className="month-button">Junho ▾</button>
                        </div>
                        
                        <Listagem 
                            titulo="Atendimento do mês"
                            dados={atendimentosDoMes}
                            colunas={colunasAtendimentoAgenda}
                            id="atendimento-list"
                            // A prop 'isFullTable' indicaria que esta listagem não é um card pequeno
                            isFullTable 
                        />
                    </section>

                    {/* Bloco 2: Painel Lateral (Aniversariantes do Mês) */}
                    <aside className="aniversariantes-panel">
                         {/* Usamos o Card para dar a aparência de um bloco destacado */}
                        <Card titulo="Aniversariantes do Mês" id="agenda-birthdays-card">
                             <Listagem 
                                dados={aniversariantesDoMes} 
                                colunas={colunasAniversarioAgenda} 
                                id="agenda-birthdays-list" 
                            />
                        </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default Agenda;