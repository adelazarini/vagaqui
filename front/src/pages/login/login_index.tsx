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
} from './login_styles';
import { useLoginController } from './login_controller';
import { TIPOS_USUARIO, TipoUsuario } from '../../models/usuario';

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
        <LoginContainer>
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
        </LoginContainer>
    );
};

export default Login;
