import api from './api_service';

class EntrevistadorService {
    async obterDadosDashboard() {
        const response = await api.get('/entrevistadores/dashboard');
        return response.data;
    }
}

export default new EntrevistadorService();
