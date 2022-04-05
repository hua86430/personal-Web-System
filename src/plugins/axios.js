import axios from 'axios';
import store from '../store';

axios.defaults.headers = {
  // 'Cache-Control': 'no-cache',
  'Content-Type': 'application/json'
  // Expires: '0'
  // common: {
  // }
};
axios.interceptors.request.use(config => {
  config.withCredentials = true;
  store.commit('isLoading', true);
  return config;
});
axios.interceptors.response.use(response => {
  localStorage.removeItem('nowID');
  store.commit('isLoading', false);

  return response;
});
export default axios;
