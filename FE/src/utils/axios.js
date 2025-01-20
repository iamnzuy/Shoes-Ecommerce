import axios from 'axios';
import useAuthStore from '../store/authStore';
import { jwtDecode } from "jwt-decode"
axios.defaults.withCredentials = true;
let axiosInstance=axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
})



axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      let decoded=jwtDecode(token)
      if (decoded?.exp*1000<Date.now()) {
         let res=await useAuthStore.getState().refreshToken()
         if (res.data?.accessToken) {
          config.headers.token = `Bearer ${res.data?.accessToken}`;
          useAuthStore.getState().setTokens(res.data?.accessToken)
        }
      } else {
        config.headers.token = `Bearer ${token}`;
      }
    } 
   
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;