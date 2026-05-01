import api from './index';

export const authApi = {
  login: (identifier, password) => api.post('/auth/login', { identifier, password }),
  register: (userData) => api.post('/auth/register', userData),
};

export default authApi;
