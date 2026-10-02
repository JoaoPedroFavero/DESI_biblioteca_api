`use strict`;

const express = require(`express`);
const router = express.Router();

const autoresLivrosController = require(`../controllers/autoresLivrosController`);

//GET
router.get(`/autores-livros`, autoresLivrosController.listarAutoresLivros);
router.get(`/autores-livros/autor/:id`, autoresLivrosController.listarAutoresLivrosPorIdAutor);
router.get(`/autores-livros/livro/:id`, autoresLivrosController.listarAutoresLivrosPorIdLivro);

//POST
router.post(`/autores-livros/cadastrar`, autoresLivrosController.cadastrarAutorLivro);

module.exports = router;