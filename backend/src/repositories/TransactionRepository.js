const prisma = require('../../prisma/index');

class TransactionRepository {
  async findUserById(userId) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  async executeWithdrawalTransaction(userId, amount) {
    return await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId,
          amount,
          type: 'WITHDRAWAL',
          status: 'PENDING'
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { balance: { decrement: amount } }
      })
    ]);
  }

  async executeDepositTransaction(userId, amount) {
    return await prisma.$transaction([
      prisma.transaction.create({
        data: {
          userId,
          amount,
          type: 'DEPOSIT',
          status: 'COMPLETED'
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { balance: { increment: amount } }
      })
    ]);
  }

  async findByUserId(userId) {
    return await prisma.transaction.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findPendingWithdrawals() {
    return await prisma.transaction.findMany({
      where: { type: 'WITHDRAWAL', status: 'PENDING' },
      include: { user: { select: { name: true, pixKey: true, email: true } } },
      orderBy: { createdAt: 'asc' }
    });
  }

  async updateStatus(transactionId, status) {
    return await prisma.transaction.update({
      where: { id: transactionId },
      data: { status }
    });
  }
}

module.exports = new TransactionRepository();
