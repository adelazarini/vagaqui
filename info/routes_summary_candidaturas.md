
# RESUMO DAS ROTAS DE CANDIDATURA

## CRUD Básico
POST   /candidaturas                              # Criar candidatura
GET    /candidaturas                              # Listar todas (admin/empresa)
GET    /candidaturas/:id                          # Buscar por ID
PUT    /candidaturas/:id                          # Atualizar candidatura
DELETE /candidaturas/:id                          # Deletar candidatura

## Rotas Específicas
GET    /candidaturas/candidato/:candidatoId       # Candidaturas de um candidato
GET    /candidaturas/vaga/:vagaId                 # Candidaturas para uma vaga
GET    /candidaturas/:id/completa                 # Candidatura com todos os dados
PATCH  /candidaturas/:id/status                   # Atualizar apenas status

## Filtros
GET    /candidaturas?status=...&vaga_id=...       # Filtros via query string
GET    /candidaturas/resumo/candidato/:id         # Resumo do candidato

## Permissões
- Administrador: Acesso total
- Empresa: Gerenciar candidaturas das suas vagas
- Candidato: Ver e criar suas próprias candidaturas
- Entrevistador: Visualizar candidaturas relacionadas às suas entrevistas
