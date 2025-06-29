export interface Candidato {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string | null;
    formacao: string | null;
    experiencia: string | null;
    senha: string;
    usuario_id: number;
    create?: Date;
    update?: Date;
}
export default Candidato;
