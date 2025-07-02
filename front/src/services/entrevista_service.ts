import api from './api_service';

class EntrevistaService {
    async adicionarEntrevistadores(entrevistaId: number, entrevistadores: any) {
        try {
            const response = await api.post(`/entrevista/${entrevistaId}/entrevistadores`, {
                entrevistadores
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar entrevistadores:', error);
            throw error;
        }
    }
}

export default new EntrevistaService();
