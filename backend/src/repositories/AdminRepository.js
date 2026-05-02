const prisma = require('../../prisma/index');

class AdminRepository {
  async getTotalUsers() {
    return await prisma.user.count();
  }

  async getTotalParticipants() {
    return await prisma.tournamentParticipant.count();
  }

  async getAdminProfit() {
    // Lucro do ADM é a soma das transações de tipo PRIZE para o usuário ID 1
    // que representam a porcentagem ou sobra dos torneios.
    const aggregate = await prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        userId: 1,
        type: 'PRIZE',
        status: 'COMPLETED'
      }
    });
    return aggregate._sum.amount || 0;
  }
}

module.exports = new AdminRepository();
