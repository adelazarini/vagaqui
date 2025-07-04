import api from './api_service';

import { Mensagem, CandidaturaComMensagens } from '../models/mensagem';

class MensagemService {
    async enviarMensagem(candidaturaId: number, mensagem: Mensagem) {
        try {
            const response = await api.post(`/mensagem/candidatura/${candidaturaId}`, mensagem);
            return response.data;
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            throw error;
        }
    }

    async listarMensagens(candidaturaId: number): Promise<Mensagem[]> {
        try {
            const response = await api.get(`/mensagem/candidatura/${candidaturaId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar mensagens:', error);
            throw error;
        }
    }

    async obterMensagensPorUsuario(): Promise<CandidaturaComMensagens[]> {
        try {
            const response = await api.get(`/mensagens/usuario/`);

            // Transformar as mensagens em CandidaturaComMensagens
            const mensagens: Mensagem[] = response.data;

            // Agrupar mensagens por candidatura
            const candidaturasMap = new Map<number, CandidaturaComMensagens>();

            mensagens.forEach(msg => {
                if (!candidaturasMap.has(msg.candidaturaId)) {
                    candidaturasMap.set(msg.candidaturaId, {
                        candidaturaId: msg.candidaturaId,
                        mensagens: [],
                        ultimaMensagem: msg
                    });
                }

                const candidatura = candidaturasMap.get(msg.candidaturaId);
                candidatura.mensagens.push(msg);

                // Atualizar última mensagem se for mais recente
                if (new Date(msg.timestamp) > new Date(candidatura.ultimaMensagem.timestamp)) {
                    candidatura.ultimaMensagem = msg;
                }
            });

            // Converter Map para array e ordenar por timestamp da última mensagem
            return Array.from(candidaturasMap.values()).sort((a, b) =>
                new Date(b.ultimaMensagem.timestamp).getTime() -
                new Date(a.ultimaMensagem.timestamp).getTime()
            );
        } catch (error) {
            console.error('Erro ao buscar mensagens do usuário:', error);
            throw error;
        }
    }

    async obterCandidaturasComMensagens() {
        try {
            const candidaturas = await api.get(`/candidatura/`);

            const candidaturasComMensagens = await Promise.all(
                candidaturas.data.map(async (candidatura) => {
                    const mensagens = await this.listarMensagens(candidatura.id);
                    return {
                        ...candidatura,
                        temMensagens: mensagens.length > 0,
                        ultimaMensagem: mensagens.length > 0 ? mensagens[mensagens.length - 1] : null
                    };
                })
            );

            return candidaturasComMensagens;
        } catch (error) {
            console.error('Erro ao obter candidaturas com mensagens:', error);
            throw error;
        }
    }

}

export default new MensagemService();
