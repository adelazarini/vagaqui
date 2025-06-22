%% Entidades
Usuario["Usuario
---------
id: int (PK)
nome: string
email: string
senha: string
tipo_usuario: enum
token: string
create: date
update: date"]

Candidato["Candidato
---------
id: int (PK)
nome: string
email: string
cpf: string
telefone: string
formacao: string
experiencia: text
senha: string
usuario_id: int (FK)
create: date
update: date"]

Empresa["Empresa
---------
id: int (PK)
nome: string
email: string
cnpj: string
telefone: string
senha: string
usuario_id: int (FK)
create: date
update: date"]

Entrevistador["Entrevistador
---------
id: int (PK)
nome: string
email: string
cargo: string
usuario_id: int (FK)
empresa_id: int (FK)
create: date
update: date"]

Vaga["Vaga
---------
id: int (PK)
titulo: string
descricao: string
salario: float
localizacao: string
data_publicacao: date
empresa_id: int (FK)
create: date
update: date"]

Curriculo["Curriculo
---------
id: int (PK)
url_documento: string
data_envio: date
candidato_id: int (FK)
create: date
update: date"]

Candidatura["Candidatura
---------
id: int (PK)
vaga_id: int (FK)
candidato_id: int (FK)
status: string
data_candidatura: date
create: date
update: date"]

Entrevista["Entrevista
---------
id: int (PK)
candidatura_id: int (FK)
observacoes: string
create: date
update: date"]

EntrevistaEntrevistador["EntrevistaEntrevistador
---------
id: int (PK)
entrevista_id: int (FK)
entrevistador_id: int (FK)
data_entrevista: date
hora_entrevista: time
local_link: string
observacoes_individuais: string
create: date
update: date"]

%% Tipos de Usuário:
%% Administrador: Gerencia todo o sistema
%% Empresa: Cria vagas e agenda entrevistas
%% Entrevistador: Conduz entrevistas
%% Candidato: Se candidata às vagas

%% Relacionamentos
Usuario -- "1:1" --- Candidato
Usuario -- "1:1" --- Empresa
Usuario -- "1:1" --- Entrevistador

Empresa -- "1:N publica" --- Vaga

Candidato -- "1:1 possui" --- Curriculo
Candidato -- "1:N realiza" --- Candidatura

Vaga -- "1:N recebe" --- Candidatura

Candidatura -- "1:N agenda_para" --- Entrevista

Entrevista -- "N:N conduz" --- Entrevistador : através de EntrevistaEntrevistador
