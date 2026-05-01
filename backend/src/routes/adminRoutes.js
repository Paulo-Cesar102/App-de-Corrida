const express = require('express');
const adminController = require('../controllers/AdminController');
// TODO: Adicionar middleware de autenticação e verificação de ROLE=ADMIN futuramente
const router = express.Router();

router.get('/stats', adminController.getStats);

module.exports = router;
