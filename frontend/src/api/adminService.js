import api from './index';

export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  createTournament: (data) => api.post('/tournaments/admin/create', data),
  finalizeTournament: (tournamentId) => api.post('/tournaments/admin/finalize', { tournamentId }),
  createAnnouncement: (message) => api.post('/announcements/admin/create', { message }),
};

export default adminApi;
