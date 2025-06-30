import Candidato from './candidato';
import Entrevista from './entrevista';
import { Vaga } from './vaga';

export interface Candidatura {
    id: number;
    vaga_id: number;
    candidato_id: number;
    status: string;
    data_candidatura: Date;
    vaga: Vaga;
    candidato: Candidato;
    entrevistas: Entrevista;
    titulo_vaga: string;

}
export default Candidatura;
