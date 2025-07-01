import api from './api_service';

class EmpresaService {
    async obterDadosDashboard() {
        try {
            const response = await api.get(`/empresa/dashboard`);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter dados do dashboard:', error);
            throw error; // Re-lança o erro para ser tratado onde o serviço é chamado
        }
    }

    async deleteEntrevista(idEntrevista: number) {
        try {
            const response = await api.delete(`/entrevista/${idEntrevista}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar entrevista:', error);
            throw error;
        }
    }
}

export default new EmpresaService();