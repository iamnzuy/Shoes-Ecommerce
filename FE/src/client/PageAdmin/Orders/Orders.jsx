import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";

function OrderList(orders) {
  const formatMoney = (money) => {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  };

  console.log(orders.orders);
  return (
    <div>
      {/* order card */}
      {orders.orders.map((order, index) => {
        return (
          <div
            key={index}
            className="mb-8 border border-gray-400 p-2 px-4 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order ID: {index + 1}</p>
              <p className="font-semibold">By user: {order.user.username}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="font-semibold mt-1">
                Status: <span className="text-green-500">Delivered</span>
              </p>
              <p className="font-semibold">Email: {order.user.email}</p>
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
    </div>
  );
}

function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axiosInstance.get("/order/all");
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOrder();
  }, []);
  return (
    <div className="w-full px-16">
      <h1 className="mt-6 text-2xl font-semibold text-gray-700">Orders</h1>
      <h2 className="my-2 text-xl font-semibold text-gray-700">History</h2>
      <OrderList orders={orders} />
    </div>
  );
}

export default Order;
