
# RESUMO DAS ROTAS DE VAGA

## CRUD Básico
POST   /vagas                                    # Criar vaga (Empresa)
GET    /vagas                                    # Listar vagas (público)
GET    /vagas/:id                                # Buscar vaga por ID (público)
PUT    /vagas/:id                                # Atualizar vaga (Empresa dona)
DELETE /vagas/:id                                # Deletar vaga (Empresa dona)

## Filtros e Buscas
GET    /vagas?search=...                         # Buscar por palavra-chave
GET    /vagas?localizacao=...                    # Filtrar por localização
GET    /vagas?salario_min=...&salario_max=...    # Filtrar por salário
GET    /vagas?empresa_id=...                     # Filtrar por empresa
GET    /vagas?page=1&limit=10                    # Paginação --criar esse
 
## Rotas Específicas
GET    /vagas/empresa/:empresaId                 # Vagas de uma empresa
GET    /vagas/:id/completa                       # Vaga com dados completos
GET    /vagas/:id/candidaturas                   # Candidaturas da vaga (Empresa)
PATCH  /vagas/:id/status                         # Ativar/Desativar vaga (Empresa) --criar esse


## Permissões
- Público: Visualizar vagas ativas
- Empresa: Criar, editar e gerenciar suas vagas
- Candidato: Visualizar e receber recomendações
- Administrador: Acesso total

## Campos da Vaga
- titulo: string (obrigatório)
- descricao: string (obrigatório)
- salario: float
- localizacao: string
- data_publicacao: date (automático)
- empresa_id: int (obrigatório)
- requisitos: text --adicionar
- beneficios: text --adicionar
- tipo_contrato: string --adicionar
- nivel: string --adicionar
- ativo: boolean
