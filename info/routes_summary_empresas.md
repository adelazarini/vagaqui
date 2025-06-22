
# RESUMO DAS ROTAS DE EMPRESA

## Autenticação
POST   /auth/register/empresa                    # Registrar nova empresa
POST   /auth/login                               # Login
POST   /auth/forgot-password                     # Recuperar senha

## Perfil da Empresa
GET    /empresas                                 # Listar empresas (público)
GET    /empresas/:id                             # Buscar empresa por ID (público)
GET    /empresas/me                              # Buscar perfil próprio
PUT    /empresas/me                              # Atualizar perfil
PATCH  /empresas/me/senha                        # Alterar senha
POST   /empresas/me/logo                         # Upload de logo

## Permissões
- Empresa: Gerenciar próprio perfil, vagas, candidaturas e entrevistadores
- Admin: Acesso total a todas empresas
- Público: Visualizar informações básicas das empresas
