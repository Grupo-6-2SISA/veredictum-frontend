// ...existing code...
import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

/**
 * Funções de API para Agenda
 */

// ===================================================================
// FUNÇÕES DE BUSCA (READ)
// ===================================================================
export const listarAtendimentosPorMesEAno = (ano, mes) => {
    return apiClient.get(`/atendimentos/listar-por-mes-ano/${ano}/${mes}`)
        .then(res => res)
        .catch(err => { throw err; });
};

export const listarAniversariantesDoMes = () => {
    return apiClient.get('/clientes/aniversariantes-do-mes')
        .then(res => res)
        .catch(err => { throw err; });
};

// ===================================================================
// FUNÇÕES DE MANIPULAÇÃO (CRUD - Atendimentos)
// ===================================================================
export const criarAtendimento = (atendimentoDTO, statusInicialId = 1) => {
    return apiClient.post(`/atendimentos?statusInicialId=${statusInicialId}`, atendimentoDTO)
        .then(res => res)
        .catch(err => { throw err; });
};

export const editarAtendimento = (id, atendimentoDTO) => {
    return apiClient.put(`/atendimentos/${id}`, atendimentoDTO)
        .then(res => res)
        .catch(err => { throw err; });
};

export const excluirAtendimento = (id) => {
    return apiClient.delete(`/atendimentos/${id}`)
        .then(res => res)
        .catch(err => { throw err; });
};
// ...existing code...