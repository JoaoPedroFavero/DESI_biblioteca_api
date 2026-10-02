`use strict`;

const express = require(`express`);
const router = express.Router();

const livrosGenerosController = require(`../controllers/livrosGenerosController`);

//GET
router.get(`/livros-generos`, livrosGenerosController.listarLivrosGeneros);
router.get(`/livros-generos/livro/:id`, livrosGenerosController.listarLivrosGenerosPorIdLivro);
router.get(`/livros-generos/genero/:id`, livrosGenerosController.listarLivrosGenerosPorIdGenero);

//POST
router.post(`/livros-generos/cadastrar`, livrosGenerosController.cadastrarLivroGenero);

module.exports = router;