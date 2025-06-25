export class Usuario {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.senha = data.senha || '';
    this.tipo_usuario = data.tipo_usuario || '';
    this.token = data.token || null;
    this.create_date = data.create_date || new Date();
    this.update_date = data.update_date || new Date();
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
      tipo_usuario: this.tipo_usuario,
      create_date: this.create_date,
      update_date: this.update_date
    };
  }
}

export const TIPOS_USUARIO = {
  CANDIDATO: 'candidato',
  EMPRESA: 'empresa',
  ENTREVISTADOR: 'entrevistador',
  ADMINISTRADOR: 'administrador'
};
