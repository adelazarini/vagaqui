import api from './api_service';
import { Candidato } from '../models/candidato';
import { Candidatura } from '../models/candidatura';

class CandidatoService {
    async getDadosCandidato(usuarioId: number): Promise<Candidato> {
        const response = await api.get<Candidato>(`/candidato/usuario`);
        return response.data;
    }

    async obterDadosDashboard() {
        const response = await api.get(`/candidato/dashboard`);
        return response.data;
    }
}

export default new CandidatoService();
