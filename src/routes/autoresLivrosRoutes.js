`use strict`;

const express = require(`express`);
const router = express.Router();

const autoresLivrosController = require(`../controllers/autoresLivrosController`);

//GET
router.get(`/autores-livros/todos`, autoresLivrosController.listarAutoresLivros);
router.get(`/autores-livros/autor/id/:id`, autoresLivrosController.listarAutoresLivrosPorIdAutor);
router.get(`/autores-livros/livro/id/:id`, autoresLivrosController.listarAutoresLivrosPorIdLivro);

//POST
router.post(`/autores-livros/cadastrar`, autoresLivrosController.cadastrarAutorLivro);

module.exports = router;