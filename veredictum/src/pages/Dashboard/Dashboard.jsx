// src/pages/Dashboard/Dashboard.jsx 🚀 (Ajustado)

import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardFilter from '../../components/DashboardFilter/DashboardFilter';
import KpiCard from '../../components/KpiCard/KpiCard';
import ChartContainer from '../../components/ChartContainer/ChartContainer';
// import DashboardFilter from './DashboardFilter';
// import KpiCard from './KpiCard';
// import ChartContainer from './ChartContainer';
import './Dashboard.css';

// Estrutura de dados AJUSTADA para 3 KPIs
// Adicionamos a propriedade 'status' para simular o aviso "Cuidado"
const kpiDataEsqueleto = [
    // Usando Contas Pagas como neutro/positivo, sem status de aviso
    { id: 'kpi2', label: 'Contas Pagas', tooltipTitle: 'Contas Pagas', value: '7', change: '-55%', status: null }, 
    
    // Contas Vencidas (Atrasadas) costuma ser um status de "Cuidado"
    { id: 'kpi3', label: 'Contas Vencidas (5%)', tooltipTitle: 'Contas Vencidas', value: '3', change: '+40%', status: 'Cuidado' },
    
    // Total de Contas como neutro/positivo, sem status de aviso
    { id: 'kpi4', label: 'Total de Contas (90%)', tooltipTitle: 'Total de Contas', value: '55', change: '+52%', status: null },
];


// Componente para o Card de Filtro Ativo (mantido)
const ActiveFilterCard = () => (
    <div className="active-filter-card kpi-card">
        <div className="filter-card-content">
            {/* Ícone de lista ou calendário (pode ser um SVG ou ícone de fonte) */}
            <span className="filter-icon">📄</span>
            <div className="filter-card-text">
                <div className="filter-title">Filtro Atual - Contas</div>
                <div className="filter-date">22/10 - 25/10</div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="container">
            {/* O componente Sidebar deve estar em src/components/Sidebar/Sidebar.jsx */}
            <Sidebar />

            <main className="main-content-dashboard">

                <h1>Dashboard</h1>

                {/* Seção de Filtro Superior */}
                <section className="dashboard-header filter-version">
                    <DashboardFilter />
                </section>

                {/* Seção dos KPIs e do Card de Filtro Ativo */}
                <section className="kpi-section">
                    <div className="kpi-grid">
                        {/* 1. Card de Filtro Ativo na Posição 1 */}
                        <ActiveFilterCard />

                        {/* 2, 3, 4. KPIs restantes */}
                        {kpiDataEsqueleto.map(kpi => (
                            <KpiCard
                                key={kpi.id}
                                label={kpi.label}
                                value={kpi.value}
                                change={kpi.change}
                                tooltipTitle={kpi.tooltipTitle}
                                tooltipText="Descrição detalhada do KPI."
                                // PASSA A NOVA PROPRIEDADE 'status' PARA O KPICARD
                                status={kpi.status} 
                            />
                        ))}
                    </div>
                </section>

                {/* Seção dos Gráficos (mantida) */}
                <section className="dashboard-charts">
                    <ChartContainer
                        title="Contas Pagas"
                        tooltipTitle="Contas Pagas"
                        tooltipText="Mostra a evolução das contas pagas ao longo do tempo."
                    >
                        <div className="chart-placeholder"></div>
                    </ChartContainer>

                    <ChartContainer
                        title="Taxa de Contas Vencidas"
                        tooltipTitle="Taxa de Contas Vencidas"
                        tooltipText="Exibe a evolução mensal das contas vencidas."
                    >
                        <div className="chart-placeholder"></div>
                    </ChartContainer>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;