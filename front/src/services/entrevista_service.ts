import api from './api_service';

class EntrevistaService {
    async adicionarEntrevistadores(candidaturaId: number, entrevistador: any) {
        try {
            const response = await api.post(`/candidatura/${candidaturaId}/entrevistador`, entrevistador);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar entrevistador:', error);
            throw error;
        }
    }

    async atualizarEntrevista(id: number, dadosEntrevista: any) {
        try {
            const response = await api.put(`/entrevista/${id}/entrevistador`, dadosEntrevista);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar entrevista:', error);
            throw error;
        }
    }
    async removerEntrevistadores(id: number, entrevistadorId: number) {
        try {
            const response = await api.delete(`/entrevista/${id}/entrevistador/${entrevistadorId}`);
            return response.data;
        } catch (error) {
            console.error('Erro remover entrevistador:', error);
            throw error;
        }
    }

}

export default new EntrevistaService();
