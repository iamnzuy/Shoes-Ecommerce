import { addingProduct, getAllProducts ,getProducts, handleDeleteProduct} from '../service/product.js';
import { OK ,CREATED} from 'http-status-codes';
export async function createProduct(req,res) {
    let productInfo=await addingProduct(req.body,req.file.path);
    res.status(CREATED).send(productInfo)
}
export async function sendAllProducts(_,res) {
    let products=await getAllProducts();
    res.status(OK).send(products)
}
//PAGINATION
export async function sendProducts(req,res) {
    let {page,limit}=req.query
    let products=await getProducts(page,limit);
    res.status(OK).send(products)
}
export async function deleteProduct(req,res) {
    let products=await handleDeleteProduct(req.params.id);
    res.status(OK).send({
        message:'delete successfully',
        products
    })
}