// src/pages/VisaoGeral/VisaoGeral.jsx 

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Sidebar from '../../components/Sidebar/Sidebar';
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
        const rota = '/Despesas'; // Usando a rota que você indicou
        console.log(`[Redirecionamento] Clicado em Contas a Pagar. Navegando para: ${rota}`); // <--- CONSOLE LOG ADICIONADO
        navigate(rota);
    };

    // --- FUNÇÃO CENTRAL DE FETCH DE DADOS (TESTE DE ATENDIMENTO) ---
    useEffect(() => {

        console.log('[VisaoGeral] useEffect mounted - iniciando fetch de dados');

        // Função simples para formatar a data/hora
        const formatarData = (isoString) => {
            if (!isoString) return '';
            try {
                const [dataCompleta] = isoString.split('.'); // Remove milissegundos, se houver
                const [data, horaComMinuto] = dataCompleta.split('T'); // Ex: 2024-05-22 e 13:00:00

                const [ano, mes, dia] = data.split('-');
                const [hora, minuto] = horaComMinuto.split(':'); // Pega hora e minuto

                return `${dia}/${mes}/${ano} ${hora}:${minuto}`; // Ex: 22/05/2024 13:00
            } catch (e) {
                return isoString;
            }
        }
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
                const formatData = (result) => result.status === 'fulfilled' && result.value.data ? result.value.data : [];


                // 1. Processar e Formatar os Atendimentos
                const atendimentosBrutos = formatData(resAtendimentos);
                console.log('[VisaoGeral] atendimentosBrutos (raw):', atendimentosBrutos);
                const atendimentosFormatados = atendimentosBrutos.map(item => {
                    console.log('[VisaoGeral] formatando atendimento item:', item);
                    // A chave do item formatado deve ser retornada pelo map
                    const dataFormatada = formatarData(item.dataInicio);

                    // Verifica se a formatação foi bem sucedida para evitar erros de split
                    const dia = dataFormatada.split(' ')[0] || '';
                    const horario = dataFormatada.split(' ')[1] || '';

                    return {
                        // Use a chave correta para o nome do cliente (se tiver feito a Opção A)
                        nome: item.nome || 'Cliente Desconhecido',
                        dia: dia,
                        horario: horario,
                    }
                });
                console.log('[VisaoGeral] atendimentosFormatados (processed) count:', atendimentosFormatados.length);

                // 2. Processar e Formatar Notas Fiscais (NOVO BLOCO)
                const notasBrutas = formatData(resNotasFiscais);
                console.log('[VisaoGeral] notasBrutas (raw):', notasBrutas);
                const notasFormatadas = notasBrutas.map(item => {
                    console.log('[VisaoGeral] formatando nota item:', item);
                    // Usa a função global para formatar (DD/MM/AAAA HH:MM)
                    const dataVencimentoCompleta = formatarData(item.dataVencimento);

                    return {
                        // Mantenha as chaves do DTO:
                        numero: item.numero,
                        clienteNome: item.clienteNome || 'Cliente Não Informado',

                        // Pega APENAS a data (DD/MM/AAAA)
                        dataVencimento: dataVencimentoCompleta.split(' ')[0],

                        ...item // Garante que qualquer outra propriedade seja mantida
                    }
                });
                console.log('[VisaoGeral] notasFormatadas count:', notasFormatadas.length);

                // 3. Processar e Formatar Contas a Pagar
                const contasBrutas = formatData(resContas);
                const contasFormatadas = contasBrutas.map(item => {
                    // Formatar a data (DD/MM/AAAA)
                    const dataFormatada = formatarData(item.dataVencimento).split(' ')[0];

                    return {
                        ...item, // Mantém outras propriedades do DTO (como etiqueta)
                        dataVencimento: dataFormatada, // Sobrescreve com a data formatada
                    };
                });
                console.log('[VisaoGeral] contasFormatadas count:', contasFormatadas.length);

                // 4. Processar e Formatar Aniversariantes do Mês
                const aniversariantesBrutos = formatData(resAniversariantes);
                const aniversariantesFormatados = aniversariantesBrutos.map(item => {
                    // 1. Formatar a data completa (Ex: 22/05/2024 13:00)
                    const dataFormatadaCompleta = formatarData(item.dataNascimento);

                    // 2. Extrair apenas o DIA e MÊS (Ex: 22/05)
                    // Pega os 5 primeiros caracteres (DD/MM) da string formatada
                    const diaMesFormatado = dataFormatadaCompleta.substring(0, 5);

                    return {
                        // Assume que a chave do nome é 'nome' ou 'nomeCompleto'
                        nome: item.nome || item.nomeCompleto || 'Nome Desconhecido',
                        dia: diaMesFormatado, // Coluna 'Dia' da Listagem
                        ...item
                    }
                });
                console.log('[VisaoGeral] aniversariantesFormatados count:', aniversariantesFormatados.length);


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
            {/* <Sidebar nomeCompleto="Lismara Ribeiro" /> */}
            <main className="main-content">
                <h1>Visão Geral</h1>
                {content}
            </main>
        </div>
    );
};

export default VisaoGeral;