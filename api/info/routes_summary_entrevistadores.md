
# RESUMO DAS ROTAS DE ENTREVISTADOR

## Autenticação
POST   /auth/register/entrevistador              # Registrar novo entrevistador
POST   /auth/login                               # Login
POST   /auth/forgot-password                     # Recuperar senha
POST   /auth/reset-password                      # Resetar senha com token

## Perfil do Entrevistador
GET    /entrevistadores/me                       # Buscar perfil próprio
PUT    /entrevistadores/me                       # Atualizar perfil (limitado)
PATCH  /entrevistadores/me/senha                 # Alterar senha


## Permissões
- Entrevistador: Acesso apenas às suas entrevistas e candidatos relacionados
- Não pode criar/deletar entrevistas (apenas empresa faz isso)
- Pode apenas visualizar e dar feedback

## Observações
- Entrevistadores são criados pela empresa
- Primeiro acesso requer troca de senha temporária
- Acesso limitado apenas aos candidatos que irá/já entrevistou
