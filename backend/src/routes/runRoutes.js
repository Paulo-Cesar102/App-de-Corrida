const express = require('express');
const runController = require('../controllers/RunController');

const router = express.Router();

/**
 * Definição das rotas relacionadas a corridas.
 * O router mapeia a URL e o método HTTP para o método correspondente no Controller.
 */

// Cria uma nova corrida
router.post('/', runController.createRun);

// Lista corridas de um usuário
router.get('/user/:userId', runController.getRuns);

module.exports = router;
