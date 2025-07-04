export interface Mensagem {
    usuarioId: number;
    usuarioNome: string;
    conteudo: string;
    timestamp: string;
    _id?: string;
    candidaturaId: number;
}

export interface CandidaturaComMensagens {
    candidaturaId: number;
    mensagens: Mensagem[];
    ultimaMensagem: Mensagem;
}