import React from 'react';
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../../components/layout/modal_styles';
import { AtualizarEntrevistaController } from './atualizar_entrevista_controller';

interface AtualizarEntrevistaModalProps {
    entrevistaId: number;
    dadosAtuais: {
        data_entrevista?: string;
        hora_entrevista?: string;
        local_link?: string;
        observacoes?: string;
        status_entrevista?: string;
    };
    isOpen: boolean;
    onClose: () => void;
}

const AtualizarEntrevistaModal: React.FC<AtualizarEntrevistaModalProps> = ({
    entrevistaId,
    dadosAtuais,
    isOpen,
    onClose
}) => {
    const {
        dadosEntrevista,
        handleInputChange,
        handleSubmit
    } = AtualizarEntrevistaController({
        entrevistaId,
        dadosAtuais,
        onClose
    });

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>Atualizar Entrevista</h3>
                    <button onClick={onClose}>
                        ✕ {/* Caractere de fechamento simples */}
                    </button>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <label>Data da Entrevista</label>
                        <input
                            type="date"
                            name="data_entrevista"
                            value={dadosEntrevista.data_entrevista}
                            onChange={handleInputChange}
                        />

                        <label>Hora da Entrevista</label>
                        <input
                            type="time"
                            name="hora_entrevista"
                            value={dadosEntrevista.hora_entrevista}
                            onChange={handleInputChange}
                        />

                        <label>Local/Link</label>
                        <input
                            type="text"
                            name="local_link"
                            value={dadosEntrevista.local_link}
                            onChange={handleInputChange}
                        />

                        <label>Observações</label>
                        <textarea
                            name="observacoes"
                            value={dadosEntrevista.observacoes}
                            onChange={handleInputChange}
                        />

                        <label>Status da Entrevista</label>
                        <select
                            name="status_entrevista"
                            value={dadosEntrevista.status_entrevista}
                            onChange={handleInputChange}
                        >
                            <option value="Combinar">Combinar</option>
                            <option value="Agendada">Agendada</option>
                            <option value="Aprovado">Aprovado</option>
                            <option value="Reprovado">Reprovado</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>

                        <ModalFooter>
                            <button type="button" onClick={onClose}>Cancelar</button>
                            <button type="submit">Salvar</button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    );
};

export default AtualizarEntrevistaModal;
