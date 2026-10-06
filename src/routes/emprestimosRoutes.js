`use strict`;

const express = require(`express`);
const router = express.Router();
const emprestimosController = require(`../controllers/emprestimosController`);

//GET
router.get(`/emprestimos`, emprestimosController.listarEmprestimos);
router.get(`/emprestimos/:id`, emprestimosController.listarEmprestimosPorId);

//POST
router.post(`/emprestimos/cadastrar`, emprestimosController.cadastrarEmprestimo);

//PUT
router.put(`/emprestimos/editar`, emprestimosController.editarEmprestimo);

//DELETE
router.delete(`emprestimos/deletar/:id`, emprestimosController.deletarEmprestimo);

module.exports = router;