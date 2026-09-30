`use strict`;
const express = require(`express`);
const router = express.Router();

const autoresController = require(`../controllers/autoresController`);

//GET
router.get(`/autores`, autoresController.listarAutores);
router.get(`/autores/:id`, autoresController.listarAutoresPorId);

//POST
router.post(`/autores/cadastrar`, autoresController.cadastrarAutor);

//PUT
router.put(`/autores/editar/:id`, autoresController.editarAutor);

//DELETE
router.delete(`autores/deletar/:id`, autoresController.deletarAutor);

module.exports = router;