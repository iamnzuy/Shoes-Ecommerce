import mongoose from "mongoose";
let orderSchema=new mongoose.Schema({
    product: {
       type: mongoose.Types.ObjectId,
       ref: 'Products',
       required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
     },
    quantity: {
        type: Number,
        required: true
    }
},{timestamps: true})
export const orderModel= mongoose.model('orders', orderSchema);