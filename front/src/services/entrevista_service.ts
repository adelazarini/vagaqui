import api from './api_service';

class EntrevistaService {
    async adicionarEntrevistadores(candidaturaId: number, entrevistadores: any) {
        try {
            const response = await api.post(`/candidatura/${candidaturaId}/entrevistadores`, entrevistadores);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar entrevistadores:', error);
            throw error;
        }
    }
}

export default new EntrevistaService();
