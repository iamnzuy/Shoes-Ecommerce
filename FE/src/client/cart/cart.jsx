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

    let p_lenght = products.length;

    if (p_lenght > 0)
        return (
            <>
                <h2 className="cart-title">My cart</h2>
                <div className="cart-items-headers-container">
                    <div className="cart-items-headers">
                        <div
                            className="cart-items-header"
                            id="cart-item-img-header"
                        >
                            PRODUCT
                        </div>
                        <div
                            className="cart-items-header"
                            id="cart-item-info-header"
                        >
                            DESCRIPTION
                        </div>
                        <div
                            className="cart-items-header"
                            id="cart-item-price-header"
                        >
                            PRICE
                        </div>
                        <div
                            className="cart-items-header"
                            id="cart-item-quantity-header"
                        >
                            QUANTITY
                        </div>
                        <div
                            className="cart-items-header"
                            id="cart-item-price-total-header"
                        >
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
                                    <div id="cart-item-name">
                                        {product.name}
                                    </div>
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
                                <button
                                    className="btn-add"
                                    onClick={() => handleAdd(index)}
                                >
                                    {" "}
                                    +{" "}
                                </button>
                                <div>{product.quantity}</div>
                                <button
                                    className="btn-rmv"
                                    onClick={() => handleDecrease(index)}
                                >
                                    {" "}
                                    -{" "}
                                </button>
                            </div>
                            <div
                                className="cart-item"
                                id="cart-item-price-total"
                            >
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
    else
        return (
            <div className="empty-cart">
                <div className="row-flex-container-100">
                    <div className="col-flex-container-80">
                        <p id="empty_title">Oops! Your cart is empty!</p>
                        <svg
                            id="cart-icon"
                            data-name="Layer 1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 661.53 894.03"
                        >
                            <g>
                                <path
                                    d="M436.44,131.72c34.22,4.92,111.63-15.52,127.47,24.21l97.62,702.6c-.28,12.23-8.16,29.6-19.83,34.57l-621.75.93C8.48,885.3-.19,873.43,0,858.19L93.73,159.09c15.59-46.17,94.46-21.06,132.39-27.37V60.94c0-20.4,32.55-51.68,52.46-56.74,31.06-7.89,108.34-5.93,133.17,16.71,7.32,6.67,24.68,35.72,24.68,44.08v66.74ZM416.22,131.72v-66.74c0-6.17-12.18-25.34-18.17-30.37-26.16-22-102.35-23.34-129.48-4.03-4.57,3.25-22.22,22.44-22.22,26.31v74.82h169.87ZM553.74,200.48c-4.93-15.76-1.43-35.53-16.17-46.52l-410.45-1.93c-20.44,3.95-19.27,31.76-18.28,48.45h444.9ZM634.63,811.21l-78.6-586.73-441.32-3.97-10.2,1.94L23.9,811.21h610.73ZM632.61,827.39H25.92c-10.41,7.2-7.91,43.45.67,48.86l603.9,1.61c18.49-11.3,14.5-35.45,2.11-50.46Z"
                                    fill="#f84814"
                                />
                                <path
                                    d="M264.55,568.54h129.43c7.62,0,7.62,20.22,0,20.22h-129.43c-6.17,0-9.38-16.61,0-20.22Z"
                                    fill="#f84814"
                                />
                            </g>
                            <path
                                d="M202.62,383.78c1.52,20.82,7.2,41.04,16.88,59.56,2.56,4.89,5.41,9.61,8.52,14.16,1.51,2.2,3.41,3.92,6.04,4.65,2.42.67,5.64.37,7.79-1.02s4.06-3.46,4.65-6.04.51-5.56-1.02-7.79c-5.25-7.66-9.72-15.84-13.35-24.39l1.02,2.42c-4.8-11.37-8.09-23.34-9.77-35.57l.36,2.69c-.39-2.88-.68-5.76-.9-8.66-.2-2.71-.99-5.18-2.96-7.15-1.75-1.75-4.63-3.07-7.15-2.96s-5.33.98-7.15,2.96-3.16,4.49-2.96,7.15h0Z"
                                fill="#f84814"
                            />
                            <path
                                d="M198.52,455.68c8.81-6.4,17.61-12.8,26.42-19.21,8.11-5.9,16.11-12.02,24.6-17.39,4.48-2.83,9.13-5.4,14.01-7.48l-2.42,1.02c3.95-1.65,8.02-2.94,12.22-3.76,2.38-.46,4.86-2.62,6.04-4.65,1.27-2.17,1.81-5.36,1.02-7.79s-2.31-4.81-4.65-6.04c-2.51-1.33-5-1.56-7.79-1.02-11.67,2.26-22.48,8.06-32.27,14.62s-19.89,14.24-29.77,21.42c-5.87,4.27-11.74,8.54-17.61,12.8-2.19,1.59-3.9,3.34-4.65,6.04-.67,2.42-.37,5.64,1.02,7.79s3.46,4.06,6.04,4.65,5.63.55,7.79-1.02h0Z"
                                fill="#f84814"
                            />
                            <path
                                d="M388.67,407.13c12.97,10.18,24.95,21.61,35.73,34.09,3.06,3.55,6.03,7.19,8.9,10.9l-1.58-2.05c6.68,8.67,12.8,17.76,18.32,27.21,1.28,2.19,3.59,3.97,6.04,4.65s5.64.37,7.79-1.02c4.6-2.97,6.48-8.95,3.63-13.83-13.03-22.3-29.4-42.83-48.32-60.41-5.21-4.84-10.62-9.45-16.21-13.84-2.2-1.73-4.23-2.96-7.15-2.96-2.48,0-5.44,1.1-7.15,2.96s-3.08,4.46-2.96,7.15c.11,2.49.9,5.54,2.96,7.15h0Z"
                                fill="#f84814"
                            />
                            <path
                                d="M411.5,473.1c5.42-6.5,12.05-11.78,18.72-16.93l-2.05,1.58c6.97-5.38,14.09-10.65,20.22-17.01s11.37-13.37,15.61-20.96c2.6-4.65,4.77-9.55,6.67-14.52.88-2.31.18-5.73-1.02-7.79s-3.63-4.1-6.04-4.65c-2.59-.59-5.49-.46-7.79,1.02s-3.66,3.46-4.65,6.04c-.4,1.04-.81,2.08-1.24,3.1l1.02-2.42c-3.11,7.32-7.15,14.2-12.01,20.49l1.58-2.05c-6.36,8.16-14.1,14.74-22.25,21.03l2.05-1.58c-8.12,6.27-16.51,12.4-23.12,20.33-1.76,2.11-2.96,4.31-2.96,7.15,0,2.48,1.1,5.44,2.96,7.15s4.46,3.08,7.15,2.96c2.54-.11,5.45-.93,7.15-2.96h0Z"
                                fill="#f84814"
                            />
                            <path
                                d="M274.31,591.69c.97,7.39,2.15,14.73,3.77,22,1.31,5.84,2.81,11.68,5.06,17.24,2.74,6.74,6.05,12.93,10.97,18.37,4.6,5.07,10.46,8.74,16.84,11.11,6.33,2.35,13.8,2.64,20.26.65,6.88-2.13,12.9-6.37,17.89-11.49,8.49-8.69,14.15-19.48,18.12-30.86,4.04-11.6,6.06-23.78,7.95-35.88.43-2.78.46-5.27-1.02-7.79-1.23-2.1-3.63-4.1-6.04-4.65-2.59-.59-5.49-.46-7.79,1.02-2.07,1.33-4.25,3.5-4.65,6.04-2.21,14.13-4.61,28.43-10.18,41.69l1.02-2.42c-2.36,5.55-5.29,10.84-8.97,15.63l1.58-2.05c-2.61,3.35-5.55,6.46-8.9,9.09l2.05-1.58c-2.08,1.59-4.3,2.96-6.72,3.99l2.42-1.02c-1.75.72-3.55,1.23-5.42,1.51l2.69-.36c-2.02.27-4.03.26-6.05,0l2.69.36c-2.28-.32-4.48-.95-6.61-1.82l2.42,1.02c-2.51-1.07-4.85-2.46-7.02-4.12l2.05,1.58c-2.28-1.79-4.31-3.84-6.09-6.13l1.58,2.05c-2.57-3.36-4.59-7.07-6.25-10.96l1.02,2.42c-2.26-5.43-3.8-11.12-5.12-16.84-1.48-6.45-2.66-12.97-3.55-19.53l.36,2.69c-.04-.32-.09-.64-.13-.96.05-1.39-.24-2.69-.87-3.9-.41-1.25-1.1-2.34-2.09-3.25-1.75-1.75-4.63-3.07-7.15-2.96s-5.33.98-7.15,2.96c-1.68,1.83-3.3,4.57-2.96,7.15h0Z"
                                fill="#f84814"
                            />
                        </svg>
                        <p id="empty_content">I'm so hungry now feed me please :((</p>
                        <button id="empty-btn">
                           
                              <a href="/products">Go to products</a>
                     
                            
                        </button>
                    </div>
                </div>
            </div>
        );
}

export default Cart;
