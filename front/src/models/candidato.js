import { Usuario } from './usuario';

export class Candidato extends Usuario {
    constructor(data = {}) {
        super(data);
        this.cpf = data.cpf || '';
        this.telefone = data.telefone || '';
        this.formacao = data.formacao || '';
        this.experiencia = data.experiencia || '';

        // Informações adicionais do dashboard
        this.candidaturas = data.candidaturas || [];
        this.entrevistas = data.entrevistas || [];
        this.aprovacoes = data.aprovacoes || [];
        this.curriculoAtualizado = data.curriculoAtualizado || false;
    }

    // Método para formatar o telefone
    formatTelefone() {
        const cleaned = this.telefone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return this.telefone;
    }

    // Método para verificar status do currículo
    getCurriculoStatus() {
        return this.curriculoAtualizado ? 'Atualizado' : 'Desatualizado';
    }
}
