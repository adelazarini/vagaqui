export class Usuario {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.senha = data.senha || '';
    this.tipo_usuario = data.tipo_usuario || '';
    this.token = data.token || null;
  }

  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidPassword() {
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

export const TIPOS_USUARIO = {
  CANDIDATO: 'candidato',
  EMPRESA: 'empresa',
  ENTREVISTADOR: 'entrevistador',
  ADMINISTRADOR: 'administrador'
};
