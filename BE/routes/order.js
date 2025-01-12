import express from 'express'
import { verifyToken } from '../middleware/verify.js';
import { sendOrders ,placeOrder} from '../controller/order.js';
import { checkOrder } from '../validator/order.js';
let Route=express.Router();

Route.post('/place',verifyToken,checkOrder,placeOrder)
//get user orders
Route.get('/',verifyToken,sendOrders)

export default Route