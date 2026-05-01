import api from './index';

export const userApi = {
  getUserStats: (userId) => api.get(`/users/${userId}/stats`),
};

export default userApi;
