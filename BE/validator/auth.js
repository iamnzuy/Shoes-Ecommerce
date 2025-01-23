import Joi from 'joi';
import {userModel} from '../models/user.js'
import bcrypt from 'bcryptjs'
export async function checkSignUp(req,res,next) {
  let schema=Joi.object({
     username: Joi.string().min(4).max(30).required(),
     email: Joi.string().email().required(),
     password: Joi.string().min(5).max(30).required(),
     role: Joi.string().valid('user','admin')
  })
  try {
    await schema.validateAsync(req.body)
    let foundUser= await userModel.findOne({email: req.body.email});
    if (foundUser) {
       throw new Error("user existed, please login");
    }
    next();
  } catch (error) {
      next(error)
  }
}
export async function checkLogin(req,res,next) {
  let schema=Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(5).max(30).required()
  })
  try {
    await schema.validateAsync(req.body)
    let foundUser= await userModel.findOne({email: req.body.email});
    if (!foundUser) {
       throw new Error("user not found");
    }
    let isValidPassword=await bcrypt.compare(req.body.password,foundUser.password);
    if (!isValidPassword) {
      throw new Error("wrong password");
    }
    req.user=foundUser._doc;
    next();
  } catch (error) {
      next(error)
  }
}
export async function checkEmail(req,res,next) {
  let schema=Joi.object({
    email: Joi.string().email().required(),
 })
  try {
    await schema.validateAsync(req.body)
    let foundUser= await userModel.findOne({email: req.body.email});
    if (!foundUser) {
       throw new Error("account not found");
    }
    req.user=foundUser._doc;
    next();
  } catch (error) {
    next(error)
  }
}
export async function checkOTP(req,res,next) {
  let schema=Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required()
 })
  try {
    await schema.validateAsync(req.body)
    next();
  } catch (error) {
    next(error)
  }
}
export async function checkPass(req,res,next) {
  let schema=Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(5).max(30).required()//newpass
 })
  try {
    await schema.validateAsync(req.body)
    let user=await userModel.findOne({email: req.body.email});
    if (!user) {
      throw new Error("account not found");
    }
    user=user._doc
    if (!user.resetSession) {
      throw new Error("you are not allowed to change password,please verify your account first!");
    }
    req.user=user
    next();
  } catch (error) {
    next(error)
  }
}