`use strict`;
const express = require(`express`);
const router = express.Router();
const usuariosController = require(`../controllers/usuariosController`);

//GET
router.get(`/usuarios`, usuariosController.listarUsuarios);
router.get(`/usuarios/:id`, usuariosController.listarUsuariosPorId);

//POST
router.post(`/usuarios/cadastrar`, usuariosController.cadastrarUsuario);

//PUT
router.put(`/usuarios/editar/:id`, usuariosController.editarUsuario);

//DELETE
router.delete(`usuarios/deletar/:id`, usuariosController.deletarUsuario);

module.exports = router;