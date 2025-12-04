import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardFilter from '../../components/DashboardFilter/DashboardFilter';
import KpiCard from '../../components/KpiCard/KpiCard';
import ChartContainer from '../../components/ChartContainer/ChartContainer';
import BarChartStatic from '../../components/ChartContainer/BarChartStatic.jsx';
import {
    contasPagasMes,
    contasNaoPagas,
    contasTotalMes,
    graficoAtrasadas,
    graficoPagas,

    graficoAtendimentosConcluidos,
    graficoAtendimentosAtrasados,
    graficoNotasPendentes,
    graficoNotasEmitidas,

    atendimentosConcluidos,
    atendimentosNaoConcluidos,
    atendimentosTotalMes,

    notasEmitidasMes,
    notasPendentesMes,
    notasTotalMes,

    contasPagasMesComPercentual,
    contasNaoPagasMesComPercentual,
    contasTotalMesComPercentual,

    notasEmitidasMesComPercentual,
    notasPendentesMesComPercentual,
    notasTotalMesComPercentual,

    atendimentosConcluidosMesComPercentual,
    atendimentosNaoConcluidosMesComPercentual,
    atendimentosTotalMesComPercentual,

    carregarKpisContasPeriodo,
    carregarKpisAtendimentosPeriodo,
    carregarKpisNotasPeriodo

} from './Dashboard.js';

import './Dashboard.css';

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

    const semanticPositive = {
        contas: {
            kpi2: true,
            kpi3: false,
            kpi4: false
        },
        atendimentos: {
            kpi2: true,
            kpi3: false,
            kpi4: false
        },
        notas: {
            kpi2: true,
            kpi3: false,
            kpi4: false
        }
    };

    // ====================================================
    // KPIs DE CONTAS
    // ====================================================
    const carregarKpisContas = async () => {
        try {
            const hoje = new Date();
            const mesAtual = hoje.getMonth() + 1;
            const anoAtual = hoje.getFullYear();

            const [pagasRes, naoPagasRes, totalRes] = await Promise.all([
                contasPagasMesComPercentual(mesAtual, anoAtual),
                contasNaoPagasMesComPercentual(mesAtual, anoAtual),
                contasTotalMesComPercentual(mesAtual, anoAtual)
            ]);

            setKpis([
                {
                    id: 'kpi2',
                    label: 'Contas Pagas',
                    tooltipTitle: 'Contas Pagas',
                    value: pagasRes.valor,
                    change: pagasRes.percentual !== null ? `${pagasRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.contas.kpi2
                },
                {
                    id: 'kpi3',
                    label: 'Contas Vencidas',
                    tooltipTitle: 'Contas Vencidas',
                    value: naoPagasRes.valor,
                    change: naoPagasRes.percentual !== null ? `${naoPagasRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.contas.kpi3
                },
                {
                    id: 'kpi4',
                    label: 'Total de Contas',
                    tooltipTitle: 'Total de Contas',
                    value: totalRes.valor,
                    change: totalRes.percentual !== null ? `${totalRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.contas.kpi4
                }
            ]);

        } catch (e) {
            console.error("Erro ao carregar KPIs:", e);
        }
    };

    // ====================================================
    // KPIs ATENDIMENTOS
    // ====================================================
    const carregarKpisAtendimentos = async () => {
        try {
            const hoje = new Date();
            const mesAtual = hoje.getMonth() + 1;
            const anoAtual = hoje.getFullYear();

            const [concluidosRes, naoConcluidosRes, totalRes] = await Promise.all([
                atendimentosConcluidosMesComPercentual(mesAtual, anoAtual),
                atendimentosNaoConcluidosMesComPercentual(mesAtual, anoAtual),
                atendimentosTotalMesComPercentual(mesAtual, anoAtual)
            ]);

            setKpis([
                {
                    id: 'kpi2',
                    label: 'Atendimentos Concluídos',
                    value: concluidosRes.valor,
                    change: concluidosRes.percentual !== null ? `${concluidosRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.atendimentos.kpi2
                },
                {
                    id: 'kpi3',
                    label: 'Atendimentos Pendentes',
                    value: naoConcluidosRes.valor,
                    change: naoConcluidosRes.percentual !== null ? `${naoConcluidosRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.atendimentos.kpi3
                },
                {
                    id: 'kpi4',
                    label: 'Total de Atendimentos',
                    value: totalRes.valor,
                    change: totalRes.percentual !== null ? `${totalRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.atendimentos.kpi4
                }
            ]);

        } catch (e) {
            console.error("Erro ao carregar KPIs de atendimentos:", e);
        }
    };

    // ====================================================
    // KPIs NOTAS
    // ====================================================
    const carregarKpisNotas = async () => {
        try {
            const hoje = new Date();
            const mesAtual = hoje.getMonth() + 1;
            const anoAtual = hoje.getFullYear();

            const [emitidasRes, pendentesRes, totalRes] = await Promise.all([
                notasEmitidasMesComPercentual(mesAtual, anoAtual),
                notasPendentesMesComPercentual(mesAtual, anoAtual),
                notasTotalMesComPercentual(mesAtual, anoAtual)
            ]);

            setKpis([
                {
                    id: 'kpi2',
                    label: 'Notas Emitidas',
                    value: emitidasRes.valor,
                    change: emitidasRes.percentual !== null ? `${emitidasRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.notas.kpi2
                },
                {
                    id: 'kpi3',
                    label: 'Notas Pendentes',
                    value: pendentesRes.valor,
                    change: pendentesRes.percentual !== null ? `${pendentesRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.notas.kpi3
                },
                {
                    id: 'kpi4',
                    label: 'Total de Notas',
                    value: totalRes.valor,
                    change: totalRes.percentual !== null ? `${totalRes.percentual}%` : '-',
                    positiveOnIncrease: semanticPositive.notas.kpi4
                }
            ]);

        } catch (e) {
            console.error("Erro ao carregar KPIs de notas fiscais:", e);
        }
    };

    // ====================================================
    // INICIALIZAÇÃO
    // ====================================================
    useEffect(() => {
        atualizarKpisPorCatalogo('contas');
        carregarGraficos('contas');
    }, []);

    useEffect(() => {
        atualizarKpisPorCatalogo(catalogFilter);
    }, [catalogFilter]);

    // ====================================================
    // FILTROS
    // ====================================================
    const handleApplyFilter = (payload) => {
        const catalog = typeof payload === 'string' ? payload : payload?.catalog || '';
        setCatalogFilter(catalog);

        let from = '';
        let to = '';

        if (typeof payload !== 'string') {
            from = payload.from || '';
            to = payload.to || '';

            if (from && to && new Date(from) > new Date(to)) {
                alert('O período "DE" não pode ser posterior ao período "PARA".');
                return;
            }

            setPeriodFrom(from);
            setPeriodTo(to);
        } else {
            setPeriodFrom('');
            setPeriodTo('');
        }

        // PERÍODO ATIVO
        if (from && to) {
            if (catalog === 'contas') carregarKpisContasPeriodo(from, to, setKpis);
            if (catalog === 'atendimentos') carregarKpisAtendimentosPeriodo(from, to, setKpis);
            if (catalog === 'notas') carregarKpisNotasPeriodo(from, to, setKpis);
        } else {
            atualizarKpisPorCatalogo(catalog);
        }

        carregarGraficos(catalog || 'contas');
    };

    const atualizarKpisPorCatalogo = (catalog) => {
        if (catalog === 'contas' || catalog === '' || catalog === 'catalogo') {
            carregarKpisContas();
            return;
        }

        if (catalog === 'atendimentos') {
            carregarKpisAtendimentos();
            return;
        }

        if (catalog === 'notas') {
            carregarKpisNotas();
            return;
        }
    };

    const chartTooltipByCatalog = {
        atendimentos: [
            "Apresenta a variação mensal dos atendimentos concluídos ao longo do ano, permitindo acompanhar a eficiência operacional e a evolução da demanda resolvida.",
            "Exibe a evolução mensal dos atendimentos pendentes, facilitando a identificação de acúmulos, gargalos e períodos de maior retenção."
        ],

        contas: [
            "Mostra a distribuição mensal das contas pagas no ano, refletindo o desempenho da cobrança e a regularidade dos pagamentos.",
            "Apresenta a tendência mensal do percentual de contas vencidas, auxiliando na avaliação de inadimplência e riscos financeiros."
        ],

        notas: [
            "Exibe a evolução mensal das notas fiscais emitidas ao longo do ano, demonstrando o volume efetivo de documentos validados e processados.",
            "Mostra a variação mensal das notas pendentes, ajudando a identificar atrasos no fluxo fiscal e oportunidades de otimização no processo de emissão."
        ]
    };


    const chartTitleByCatalog = {
        atendimentos: ['Atendimentos - Concluídos', 'Atendimentos - Pendentes'],
        contas: ['Contas Pagas', 'Percentual de Contas Vencidas'],
        notas: ['Notas - Emitidas', 'Notas - Pendentes']
    };

    const chartTitles = chartTitleByCatalog[catalogFilter] || ['Contas Pagas', 'Percentual de Contas Vencidas'];

    const chartTooltips = chartTooltipByCatalog[catalogFilter] || [
        "Mostra a distribuição mensal das contas pagas no ano, refletindo o desempenho da cobrança e a regularidade dos pagamentos.",
        "Apresenta a tendência mensal do percentual de contas vencidas, auxiliando na avaliação de inadimplência e riscos financeiros."
    ];

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
                        <ActiveFilterCard
                            currentFilter={catalogFilter}
                            currentPeriod={{ from: periodFrom, to: periodTo }}
                        />

                        {kpis.map(kpi => (
                            <KpiCard
                                key={kpi.id}
                                label={kpi.label}
                                value={kpi.value}
                                change={kpi.change}
                                tooltipTitle={kpi.tooltipTitle}
                                tooltipText={null}
                                status={kpi.status}
                                positiveOnIncrease={kpi.positiveOnIncrease}
                                disableNegative={!!(periodFrom && periodTo)}
                            />
                        ))}
                    </div>
                </section>


                <section className="dashboard-charts">

                    <ChartContainer
                        title={chartTitles[0]}
                        tooltipTitle={chartTitles[0]}
                        tooltipText={chartTooltips[0]}
                    >
                        <BarChartStatic data={graficoPagasAno} />
                    </ChartContainer>

                    <ChartContainer
                        title={chartTitles[1]}
                        tooltipTitle={chartTitles[1]}
                        tooltipText={chartTooltips[1]}
                    >
                        <BarChartStatic data={graficoAtrasadasAno} />
                    </ChartContainer>

                </section>

            </main>
        </div>
    );
};

export default Dashboard;
