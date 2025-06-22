
# RESUMO DAS ROTAS DE CANDIDATO

## Autenticação
POST   /auth/register/candidato                  # Registrar novo candidato
POST   /auth/login                               # Login
POST   /auth/forgot-password                     # Recuperar senha
POST   /auth/reset-password                      # Resetar senha com token

## Perfil do Candidato
GET    /candidatos/me                            # Buscar perfil próprio
PUT    /candidatos/me                           # Atualizar perfil
PATCH  /candidatos/me/senha                      # Alterar senha --fazer se der tempo
DELETE /candidatos/me                           # Deletar conta 

## Permissões
- Candidato: Gerenciar próprio perfil, currículo e candidaturas
- Empresa: Visualizar candidatos que se candidataram às suas vagas
- Admin: Acesso total a todos candidatos
