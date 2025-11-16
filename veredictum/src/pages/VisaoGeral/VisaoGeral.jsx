// src/pages/VisaoGeral/VisaoGeral.jsx 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/Card/Card';
import Listagem from '../../components/Listagem/Listagem';
import './VisaoGeral.css';
import '../../index.css';

// Importa as funções de API VisaoGeral.js 
import {
    listarProximosAtendimentos,
    listarPrazosNotasFiscais,
    listarAniversariantesDoMes,
    listarContasAPagar
} from './VisaoGeral.js';

// --- DEFINIÇÕES DE COLUNAS ---

const colunasAtendimento = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dia', titulo: 'Dia' },
    { key: 'horario', titulo: 'Horário' },
];

const colunasNotas = [
    { key: 'numero', titulo: 'Número da Nota' },
    { key: 'dataVencimento', titulo: 'Data Limite' },

];

const colunasAniversario = [
    { key: 'nome', titulo: 'Nome' },
    { key: 'dataNascimento', titulo: 'Dia' },
];

const colunasContas = [
    { key: 'etiqueta', titulo: 'Etiqueta' },
    { key: 'dataVencimento', titulo: 'Data Limite' },
];


const VisaoGeral = () => {

    const navigate = useNavigate();

    // --- VARIÁVEIS DE ESTADO ---
    // Estas são as únicas variáveis de dados que devem ser usadas para renderizar.
    const [proximosAtendimentos, setProximosAtendimentos] = useState([]);
    const [prazosNotasFiscais, setPrazosNotasFiscais] = useState([]);
    const [aniversariantesDoMes, setAniversariantesDoMes] = useState([]);
    const [contasAPagar, setContasAPagar] = useState([]);

    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    // --- FUNÇÕES DE REDIRECIONAMENTO (Para o onClick dos Cards) ---
    // Você deve mapear as rotas corretas do seu React Router DOM aqui

    // Cards: Próximos Atendimentos e Aniversariantes
    const goToAgendaRelacionamento = () => {
        const rota = '/Agenda'; // Usando a rota que você indicou
        console.log(`[Redirecionamento] Clicado em Atendimentos/Aniversariantes. Navegando para: ${rota}`); // <--- CONSOLE LOG ADICIONADO
        navigate(rota);
    };

    // Card: Prazos de Notas Fiscais
    const goToControleNotasFiscais = () => {
        const rota = '/NotasFiscais'; // Usando a rota que você indicou
        console.log(`[Redirecionamento] Clicado em Prazos de Notas Fiscais. Navegando para: ${rota}`); // <--- CONSOLE LOG ADICIONADO
        navigate(rota);
    };

    // Card: Contas a Pagar
    const goToGerenciamentoDespesas = () => {
        const rota = '/GestaoDespesas'; // corrigido para rota consistente no app
        console.log(`[Redirecionamento] Clicado em Contas a Pagar. Navegando para: ${rota}`);
        navigate(rota);
    };

    // --- FUNÇÃO CENTRAL DE FETCH DE DADOS (TESTE DE ATENDIMENTO) ---
    useEffect(() => {

        console.log('[VisaoGeral] useEffect mounted - iniciando fetch de dados');

        // Função para formatar ISO -> { date: 'dd/mm/yyyy', time: 'HH:MM' }
        const formatISO = (isoString) => {
            if (!isoString) return { date: '', time: '' };
            try {
                const d = new Date(isoString);
                if (Number.isNaN(d.getTime())) return { date: isoString, time: '' };
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                return {
                    date: `${day}/${month}/${year}`,
                    time: `${hours}:${minutes}`
                };
            } catch (e) {
                return { date: isoString, time: '' };
            }
        };

        const fetchDashboardData = async () => {
            setLoading(true);
            setErro(null);

            try {
                // Chamada de API real para Atendimentos, e mockadas para as outras (graças ao VisaoGeral.js)
                const [
                    resAtendimentos,
                    resNotasFiscais,
                    resAniversariantes,
                    resContas
                ] = await Promise.allSettled([
                    listarProximosAtendimentos(),
                    listarPrazosNotasFiscais(),
                    listarAniversariantesDoMes(),
                    listarContasAPagar()
                ]);

                console.log('[VisaoGeral] resultados das chamadas (allSettled):', {
                    resAtendimentos,
                    resNotasFiscais,
                    resAniversariantes,
                    resContas
                });


                // Helper para extrair 'data' da resposta se o status for 'fulfilled' (sucesso)
                 const formatData = (result) => {
                    if (result.status !== 'fulfilled') return [];
                    const v = result.value;
                    return (v && (v.data ?? v)) || [];
                 };

                // 1. Processar e Formatar os Atendimentos
                const atendimentosBrutos = formatData(resAtendimentos);
                const now = new Date();

                const atendimentosFormatados = atendimentosBrutos
                  .map(item => {
                    const d = item.dataInicio ? new Date(item.dataInicio) : null;
                    return { ...item, __startDate: d && !Number.isNaN(d.getTime()) ? d : null };
                  })
                  // mantém somente atendimentos futuros (>= agora)
                  .filter(item => item.__startDate && item.__startDate.getTime() >= now.getTime())
                  // ordena do mais próximo para o mais distante
                  .sort((a, b) => a.__startDate.getTime() - b.__startDate.getTime())
                  // formata para exibição (dd/mm/aaaa e HH:MM)
                  .map(item => {
                    const { date, time } = formatISO(item.__startDate.toISOString());
                    return {
                      nome: item.nome || 'Cliente Desconhecido',
                      dia: date,
                      horario: time
                    };
                  });

                // 2. Processar e Formatar Notas Fiscais (mostra do mais atrasado -> mais recente)
                const notasBrutas = formatData(resNotasFiscais);

                // prepara 'hoje' no inicio do dia para comparação (sem hora)
                const today = new Date();
                today.setHours(0,0,0,0);

                const notasFormatadas = notasBrutas
                  // cria objeto Date válido em __vencimentoDate (aceita vários nomes de campo)
                  .map(item => {
                    const raw = item.dataVencimento || item.data_vencimento || item.vencimento || item.data || null;
                    const d = raw ? new Date(raw) : null;
                    return {
                      ...item,
                      __vencimentoDate: d && !Number.isNaN(d.getTime()) ? d : null
                    };
                  })
                  // mantém somente itens com data válida
                  .filter(item => item.__vencimentoDate)
                  // ordena do mais antigo (mais atrasado) para o mais recente
                  .sort((a, b) => a.__vencimentoDate.getTime() - b.__vencimentoDate.getTime())
                  // opcional: limitar aos N mais relevantes (ajuste ou remova .slice)
                  .slice(0, 10)
                  // formata a data para dd/mm/aaaa para exibição e adiciona flag 'vencida'
                  .map(item => {
                    const d = item.__vencimentoDate;
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = d.getFullYear();
                    return {
                      ...item,
                      numero: item.numero,
                      clienteNome: item.clienteNome || 'Cliente Não Informado',
                      dataVencimento: `${day}/${month}/${year}`,
                      vencida: d < today
                    };
                  });

                // 3. Processar e Filtrar/Formatar Contas a Pagar
                const contasBrutas = formatData(resContas);

                const contasFormatadas = contasBrutas
                  // cria objeto Date válido em __vencimentoDate
                  .map(item => {
                    const raw = item.dataVencimento || item.data_vencimento || item.vencimento || item.data || null;
                    const d = raw ? new Date(raw) : null;
                    return {
                      ...item,
                      __vencimentoDate: d && !Number.isNaN(d.getTime()) ? d : null
                    };
                  })
                  // remove itens sem data válida ou com vencimento anterior a hoje
                  .filter(item => item.__vencimentoDate && item.__vencimentoDate >= today)
                  // ordena pelo vencimento mais próximo primeiro (ascendente)
                  .sort((a, b) => a.__vencimentoDate.getTime() - b.__vencimentoDate.getTime())
                  // opcional: mostrar somente os N mais próximos (descomente/ajuste se quiser limitar)
                  .slice(0, 10)
                  // formata a data para dd/mm/aaaa para exibição
                  .map(item => {
                    // usa formatISO para garantir dd/mm/aaaa (aceita Date ou ISO string)
                    const iso = item.__vencimentoDate ? item.__vencimentoDate.toISOString() : item.dataVencimento;
                    const { date } = formatISO(iso);
                    return {
                      ...item,
                      dataVencimento: date
                    };
                  });

                // 4. Processar e Formatar Aniversariantes do Mês
                const aniversariantesBrutos = formatData(resAniversariantes);
                const aniversariantesFormatados = aniversariantesBrutos.map(item => {
                    // obtém a data raw de diferentes possíveis campos e formata apenas dia/mês (dd/mm)
                    const raw = item.dataNascimento || item.data_nascimento || item.nascimento || item.data || '';
                    const { date } = formatISO(raw); // date vem como dd/mm/aaaa
                    const diaMes = date ? date.split('/').slice(0, 2).join('/') : '';
                    return {
                        ...item,
                        nome: item.nome || item.nomeCompleto || 'Nome Desconhecido',
                        dataNascimento: diaMes, // agora dd/mm
                    };
                });

                // 5. Atualiza os estados COM AS LISTAS PROCESSADAS
                setProximosAtendimentos(atendimentosFormatados);
                setPrazosNotasFiscais(notasFormatadas);
                setContasAPagar(contasFormatadas);
                setAniversariantesDoMes(aniversariantesFormatados);

                // 6. Verifica se o Atendimento falhou (o restante da sua lógica)
                const hasFailed = resAtendimentos.status === 'rejected';

                if (hasFailed) {
                    // Se falhar, vamos logar o erro no console e mostrar a mensagem
                    console.error("❌ Falha na chamada de listarProximosAtendimentos:", resAtendimentos.reason);
                    setErro("Falha ao carregar Próximos Atendimentos. Verifique se o Backend está ativo ou se a rota está correta.");
                }

            } catch (error) {
                console.error("❌ Erro fatal ao carregar o Dashboard:", error);
                // Log adicional para ajudar a depuração
                if (error && error.stack) console.error('[VisaoGeral] stack:', error.stack);
                setErro("Erro de conexão geral. Verifique se o Backend está no ar.");
            } finally {
                console.log('[VisaoGeral] fetchDashboardData -> finalizando (setLoading false)');
                setLoading(false);
            }
        };

        fetchDashboardData();
        return () => {
            console.log('[VisaoGeral] useEffect cleanup - componente desmontado');
        };
    }, []);

    // --- RENDERIZAÇÃO CONDICIONAL ---
    const content = loading ? (
        <div className="loading-message">
            <p>Carregando dados da Visão Geral...</p>
        </div>
    ) : (
        <>
            {/* Exibe o erro no topo, se houver */}
            {erro && <p className="error-message" style={{ color: 'red', padding: '10px', border: '1px solid red' }}>{erro}</p>}

            <div className="cards-grid">
                {/* 3. ADICIONAR onClick: Atendimentos -> Agenda e Relacionamento */}
                <Card
                    titulo={`Próximos atendimentos`}
                    iconePath="/src/assets/svg/calendar.svg"
                    id="card-appointments"
                    onClick={goToAgendaRelacionamento} 
                >
                    <Listagem
                        dados={proximosAtendimentos}
                        colunas={colunasAtendimento}
                        id="appointments-list"
                    />
                </Card>

                {/* 3. ADICIONAR onClick: Notas Fiscais -> Controle de Notas Fiscais */}
                <Card
                    titulo={`Prazos de Notas Fiscais `}
                    iconePath="/src/assets/svg/notas.svg"
                    id="card-invoices"
                    onClick={goToControleNotasFiscais} 
                >
                    <Listagem
                        dados={prazosNotasFiscais}
                        colunas={colunasNotas}
                        id="invoices-list"
                    />
                </Card>
            </div>

            <div className="cards-grid">
                {/* 3. ADICIONAR onClick: Aniversariantes -> Agenda e Relacionamento */}
                <Card
                    titulo={`Aniversariantes do Mês`}
                    iconePath="/src/assets/svg/aniversario.svg"
                    id="card-birthdays"
                    onClick={goToAgendaRelacionamento} 
                >
                    <Listagem
                        dados={aniversariantesDoMes}
                        colunas={colunasAniversario}
                        id="birthdays-list"
                    />
                </Card>

                {/* 3. ADICIONAR onClick: Contas a Pagar -> Gerenciamento de Despesas */}
                <Card
                    titulo={`Contas a Pagar`}
                    iconePath="/src/assets/svg/contas.svg"
                    id="card-bills"
                    onClick={goToGerenciamentoDespesas} 
                >
                    <Listagem
                        dados={contasAPagar}
                        colunas={colunasContas}
                        id="bills-list"
                    />
                </Card>
            </div>
        </>
    );

    return (
        <div className="container">
            <Sidebar />
            <main className="main-content">
                <h1>Visão Geral</h1>
                {content}
            </main>
        </div>
    );
};

export default VisaoGeral;