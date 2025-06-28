import React from 'react';
import {
    HomeContainer,
    LeftSide,
    RightSide,
    Logo,
    Slogan,
    ButtonContainer,
    LoginButton,
    CadastroButton,
    FeaturesList,
    FeatureItem
} from './homr_styles';
import { FaCheckCircle, FaBriefcase, FaUsers } from 'react-icons/fa';

const Home = () => {
    return (
        <HomeContainer>
            <LeftSide>
                <Logo>VagaQui</Logo>
                <Slogan>
                    Conectando talentos com as melhores oportunidades
                </Slogan>

                <FeaturesList>
                    <FeatureItem>
                        <FaCheckCircle />
                        Vagas em tempo real
                    </FeatureItem>
                    <FeatureItem>
                        <FaBriefcase />
                        Processos seletivos simplificados
                    </FeatureItem>
                    <FeatureItem>
                        <FaUsers />
                        Comunidade de profissionais
                    </FeatureItem>
                </FeaturesList>
            </LeftSide>

            <RightSide>
                <h2>Bem-vindo ao VagaQui</h2>
                <p>
                    Sua plataforma completa de recrutamento e seleção.
                    Encontre as melhores vagas ou os melhores talentos.
                </p>

                <ButtonContainer>
                    <LoginButton to="/login">Fazer Login</LoginButton>
                    <CadastroButton to="/cadastro">Cadastrar-se</CadastroButton>
                </ButtonContainer>
            </RightSide>
        </HomeContainer>
    );
};

export default Home;
