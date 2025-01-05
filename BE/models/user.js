import mongoose from "mongoose";
let userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['user','admin'],
        default: 'user' 
    },
    verifyToken: {
        type: String,
    },
    expiredTime: {
        type: Date,
    },
    resetSession: {
        type: Boolean
    }
})
export const userModel= mongoose.model('Users', userSchema);