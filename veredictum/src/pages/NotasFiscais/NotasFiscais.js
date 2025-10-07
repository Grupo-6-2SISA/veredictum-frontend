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

export const createNotaFiscal = (notaFiscalData, statusInicialId = 1) => {
    return apiClient.post(`/notas-fiscais?statusInicialId=${statusInicialId}`, notaFiscalData);
};

export const updateNotaFiscal = (id, notaFiscalData) => {
    return apiClient.put(`/notas-fiscais/${id}`, notaFiscalData);
};

export const deleteNotaFiscal = (id) => {
    return apiClient.delete(`/notas-fiscais/${id}`);
};

export const toggleEmitidaNotaFiscal = (id, valorNumerico) => {
    console.log(`Toggle API - ID: ${id}, Valor: ${valorNumerico}`);
    // Testando diferentes endpoints possíveis:
    
    // Opção 1: PATCH específico para emitida
    return apiClient.patch(`/notas-fiscais/${id}/emitida`, { isEmitida: valorNumerico });
    
    // Se não funcionar, teste estas alternativas:
    // return apiClient.patch(`/notas-fiscais/${id}`, { isEmitida: valorNumerico });
    // return apiClient.put(`/notas-fiscais/${id}/toggle-emitida`, { isEmitida: valorNumerico });
};
