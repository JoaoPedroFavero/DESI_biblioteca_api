`use strict`;

const express = require(`express`);
const router = express.Router();

const livrosGenerosController = require(`../controllers/livrosGenerosController`);

//GET
router.get(`/livros-generos/todos`, livrosGenerosController.listarLivrosGeneros);
router.get(`/livros-generos/livro/id/:id`, livrosGenerosController.listarLivrosGenerosPorIdLivro);
router.get(`/livros-generos/genero/id/:id`, livrosGenerosController.listarLivrosGenerosPorIdGenero);

//POST
router.post(`/livros-generos/cadastrar`, livrosGenerosController.cadastrarLivroGenero);

module.exports = router;