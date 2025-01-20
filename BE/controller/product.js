import {
  addingProduct,
  getAllProducts,
  getProduct,
  getProducts,
  handleDeleteProduct,
  handleEdit,
} from "../service/product.js";
import { OK, CREATED } from "http-status-codes";
export async function createProduct(req, res) {
  let productInfo = await addingProduct(req.body, req.file.path);
  res.status(CREATED).send(productInfo);
}
export async function sendAllProducts(_, res) {
  let products = await getAllProducts();
  res.status(OK).send(products);
}
export async function sendSingleProducts(req, res, next) {
  try {
    let product = await getProduct(req.params.id);
    if (!product) {
        throw new Error('not found product')
    }
    res.status(OK).send(product);
  } catch (error) {
     next(error);
  }
}
//PAGINATION
export async function sendProducts(req, res) {
  let { page, limit } = req.query;
  let products = await getProducts(page, limit);
  res.status(OK).send(products);
}
export async function deleteProduct(req, res) {
  let products = await handleDeleteProduct(req.params.id);
  res.status(OK).send(products);
}
export async function editProduct(req, res) {
  let newproducts = await handleEdit(req.params.id,{image: req.file?.path,...req.body});
  res.status(OK).send(newproducts);
}
