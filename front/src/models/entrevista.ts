import { Candidatura } from './candidatura';
import { Entrevistador } from './entrevistador';
import { Vaga } from './vaga';

export const status_entrevista = {
    combinar: 'Combinar',
    Agendada: 'Agendada',
    Aprovado: 'Aprovado',
    Reprovado: 'Reprovado',
    Cancelada: 'Cancelada'
} as const;

export type StatusEntrevista = typeof status_entrevista[keyof typeof status_entrevista];

export interface Entrevista {
    id: number;
    candidatura_id: number;
    entrevistador_id: number;
    data_entrevista: Date | string;
    hora_entrevista: string;
    local_link: string;
    observacoes?: string;
    create: Date;
    update: Date;

    candidatura: Candidatura;
    entrevistador: Entrevistador;
    vaga: Vaga;
    status_entrevista: StatusEntrevista;

}



export default Entrevista;
