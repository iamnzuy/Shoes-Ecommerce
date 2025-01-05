import express from 'express'
import {checkEmail, checkLogin, checkOTP, checkPass, checkSignUp} from '../validator/auth.js'
import { registerUser,loginUser, forgotController, verifyOTP, resetPass, refreshToken } from '../controller/auth.js';
import { verifyRefreshToken } from '../middleware/verify.js';
let Route=express.Router();

Route.post('/register',checkSignUp,registerUser)
Route.post('/login',checkLogin,loginUser)
Route.post('/forgotpass',checkEmail,forgotController)
Route.post('/verify',checkOTP,verifyOTP)
Route.put('/resetpass',checkPass,resetPass)
Route.post('/refreshToken',verifyRefreshToken,refreshToken)
export default Route