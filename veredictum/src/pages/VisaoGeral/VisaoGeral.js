// src/pages/VisaoGeral/VisaoGeral.js 

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/', 
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

/**
 * Funções de busca de dados para a tela de Visão Geral.
 */

// 1. Próximos Atendimentos (AtendimentoController: @RequestMapping("/atendimentos"))
export const listarProximosAtendimentos = () => {
    console.log('[VisaoGeral API] listarProximosAtendimentos chamado -> GET /atendimentos/mais-recentes');
    return apiClient.get('/atendimentos/mais-recentes')
        .then(res => {
            console.log('[VisaoGeral API] listarProximosAtendimentos resposta:', res);
            return res;
        })
        .catch(err => {
            console.error('[VisaoGeral API] listarProximosAtendimentos erro:', err);
            throw err;
        });
};

// 2. Prazos de Notas Fiscais (NotaFiscalController: @RequestMapping("/notas-fiscais"))
export const listarPrazosNotasFiscais = () => {
    console.log('[VisaoGeral API] listarPrazosNotasFiscais chamado -> GET /notas/mais-atrasadas/10');
    return apiClient.get('/notas-fiscais/mais-atrasadas/10') 
        .then(res => {
            console.log('[VisaoGeral API] listarPrazosNotasFiscais resposta:', res);
            return res;
        })
        .catch(err => {
            console.error('[VisaoGeral API] listarPrazosNotasFiscais erro:', err);
            throw err;
        });
}

// 3. Aniversariantes do Mês (ClienteController: @RequestMapping("/clientes"))
export const listarAniversariantesDoMes = () => {
    console.log('[VisaoGeral API] listarAniversariantesDoMes chamado -> GET /clientes/aniversariantes-do-mes');
    return apiClient.get('/clientes/aniversariantes-do-mes')
        .then(res => {
            console.log('[VisaoGeral API] listarAniversariantesDoMes resposta:', res);
            return res;
        })
        .catch(err => {
            console.error('[VisaoGeral API] listarAniversariantesDoMes erro:', err);
            throw err;
        });
}

// 4. Contas a Pagar (ContaController: @RequestMapping("/contas"))
export const listarContasAPagar = () => {
    console.log('[VisaoGeral API] listarContasAPagar chamado -> GET /contas/a-pagar');
    return apiClient.get('/contas/mais-atrasadas/10')
        .then(res => {
            console.log('[VisaoGeral API] listarContasAPagar resposta:', res);
            return res;
        })
        .catch(err => {
            console.error('[VisaoGeral API] listarContasAPagar erro:', err);
            throw err;
        });
}