import api from './index';

export const tournamentApi = {
  listTournaments: () => api.get('/tournaments'),
  joinTournament: (userId, tournamentId) => api.post('/tournaments/join', { userId, tournamentId }),
  getRanking: (tournamentId) => api.get(`/tournaments/${tournamentId}/ranking`),
};

export default tournamentApi;
