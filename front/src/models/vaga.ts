export interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    salario: number;
    localizacao: string;
    data_publicacao: string;
    empresa_id: number;
}

export default Vaga;