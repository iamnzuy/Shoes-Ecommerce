import express from 'express'
import { verifyAdmin, verifyToken } from '../middleware/verify.js';
import { sendOrders ,placeOrder, getOrders} from '../controller/order.js';
import { checkOrder } from '../validator/order.js';
let Route=express.Router();

Route.post('/place',verifyToken,checkOrder,placeOrder)
//get user orders
Route.get('/',verifyToken,sendOrders)
//for adminadmin
Route.get('/all',verifyToken,verifyAdmin,getOrders) 
 
export default Route