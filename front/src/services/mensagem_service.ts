import api from './api_service';

interface Mensagem {
    usuarioId: number;
    usuarioNome: string;
    conteudo: string;
    timestamp?: Date;
}

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

    async obterCandidaturasComMensagens(usuarioId: number) {
        try {
            // Buscar candidaturas do usuário
            const candidaturas = await api.get(`/candidaturas/mensagens`);

            // Processar candidaturas com informações de mensagens
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
