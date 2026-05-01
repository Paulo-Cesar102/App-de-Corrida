const express = require('express');
const tournamentController = require('../controllers/TournamentController');

const router = express.Router();

router.get('/', tournamentController.listTournaments);
router.post('/join', tournamentController.joinTournament);
router.get('/:tournamentId/ranking', tournamentController.getTournamentRanking);

// Rotas Administrativas
router.post('/admin/create', tournamentController.createTournament);
router.post('/admin/finalize', tournamentController.finalizeTournament);

module.exports = router;
