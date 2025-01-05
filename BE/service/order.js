import {orderModel} from "../models/order.js";

export async function handleOrder(detail) {
    let order=await new orderModel(detail).save()
    return order._doc;
}
export async function getOrders(id) {
    let orders=await orderModel.find({user: id}).populate('product')
    return orders;
}