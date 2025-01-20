import { CREATED, OK } from "http-status-codes";
import {
  addingUser,
  handle_checkOTP,
  handlechangePassword,
  handleCheckAuth,
  handleLogin,
  handleRefreshToken,
  sendToken,
} from "../service/auth.js";
export async function registerUser(req, res) {
  let { password, ...userinfo } = await addingUser(req.body);
  res.status(CREATED).send(userinfo);
}
export async function loginUser(req, res) {
  let response = handleLogin(req.user, res);
  res.status(OK).send(response);
}
export async function forgotController(req, res) {
  await sendToken(req);
  res.status(CREATED).send({
    message: "token has been sent to your email",
  });
}
export async function verifyOTP(req, res, next) {
  try {
    await handle_checkOTP(req, res);
    res.status(OK).send({
      message: "verify successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPass(req, res) {
  let {password,...userInfo}=await handlechangePassword(req)
  res.status(OK).send({
    message: "changed password successfully",
    user: userInfo
  });
}

export async function refreshToken(req, res) {
  let newToken = handleRefreshToken(req.user, res);
  res.status(OK).send(newToken);
}
export async function checkAuth(req, res) {
  let user=await handleCheckAuth(req)
  res.status(OK).send(user);
}