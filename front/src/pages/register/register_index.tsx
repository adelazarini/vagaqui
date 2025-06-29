import React from 'react';
import {
    LoginBox,
    Title,
    Form,
    Input,
    Button,
    ErrorMessage,
    Select
} from '../login/login_styles';

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

import { FaCheckCircle, FaBriefcase, FaUsers } from 'react-icons/fa';
import { useRegisterController } from './register_controller';
import { TIPOS_USUARIO, TipoUsuario } from '../../models/usuario';

const Register: React.FC = () => {
    const {
        nome,
        email,
        senha,
        tipoUsuario,
        setNome,
        setEmail,
        setSenha,
        setTipoUsuario,
        error,
        loading,
        handleRegister
    } = useRegisterController();

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
                    <Title>Cadastro</Title>
                    <Form onSubmit={handleRegister}>
                        <Select
                            value={tipoUsuario}
                            onChange={(e) => setTipoUsuario(e.target.value as TipoUsuario)}
                            required
                        >
                            <option value="">Selecione o Tipo de Usuário</option>
                            <option value={TIPOS_USUARIO.CANDIDATO}>Candidato</option>
                            <option value={TIPOS_USUARIO.EMPRESA}>Empresa</option>
                            <option value={TIPOS_USUARIO.ENTREVISTADOR}>Entrevistador</option>
                        </Select>

                        <Input
                            type="text"
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />

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
                            {loading ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </Form>
                </LoginBox>
            </RightSide>
            <Footer />
        </ContainerMaior>
    );
};

export default Register;
