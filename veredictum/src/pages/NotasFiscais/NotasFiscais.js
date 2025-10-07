import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getNotasFiscais = () => {
    return apiClient.get('/notas-fiscais');
};

export const createNotaFiscal = (notaFiscalData) => {
    return apiClient.post('/notas-fiscais', notaFiscalData);
};

export const updateNotaFiscal = (id, notaFiscalData) => {
    return apiClient.put(`/notas-fiscais/${id}`, notaFiscalData);
};

export const deleteNotaFiscal = (id) => {
    return apiClient.delete(`/notas-fiscais/${id}`);
};

export const toggleEmitidaNotaFiscal = (id, emitida) => {
    return apiClient.patch(`/notas-fiscais/${id}/emitida`, { emitida });
};
