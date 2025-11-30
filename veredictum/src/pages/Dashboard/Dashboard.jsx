import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardFilter from '../../components/DashboardFilter/DashboardFilter';
import KpiCard from '../../components/KpiCard/KpiCard';
import ChartContainer from '../../components/ChartContainer/ChartContainer';
import BarChartStatic from '../../components/ChartContainer/BarChartStatic.jsx';

import {
    contasPagas, contasAbertas, totalContas, graficoAtrasadas, graficoPagas, graficoAtendimentosConcluidos,
    graficoAtendimentosAtrasados,
    graficoNotasPendentes,
    graficoNotasEmitidas
} from './Dashboard.js';
import './Dashboard.css';

// Esqueleto inicial dos KPIs
const kpiDataEsqueleto = [
    { id: 'kpi2', label: 'Contas Pagas', tooltipTitle: 'Contas Pagas', value: '0', change: '+55%', status: null },
    { id: 'kpi3', label: 'Contas Vencidas (5%)', tooltipTitle: 'Contas Vencidas', value: '0', change: '-40%', status: 'Cuidado' },
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
    const formatMonthYear = (monthValue) =>
        monthValue ? `${monthValue.split('-')[1]}/${monthValue.split('-')[0]}` : '';

    const periodText =
        currentPeriod && (currentPeriod.from || currentPeriod.to)
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

    // ====================================================
    // ESTADOS DOS GRÁFICOS
    // ====================================================
    const [graficoPagasAno, setGraficoPagasAno] = useState([]);
    const [graficoAtrasadasAno, setGraficoAtrasadasAno] = useState([]);

    const [catalogFilter, setCatalogFilter] = useState('');
    const [periodFrom, setPeriodFrom] = useState('');
    const [periodTo, setPeriodTo] = useState('');
    const [kpis, setKpis] = useState(kpiDataEsqueleto);

    // ====================================================
    // FUNÇÃO PARA CARREGAR GRÁFICOS DINÂMICOS
    // ====================================================
    const carregarGraficos = async (catalog = 'contas') => {
        try {
            const anoAtual = 2025;
            const anoAnterior = 2024;

            let pagasRes, atrasadasRes;

            // ==============================
            // 🔥 SELEÇÃO DO CATÁLOGO
            // ==============================
            if (catalog === 'contas') {
                [pagasRes, atrasadasRes] = await Promise.all([
                    graficoPagas(anoAnterior, anoAtual),
                    graficoAtrasadas(anoAnterior, anoAtual)
                ]);
            }

            if (catalog === 'atendimentos') {
                [pagasRes, atrasadasRes] = await Promise.all([
                    graficoAtendimentosConcluidos(),
                    graficoAtendimentosAtrasados()
                ]);
            }

            if (catalog === 'notas') {
                [pagasRes, atrasadasRes] = await Promise.all([
                    graficoNotasEmitidas(),
                    graficoNotasPendentes()
                ]);
            }

            // ==============================
            // 🔧 Transformar dados em série mensal
            // ==============================
            const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

            function transformar(data) {
                const anoAntValores = Array(12).fill(0);
                const anoAtualValores = Array(12).fill(0);

                data?.forEach(item => {
                    const idx = item.mes - 1;

                    if (item.ano === anoAnterior) anoAntValores[idx] = item.valor;
                    if (item.ano === anoAtual) anoAtualValores[idx] = item.valor;
                });

                return meses.map((mes, idx) => ({
                    name: mes,
                    "Ano Anterior": anoAntValores[idx],
                    "Ano Atual": anoAtualValores[idx]
                }));
            }

            setGraficoPagasAno(transformar(pagasRes.data));
            setGraficoAtrasadasAno(transformar(atrasadasRes.data));

        } catch (err) {
            console.error("Erro ao carregar gráficos:", err);
            setGraficoPagasAno([]);
            setGraficoAtrasadasAno([]);
        }
    };

    // ====================================================
    // CARREGAR KPIs
    // ====================================================
    const carregarKpisContas = async () => {
        try {
            const [pagasRes, abertasRes, totalRes] = await Promise.all([
                contasPagas(), contasAbertas(), totalContas()
            ]);

            const pagasCount = pagasRes?.data?.length || 0;
            const totalCount = totalRes?.data?.length || 0;

            const vencidasCount = (abertasRes?.data || [])
                .filter(c => new Date(c.dataVencimento) < new Date())
                .length;

            const hoje = new Date();
            const mesAtual = hoje.getMonth() + 1;
            const anoAtual = hoje.getFullYear();
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
            else if (contasMesAnterior.length !== 0)
                crescimento = `${((contasMesAtual.length - contasMesAnterior.length) / contasMesAnterior.length * 100).toFixed(0)}%`;

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

    // ====================================================
    // EXECUTAR AO MONTAR
    // ====================================================
    useEffect(() => {
        carregarKpisContas();
        carregarGraficos('contas');
    }, []);


    // ====================================================
    // FILTRO
    // ====================================================
    const handleApplyFilter = (payload) => {
        const catalog = typeof payload === 'string' ? payload : payload?.catalog || '';

        setCatalogFilter(catalog);

        if (typeof payload !== 'string') {
            setPeriodFrom(payload.from || '');
            setPeriodTo(payload.to || '');
        } else {
            setPeriodFrom('');
            setPeriodTo('');
        }

        applyKpiMock(catalog);

        carregarGraficos(catalog || 'contas');
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

                        {kpis.map(kpi => (
                            <KpiCard
                                key={kpi.id}
                                label={kpi.label}
                                value={kpi.value}
                                change={kpi.change}
                                tooltipTitle={kpi.tooltipTitle}
                                tooltipText="Descrição detalhada do KPI."
                                status={kpi.status}
                            />
                        ))}
                    </div>
                </section>

                <section className="dashboard-charts">

                    {/* GRÁFICO 1 */}
                    <ChartContainer
                        title={chartTitles[0]}
                        tooltipTitle={chartTitles[0]}
                        tooltipText="Mostra a evolução do indicador selecionado."
                    >
                        <BarChartStatic data={graficoPagasAno} />
                    </ChartContainer>

                    {/* GRÁFICO 2 */}
                    <ChartContainer
                        title={chartTitles[1]}
                        tooltipTitle={chartTitles[1]}
                        tooltipText="Exibe a evolução mensal do segundo indicador."
                    >
                        <BarChartStatic data={graficoAtrasadasAno} />
                    </ChartContainer>

                </section>
            </main>
        </div>
    );
};

export default Dashboard;
