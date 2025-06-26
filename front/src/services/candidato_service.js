import api from './api_service';

export const getCandidatoInfo = async () => {
    try {
        const response = await api.get('/candidato/dashboard');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informações do candidato:', error);
        throw error;
    }
};

export const getVagasDisponiveis = async () => {
    try {
        const response = await api.get('/vagas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar vagas disponíveis:', error);
        throw error;
    }
};

export const getMinhsCandidaturas = async () => {
    try {
        const response = await api.get('/candidato/candidaturas');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
        throw error;
    }
};
