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
                    name: product.name,
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
        <div>
            {products.map((product, index) => (
                <ul key={index}>
                    <li>Index: {index}</li>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>Quantity: {product.quantity}</li>
                    <button
                        className="btn-add"
                        onClick={() => handleAdd(index)}
                    >
                        {" "}
                        +{" "}
                    </button>
                    <button
                        className="btn-rmv"
                        onClick={() => handleRemove(index)}
                    >
                        {" "}
                        -{" "}
                    </button>
                </ul>
            ))}
            <h1>Total: {calculateTotal()}</h1>
        </div>
    );
}

export default Cart;
