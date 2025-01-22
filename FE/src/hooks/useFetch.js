import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios';
import { notifyError } from '../utils/toast';

function useFetch(url) {
    let [isLoading,setIsLoading]=useState(true)
    let [data,setData]=useState(null)
    useEffect(()=>{
         setIsLoading(true);
         axiosInstance.get(url).then(res=>{
            setData(res.data)
         }).catch(err=>{
            notifyError(err.response?.data?.message)
         }).finally(()=>setIsLoading(false))
    },[url])
  return {data,isLoading}
}

export default useFetch