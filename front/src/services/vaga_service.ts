import api from './api_service';
import { Vaga } from '../models/vaga';
import { Candidatura } from '../models/candidatura';
import VagaInput from '../models/vaga_input';

class VagaService {
    // Buscar todas as vagas disponíveis
    async getVagasDisponiveis(): Promise<Vaga[]> {
        try {
            const response = await api.get<Vaga[]>('/vagas/disponiveis');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar vagas:', error);
            throw error;
        }
    }

    // Buscar vagas por empresa
    async getVagasPorEmpresa(empresaId: number): Promise<Vaga[]> {
        try {
            const response = await api.get<Vaga[]>(`/vagas/empresa/${empresaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar vagas da empresa:', error);
            throw error;
        }
    }

    async candidatar(vagaId: number) {
        const response = await api.post('/candidatura', {
            vaga_id: vagaId
        });
        return response.data;
    }

    // Detalhes de uma vaga específica
    async getVagaDetalhes(vagaId: number): Promise<Vaga> {
        try {
            const response = await api.get<Vaga>(`/vagas/${vagaId}`);
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

    // Atualizar vaga (para empresas)
    async atualizarVaga(vagaId: number, dadosVaga: Partial<Vaga>): Promise<Vaga> {
        try {
            const response = await api.put<Vaga>(`/vagas/${vagaId}`, dadosVaga);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar vaga:', error);
            throw error;
        }
    }
}

export default new VagaService();
