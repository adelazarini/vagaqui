export const TIPOS_USUARIO = {
  CANDIDATO: 'Candidato',
  EMPRESA: 'Empresa',
  ENTREVISTADOR: 'Entrevistador',
  ADMINISTRADOR: 'Administrador'
} as const;

export type TipoUsuario = typeof TIPOS_USUARIO[keyof typeof TIPOS_USUARIO];

export class Usuario {
  id: number | null;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: TipoUsuario;
  token: string | null;

  constructor(data: Partial<Usuario> = {}) {
    this.id = data.id ?? null;
    this.nome = data.nome ?? '';
    this.email = data.email ?? '';
    this.senha = data.senha ?? '';
    this.tipo_usuario = data.tipo_usuario ?? TIPOS_USUARIO.CANDIDATO;
    this.token = data.token ?? null;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidPassword(): boolean {
    return this.senha.length >= 6;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      tipo_usuario: this.tipo_usuario
    };
  }
}
