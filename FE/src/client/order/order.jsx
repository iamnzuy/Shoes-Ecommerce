import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axios'
import useFetch from '../../hooks/useFetch'
import Loader from '../../components/Loader'
import { use } from 'react'

function OrderCard(orders){
  const formatMoney = (money) => {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  };

  return ( <div>
    {orders.orders.map((order, index) => {
     
      return (
        <div
          key={index}
          className="mb-8 border border-gray-400 p-2 px-4 rounded-xl"
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold">Order ID: {index + 1}</p>
           
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold mt-1">
              Status: <span className="text-green-500">Delivered</span>
            </p>
            <p className="font-semibold">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          {order.items.map((item, index) => {
            // product card
            return (
              <div key={index}>
                <hr className="border-gray-400 mt-2 w-full" />
                <div
                  key={index}
                  className="flex justify-between items-center my-1 px-16"
                >
                  {item.product !== null ? (
                    <>
                      <img src={item.product.image}></img>
                      <p>{item.product.name}</p>
                      <p>x{item.quantity}</p>
                      <p>{formatMoney(item.quantity * item.product.price)}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            );
          })}
          <p className="font-bold mt-2">
            Total: {formatMoney(order.totalPrice)}
          </p>
        </div>
      );
    })}
  </div>)
  return (<></>)
}

function Order() {
  let {data: orders,isLoading=true}=useFetch('/order')
 
  if (isLoading) return <Loader/>
  else
  return (
   <div className="mx-4 my-2">
    <h2 className="font-bold text-3xl my-2">Order</h2>
    <OrderCard orders={orders}/>
   </div>
  );
}

export default Order