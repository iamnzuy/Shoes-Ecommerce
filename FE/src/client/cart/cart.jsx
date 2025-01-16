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
                        product.description.substring(0, 80) + "...",
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
            <div id="hr"> <hr /></div>
           
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
                            <div className="cart-checkout-item-detail" >
                                <div>
                                    Total products:
                                </div>
                                <div>
                                    {calculateTotal()}
                                </div>
                            </div>
                            <div className="cart-checkout-item-detail"> 
                                <div>
                                    Shipping cost: 
                                </div>
                                <div>
                                    <strong>Free</strong>
                                </div>
                            </div>
                        </div>
                        <button className="cart-checkout-item" id="cart-checkout-btn">
                            <div>Checkout</div>
                            <div>{calculateTotal()}</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
