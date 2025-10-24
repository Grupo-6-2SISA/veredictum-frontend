import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const listarFuncionarios = (idAdm) =>
    apiClient.get(`usuarios/lista-por-administrador/${idAdm}`);

export const criarFuncionario = (data) =>
    apiClient.post('usuarios/cadastrar', data);

export const atualizarFuncionario = (id, data) =>
    apiClient.patch(`usuarios/${id}`, data);

export const ativarFuncionario = (id) =>
    apiClient.patch(`usuarios/ativar/${id}`);

export const desativarFuncionario = (id) =>
    apiClient.patch(`usuarios/inativar/${id}`);

export const ListarRotinas = (data) =>
    apiClient.get(`rotinas`, data);

export const AtualizarRotinas = (id, data) =>
    apiClient.put(`rotinas/${id}`, data);

export const desativarRotina = (id) =>
    apiClient.patch(`rotinas/${id}/inativar`);


export const ativarRotina = (id) =>
    apiClient.patch(`rotinas/${id}/ativar`);