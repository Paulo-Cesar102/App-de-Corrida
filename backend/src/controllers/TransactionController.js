const transactionService = require('../services/TransactionService');

class TransactionController {
  async requestWithdrawal(req, res) {
    try {
      const { userId, amount } = req.body;
      const [transaction, updatedUser] = await transactionService.requestWithdrawal(userId, amount);
      return res.status(201).json({ 
        message: 'Solicitação de saque enviada para aprovação.',
        transaction
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deposit(req, res) {
    try {
      const { userId, amount } = req.body;
      const [transaction, updatedUser] = await transactionService.deposit(userId, amount);
      return res.status(201).json({ 
        message: 'Depósito realizado com sucesso.',
        transaction
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserTransactions(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await transactionService.getUserTransactions(userId);
      return res.json(transactions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getPendingWithdrawals(req, res) {
    try {
      const pending = await transactionService.getPendingWithdrawals();
      return res.json(pending);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async approveWithdrawal(req, res) {
    try {
      const { transactionId } = req.body;
      const transaction = await transactionService.approveWithdrawal(transactionId);
      return res.json({ message: 'Saque marcado como PAGO.', transaction });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TransactionController();
