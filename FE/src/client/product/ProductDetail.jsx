import { useEffect, useState } from "react";
import { useParams } from "react-router";
import cartStore from "../../store/cartStore";
import useAuthStore from '../../store/authStore';
import {toast, ToastContainer} from 'react-toastify'
// import axios from '../axios'
import axios from "axios";

function ProductDetail(){
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const logout = useAuthStore(state => state.logout);
    const addToCart = cartStore(state => state.addToCart);
    const cart = cartStore(state => state.cart);
    
    axios.defaults.baseURL = "http://localhost:5000";
    const { pid } = useParams();


    const getItem = async () => {
        const res = await axios.get(`/products/single/${pid}`)
        .catch((error) => {
            setLoading(false);
            console.error(error);
        })

        if (!res.data){
            setLoading(false);
            throw new Error("Product not found");

        } else {
            setLoading(false);
            setProduct(res.data);
        }
    }

    const getProducts = async () => {
        const res = await axios.get('/getProducts')
        .catch((error) => {
            console.log(error);
        });

        console.log(res);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    }
    
    const handleQuantityChange = (e) => {
        setQuantity(Math.max(Number(e.target.value), 1))
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        
        const item = {
            ...product,
            quantity: quantity,
        }
        
        addToCart(item);
      

        toast.success("Add to cart successful", { autoClose: 3000 });
        
    }

    useEffect(() => {
        getItem();
    }, [pid]);

    if (loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
    <>
        <div className="mx-12 bg-slate-100 border rounded-xl flex flex-col">
            <div className="flex flex-row justify-center gap-4 my-4">
                <div className="basis-5/12">
                    <div className="border rounded-2xl">
                        <a href="#">
                            <img src={product.image} alt={product.name}  />
                        </a>
                    </div>
                </div>
                
                <div className="basis-5/12">
                    <div><h2 className="text-4xl font-bold text-gray-900 my-4 text-wrap break-all">{product.name}</h2></div>
                    <div><h3 className="text-sm text-gray-900">Brand: {product.brand}</h3></div>
                    <div><h3 className="text-sm text-gray-900">Category: {product.category}</h3></div>
                    <div><h3 className="text-md my-2">Short description: {product.short_description}</h3></div>
                    <div><h3 className="mb-2 text-3xl font-bold text-gray-900 my-4 text-wrap">{formatPrice(product.price * quantity)} <span>&#8363;</span></h3></div>
                    <form>
                        <div className="my-4 row-span-1 col-span-6">
                            <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity + 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-plus"></i></button>
                            <input type="number" value={quantity} onChange={handleQuantityChange} className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"/>
                            <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity - 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-minus"></i></button>
                            <span className="text-sm text-gray-900 mx-4">Available: {product.stock}</span>
                        </div>
                        <button type="submit" className="row-span-1 my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAddToCart} ><i className="fa fa-cart-plus"></i>&nbsp; Add to cart</button>
                    </form>
                </div>
            </div>
            <div className="mt-8 mx-4">
                <div className="border-b-2 m-0 p-0">
                    <span className="mx-2 text-2xl font-bold text-gray-900 text-wrap break-all pb-4 px-2">Description</span>
                </div>
                <div className="row-span-3 my-2">
                    <p className="mb-3 text-black-500 text-2x text-wrap break-all">{product.description}</p>
                </div>
            </div>
        </div>
        <ToastContainer />
    </>
    )
}

export default ProductDetail