import React from 'react';
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../../components/layout/modal_styles';
import { AtualizarVagaController } from './vaga_editar_controller';
import { Vaga } from '../../../models/indice_models';

interface AtualizarVagaModalProps {
    vaga: Vaga;
    isOpen: boolean;
    onClose: () => void;
}

const AtualizarVagaModal: React.FC<AtualizarVagaModalProps> = ({
    vaga,
    isOpen,
    onClose
}) => {
    const {
        dadosVaga,
        handleInputChange,
        handleSubmit
    } = AtualizarVagaController({
        vaga,
        onClose
    });

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>Editar Vaga </h3>
                    < button onClick={onClose} > x </button>
                </ModalHeader>

                < ModalBody >
                    <form onSubmit={handleSubmit}>
                        <label>Título </label>
                        < input
                            type="text"
                            name="titulo"
                            value={dadosVaga.titulo}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Descrição </label>
                        < textarea
                            name="descricao"
                            value={dadosVaga.descricao}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Salário </label>
                        < input
                            type="number"
                            name="salario"
                            value={dadosVaga.salario}
                            onChange={handleInputChange}
                            required
                        />

                        <label>Localização </label>
                        < input
                            type="text"
                            name="localizacao"
                            value={dadosVaga.localizacao}
                            onChange={handleInputChange}
                            required
                        />

                        <ModalFooter>
                            <button type="button" onClick={onClose} > Cancelar </button>
                            < button type="submit" > Salvar </button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    );
};

export default AtualizarVagaModal;
