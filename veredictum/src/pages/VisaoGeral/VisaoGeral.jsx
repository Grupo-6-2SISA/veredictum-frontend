import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Listagem from '../../components/Listagem/Listagem';
import './VisaoGeral.css';
import '../../index.css';


// Dados de exemplo
const proximosAtendimentos = [
    { nome: 'Davidson Mendes', dia: '09/06/2025', horario: '14:00' },
    { nome: 'Gabriel Cordeiro', dia: '09/06/2025', horario: '17:30' },
    { nome: 'Davidson Mendes', dia: '09/06/2025', horario: '14:00' },
    { nome: 'Gabriel Cordeiro', dia: '09/06/2025', horario: '17:30' },
];
const colunasAtendimento = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
    { key: 'horario', titulo: 'Horário' },
];

const prazosNotasFiscais = [
    { nota: '034567890987654321001', data: '11/06/2025' },
    { nota: '234567890987654321002', data: '13/06/2025' },
    { nota: '034567890987654321001', data: '11/06/2025' },
    { nota: '234567890987654321002', data: '13/06/2025' },
];
// Renomeando as chaves para bater com as classes CSS: list-nf-nota, list-nf-data
const colunasNotas = [
    { key: 'nota', titulo: 'Número da Nota' },
    { key: 'data', titulo: 'Data Limite' },
];

const aniversariantesDoMes = [
    { nome: 'Manuela Monteiro', dia: '21/06/2025' },
    { nome: 'Luiz Gustavo Dantas', dia: '27/06/2025' },
    { nome: 'Manuela Monteiro', dia: '21/06/2025' },
    { nome: 'Luiz Gustavo Dantas', dia: '27/06/2025' },
    
];
// Renomeando as chaves para bater com as classes CSS: list-birthdays-nome, list-birthdays-dia
const colunasAniversario = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
];

const contasAPagar = [
    { etiqueta: 'Água', data: '09/07/2025' },
    { etiqueta: 'Luz', data: '09/07/2025' },
    { etiqueta: 'Água', data: '09/07/2025' },
    { etiqueta: 'Luz', data: '09/07/2025' },
];
// Renomeando as chaves para bater com as classes CSS: list-contas-etiqueta, list-contas-data
const colunasContas = [
    { key: 'etiqueta', titulo: 'Etiqueta' },
    { key: 'data', titulo: 'Data Limite' },
    
];


const VisaoGeral = () => {
    return (
        <div className="container">
            <Sidebar nomeCompleto="Lismara Ribeiro" />
            <main className="main-content">
                <h1>Visão Geral</h1>
                <div className="cards-grid">
                    {/* Caminho ajustado para o ícone do Card: calendar.svg */}
                    <Card titulo="Próximos atendimentos" iconePath="/src/assets/svg/calendar.svg" className="card-appointments">
                        <Listagem
                            dados={proximosAtendimentos}
                            colunas={colunasAtendimento}
                            className="appointments-list"
                        />
                    </Card>

                    {/* Caminho ajustado para o ícone do Card: notas.svg */}
                    <Card titulo="Prazos de Notas Fiscais" iconePath="/src/assets/svg/notas.svg" className="card-invoices">
                        <Listagem
                            dados={prazosNotasFiscais}
                            colunas={colunasNotas}
                            className="invoices-list"
                        />
                    </Card>
                </div>
                <div className="cards-grid">
                    {/* Caminho ajustado para o ícone do Card: aniversario.svg */}
                    <Card titulo="Aniversariantes do mês" iconePath="/src/assets/svg/aniversario.svg" className="card-birthdays">
                        <Listagem
                            dados={aniversariantesDoMes}
                            colunas={colunasAniversario}
                            className="birthdays-list"
                        />
                    </Card>

                    {/* Caminho ajustado para o ícone do Card: contas.svg */}
                    <Card titulo="Contas a pagar" iconePath="/src/assets/svg/contas.svg" className="card-bills" >
                        <Listagem
                            dados={contasAPagar}
                            colunas={colunasContas}
                            className="bills-list"
                        />
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default VisaoGeral;