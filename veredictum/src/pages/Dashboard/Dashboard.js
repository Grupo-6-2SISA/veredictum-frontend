import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const contasPagas = () =>
    apiClient.get('contas/por-pagamento/true');

export const contasAbertas = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`contas/contagem-atrasadas/${m}/${y}`);
};

export async function graficoAtrasadas(anoAnterior, anoAtual) {
    return apiClient.get(`contas/grafico-atrasadas-ano/2024/2025`);
}

export async function graficoPagas(anoAnterior, anoAtual) {
    return apiClient.get(`contas/grafico-pagas-ano/2024/2025`);
}


export const totalContas = () =>
    apiClient.get('contas');


export const totalAtendimentos = () =>
    apiClient.get('atendimentos');

export const graficoAtendimentosConcluidos = () =>
    apiClient.get('atendimentos/grafico-concluidos/2024/2025');

export const graficoAtendimentosAtrasados = () =>
    apiClient.get('atendimentos/grafico-atrasados/2024/2025');


export const totalNotas = () =>
    apiClient.get('notas-fiscais');

export const graficoNotasPendentes = () =>
    apiClient.get('notas-fiscais/grafico-pendentes/2025/2024');

export const graficoNotasEmitidas = () =>
    apiClient.get('notas-fiscais/grafico-emitidas/2025/2024');