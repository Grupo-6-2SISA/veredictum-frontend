import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const contasPagas = () =>
    apiClient.get('contas/por-pagamento/true');

export const contasAbertas = () =>
    apiClient.get('contas/por-pagamento/false');

export const totalContas = () =>
    apiClient.get('contas');
