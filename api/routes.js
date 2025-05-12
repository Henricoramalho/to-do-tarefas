const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');
const tarefaController = require('./controllers/tarefaController');

// Rotas de Usuário
router.post('/usuarios', usuarioController.create);
router.get('/usuarios', usuarioController.getAll);

// Rotas de Tarefa
router.post('/tarefas', tarefaController.create);
router.get('/tarefas', tarefaController.getAll);
router.put('/tarefas/:id', tarefaController.update);
router.delete('/tarefas/:id', tarefaController.delete);

module.exports = router;