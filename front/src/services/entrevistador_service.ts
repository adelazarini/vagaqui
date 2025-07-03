import api from './api_service';

class EntrevistadorService {
    async obterDadosDashboard() {
        try {
            const response = await api.get('/entrevistador/dashboard');
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados do dashboard:', error);
            throw error;
        }
    }


    async deleteEntrevista(idEntrevista: number) {
        try {
            const response = await api.delete(`/entrevista/${idEntrevista}/entrevistador`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar entrevista:', error);
            throw error;
        }
    }

    async getlistaEntrevistadores() {
        try {
            const response = await api.get('/entrevistador');
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados do dashboard:', error);
            throw error;
        }
    }
}

export default new EntrevistadorService();
