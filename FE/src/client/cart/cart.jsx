import { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";

function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/getProducts")
            .then((response) => {
                const productsWithQuantity = response.data.map((product) => ({
                    description: product.description,
                    descriptionShorten:
                        product.description.length <= 80
                            ? product.description
                            : product.description.substring(0, 80) + "...",
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                }));
                setProducts(productsWithQuantity);
            })
            .catch((err) => console.log(err));
    }, []);

    // Sự kiện thêm số lượng sản phẩm
    const handleAdd = (index) => {
        const newProducts = products.slice();
        newProducts[index] = {
            id: newProducts[index].id,
            description: newProducts[index].description,
            descriptionShorten: newProducts[index].descriptionShorten,
            image: newProducts[index].image,
            name: newProducts[index].name,
            price: newProducts[index].price,
            quantity: newProducts[index].quantity + 1,
        };
        setProducts(newProducts);
    };

    // Sự kiện xoá số lượng sản phẩm
    const handleRemove = (index) => {
        const newProducts = products.slice();
        if (newProducts[index].quantity > 1) {
            newProducts[index] = {
                id: newProducts[index].id,
                description: newProducts[index].description,
                descriptionShorten: newProducts[index].descriptionShorten,
                image: newProducts[index].image,
                name: newProducts[index].name,
                price: newProducts[index].price,
                quantity: newProducts[index].quantity - 1,
            };
            setProducts(newProducts);
        }
    };

    // Tính tổng tiền
    const calculateTotal = () => {
        let total = 0;
        for (let i = 0; i < products.length; i++) {
            total += products[i].price * products[i].quantity;
        }
        return total;
    };

    return (
        <>
            <div className="cart-title">My cart</div>
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
                                <div id="cart-item-name">{product.name}</div>
                                <div>
                                    <i>{product.descriptionShorten}</i>
                                </div>
                            </div>
                        </div>
                        <div className="cart-item" id="cart-item-price">
                            {product.price}
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
                                onClick={() => handleRemove(index)}
                            >
                                {" "}
                                -{" "}
                            </button>
                        </div>
                        <div className="cart-item" id="cart-item-price-total">
                            {product.quantity * product.price}
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
                                <div>{calculateTotal()}</div>
                            </div>
                            <div className="cart-checkout-item-detail">
                                <div>Shipping cost:</div>
                                <div>Free</div>
                            </div>
                        </div>
                        <button
                            className="cart-checkout-item"
                            id="cart-checkout-btn"
                            onClick={() => {
                                document.querySelector(
                                    ".cart-payment"
                                ).style.display = "flex";
                                document.querySelector(
                                    ".cart-close-btn"
                                ).style.display = "flex";
                            }}
                        >
                            <div>Checkout</div>
                            <div>{calculateTotal()}</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="cart-payment">
                <div className="cart-payment-container">
                    <div className="cart-payment-container-hr">
                        <div className="cart-payment-info">
                            <div className="cart-close-payment-btn-container">
                                <button
                                    id="cart-close-payment-btn"
                                    className="cart-close-btn"
                                    onClick={() => {
                                        document.querySelector(
                                            ".cart-payment"
                                        ).style.display = "none";
                                        document.querySelector(
                                            ".cart-close-btn"
                                        ).style.display = "none";
                                    }}
                                >
                                    X
                                </button>
                            </div>

                            <div className="cart-payment-info-header">
                                Payment Info
                            </div>
                            <div className="cart-payment-info-subheader">
                                Payment method
                            </div>
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
                            <div className="cart-payment-info-subheader">
                                Name on card
                            </div>
                            <div class="input-group">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder=""
                                />
                            </div>
                            <div className="cart-payment-info-subheader">
                                Card number
                            </div>
                            <div class="input-group">
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder=""
                                />
                            </div>
                            <div className="cart-payment-info-subheader-exp-container">
                                <div className="cart-payment-info-subheader-exp">
                                    <div className="cart-payment-info-subheader">
                                        Expiration date
                                    </div>
                                    <div id="cvc" className="cart-payment-info-subheader">
                                        CVC
                                    </div>
                                </div>
                            </div>
                            <div className="cart-payment-info-subheader-exp-container">
                                <div className="cart-payment-info-subheader-exp">
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder=""
                                        />
                                    </div>
                                    <div class="input-group">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cart-payment-checkout-btn-container">
                                <button
                                    id="cart-payment-checkout-btn"
                                    onClick={() => {
                                        alert("Checkout success");
                                    }}
                                >
                                    <div>Checkout</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
