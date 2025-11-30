import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});



// ====================================================
// CONTAS
// ====================================================

export const contasPagasMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`contas/contagem-pagas/${m}/${y}`);
};

export const contasNaoPagas = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`contas/contagem-nao-pagas/${m}/${y}`);
};

export const contasTotalMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`contas/contagem-total/${m}/${y}`);
};


export async function graficoAtrasadas(anoAnterior, anoAtual) {
    return apiClient.get(`contas/grafico-atrasadas-ano/2024/2025`);
}

export async function graficoPagas(anoAnterior, anoAtual) {
    return apiClient.get(`contas/grafico-pagas-ano/2024/2025`);
}


// ====================================================
// ATENDIMENTOS
// ====================================================

export const atendimentosConcluidos = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`atendimentos/count-concluidos/${m}/${y}`);
};

export const atendimentosNaoConcluidos = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`atendimentos/count-nao-concluidos/${m}/${y}`);
};

export const atendimentosTotalMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`atendimentos/count-atendimentos-mes-ano/${m}/${y}`);
};

export const graficoAtendimentosConcluidos = () =>
    apiClient.get('atendimentos/grafico-concluidos/2024/2025');

export const graficoAtendimentosAtrasados = () =>
    apiClient.get('atendimentos/grafico-atrasados/2024/2025');




// ====================================================
// NOTAS FISCAIS
// ====================================================

export const notasTotalMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`notas-fiscais/contagem-total/${m}/${y}`);
};

export const notasEmitidasMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`notas-fiscais/contagem-emitidas/${m}/${y}`);
};

export const notasPendentesMes = (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();
    return apiClient.get(`notas-fiscais/contagem-nao-emitidas/${m}/${y}`);
};

export const graficoNotasPendentes = () =>
    apiClient.get('notas-fiscais/grafico-pendentes/2025/2024');

export const graficoNotasEmitidas = () =>
    apiClient.get('notas-fiscais/grafico-emitidas/2025/2024');






// ====================================================
// PERCENTUAIS
// ====================================================

export const contasPagasMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    // mês anterior
    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`contas/contagem-pagas/${m}/${y}`),
            apiClient.get(`contas/contagem-pagas/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar contas pagas com percentual:", err);
        return { valor: 0, percentual: null };
    }
};


export const contasNaoPagasMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`contas/contagem-nao-pagas/${m}/${y}`),
            apiClient.get(`contas/contagem-nao-pagas/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar contas não pagas com percentual:", err);
        return { valor: 0, percentual: null };
    }
};

export const contasTotalMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`contas/contagem-total/${m}/${y}`),
            apiClient.get(`contas/contagem-total/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar total de contas com percentual:", err);
        return { valor: 0, percentual: null };
    }
};

export const atendimentosConcluidosMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`atendimentos/count-concluidos/${m}/${y}`),
            apiClient.get(`atendimentos/count-concluidos/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar atendimentos concluídos com percentual:", err);
        return { valor: 0, percentual: null };
    }
};

export const atendimentosNaoConcluidosMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`atendimentos/count-nao-concluidos/${m}/${y}`),
            apiClient.get(`atendimentos/count-nao-concluidos/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar atendimentos não concluídos com percentual:", err);
        return { valor: 0, percentual: null };
    }
};


export const atendimentosTotalMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    // mês anterior
    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`atendimentos/count-atendimentos-mes-ano/${m}/${y}`),
            apiClient.get(`atendimentos/count-atendimentos-mes-ano/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar total de atendimentos com percentual:", err);
        return { valor: 0, percentual: null };
    }
};



export const notasEmitidasMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`notas-fiscais/contagem-emitidas/${m}/${y}`),
            apiClient.get(`notas-fiscais/contagem-emitidas/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar notas emitidas com percentual:", err);
        return { valor: 0, percentual: null };
    }
};

export const notasPendentesMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`notas-fiscais/contagem-nao-emitidas/${m}/${y}`),
            apiClient.get(`notas-fiscais/contagem-nao-emitidas/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar notas pendentes com percentual:", err);
        return { valor: 0, percentual: null };
    }
};


export const notasTotalMesComPercentual = async (mes, ano) => {
    const data = new Date();
    const m = mes || data.getMonth() + 1;
    const y = ano || data.getFullYear();

    let mesAnterior = m - 1;
    let anoAnterior = y;
    if (mesAnterior === 0) {
        mesAnterior = 12;
        anoAnterior -= 1;
    }

    try {
        const [atualRes, anteriorRes] = await Promise.all([
            apiClient.get(`notas-fiscais/contagem-total/${m}/${y}`),
            apiClient.get(`notas-fiscais/contagem-total/${mesAnterior}/${anoAnterior}`)
        ]);

        const atual = atualRes.data || 0;
        const anterior = anteriorRes.data || 0;

        const percentual = anterior === 0 ? null : ((atual - anterior) / anterior * 100).toFixed(2);

        return { valor: atual, percentual };
    } catch (err) {
        console.error("Erro ao buscar total de notas com percentual:", err);
        return { valor: 0, percentual: null };
    }
};
