
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import Header from "../header/Header";
import BreadCrumb from "../header/BreadCrumb/BreadCrumb";
import axios from 'axios';

function Detail(){
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { pid } = useParams();
    axios.defaults.baseURL = "http://localhost:5000";

    const getItem = async () => {
        const res = await axios.get(`/products/all`)
        .catch((error) => {
            setLoading(false);
            console.error(error);
        })
        const find = res.data.filter((product) => {
            return product._id === pid;
        })
        if (!find.length){
            setLoading(false);
            throw new Error("Product not found");

        } else {
            setLoading(false);
            setProduct(find[0]);
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    }
    
    const handleQuantityChange = (e) => {
        setQuantity(Math.max(Number(e.target.value), 1))
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log(product.price)
        const item = {
            ...product,
            quantity: quantity,
            
        }
        console.log(item);
        
    }

    useEffect(() => {
        getItem();
    }, [pid]);

    if (loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
    <>
        <Header />
        <BreadCrumb />  
        <div className="grid grid-cols-12 gap-4 py-4 my-4 grid-rows-6 mx-12 bg-slate-100 border rounded-xl sd:grid-cols-6">
            

            

            <div className="col-start-2 col-end-7 row-span-4">
                <div className="border rounded-2xl">
                    <a href="#">
                        <img src={product.image} alt={product.name}  />
                    </a>
                </div>
            </div>
            
            <div className="col-start-7 col-end-12 row-span-4">
                <div><h2 className="text-4xl font-bold text-gray-900 my-4 text-wrap break-all">{product.name}</h2></div>
                <div><h3>Bitis</h3></div>
                <h3 className="mb-2 text-3xl font-bold text-gray-900 my-4 text-wrap">{formatPrice(product.price * quantity)} <span>&#8363;</span></h3>
                <form>
                    <div className="my-4 row-span-1 col-span-6">
                        <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity + 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-plus"></i></button>
                        <input type="number" value={quantity} onChange={handleQuantityChange} className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"/>
                        <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity - 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-minus"></i></button>
                    </div>
                    <button type="submit" className="row-span-1 my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => handleAddToCart(e)} ><i className="fa fa-cart-plus"></i>&nbsp; Add to cart</button>
                </form>
            </div>
            <div className="col-span-12 row-span-2 grid grid-rows-4 mt-8 mx-4">
                <div className="border-b-2 m-0 p-0">
                    <span className="mx-2 text-2xl font-bold text-gray-900 text-wrap break-all pb-4 px-2">Description</span>
                </div>
                <div className="row-span-3 my-2">
                    <p className="mb-3 text-black-500 text-2x text-wrap break-all">{product.description}</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default Detail