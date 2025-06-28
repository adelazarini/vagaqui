import React from 'react';
import {
    LoginContainer,
    LoginBox,
    Title,
    Form,
    Select,
    Input,
    Button,
    ErrorMessage
} from './styles';
import { useLoginController } from './controller';
import { TIPOS_USUARIO, TipoUsuario } from '../../models/usuario';

const Login: React.FC = () => {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        tipoUsuario,
        setTipoUsuario,
        error,
        loading,
        handleLogin
    } = useLoginController();

    return (
        <LoginContainer>
            <LoginBox>
                <Title>Login VagaQui</Title>
                <Form onSubmit={handleLogin}>
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
        </LoginContainer>
    );
};

export default Login;
