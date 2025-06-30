import api from './api_service';

class EmpresaService {
    async obterDadosDashboard() {
        const response = await api.get(`/empresa/dashboard`);
        return response.data;
    }
}

export default new EmpresaService();
