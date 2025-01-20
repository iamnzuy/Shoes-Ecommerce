import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import generateOTP from "../utils/generateOTP.js";
import {transporter} from '../utils/nodemailer.js'
import { VERIFICATION_EMAIL_TEMPLATE } from "../utils/template.js";

export async function addingUser({ password, ...others }) {
  let hasedPassword = await bcrypt.hash(password, 10);
  let user = await new userModel({ password: hasedPassword, ...others }).save();
  return user._doc;
}

export function handleLogin(user, res) {
  let { accessToken, refreshToken } = generateToken(user);
  res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    samesite: "strict", 
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  let { password, ...others } =user;
  return { accessToken, ...others};
}

export async function sendToken(req) {
   let code=generateOTP();
   await userModel.findByIdAndUpdate(req.user._id,{
     verifyToken: code,
     expiredTime: Date.now()+ 60*60*1000//1 hour
   },{new: true})
  //send token to email of users
  await transporter.sendMail({
    from: '"lantran👻" <maddison53@ethereal.email>', 
    to: req.user.email, 
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code), // html body
  });

  return code;
}

export async function handle_checkOTP(req,res) {
   let {email,token}=req.body
   let foundUser=await userModel.findOne({email})
  let info=foundUser._doc
   let time=Date.now();
   if (time>info.expiredTime) {
    throw new Error('otp expired')
   } 
  if (info.verifyToken!=token) {
    throw new Error('wrong OTP')
  }
  //reset user detail in db
  foundUser.verifyToken=undefined;
  foundUser.expiredTime=undefined;
  foundUser.resetSession=true;
  await foundUser.save()
}

export async function handlechangePassword(req) {
  let { password,email} =req.body;
  password=await bcrypt.hash(password,10);
  let newUser=await userModel.findOneAndUpdate({email},{password,$unset: {resetSession: false}},{new: true})
  return newUser._doc;
}

export function handleRefreshToken(user, res) {
  let { accessToken, refreshToken } = generateToken(user);
  res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    samesite: "strict", 
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return { accessToken};
}
export async function handleCheckAuth(req) {
  let response=await userModel.findById(req.user.id)
  let {password,...detail}=response._doc
  return detail;
}