import api from './index';

export const runApi = {
  createRun: (runData) => api.post('/runs', runData),
  getUserRuns: (userId) => api.get(`/runs/user/${userId}`),
};

export default runApi;
