import { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";
import cartStore from "../../store/cartStore";
import Checkout from "./checkout";

function Cart() {
  const {
    cart: products,
    totalPrice,
    handleAdd,
    handleDecrease,
  } = cartStore();
  const cart = cartStore((state) => state.cart);
  const [active, setActive] = useState(false);

  console.log(length(products));

  return (
    <>
      <h2 className="cart-title">My cart</h2>
      <div className="cart-items-headers-container">
        <div className="cart-items-headers">
          <div className="cart-items-header" id="cart-item-img-header">
            PRODUCT
          </div>
          <div className="cart-items-header" id="cart-item-info-header">
            DESCRIPTION
          </div>
          <div className="cart-items-header" id="cart-item-price-header">
            PRICE
          </div>
          <div className="cart-items-header" id="cart-item-quantity-header">
            QUANTITY
          </div>
          <div className="cart-items-header" id="cart-item-price-total-header">
            TOTAL
          </div>
        </div>
      </div>
      <div id="hr">
        {" "}
        <hr />
      </div>

      <div className="cart-items-container">
        {products.map((product, index) => (
          <div key={index} className="cart-items">
            <div className="cart-item" id="cart-item-img">
              <img src={product.image} alt="" />
            </div>
            <div className="cart-item" id="cart-item-info">
              <div>
                <div id="cart-item-name">{product.name}</div>
                <div>
                  <i>{product.descriptionShorten}</i>
                </div>
              </div>
            </div>
            <div className="cart-item" id="cart-item-price">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </div>
            <div className="cart-item" id="cart-item-quantity">
              <button className="btn-add" onClick={() => handleAdd(index)}>
                {" "}
                +{" "}
              </button>
              <div>{product.quantity}</div>
              <button className="btn-rmv" onClick={() => handleDecrease(index)}>
                {" "}
                -{" "}
              </button>
            </div>
            <div className="cart-item" id="cart-item-price-total">
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price * product.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-checkout-info">
        <div className="cart-checkout-info-container">
          <div className="cart-checkout-box">
            <div className="cart-checkout-item">
              <div className="cart-checkout-item-detail">
                <div>Total products:</div>
                <div>{totalPrice}</div>
              </div>
              <div className="cart-checkout-item-detail">
                <div>Shipping cost:</div>
                <div>Free</div>
              </div>
            </div>
            <button
              className="cart-checkout-item"
              id="cart-checkout-btn"
              onClick={() => setActive(true)}
            >
              <div>Checkout</div>
              <div>{totalPrice}</div>
            </button>
          </div>
        </div>
      </div>
      <Checkout
        active={active}
        setActive={setActive}
        products={products}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default Cart;
