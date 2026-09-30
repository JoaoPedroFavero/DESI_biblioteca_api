`use strict`;

const express = require(`express`);
const router = express.Router();

const livrosController = require(`../controllers/livrosController`);

//GET
router.get(`/livros`, livrosController.listarLivros);
router.get(`/livros/:id`, livrosController.listarLivrosPorId);

//POST
router.post(`/livros/cadastrar`, livrosController.cadastrarLivro);

//PUT
router.put(`livros/editar/:id`, livrosController.editarLivro);

//DELETE
router.delete(`livros/deletar/:id`, livrosController.deletarLivro);

module.exports = router;