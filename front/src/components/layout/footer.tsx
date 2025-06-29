import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    position: fixed;
    bottom: 0;
    width: 100%;
    font-size: 0.75rem;
    color: #888;
`;

const FooterLink = styled.a`
    color: #666;
    text-decoration: none;
    margin-left: 0.5rem;
    transition: color 0.2s ease;

    &:hover {
        color: #4a90e2;
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            © 2025 VagaQui
            <FooterLink href="/termos">Termos</FooterLink>
            <FooterLink href="/privacidade">Privacidade</FooterLink>
        </FooterContainer>
    );
};

export default Footer;
