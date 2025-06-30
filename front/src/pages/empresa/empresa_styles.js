import styled from 'styled-components';

export const FloatingButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;

    &:hover {
        background-color: #2980b9;
        transform: scale(1.1);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const InlineActionButton = styled.button`
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    margin-left: 10px;
    display: inline-flex;
    align-items: center;

    &:hover {
        color: #2980b9;
    }
`;

export const EntrevistadorModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
    }

    select, input {
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
    }
`;

export const ProximasEntrevistasContainer = styled.div`
    .entrevista-item {
        .entrevista-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .remover-btn {
            background: none;
            border: none;
            color: #e74c3c;
            cursor: pointer;
            transition: color 0.3s ease;

            &:hover {
                color: #c0392b;
            }
        }
    }
`;