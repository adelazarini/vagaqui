import { Empresa } from "./empresa";

export interface Vaga {
    id: number;
    titulo: string;
    descricao: string;
    salario: number;
    localizacao: string;
    data_publicacao: string;
    empresa_id: number;
    empresa: Empresa;
}

export default Vaga;