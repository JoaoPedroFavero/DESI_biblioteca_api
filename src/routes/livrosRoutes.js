`use strict`;

const express = require(`express`);
const router = express.Router();

const livrosController = require(`../controllers/livrosController`);

//GET
router.get(`/livros/todos`, livrosController.listarLivros);
router.get(`/livros/id/:id`, livrosController.listarLivrosPorId);

//POST
router.post(`/livros/cadastrar`, livrosController.cadastrarLivro);

//PUT
router.put(`/livros/editar/:id`, livrosController.editarLivro);

//DELETE
router.delete(`/livros/deletar/:id`, livrosController.deletarLivro);

module.exports = router;