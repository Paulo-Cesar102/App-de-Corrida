import axios from 'axios';

// Instância base do Axios
// TODO: Em produção, o baseURL deve vir de uma variável de ambiente
const api = axios.create({
  baseURL: 'http://192.168.1.9:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT em todas as requisições (se existir)
api.interceptors.request.use(async (config) => {
  // Aqui você pode buscar o token do AsyncStorage (Expo/React Native)
  // const token = await AsyncStorage.getItem('userToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
