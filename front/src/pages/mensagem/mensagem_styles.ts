import styled from 'styled-components';

export const Container = styled.div`
    .candidatura-item {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #f0f0f0;
        }
    }

    .candidatura-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .ultima-mensagem {
        margin-bottom: 10px;
        
        p {
            margin: 0;
            color: #333;
        }

        small {
            color: #666;
            font-size: 0.8em;
        }
    }

    .mensagem-detalhes {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        font-size: 0.9em;
    }
`;
