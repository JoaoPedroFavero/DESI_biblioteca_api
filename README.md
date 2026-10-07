# API Biblioteca

## Sobre o projeto

API RESTful para gerenciamento de uma biblioteca, desenvolvida em Node.js com Express. A API permite o cadastro e gerenciamento de autores, livros, gêneros literários, usuários e empréstimos de livros. O sistema inclui validações de dados como CPF, ISBN, datas e relações entre entidades (autores-livros e livros-gêneros).

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **MySQL2** - Driver MySQL para Node.js
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Monitoramento de alterações para reinicialização automática
- **ISBN3** - Validação de números ISBN
- **Validar-CPF** - Validação de CPF brasileiro
- **Validate-Date** - Validação de datas

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/JoaoPedroFavero/DESI_biblioteca_api.git
cd DESI_biblioteca_api
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

1. Renomeie o arquivo `.env.exemple` para `.env`
2. Configure as variáveis de ambiente no arquivo `.env`:

```env
PORT = 
USER = 
PASSWORD = 
HOST = 
DATABASE = biblioteca_db
API_PORT = 3001
```

## Execução

Iniciar a API:

```bash
npm start
```

URL padrão `http://localhost:3001`

## Endpoints

### Autores

#### Listar todos os autores
- **Método**: GET
- **Endpoint**: `/autores/todos`
- **Finalidade**: Retorna todos os autores cadastrados
- **Resposta de exemplo**:
```json
{
  "autores": [
    {
      "id": 1,
      "nome_completo": "John Ronald Reuel Tolkien",
      "nacionalidade": "Britanico",
      "data_nascimento": "1892-01-03"
    }
  ]
}
```

#### Listar autor por ID
- **Método**: GET
- **Endpoint**: `/autores/id/:id`
- **Finalidade**: Retorna um autor específico pelo ID
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "autor": [
    {
      "id": 1,
      "nome_completo": "John Ronald Reuel Tolkien",
      "nacionalidade": "Britanico",
      "data_nascimento": "1892-01-03"
    }
  ]
}
```

#### Cadastrar autor
- **Método**: POST
- **Endpoint**: `/autores/cadastrar`
- **Finalidade**: Cadastra um novo autor
- **Corpo da requisição**:
```json
{
  "nome": "J.K. Rowling",
  "nacionalidade": "Britanica",
  "data_nascimento": "31/07/1965"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Autor cadastrado com sucesso",
  "autor": { ... }
}
```

#### Editar autor
- **Método**: PUT
- **Endpoint**: `/autores/editar/:id`
- **Finalidade**: Edita os dados de um autor
- **Parâmetros**: `id` (path parameter)
- **Corpo da requisição**:
```json
{
  "nome": "Joanne Rowling",
  "nacionalidade": "Britanica",
  "data_nascimento": "31/07/1965"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Autor editado com sucesso",
  "autor": { ... }
}
```

#### Deletar autor
- **Método**: DELETE
- **Endpoint**: `/autores/deletar/:id`
- **Finalidade**: Remove um autor do banco de dados
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "message": "Autor excluído com sucesso"
}
```

### Livros

#### Listar todos os livros
- **Método**: GET
- **Endpoint**: `/livros/todos`
- **Finalidade**: Retorna todos os livros cadastrados
- **Resposta de exemplo**:
```json
{
  "livros": [
    {
      "id": 1,
      "titulo": "O Hobbit (The Hobbit)",
      "isbn": "9780618260300",
      "ano_publicacao": 1937,
      "numero_paginas": 310,
      "sinopse": "Bilbo Bolseiro é um hobbit pacato..."
    }
  ]
}
```

#### Listar livro por ID
- **Método**: GET
- **Endpoint**: `/livros/id/:id`
- **Finalidade**: Retorna um livro específico pelo ID
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "livro": [
    {
      "id": 1,
      "titulo": "O Hobbit (The Hobbit)",
      "isbn": "9780618260300",
      "ano_publicacao": 1937,
      "numero_paginas": 310,
      "sinopse": "Bilbo Bolseiro é um hobbit pacato..."
    }
  ]
}
```

#### Cadastrar livro
- **Método**: POST
- **Endpoint**: `/livros/cadastrar`
- **Finalidade**: Cadastra um novo livro
- **Corpo da requisição**:
```json
{
  "titulo": "O Senhor dos Anéis",
  "isbn": "9780261103573",
  "ano_publicacao": 1954,
  "numero_paginas": 1178,
  "sinopse": "Uma jornada épica pela Terra Média"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Livro cadastrado com sucesso",
  "livro": { ... }
}
```

#### Editar livro
- **Método**: PUT
- **Endpoint**: `/livros/editar/:id`
- **Finalidade**: Edita os dados de um livro
- **Parâmetros**: `id` (path parameter)
- **Corpo da requisição**:
```json
{
  "titulo": "O Senhor dos Anéis",
  "isbn": "9780261103573",
  "ano_publicacao": 1954,
  "numero_paginas": 1178,
  "sinopse": "Uma jornada épica pela Terra Média"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Livro editado com sucesso",
  "livro": { ... }
}
```

#### Deletar livro
- **Método**: DELETE
- **Endpoint**: `/livros/deletar/:id`
- **Finalidade**: Remove um livro do banco de dados
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "message": "Livro excluido com sucesso da biblioteca"
}
```

### Gêneros

#### Listar todos os gêneros
- **Método**: GET
- **Endpoint**: `/generos/todos`
- **Finalidade**: Retorna todos os gêneros cadastrados
- **Resposta de exemplo**:
```json
{
  "generos": [
    {
      "id": 1,
      "nome": "Ficção Científica"
    }
  ]
}
```

#### Listar gênero por ID
- **Método**: GET
- **Endpoint**: `/generos/id/:id`
- **Finalidade**: Retorna um gênero específico pelo ID
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "genero": [
    {
      "id": 1,
      "nome": "Ficção Científica"
    }
  ]
}
```

#### Cadastrar gênero
- **Método**: POST
- **Endpoint**: `/generos/cadastrar`
- **Finalidade**: Cadastra um novo gênero
- **Corpo da requisição**:
```json
{
  "nome": "Aventura"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Genero cadastrado com sucesso",
  "genero": { ... }
}
```

#### Editar gênero
- **Método**: PUT
- **Endpoint**: `/generos/editar/:id`
- **Finalidade**: Edita o nome de um gênero
- **Parâmetros**: `id` (path parameter)
- **Corpo da requisição**:
```json
{
  "nome": "Fantasia Épica"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Edição realizada com sucesso",
  "genero": { ... }
}
```

#### Deletar gênero
- **Método**: DELETE
- **Endpoint**: `/generos/deletar/:id`
- **Finalidade**: Remove um gênero do banco de dados
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "message": "Genero excluido com sucesso da biblioteca"
}
```

### Usuários

#### Listar todos os usuários
- **Método**: GET
- **Endpoint**: `/usuarios/todos`
- **Finalidade**: Retorna todos os usuários cadastrados
- **Resposta de exemplo**:
```json
{
  "usuarios": [
    {
      "id": 1,
      "nome_completo": "Bento Gonçalves",
      "cpf": "46278101050",
      "email": "bento@gmail.com",
      "telefone": "47991018202",
      "data_nascimento": "1995-04-01"
    }
  ]
}
```

#### Listar usuário por ID
- **Método**: GET
- **Endpoint**: `/usuarios/id/:id`
- **Finalidade**: Retorna um usuário específico pelo ID
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "usuario": [
    {
      "id": 1,
      "nome_completo": "Bento Gonçalves",
      "cpf": "46278101050",
      "email": "bento@gmail.com",
      "telefone": "47991018202",
      "data_nascimento": "1995-04-01"
    }
  ]
}
```

#### Cadastrar usuário
- **Método**: POST
- **Endpoint**: `/usuarios/cadastrar`
- **Finalidade**: Cadastra um novo usuário
- **Corpo da requisição**:
```json
{
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "email": "maria@gmail.com",
  "telefone": "11987654321",
  "data_nascimento": "15/03/1990"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Usuario cadastrado com sucesso",
  "usuario": { ... }
}
```

#### Editar usuário
- **Método**: PUT
- **Endpoint**: `/usuarios/editar/:id`
- **Finalidade**: Edita os dados de um usuário
- **Parâmetros**: `id` (path parameter)
- **Corpo da requisição**:
```json
{
  "nome": "Maria Santos",
  "cpf": "12345678900",
  "email": "maria.santos@gmail.com",
  "telefone": "11987654321",
  "data_nascimento": "15/03/1990"
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Usuario Editado com sucesso",
  "usuario": { ... }
}
```

#### Deletar usuário
- **Método**: DELETE
- **Endpoint**: `/usuarios/deletar/:id`
- **Finalidade**: Remove um usuário do banco de dados
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "message": "Usuario 1 excluído com sucesso"
}
```

### Empréstimos

#### Listar todos os empréstimos
- **Método**: GET
- **Endpoint**: `/emprestimos/todos`
- **Finalidade**: Retorna todos os empréstimos cadastrados
- **Resposta de exemplo**:
```json
{
  "emprestimos": [
    {
      "id": 1,
      "data_emprestimo": "2026-10-01",
      "data_devolucao": "2026-11-01",
      "livro_id": 1,
      "usuario_id": 1
    }
  ]
}
```

#### Listar empréstimo por ID
- **Método**: GET
- **Endpoint**: `/emprestimos/id/:id`
- **Finalidade**: Retorna um empréstimo específico pelo ID
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "emprestimo": [
    {
      "id": 1,
      "data_emprestimo": "2026-10-01",
      "data_devolucao": "2026-11-01",
      "livro_id": 1,
      "usuario_id": 1
    }
  ]
}
```

#### Cadastrar empréstimo
- **Método**: POST
- **Endpoint**: `/emprestimos/cadastrar`
- **Finalidade**: Cadastra um novo empréstimo
- **Corpo da requisição**:
```json
{
  "data_emprestimo": "07/10/2026",
  "data_devolucao": "07/11/2026",
  "livro_id": 1,
  "usuario_id": 1
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Empréstimo cadastrado com sucesso",
  "emprestimo": { ... }
}
```

#### Editar empréstimo
- **Método**: PUT
- **Endpoint**: `/emprestimos/editar/:id`
- **Finalidade**: Edita os dados de um empréstimo
- **Parâmetros**: `id` (path parameter)
- **Corpo da requisição**:
```json
{
  "data_emprestimo": "07/10/2026",
  "data_devolucao": "14/11/2026",
  "livro_id": 1,
  "usuario_id": 1
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Empréstimo editado com sucesso",
  "emprestimo": { ... }
}
```

#### Deletar empréstimo
- **Método**: DELETE
- **Endpoint**: `/emprestimos/deletar/:id`
- **Finalidade**: Remove um empréstimo do banco de dados
- **Parâmetros**: `id` (path parameter)
- **Resposta de exemplo**:
```json
{
  "message": "Emprestimo excluído com sucesso"
}
```

### Autores-Livros (Relacionamento)

#### Listar todos os relacionamentos autor-livro
- **Método**: GET
- **Endpoint**: `/autores-livros/todos`
- **Finalidade**: Retorna todos os relacionamentos entre autores e livros
- **Resposta de exemplo**:
```json
{
  "autoresLivros": [
    {
      "autor_id": 1,
      "livro_id": 1
    }
  ]
}
```

#### Listar livros de um autor
- **Método**: GET
- **Endpoint**: `/autores-livros/autor/id/:id`
- **Finalidade**: Retorna todos os livros de um autor específico
- **Parâmetros**: `id` (path parameter - ID do autor)
- **Resposta de exemplo**:
```json
{
  "autorLivros": [
    {
      "autor_id": 1,
      "livro_id": 1
    }
  ]
}
```

#### Listar autores de um livro
- **Método**: GET
- **Endpoint**: `/autores-livros/livro/id/:id`
- **Finalidade**: Retorna todos os autores de um livro específico
- **Parâmetros**: `id` (path parameter - ID do livro)
- **Resposta de exemplo**:
```json
{
  "livros": [
    {
      "autor_id": 1,
      "livro_id": 1
    }
  ]
}
```

#### Cadastrar relacionamento autor-livro
- **Método**: POST
- **Endpoint**: `/autores-livros/cadastrar`
- **Finalidade**: Cria um relacionamento entre um autor e um livro
- **Corpo da requisição**:
```json
{
  "idAutor": 1,
  "idLivro": 2
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Relacionamento entre autor e livro cadastrado com sucesso",
  "relacionamento": { ... }
}
```

### Livros-Gêneros (Relacionamento)

#### Listar todos os relacionamentos livro-gênero
- **Método**: GET
- **Endpoint**: `/livros-generos/todos`
- **Finalidade**: Retorna todos os relacionamentos entre livros e gêneros
- **Resposta de exemplo**:
```json
{
  "livrosGeneros": [
    {
      "livro_id": 1,
      "genero_id": 2
    }
  ]
}
```

#### Listar gêneros de um livro
- **Método**: GET
- **Endpoint**: `/livros-generos/livro/id/:id`
- **Finalidade**: Retorna todos os gêneros de um livro específico
- **Parâmetros**: `id` (path parameter - ID do livro)
- **Resposta de exemplo**:
```json
{
  "livroBuscado": [
    {
      "livro_id": 1,
      "genero_id": 2
    }
  ]
}
```

#### Listar livros de um gênero
- **Método**: GET
- **Endpoint**: `/livros-generos/genero/id/:id`
- **Finalidade**: Retorna todos os livros de um gênero específico
- **Parâmetros**: `id` (path parameter - ID do gênero)
- **Resposta de exemplo**:
```json
{
  "generoBuscado": [
    {
      "livro_id": 1,
      "genero_id": 2
    }
  ]
}
```

#### Cadastrar relacionamento livro-gênero
- **Método**: POST
- **Endpoint**: `/livros-generos/cadastrar`
- **Finalidade**: Cria um relacionamento entre um livro e um gênero
- **Corpo da requisição**:
```json
{
  "idLivro": 1,
  "idGenero": 1
}
```
- **Resposta de exemplo**:
```json
{
  "message": "Relacionamento entre Livro e Genero cadastrado com sucesso",
  "relacionamento": { ... }
}
```

## Validações

A API realiza as seguintes validações:

- **CPF**: Validação de formato e algoritmo brasileiro
- **ISBN**: Validação de formato usando a biblioteca ISBN3
- **Datas**: Validação de formato (DD/MM/AAAA) e consistência (data de devolução >= data de empréstimo)
- **Email**: Validação básica de formato (deve conter @ e .com)
- **Telefone**: Deve conter apenas números
- **Ano de publicação**: Deve estar entre 1901 e 2155 e conter apenas números
- **Campos obrigatórios**: Validação de campos não nulos ou vazios

## Autor

**João Pedro Favero**
