// src/models/entrevista.ts
import { Candidatura } from './candidatura';
import { Entrevistador } from './entrevistador';

export interface Entrevista {
    id?: number;
    candidatura_id: number;
    entrevistador_id: number;
    data_entrevista: Date | string;
    hora_entrevista: string;
    local_link: string;
    observacoes?: string;
    create?: Date;
    update?: Date;

    candidatura?: Candidatura;
    entrevistador?: Entrevistador;
}



export default Entrevista;
