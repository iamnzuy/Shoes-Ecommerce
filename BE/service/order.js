import {orderModel} from "../models/order.js";

export async function handleOrder(detail) {
    let order=await new orderModel(detail).save() 
    return order._doc;
}
export async function getOrders(id) {
    let orders=await orderModel.find({user: id}).populate('items.product')
    return orders;
}
export async function getAllOrders() {
    let orders=await orderModel.find({}).populate({path: 'user',select: '-password -__v'})
    return orders;
}