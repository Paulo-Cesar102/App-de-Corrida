import api from './index';

export const transactionApi = {
  deposit: (userId, amount) => api.post('/wallet/deposit', { userId, amount }),
  withdraw: (userId, amount) => api.post('/wallet/withdrawal', { userId, amount }),
  getHistory: (userId) => api.get(`/wallet/user/${userId}`),
};

export default transactionApi;
