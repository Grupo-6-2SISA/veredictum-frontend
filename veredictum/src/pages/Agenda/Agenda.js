// src/pages/Agenda/Agenda.js 

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

/**
 * Funções de busca, criação, edição e exclusão de dados para a tela de Agenda & Relacionamento.
 * Rotas baseadas em AtendimentoController (@RequestMapping("/atendimentos")) e 
 * ClienteController (@RequestMapping("/clientes")).
 */

// ===================================================================
// FUNÇÕES DE BUSCA (READ)
// ===================================================================

/**
 * Lista todos os atendimentos (ou uma quantidade grande) para o frontend filtrar.
 * Rota: GET /atendimentos
 */
export const listarAtendimentosPorMesEAno = (ano, mes) => {
    console.log(`[Agenda API] listarAtendimentosPorMesEAno chamado -> GET /atendimentos/listar-por-mes-ano/${ano}/${mes}`);
    return apiClient.get(`/atendimentos/listar-por-mes-ano/${ano}/${mes}`)
        .then(res => {
            console.log('[Agenda API] listarAtendimentosPorMesEAno resposta:', Array.isArray(res.data) ? `${res.data.length} itens` : res.data);
            return res;
        })
        .catch(err => {
            console.error('[Agenda API] listarAtendimentosPorMesEAno erro:', err);
            throw err;
        });
}

 /**
* Lista todos os clientes que fazem aniversário no ano (ou uma lista grande)
* para o frontend filtrar por mês.
* Rota: GET /clientes/aniversariantes
*/
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

// ===================================================================
// FUNÇÕES DE MANIPULAÇÃO (CRUD - Atendimentos)
// ===================================================================

// /**
//  * Cria um novo atendimento.
//  * Rota: POST /atendimentos
//  */
// export const criarAtendimento = (atendimentoData) => {
//     console.log('[Agenda API] criarAtendimento chamado -> POST /atendimentos', atendimentoData);
//     return apiClient.post('/atendimentos', atendimentoData)
//         .then(res => res)
//         .catch(err => {
//             console.error('[Agenda API] criarAtendimento erro:', err);
//             throw err;
//         });
// };

// /**
//  * Edita um atendimento existente.
//  * Rota: PUT /atendimentos/{id}
//  */
// export const editarAtendimento = (id, atendimentoData) => {
//     console.log(`[Agenda API] editarAtendimento chamado -> PUT /atendimentos/${id}`, atendimentoData);
//     return apiClient.put(`/atendimentos/${id}`, atendimentoData)
//         .then(res => res)
//         .catch(err => {
//             console.error('[Agenda API] editarAtendimento erro:', err);
//             throw err;
//         });
// };

// /**
//  * Exclui um atendimento pelo ID.
//  * Rota: DELETE /atendimentos/{id}
//  */
// export const excluirAtendimento = (id) => {
//     console.log(`[Agenda API] excluirAtendimento chamado -> DELETE /atendimentos/${id}`);
//     return apiClient.delete(`/atendimentos/${id}`)
//         .then(res => res)
//         .catch(err => {
//             console.error('[Agenda API] excluirAtendimento erro:', err);
//             throw err;
//         });
// };