import api from './api_service';
import { Candidato } from '../models/candidato';
import { Candidatura } from '../models/candidatura';

class CandidatoService {
    async getDadosCandidato(usuarioId: number): Promise<Candidato> {
        const response = await api.get<Candidato>(`/candidatos/usuario`);
        return response.data;
    }

    async getEstatisticas(candidatoId: number) {
        const [candidaturas, entrevistas] = await Promise.all([
            api.get(`/candidaturas/candidato/${candidatoId}`),
            api.get(`/entrevistas/candidato/${candidatoId}`)
        ]);

        return {
            totalCandidaturas: candidaturas.data.length,
            totalEntrevistas: entrevistas.data.length,
            totalAprovacoes: candidaturas.data.filter(c => c.status === 'Aprovado').length
        };
    }


    async getCandidaturasComVagas(candidatoId: number): Promise<Candidatura[]> {
        const response = await api.get<Candidatura[]>(`/candidaturas/candidato/${candidatoId}?includeVaga=true`);
        return response.data;
    }
}

export default new CandidatoService();
