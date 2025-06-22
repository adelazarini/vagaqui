
# RESUMO DAS ROTAS DE ENTREVISTA

## CRUD Básico (via baseRouter)
POST   /entrevistas                              # Criar entrevista
GET    /entrevistas                              # Listar todas
GET    /entrevistas/:id                          # Buscar por ID
PUT    /entrevistas/:id                          # Atualizar
DELETE /entrevistas/:id                          # Deletar

## Gerenciar Entrevistadores
GET    /entrevistas/:id/entrevistadores          # Listar entrevistadores
POST   /entrevistas/:id/entrevistadores          # Adicionar entrevistadores
DELETE /entrevistas/:id/entrevistadores/:entId   # Remover entrevistador

## Dados Completos
GET    /entrevistas/:id/completa                 # Entrevista com todos os dados
GET    /entrevistas/candidatura/:candidaturaId   # Entrevistas por candidatura

## Permissões
- Administrador: Acesso total
- Empresa: Gerenciar entrevistas e entrevistadores
- Entrevistador: Visualizar entrevistas
- Candidato: Ver suas próprias entrevistas
