import axios from 'axios';
import Storage from 'providers/Storage';
import { URL } from 'config/uri';

const api = axios.create({
  baseURL: URL,
  headers: {
    'Accept': 'application/json',
    'Accept-Language': 'pt-BR',
    'Content-Type': 'application/json',
    'X-User-Email': 'rafael.angonese@appgeolife.com',
    'X-User-Token': 'uscrFcoaJNc_cvoN2VGM',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await Storage.getItem(Storage.tokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
