import React from 'react';
import {
    ContainerMaior,
    LeftSide,
    RightSide,
    Logo,
    Slogan,
    ButtonContainer,
    LoginButton,
    CadastroButton,
    FeaturesList,
    FeatureItem
} from '../../components/layout/inicio_layout';
import Footer from '../../components/layout/footer';


import { FaCheckCircle, FaBriefcase, FaUsers } from 'react-icons/fa';

const Home = () => {
    return (
        <ContainerMaior>
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
                    <CadastroButton to="/register">Cadastrar-se</CadastroButton>
                </ButtonContainer>
            </RightSide>
            <Footer />
        </ContainerMaior>

    );
};

export default Home;
