import React from "react";
import axiosInstance from "../../utils/axios";
import { notifySuccess, notifyError } from "../../utils/toast";
import cartStore from "../../store/cartStore";

function Checkout({ active, setActive, products, totalPrice }) {
  const extractedProps = products.map((product) => ({
    product: product._id,
    quantity: product.quantity,
  }));

  const handleCheckout = () => {
    const data = {
      items: JSON.stringify([...extractedProps]),
      totalPrice: totalPrice,
    };
    axiosInstance
      .post("/order/place", data)
      .then((response) => {
        notifySuccess("Order placed successfully");
        cartStore.getState().clearCart();
      })
      .catch((error) => {
        console.log(error);
        notifyError("Order failed");
      });
  };

  return (
    <div className={`${active ? "active" : ""} cart-payment`}>
      <div className="cart-payment-container">
        <div className="cart-payment-container-hr">
          <div className="cart-payment-info">
            <div className="cart-close-payment-btn-container">
              <button
                id="cart-close-payment-btn"
                className="cart-close-btn"
                onClick={() => setActive(false)}
              >
                X
              </button>
            </div>

            <div className="cart-payment-info-header">Payment Info</div>
            <div className="cart-payment-info-subheader">Payment method</div>
            <div className="cart-payment-info-detail">
              <div>
                <input type="radio" name="payment" />
                <label>Paypal</label>
              </div>
              <div>
                <input type="radio" name="payment" />
                <label>Credit Card</label>
              </div>
              <div>
                <input type="radio" name="payment" />
                <label>Debit Card</label>
              </div>
              <div>
                <input type="radio" name="payment" />
                <label>Cash</label>
              </div>
            </div>
            <div className="cart-payment-info-subheader">Name on card</div>
            <div className="input-group">
              <input type="text" name="username" id="username" placeholder="" />
            </div>
            <div className="cart-payment-info-subheader">Card number</div>
            <div className="input-group">
              <input type="text" name="card-num" id="card-num" placeholder="" />
            </div>
            <div className="cart-payment-info-subheader-exp-container">
              <div className="cart-payment-info-subheader-exp">
                <div id="exp" className="cart-payment-info-subheader">
                  Expiration date
                </div>
                <div id="cvc" className="cart-payment-info-subheader">
                  CVC
                </div>
              </div>
            </div>
            <div className="cart-payment-info-subheader-exp-container">
              <div className="cart-payment-info-subheader-exp">
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    id="exp-input"
                    placeholder=""
                  />
                </div>
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    id="cvc-input"
                    placeholder=""
                  />
                </div>
              </div>
            </div>

            <div className="cart-payment-checkout-btn-container">
              <button
                id="cart-payment-checkout-btn"
                onClick={() => {
                  handleCheckout();
                }}
              >
                <div>Checkout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
