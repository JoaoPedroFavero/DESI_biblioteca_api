`use strict`;
const express = require(`express`);
const router = express.Router();

const generosController = require(`../controllers/generosController`);

//GET
router.get(`/generos`, generosController.listarGeneros);
router.get(`/generos/:id`, generosController.listarGenerosPorId);

//POST
router.post(`/generos/cadastrar`, generosController.cadastrarGenero);

//PUT
router.put(`/generos/editar/:id`, generosController.editarGenero);

//DELETE
router.delete(`/generos/deletar/:id`, generosController.deletarGenero);

module.exports = router;