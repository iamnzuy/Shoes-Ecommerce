import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'

function Order() {
    let [orders,setOrders]=useState([])
    useEffect(()=>{
       axiosInstance.get('/order').then(res=>{
           setOrders(res.data)
       })
    },[])
    console.log(orders);
  return (
    <div>orderpage</div>
  )
}

export default Order