import { productModel } from "../models/product.js";

export async function addingProduct(detail,image) {
    let product=await new productModel({...detail,image}).save()
    return product._doc;
}
export async function getAllProducts() {
  let products=await productModel.find({},{__v: 0})
  return products;
}
export async function getProduct(id) {
  let product=await productModel.findById(id).select('-__v');
  return product;
}
//PAGINATION
export async function getProducts(page=1,limit=5) {
  let products=await productModel.find({},{__v: 0}).skip(limit*(page-1)).limit(limit)
  let length=await productModel.countDocuments()
  return{ products,page,totalPage: Math.ceil(length/limit)};
}
export async function handleDeleteProduct(id) {
  await productModel.findByIdAndDelete(id,{new: true})
  let products=productModel.find({},{__v: 0})
  return products;
}
export async function handleEdit(id,body) {
  await productModel.findByIdAndUpdate(id,body)
  let newProducts=await productModel.find({},{__v: 0})
  return newProducts;
}