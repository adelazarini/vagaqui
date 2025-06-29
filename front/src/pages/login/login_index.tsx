import React from 'react';
import {
    LoginBox,
    Title,
    Form,
    Input,
    Button,
    ErrorMessage
} from './login_styles';

import Footer from '../../components/layout/footer';

import {
    LeftSide,
    Logo,
    Slogan,
    FeaturesList,
    FeatureItem,
    RightSide,
    ContainerMaior
} from '../../components/layout/inicio_layout';

import { useLoginController } from './login_controller';
import { FaCheckCircle, FaBriefcase, FaUsers } from 'react-icons/fa';

const Login: React.FC = () => {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        error,
        loading,
        handleLogin
    } = useLoginController();

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
                <LoginBox>
                    <Title>Login VagaQui</Title>
                    <Form onSubmit={handleLogin}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />

                        {error && <ErrorMessage>{error}</ErrorMessage>}

                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Carregando...' : 'Entrar'}
                        </Button>
                    </Form>
                </LoginBox>
            </RightSide>
            <Footer />
        </ContainerMaior>
    );
};

export default Login;
