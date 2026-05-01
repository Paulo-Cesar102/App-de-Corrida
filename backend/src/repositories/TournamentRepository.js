const prisma = require('../../database/index');

class TournamentRepository {
  async create(data) {
    return await prisma.tournament.create({ data });
  }

  async findAll() {
    return await prisma.tournament.findMany({
      orderBy: { startDate: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.tournament.findUnique({
      where: { id },
      include: { participants: true }
    });
  }

  async findParticipant(userId, tournamentId) {
    return await prisma.tournamentParticipant.findUnique({
      where: {
        userId_tournamentId: { userId, tournamentId }
      }
    });
  }

  async getRanking(tournamentId) {
    return await prisma.tournamentParticipant.findMany({
      where: { tournamentId: parseInt(tournamentId) },
      include: { user: { select: { name: true, avatarUrl: true } } },
      orderBy: { totalDistance: 'desc' }
    });
  }

  async getTopParticipants(tournamentId, limit) {
    return await prisma.tournamentParticipant.findMany({
      where: { tournamentId },
      orderBy: { totalDistance: 'desc' },
      take: limit
    });
  }

  async executeJoinTransaction(userId, tournamentId, entryFee) {
    return await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { balance: { decrement: entryFee } }
      }),
      prisma.transaction.create({
        data: {
          userId,
          amount: entryFee,
          type: 'ENTRY_FEE',
          status: 'COMPLETED'
        }
      }),
      prisma.tournamentParticipant.create({
        data: { userId, tournamentId }
      })
    ]);
  }

  async executeFinalizeTransaction(tournamentId, winnersPool, admPart, participants, percentages) {
    return await prisma.$transaction(async (tx) => {
      await tx.tournament.update({
        where: { id: tournamentId },
        data: { status: 'COMPLETED', prizePool: winnersPool }
      });

      await tx.user.update({
        where: { id: 1 },
        data: { balance: { increment: admPart } }
      });
      await tx.transaction.create({
        data: { userId: 1, amount: admPart, type: 'PRIZE', status: 'COMPLETED' }
      });

      for (let i = 0; i < participants.length; i++) {
        const prize = winnersPool * percentages[i];
        await tx.user.update({
          where: { id: participants[i].userId },
          data: { balance: { increment: prize } }
        });
        await tx.transaction.create({
          data: { userId: participants[i].userId, amount: prize, type: 'PRIZE', status: 'COMPLETED' }
        });
      }
    });
  }
}

module.exports = new TournamentRepository();
