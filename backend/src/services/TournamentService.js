const tournamentRepository = require('../repositories/TournamentRepository');
const userRepository = require('../repositories/UserRepository');

class TournamentService {
  async createTournament(data) {
    return await tournamentRepository.create({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: 'UPCOMING'
    });
  }

  async listTournaments() {
    return await tournamentRepository.findAll();
  }

  async joinTournament(userId, tournamentId) {
    const tournament = await tournamentRepository.findById(tournamentId);
    const user = await userRepository.findById(userId);

    if (!tournament) throw new Error('Torneio não encontrado.');
    if (!user) throw new Error('Usuário não encontrado.');
    if (user.balance < tournament.entryFee) throw new Error('Saldo insuficiente para inscrição.');

    if (tournament.maxParticipants && tournament.participants.length >= tournament.maxParticipants) {
      throw new Error('Limite de participantes atingido.');
    }

    const alreadyJoined = await tournamentRepository.findParticipant(userId, tournamentId);
    if (alreadyJoined) throw new Error('Usuário já inscrito neste torneio.');

    return await tournamentRepository.executeJoinTransaction(userId, tournamentId, tournament.entryFee);
  }

  async getRanking(tournamentId) {
    return await tournamentRepository.getRanking(tournamentId);
  }

  async finalizeTournament(tournamentId) {
    const tournament = await tournamentRepository.findById(tournamentId);

    if (!tournament || tournament.status === 'COMPLETED') {
      throw new Error('Torneio inválido ou já finalizado.');
    }

    const totalCollected = tournament.entryFee * tournament.participants.length;
    let winnersPool = 0;
    let admPart = 0;

    if (tournament.prizeType === 'FIXED') {
      winnersPool = tournament.fixedPrizeValue || 0;
      admPart = totalCollected - winnersPool;
    } else {
      // PERCENTAGE (70% Winners / 30% ADM)
      admPart = totalCollected * 0.30;
      winnersPool = totalCollected * 0.70;
    }

    const topParticipants = await tournamentRepository.getTopParticipants(tournamentId, 5);
    // Distribuição do pool de vencedores: 1º ao 5º
    const percentages = [0.50, 0.30, 0.10, 0.05, 0.05];

    return await tournamentRepository.executeFinalizeTransaction(
      tournamentId, 
      winnersPool, 
      admPart, 
      topParticipants, 
      percentages
    );
  }
  }


module.exports = new TournamentService();
