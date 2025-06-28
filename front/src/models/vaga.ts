export interface Vaga {
    id?: number;
    titulo: string;
    descricao: string;
    salario: number;
    localizacao: string;
    data_publicacao: Date;
    empresa_id: number;
}