export interface ProcessoSeletivo {
    id: number;
    candidatura_id: number;
    observacoes: string;
    entrevistadores: any[];
    temEntrevistadorAgendado: boolean;
}

export default ProcessoSeletivo;