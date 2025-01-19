import axios from 'axios';
import useAuthStore from '../store/authStore';

axios.defaults.baseURL = 'http://localhost:5000';



axios.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    console.log(accessToken)
    if (accessToken) {
      config.headers.token = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        const res = await axios.post('/auth/refresh', { refreshToken });
        
        const { accessToken } = res.data;
        useAuthStore.getState().setTokens(accessToken, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;