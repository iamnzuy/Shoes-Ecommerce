import { useEffect, useState } from "react"
import { useParams } from "react-router";
import axios from 'axios';

function ProductDetail(){
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { pid } = useParams();

    const getItem = async () => {
        const res = await axios.get(`http://localhost:5000/products/all`)
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

    useEffect(() => {
        getItem();
    }, [pid]);

    if (loading) return <div>Loading...</div>
    if (!product) return <div>Product not found</div>

    return (
    
    <div className="py-4 my-4 bg-slate-100 flex flex-col basis-full">
        <div className="flex flex-row">
            <div className="basis-5/12">
                <div className="border rounded w-10">
                    <a href="#">
                        <img src={product.image} alt={product.name} className="object-fit h-auto"  />
                    </a>
                </div>
            </div>
            
            <div className="basis-5/12">
                <div className=""><h4 className="text-4xl font-bold text-gray-900 my-4 text-wrap break-all">{product.name}</h4></div>
                <div><h3 className="text-sm">Brand: {product.brand}</h3></div>
                <div><h3 className="text-sm">Category: {product.category}</h3></div>
                <h5 className="fw-bold mb-2">{formatPrice(product.price * quantity)} d</h5>
                {/* <p className="mb-4">Short detail: Chong nuoc</p> */}
                <form action="" method="POST">
                    <div className="my-4">
                        <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity + 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-plus"></i></button>
                        <input type="number" value={quantity} onChange={handleQuantityChange} className="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"/>
                        <button type="button" onClick={() => handleQuantityChange({ target: { value: quantity - 1 }}) } className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-minus"></i></button>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="fa fa-cart-plus"></i>&nbsp; Add to cart</button>
                </form>
            </div>
        </div>
        <div className="col-span-12 row-span-2 grid grid-rows-4">
            <div className="row-span-1">
                <p>Description</p>
            </div>
            <div className="row-span-3">
                <p>{product.description}</p>
            </div>
        </div>
    </div>
    )
}

export default ProductDetail