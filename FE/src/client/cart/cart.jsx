'use server'
import { useEffect, useState } from "react";
import "./cart.css";
import axios from "axios";

function Cart() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5000/getProducts")
            .then((products) => setProducts(products.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products])

    return (
        <div>
            {products.map((product) => {
                return (
                <ul>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                </ul>
                )
            })}
        </div>
    );
}

export default Cart;
