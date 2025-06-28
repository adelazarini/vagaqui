import api from './api';

class CandidatoService {
    async getDadosCandidato(usuarioId) {
        const response = await api.get(`/candidatos/usuario/${usuarioId}`);
        return response.data;
    }

    async getEstatisticas(candidatoId) {
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
}

export default new CandidatoService();
