import styled from 'styled-components';

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
`;

export const ChatHeader = styled.div`
    background-color: #3498db;
    color: white;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const MessagesArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MessageItem = styled.div<{ isOwn: boolean }>`
    align-self: ${props => props.isOwn ? 'flex-end' : 'flex-start'};
    background-color: ${props => props.isOwn ? '#3498db' : '#fff'};
    color: ${props => props.isOwn ? '#fff' : '#333'};
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 70%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);

    strong {
        display: block;
        font-size: 0.85em;
        margin-bottom: 5px;
        opacity: 0.8;
    }

    p {
        margin: 0;
        word-wrap: break-word;
    }

    small {
        display: block;
        font-size: 0.75em;
        margin-top: 5px;
        opacity: 0.7;
    }
`;

export const InputArea = styled.div`
    display: flex;
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #e0e0e0;

    input {
        flex: 1;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        outline: none;
        font-size: 16px;

        &:focus {
            border-color: #3498db;
        }
    }
`;

export const SendButton = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2980b9;
    }
`;
