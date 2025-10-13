import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const listarDespesas = () =>
    apiClient.get('contas');

export const adicionarDespesa = (data) =>
    apiClient.post('contas?statusInicialId=1', data);

export const atualizarDespesa = (id, data) =>
    apiClient.put(`contas/${id}`, data);

export const getTotalPorMesEAno = (mes, ano) =>
    apiClient.get('contas/total-por-mes-e-ano', { params: { mes, ano } });
