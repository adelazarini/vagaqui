import { Vaga } from './vaga';

export interface Candidatura {
    id?: number;
    vaga_id: number;
    candidato_id: number;
    curriculo_id?: number;
    status: string;
    data_candidatura: Date;
    vaga?: Vaga;
}
