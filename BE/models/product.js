import mongoose from "mongoose";
let productSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    model: {
        type: String
    },
},{timestamps: true})
export const productModel= mongoose.model('Products', productSchema);