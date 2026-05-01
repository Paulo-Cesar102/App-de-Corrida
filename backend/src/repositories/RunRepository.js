const prisma = require('../../database/index');

/**
 * RunRepository
 * 
 * Camada de Repository: Responsável exclusivamente por interagir com o banco de dados.
 * O Repository isola a lógica de acesso a dados do restante da aplicação.
 * Se trocarmos o ORM ou banco no futuro, apenas esta camada precisa ser alterada.
 */
class RunRepository {
  /**
   * Cria um novo registro de corrida no banco com rota e pace.
   * @param {Object} runData - Dados da corrida.
   */
  async create(runData) {
    return await prisma.run.create({
      data: {
        userId: runData.userId,
        tournamentId: runData.tournamentId || null,
        distance: runData.distance,
        duration: runData.duration,
        averagePace: runData.averagePace,
        route: runData.route ? JSON.stringify(runData.route) : null,
      },
    });
  }

  /**
   * Incrementa a distância total do participante em um torneio.
   */
  async updateTournamentDistance(userId, tournamentId, distance) {
    return await prisma.tournamentParticipant.update({
      where: {
        userId_tournamentId: {
          userId,
          tournamentId
        }
      },
      data: {
        totalDistance: {
          increment: distance
        }
      }
    });
  }

  /**
   * Lista todas as corridas de um usuário específico.
   * @param {number} userId - ID do usuário.
   */
  async findByUserId(userId) {
    return await prisma.run.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

module.exports = new RunRepository();
