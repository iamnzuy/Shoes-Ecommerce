import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import useFetch from '../../hooks/useFetch'
import Loader from '../../components/Loader'
function Order() {
   let {data: orders,isLoading}=useFetch('/order')
    
    console.log(orders,isLoading);
    if (isLoading) return <Loader/>
  return (
    <div>orderpage</div>
  )
}

export default Order