export interface Entrevistador {
    id?: number;
    nome: string;
    email: string;
    cargo?: string;
    usuario_id: number;
    create?: Date;
    update?: Date;
}

export default Entrevistador;