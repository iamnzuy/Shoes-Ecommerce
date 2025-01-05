import express from 'express'
import {verifyToken,verifyAdmin} from '../middleware/verify.js'
import { upload } from '../utils/upload.js';
import { checkProduct } from '../validator/product.js';
import { createProduct, deleteProduct, sendAllProducts, sendProducts } from '../controller/product.js';
let Route=express.Router();

Route.post('/create',verifyToken,verifyAdmin,upload.single('image'),checkProduct,createProduct)
Route.delete('/:id',verifyToken,verifyAdmin,deleteProduct)
Route.get('/all',sendAllProducts)
Route.get('/',sendProducts)

export default Route