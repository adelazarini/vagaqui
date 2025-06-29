import { TipoUsuario } from './usuario';

export interface RegistroUsuario {
    nome: string;
    email: string;
    senha: string;
    tipo_usuario: TipoUsuario;
}

export default RegistroUsuario;
