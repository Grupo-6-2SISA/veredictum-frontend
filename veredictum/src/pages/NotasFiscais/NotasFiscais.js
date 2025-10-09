import axios from 'axios';

// Configuração do cliente API
const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

// ===== FUNÇÕES DA API =====

// Buscar todas as notas fiscais
export const getNotasFiscais = () => {
    return apiClient.get('/notas-fiscais');
};

// Criar nova nota fiscal
export const createNotaFiscal = (notaFiscalData, statusInicialId = 1) => {
    return apiClient.post('/notas-fiscais', notaFiscalData, {
        params: { statusInicialId }
    });
};

// Atualizar nota fiscal existente
export const updateNotaFiscal = (id_nota_fiscal, notaFiscalData) => {
    const numericId = typeof id_nota_fiscal === 'string' ? parseInt(id_nota_fiscal, 10) : id_nota_fiscal;
    
    if (isNaN(numericId) || numericId <= 0) {
        throw new Error(`ID inválido: ${id_nota_fiscal}`);
    }
    
    return apiClient.put(`/notas-fiscais/${numericId}`, notaFiscalData);
};

// Excluir nota fiscal pelo id_nota_fiscal
export const deleteNotaFiscal = (id_nota_fiscal) => {
    const numericId = typeof id_nota_fiscal === 'string' ? parseInt(id_nota_fiscal, 10) : id_nota_fiscal;
    
    if (!numericId || isNaN(numericId) || numericId <= 0) {
        throw new Error(`ID inválido: ${id_nota_fiscal}`);
    }
    
    return apiClient.delete(`/notas-fiscais/${numericId}`);
};

// Buscar todos os clientes
export const getClientes = () => {
    return apiClient.get('/clientes');
};
