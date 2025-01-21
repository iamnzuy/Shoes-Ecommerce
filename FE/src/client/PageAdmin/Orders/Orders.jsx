import { useEffect } from "react";
import axiosInstance from "../../../utils/axios";

function OrderList(products) {
  return products.map((product, index) => {
    <div class="mb-5 bg-white p-4 rounded-lg shadow-md" id="order-12345">
      <div class="flex justify-between items-center">
        <h6 class="font-semibold">Mã đơn hàng: 12345</h6>
        <div class="flex items-center status">
          <img
            class="mb-2 mx-2"
            src="public/frontend/client/img/pendding.png"
            style="width: 30px"
            alt=""
          ></img>
          <h6 class="text-yellow-500">ĐANG XỬ LÝ</h6>
        </div>
      </div>

      <div class="flex py-2 border-t border-gray-200">
        <div class="w-1/4">
          <img
            src="public/backend/products-images/product_a.jpg"
            class="img-fluid"
            alt=""
          ></img>
        </div>
        <div class="w-3/4 pl-5">
          <p class="mb-1 font-semibold">
            <a href="/product/1" target="_blank">
              Product A
            </a>
          </p>
          <div class="flex justify-between">
            <p class="mb-0">x2</p>
            <p class="mb-0 mt-0">150.000đ</p>
          </div>
        </div>
      </div>

      <div class="flex py-2 border-t border-gray-200">
        <div class="w-1/4">
          <img
            src="public/backend/products-images/product_b.jpg"
            class="img-fluid"
            alt=""
          ></img>
        </div>
        <div class="w-3/4 pl-5">
          <p class="mb-1 font-semibold">
            <a href="/product/2" target="_blank">
              Product B
            </a>
          </p>
          <div class="flex justify-between">
            <p class="mb-0">x1</p>
            <p class="mb-0 mt-0">200.000đ</p>
          </div>
        </div>
      </div>

      <div class="flex justify-between text-gray-800 mt-4">
        <p>0123456789 | 123 Main St</p>
        <p>Thành tiền: 300.000đ</p>
      </div>

      <div class="flex justify-end mt-4">
        <button
          class="btn-cancel border rounded-full py-2 px-4 text-red-500"
          data-order-id="12345"
        >
          Hủy đơn hàng
        </button>
      </div>
    </div>;
  });
}

function Order() {
  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await axiosInstance.get("/orders");
        console.log(response.data);
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
    </div>
  );
}

export default Order;
