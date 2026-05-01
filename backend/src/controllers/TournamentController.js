const tournamentService = require('../services/TournamentService');

class TournamentController {
  async createTournament(req, res) {
    try {
      const tournament = await tournamentService.createTournament(req.body);
      return res.status(201).json(tournament);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async listTournaments(req, res) {
    try {
      const tournaments = await tournamentService.listTournaments();
      return res.json(tournaments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async joinTournament(req, res) {
    try {
      const { userId, tournamentId } = req.body;
      await tournamentService.joinTournament(userId, tournamentId);
      return res.status(200).json({ message: 'Inscrição realizada com sucesso!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getTournamentRanking(req, res) {
    try {
      const { tournamentId } = req.params;
      const ranking = await tournamentService.getRanking(tournamentId);
      return res.json(ranking);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async finalizeTournament(req, res) {
    try {
      const { tournamentId } = req.body;
      await tournamentService.finalizeTournament(tournamentId);
      return res.json({ message: 'Torneio finalizado e prêmios distribuídos!' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TournamentController();
