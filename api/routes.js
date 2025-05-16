const express = require('express')
const router = express.Router()

const usuarioController = require('./controllers/usuarioController')

const tarefaController = require('./controllers/tarefaController')

router.post('/usuarios', usuarioController.criarUsuario)
router.get('/usuarios', usuarioController.listarUsuarios)

router.post('/tarefas', tarefaController.criarTarefa)
router.get('/tarefas', tarefaController.listarTarefas)
router.put('/tarefas/:id', tarefaController.atualizarTarefa)
router.delete('/tarefas/:id', tarefaController.deletarTarefa)

module.exports = router