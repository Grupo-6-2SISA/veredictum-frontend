import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardFilter from '../../components/DashboardFilter/DashboardFilter';
import KpiCard from '../../components/KpiCard/KpiCard';
import ChartContainer from '../../components/ChartContainer/ChartContainer';
import { contasPagas, contasAbertas, totalContas } from './Dashboard.js';
import './Dashboard.css';

// Esqueleto inicial dos KPIs
const kpiDataEsqueleto = [
    { id: 'kpi2', label: 'Contas Pagas', tooltipTitle: 'Contas Pagas', value: '0', change: '-55%', status: null },
    { id: 'kpi3', label: 'Contas Vencidas (5%)', tooltipTitle: 'Contas Vencidas', value: '0', change: '+40%', status: 'Cuidado' },
    { id: 'kpi4', label: 'Total de Contas (90%)', tooltipTitle: 'Total de Contas', value: '0', change: '+52%', status: null },
];

const mockAtendimentos = {
    kpi2: { value: 32, change: '+12%' },
    kpi3: { value: 7, change: '-4%' },
    kpi4: { value: 39, change: '+5%' }
};
const mockNotas = {
    kpi2: { value: 15, change: '+8%' },
    kpi3: { value: 3, change: '-2%' },
    kpi4: { value: 18, change: '+6%' }
};

const ActiveFilterCard = ({ currentFilter, currentPeriod }) => {
    const names = { atendimentos: 'Atendimentos', contas: 'Contas', notas: 'Notas Fiscais', '': 'Nenhum' };
    const formatMonthYear = (monthValue) => {
        if (!monthValue) return '';
        const parts = String(monthValue).split('-');
        return parts.length === 2 ? `${parts[1]}/${parts[0]}` : monthValue;
    };
    const periodText = currentPeriod && (currentPeriod.from || currentPeriod.to)
        ? `${formatMonthYear(currentPeriod.from) || '--'} - ${formatMonthYear(currentPeriod.to) || '--'}`
        : ' -- ';
    return (
        <div className="active-filter-card kpi-card">
            <div className="filter-card-content">
                <span className="icon-calendar"></span>
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
    const [kpis, setKpis] = useState(kpiDataEsqueleto);

    const carregarKpisContas = async () => {
        try {
            const [pagasRes, abertasRes, totalRes] = await Promise.all([contasPagas(), contasAbertas(), totalContas()]);
            const pagasCount = pagasRes?.data?.length || 0;
            const totalCount = totalRes?.data?.length || 0;
            const hoje = new Date();
            const vencidasCount = (abertasRes?.data || []).filter(c => new Date(c.dataVencimento) < hoje).length;

            // Crescimento mensal
            const hojeObj = new Date();
            const mesAtual = hojeObj.getMonth() + 1, anoAtual = hojeObj.getFullYear();
            const mesAnterior = mesAtual === 1 ? 12 : mesAtual - 1;
            const anoAnterior = mesAtual === 1 ? anoAtual - 1 : anoAtual;

            const contasMesAtual = (totalRes?.data || []).filter(c => {
                const d = new Date(c.dataCriacao);
                return d.getMonth() + 1 === mesAtual && d.getFullYear() === anoAtual;
            });
            const contasMesAnterior = (totalRes?.data || []).filter(c => {
                const d = new Date(c.dataCriacao);
                return d.getMonth() + 1 === mesAnterior && d.getFullYear() === anoAnterior;
            });

            let crescimento = "0%";
            if (contasMesAnterior.length === 0 && contasMesAtual.length > 0) crescimento = "+100%";
            else if (contasMesAnterior.length !== 0) crescimento = `${((contasMesAtual.length - contasMesAnterior.length)/contasMesAnterior.length*100).toFixed(0)}%`;

            setKpis(prev => prev.map(kpi => {
                if (kpi.id === 'kpi2') return { ...kpi, value: pagasCount };
                if (kpi.id === 'kpi3') return { ...kpi, value: vencidasCount };
                if (kpi.id === 'kpi4') return { ...kpi, value: totalCount, change: crescimento };
                return kpi;
            }));
        } catch (e) {
            console.error("Erro ao carregar KPIs:", e);
        }
    };

    useEffect(() => { carregarKpisContas(); }, []);

    const handleApplyFilter = (payload) => {
        if (!payload || typeof payload === 'string') {
            setCatalogFilter(payload || '');
            setPeriodFrom(''); setPeriodTo('');
            applyKpiMock(payload || '');
            return;
        }
        const { catalog, from, to } = payload;
        setCatalogFilter(catalog || '');
        setPeriodFrom(from || '');
        setPeriodTo(to || '');
        applyKpiMock(catalog || '');
    };

    const applyKpiMock = (catalog) => {
        if (catalog === 'contas' || catalog === 'catalogo') { carregarKpisContas(); return; }
        if (catalog === 'atendimentos') {
            setKpis([
                { id: 'kpi2', label: 'Atendimentos Concluídos', value: mockAtendimentos.kpi2.value, change: mockAtendimentos.kpi2.change },
                { id: 'kpi3', label: 'Atendimentos Pendentes', value: mockAtendimentos.kpi3.value, change: mockAtendimentos.kpi3.change },
                { id: 'kpi4', label: 'Total de Atendimentos', value: mockAtendimentos.kpi4.value, change: mockAtendimentos.kpi4.change }
            ]);
        }
        if (catalog === 'notas') {
            setKpis([
                { id: 'kpi2', label: 'Notas Emitidas', value: mockNotas.kpi2.value, change: mockNotas.kpi2.change },
                { id: 'kpi3', label: 'Notas Pendentes', value: mockNotas.kpi3.value, change: mockNotas.kpi3.change },
                { id: 'kpi4', label: 'Total de Notas', value: mockNotas.kpi4.value, change: mockNotas.kpi4.change }
            ]);
        }
    };

    const labelsByCatalog = {
        atendimentos: { kpi2: 'Atendimentos Concluídos', kpi3: 'Atendimentos Pendentes', kpi4: 'Total de Atendimentos' },
        contas: { kpi2: 'Contas Pagas', kpi3: 'Contas Vencidas (5%)', kpi4: 'Total de Contas (90%)' },
        notas: { kpi2: 'Notas Emitidas', kpi3: 'Notas Pendentes', kpi4: 'Total de Notas' }
    };

    const chartTitleByCatalog = {
        atendimentos: ['Atendimentos - Concluídos', 'Atendimentos - Pendentes'],
        contas: ['Contas Pagas', 'Taxa de Contas Vencidas'],
        notas: ['Notas - Emitidas', 'Notas - Pendentes']
    };

    const chartTitles = chartTitleByCatalog[catalogFilter] || ['Contas Pagas', 'Taxa de Contas Vencidas'];

    return (
        <div className="container">
            <Sidebar />
            <main className="main-content-dashboard">
                <h1>Dashboard</h1>
                <section className="dashboard-header filter-version">
                    <DashboardFilter onApplyFilter={handleApplyFilter} />
                </section>
                <section className="kpi-section">
                    <div className="kpi-grid">
                        <ActiveFilterCard currentFilter={catalogFilter} currentPeriod={{ from: periodFrom, to: periodTo }} />
                        {kpis.map(kpi => {
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
                <section className="dashboard-charts">
                    <ChartContainer title={chartTitles[0]} tooltipTitle={chartTitles[0]} tooltipText="Mostra a evolução do indicador selecionado.">
                        <div className="chart-placeholder"></div>
                    </ChartContainer>
                    <ChartContainer title={chartTitles[1]} tooltipTitle={chartTitles[1]} tooltipText="Exibe a evolução mensal do segundo indicador.">
                        <div className="chart-placeholder"></div>
                    </ChartContainer>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
