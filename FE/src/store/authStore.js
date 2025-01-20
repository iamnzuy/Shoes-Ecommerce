import { create } from "zustand";
import { persist } from "zustand/middleware"; 
import axiosInstance from '../utils/axios'
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toast";
const useAuthStore = create(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      ischecking: false,
      async loginUser({email,password},navigate) {
         try {
          let response=await axiosInstance.post('/auth/login',{email,password})
          .catch((err) => {console.log(err)});
          let {accessToken,refreshToken,...user}=response.data
          set({ accessToken, refreshToken,user })
          notifySuccess('login successfully')
          navigate('/client')
         } catch (error) {
            notifyError(error.response?.data?.message)
         }
         
      },
      async registerUser({username,email,password},navigate) {
        try {
         await axiosInstance.post('/auth/register',{username,email,password})
         notifySuccess('account created successfully')
         navigate('/login')
        } catch (error) {
           notifyError(error.response?.data?.message)
        }
        
     },
     async refreshToken() {
      try {
        let response=await axios.get('/auth/refreshToken');
        console.log(response)
        return response
      } catch (error) {
        console.log(error);
        return null
      }
  
     },
     setTokens(token) {
         set({accessToken: token})
     },
      logout: () => set({ 
        accessToken: null, 
        user: null 
      }),

     checkAuth: async () => {
      try {
        set({ischecking: true})
        let response=await axiosInstance.get('/auth/checkauth')
        set({user: response.data})
       } catch (error) {
        console.log(error);
          set({user: null})
       } finally {
          set({ischecking: false})
       }
      },
    }),
    {
      name: 'auth-storage', 
    }
  )
);

export default useAuthStore;