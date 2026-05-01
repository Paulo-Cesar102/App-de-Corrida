const express = require('express');
const transactionController = require('../controllers/TransactionController');

const router = express.Router();

// Rotas de Carteira (Públicas/Autenticadas)
router.post('/deposit', transactionController.deposit);
router.post('/withdrawal', transactionController.requestWithdrawal);
router.get('/user/:userId', transactionController.getUserTransactions);

// Rotas Administrativas (Protegidas)
router.get('/admin/pending-withdrawals', transactionController.getPendingWithdrawals);
router.post('/admin/approve-withdrawal', transactionController.approveWithdrawal);

module.exports = router;
