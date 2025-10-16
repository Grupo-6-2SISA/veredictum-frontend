import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getClientes = () => {
    return apiClient.get('/clientes');
};

export const createCliente = (clienteData) => {
    return apiClient.post('/clientes', clienteData);
};

export const updateCliente = (id, clienteData) => {
    return apiClient.put(`/clientes/${id}`, clienteData);
};

export const activateCliente = (id) => {
    return apiClient.patch(`/clientes/${id}/ativar`);
};

export const deactivateCliente = (id) => {
    return apiClient.patch(`/clientes/${id}/inativar`);
};