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
export const listarTodosAtendimentos = () => {
    console.log('[Agenda API] listarTodosAtendimentos chamado -> GET /atendimentos');
    return apiClient.get('/atendimentos')
        .then(res => {
            console.log('[Agenda API] listarTodosAtendimentos resposta:', res.data.length, 'itens');
            return res;
        })
        .catch(err => {
            console.error('[Agenda API] listarTodosAtendimentos erro:', err);
            throw err;
        });
};

/**
 * Lista todos os clientes que fazem aniversário no ano (ou uma lista grande)
 * para o frontend filtrar por mês.
 * Rota: GET /clientes/aniversariantes
 */
export const listarTodosAniversariantes = () => {
    // Nota: É comum o backend ter um endpoint que lista todos os aniversários
    // ou apenas os que ocorreram/ocorrerão no ano. Se /clientes retornar todos os clientes,
    // o frontend deve extrair a dataNascimento. Usaremos /clientes/aniversariantes.
    console.log('[Agenda API] listarTodosAniversariantes chamado -> GET /clientes/aniversariantes');
    return apiClient.get('/clientes/aniversariantes')
        .then(res => {
            console.log('[Agenda API] listarTodosAniversariantes resposta:', res.data.length, 'itens');
            return res;
        })
        .catch(err => {
            console.error('[Agenda API] listarTodosAniversariantes erro:', err);
            throw err;
        });
}

// ===================================================================
// FUNÇÕES DE MANIPULAÇÃO (CRUD - Atendimentos)
// ===================================================================

/**
 * Cria um novo atendimento.
 * Rota: POST /atendimentos
 */
export const criarAtendimento = (atendimentoData) => {
    console.log('[Agenda API] criarAtendimento chamado -> POST /atendimentos', atendimentoData);
    return apiClient.post('/atendimentos', atendimentoData)
        .then(res => res)
        .catch(err => {
            console.error('[Agenda API] criarAtendimento erro:', err);
            throw err;
        });
};

/**
 * Edita um atendimento existente.
 * Rota: PUT /atendimentos/{id}
 */
export const editarAtendimento = (id, atendimentoData) => {
    console.log(`[Agenda API] editarAtendimento chamado -> PUT /atendimentos/${id}`, atendimentoData);
    return apiClient.put(`/atendimentos/${id}`, atendimentoData)
        .then(res => res)
        .catch(err => {
            console.error('[Agenda API] editarAtendimento erro:', err);
            throw err;
        });
};

/**
 * Exclui um atendimento pelo ID.
 * Rota: DELETE /atendimentos/{id}
 */
export const excluirAtendimento = (id) => {
    console.log(`[Agenda API] excluirAtendimento chamado -> DELETE /atendimentos/${id}`);
    return apiClient.delete(`/atendimentos/${id}`)
        .then(res => res)
        .catch(err => {
            console.error('[Agenda API] excluirAtendimento erro:', err);
            throw err;
        });
};