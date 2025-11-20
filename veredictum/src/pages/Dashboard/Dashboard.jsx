// src/pages/Dashboard/Dashboard.jsx 🚀 (Ajustado)

import React, { useState } from 'react';
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
// Componente para o Card de Filtro Ativo (mantido)
const ActiveFilterCard = ({ currentFilter, currentPeriod }) => {
    const names = {
        atendimentos: 'Atendimentos',
        contas: 'Contas',
        notas: 'Notas Fiscais',
        '': 'Nenhum'
    };

    const formatMonthYear = (monthValue) => {
        if (!monthValue) return '';
        // monthValue expected as 'YYYY-MM'
        const parts = String(monthValue).split('-');
        if (parts.length !== 2) return monthValue;
        return `${parts[1]}/${parts[0]}`; // MM/YYYY
    };

    const periodText = currentPeriod && (currentPeriod.from || currentPeriod.to)
        ? `${formatMonthYear(currentPeriod.from) || '--'} - ${formatMonthYear(currentPeriod.to) || '--'}`
        : ' -- ';

    return (
        <div className="active-filter-card kpi-card">
            <div className="filter-card-content">
                <span className="filter-icon">📄</span>
                <div className="filter-card-text">
                    <div className="filter-title">Filtro Atual - {names[currentFilter] || 'Catálogo'}</div>
                    <div className="filter-date">{periodText}</div>
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [catalogFilter, setCatalogFilter] = useState('');
    const [periodFrom, setPeriodFrom] = useState('');
    const [periodTo, setPeriodTo] = useState('');

    const handleApplyFilter = (payload) => {
        // payload: { catalog, from, to }
        if (!payload || typeof payload === 'string') {
            const catalog = payload || '';
            setCatalogFilter(catalog);
            setPeriodFrom('');
            setPeriodTo('');
            return;
        }
        const { catalog, from, to } = payload;
        setCatalogFilter(catalog || '');
        setPeriodFrom(from || '');
        setPeriodTo(to || '');
    };

    const labelsByCatalog = {
        atendimentos: {
            kpi2: 'Atendimentos Concluídos',
            kpi3: 'Atendimentos Pendentes',
            kpi4: 'Total de Atendimentos'
        },
        contas: {
            kpi2: 'Contas Pagas',
            kpi3: 'Contas Vencidas (5%)',
            kpi4: 'Total de Contas (90%)'
        },
        notas: {
            kpi2: 'Notas Emitidas',
            kpi3: 'Notas Pendentes',
            kpi4: 'Total de Notas'
        }
    };

    const chartTitleByCatalog = {
        atendimentos: ['Atendimentos - Concluídos', 'Atendimentos - Pendentes'],
        contas: ['Contas Pagas', 'Taxa de Contas Vencidas'],
        notas: ['Notas - Emitidas', 'Notas - Pendentes']
    };

    const chartTitles = chartTitleByCatalog[catalogFilter] || ['Contas Pagas', 'Taxa de Contas Vencidas'];

    return (
        <div className="container">
            {/* O componente Sidebar deve estar em src/components/Sidebar/Sidebar.jsx */}
            <Sidebar />

            <main className="main-content-dashboard">

                <h1>Dashboard</h1>

                {/* Seção de Filtro Superior */}
                <section className="dashboard-header filter-version">
                    <DashboardFilter onApplyFilter={handleApplyFilter} />
                </section>

                {/* Seção dos KPIs e do Card de Filtro Ativo */}
                <section className="kpi-section">
                    <div className="kpi-grid">
                        {/* 1. Card de Filtro Ativo na Posição 1 */}
                        <ActiveFilterCard currentFilter={catalogFilter} currentPeriod={{ from: periodFrom, to: periodTo }} />

                        {/* 2, 3, 4. KPIs restantes */}
                        {kpiDataEsqueleto.map(kpi => {
                            const catalogMap = labelsByCatalog[catalogFilter] || {};
                            const displayLabel = catalogFilter ? (catalogMap[kpi.id] || kpi.label) : kpi.label;
                            return (
                                <KpiCard
                                    key={kpi.id}
                                    label={displayLabel}
                                    value={kpi.value}
                                    change={kpi.change}
                                    tooltipTitle={kpi.tooltipTitle}
                                    tooltipText="Descrição detalhada do KPI."
                                    status={kpi.status}
                                />
                            );
                        })}
                    </div>
                </section>

                {/* Seção dos Gráficos (mantida) */}
                <section className="dashboard-charts">
                    <ChartContainer
                        title={chartTitles[0]}
                        tooltipTitle={chartTitles[0]}
                        tooltipText="Mostra a evolução do indicador selecionado."
                    >
                        <div className="chart-placeholder"></div>
                    </ChartContainer>

                    <ChartContainer
                        title={chartTitles[1]}
                        tooltipTitle={chartTitles[1]}
                        tooltipText="Exibe a evolução mensal do segundo indicador."
                    >
                        <div className="chart-placeholder"></div>
                    </ChartContainer>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;