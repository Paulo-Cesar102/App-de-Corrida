const transactionRepository = require('../repositories/TransactionRepository');

class TransactionService {
  async requestWithdrawal(userId, amount) {
    if (!userId || !amount || amount <= 0) {
      throw new Error('Dados inválidos para saque.');
    }

    const user = await transactionRepository.findUserById(userId);
    if (!user) throw new Error('Usuário não encontrado.');
    if (user.balance < amount) throw new Error('Saldo insuficiente.');

    return await transactionRepository.executeWithdrawalTransaction(userId, amount);
  }

  async deposit(userId, amount) {
    if (!userId || !amount || amount <= 0) {
      throw new Error('Dados inválidos para depósito.');
    }
    return await transactionRepository.executeDepositTransaction(userId, amount);
  }

  async getUserTransactions(userId) {
    return await transactionRepository.findByUserId(userId);
  }

  async getPendingWithdrawals() {
    return await transactionRepository.findPendingWithdrawals();
  }

  async approveWithdrawal(transactionId) {
    return await transactionRepository.updateStatus(transactionId, 'COMPLETED');
  }
}

module.exports = new TransactionService();
