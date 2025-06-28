import api from './api_service';
import { Candidato } from '../models/candidato';
//import { Candidatura } from '../models/candidatura';
//import { Entrevista } from '../models/entrevista';

interface EstatisticasCandidato {
    totalCandidaturas: number;
    totalEntrevistas: number;
    totalAprovacoes: number;
}

class CandidatoService {
    async getDadosCandidato(usuarioId: number): Promise<Candidato> {
        const response = await api.get<Candidato>(`/candidato/usuario`);
        return response.data;
    }

    // async getEstatisticas(candidatoId: number): Promise<EstatisticasCandidato> {
    //   const [candidaturas, entrevistas] = await Promise.all([
    // api.get<Candidatura[]>(`/candidaturas/candidato/${candidatoId}`),
    // api.get<Entrevista[]>(`/entrevistas/candidato/${candidatoId}`)
    //    ]);

    //   return {
    //       totalCandidaturas: candidaturas.data.length,
    //       totalEntrevistas: entrevistas.data.length,
    //      totalAprovacoes: candidaturas.data.filter(c => c.status === 'Aprovado').length
    //   };
    //  }

    // async getCandidaturas(candidatoId: number): Promise<Candidatura[]> {
    //  const response = await api.get<Candidatura[]>(`/candidaturas/candidato/${candidatoId}`);
    //   return response.data;
    // }

    //  async getEntrevistas(candidatoId: number): Promise<Entrevista[]> {
    //      const response = await api.get<Entrevista[]>(`/entrevistas/candidato/${candidatoId}`);
    //      return response.data;
    //  }
}

export default new CandidatoService();
