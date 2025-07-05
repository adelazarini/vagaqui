
# Documentação da API VagaQui com Swagger

## Instalação

1. Instale as dependências:
```bash
npm install swagger-jsdoc swagger-ui-express
```

2. Adicione o arquivo de configuração em `src/config/swagger.js`

3. Adicione as anotações JSDoc nos controllers

4. Configure no servidor principal (app.js ou server.js)

## Acessar a documentação

Após iniciar o servidor, acesse:
```
http://localhost:3000/api-docs
```

## Estrutura da documentação

- **Autenticação**: Login e registro
- **Vagas**: CRUD de vagas
- **Candidaturas**: Gerenciamento de candidaturas
- **Entrevistas**: Agendamento e gestão
- **Mensagens**: Sistema de chat
- **Dashboard**: Estatísticas e resumos

## Autenticação

A API usa JWT Bearer token. Após fazer login:
1. Copie o token retornado
2. Clique em "Authorize" no Swagger UI
3. Digite: `Bearer [seu-token]`

## Exemplos de uso

### Login
```json
POST /api/auth/login
{
  "email": "usuario@example.com",
  "senha": "123456",
}
```

### Criar vaga (requer autenticação)
```json
POST /api/vaga
{
  "titulo": "Desenvolvedor Full Stack",
  "descricao": "Vaga para desenvolvedor",
  "salario": 8000,
  "localizacao": "São Paulo"
}
```