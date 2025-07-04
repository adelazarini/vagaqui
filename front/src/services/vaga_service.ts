import api from './api_service';
import { Vaga } from '../models/vaga';
import { Candidatura } from '../models/candidatura';
import VagaInput from '../models/vaga_input';

class VagaService {

    // Buscar vagas por empresa
    async getVagasPorEmpresa(empresaId: number): Promise<Vaga[]> {
        try {
            const response = await api.get<Vaga[]>(`/vaga/empresa/${empresaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar vagas da empresa:', error);
            throw error;
        }
    }

    async candidatar(vagaId: number) {
        const response = await api.post('/candidatura/' + vagaId);
        return response.data;
    }

    // Detalhes de uma vaga específica
    async getVagaDetalhes(vagaId: number): Promise<Vaga> {
        try {
            const response = await api.get<Vaga>(`/vaga/${vagaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes da vaga:', error);
            throw error;
        }
    }

    // Criar nova vaga
    async criarVaga(dadosVaga: Partial<VagaInput>): Promise<VagaInput> {
        try {
            const response = await api.post<VagaInput>('/vaga', dadosVaga);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar vaga:', error);
            throw error;
        }
    }

    async atualizarVaga(vagaId: number, dadosVaga: Partial<Vaga>): Promise<Vaga> {
        try {
            const response = await api.put<Vaga>(`/vaga/${vagaId}`, dadosVaga);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar vaga:', error);
            throw error;
        }
    }

    async deleteVaga(idVaga: number) {
        try {
            const response = await api.delete(`/vaga/${idVaga}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar vaga:', error);
            throw error;
        }
    }
}

export default new VagaService();
