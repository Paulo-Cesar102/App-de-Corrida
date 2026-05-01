const runRepository = require('../repositories/RunRepository');
const tournamentRepository = require('../repositories/TournamentRepository');

/**
 * RunService
 * 
 * Camada de Service: Contém a regra de negócio da aplicação.
 * Aqui fazemos validações, cálculos ou integrações antes de salvar os dados.
 * O Service chama o Repository para interagir com o banco.
 */
class RunService {
  /**
   * Salva os dados de uma nova corrida com métricas Strava.
   * @param {Object} runData 
   */
  async saveRun(runData) {
    if (runData.distance <= 0) {
      throw new Error("A distância deve ser maior que zero.");
    }
    if (runData.duration <= 0) {
      throw new Error("A duração deve ser maior que zero.");
    }

    const distanceKm = runData.distance / 1000;
    const durationMin = runData.duration / 60;
    const pace = distanceKm > 0 ? (durationMin / distanceKm) : 0;

    const dataToSave = {
      ...runData,
      averagePace: parseFloat(pace.toFixed(2))
    };

    // Se houver torneio, verifica se está dentro do horário permitido
    if (runData.tournamentId) {
      const tournament = await tournamentRepository.findById(runData.tournamentId);
      if (tournament) {
        const now = new Date();
        const currentHour = now.getHours();
        
        if (currentHour < tournament.startHour || currentHour > tournament.endHour) {
          throw new Error(`Este torneio só permite corridas entre ${tournament.startHour}h e ${tournament.endHour}h.`);
        }
      }
    }

    // Salva a corrida e, se houver torneio, atualiza a quilometragem acumulada do participante
    const savedRun = await runRepository.create(dataToSave);

    if (runData.tournamentId) {
      await runRepository.updateTournamentDistance(
        runData.userId,
        runData.tournamentId,
        runData.distance
      );
    }

    return savedRun;
  }

  /**
   * Recupera o histórico de corridas de um usuário.
   * @param {number} userId 
   */
  async getUserRuns(userId) {
    if (!userId) {
      throw new Error("ID de usuário inválido.");
    }
    return await runRepository.findByUserId(userId);
  }
}

module.exports = new RunService();
