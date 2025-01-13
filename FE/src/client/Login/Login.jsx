import React, { useState } from "react";
import "./Login.css";

const initFormValue = {
  username: "",
  password: "",
};

const isEmptyValue = (value) => {
  return !value || value.trim().length < 1;
};
const isEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export default function LoginPage() {
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError] = useState({});

  const validate = () => {
    const error = {};
    if (isEmptyValue(formValue.username)) {
      error["username"] = "Username is required!";
    } else {
      if (isEmail(formValue.username)) {
        error["username"] = "Email is invalid!";
      }
    }
    if (isEmptyValue(formValue.password)) {
      error["Password"] = "Password is required!";
    }

    return Object.keys(error).length === 0;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      console.log("formValue", formValue);
    } else {
      console.log("form invalid");
    }
    console.log("formValue", formValue);
  };

  return (
    <div className="LoginPage">
      <div className="Header">
        <img src="logo.png" alt="Logo"></img>
        <p>Login Page</p>
      </div>

      <div className="Body">
        <div className="row content">
          <div className="col-6"></div>
          <div className="col-6 Form ">
            <form onSubmit={handleSubmit}>
              <label htmlFor="dangnhap" className="dangnhap">
                Đăng nhập
              </label>
              <br></br>
              <label
                htmlFor="username"
                style={{ paddingRight: "70%", fontSize: "30px" }}
              >
                Username
              </label>
              <br></br>
              <input
                type="text"
                placeholder="Enter your email"
                name="username"
                className="input_username"
                value={formValue.username}
                onChange={handleChange}
              ></input>
              {formError.username && (
                <div className="error-feedback">{formError.username}</div>
              )}
              <br></br>
              <label
                htmlFor="password"
                style={{ paddingRight: "70%", fontSize: "30px" }}
              >
                Password
              </label>
              <br></br>
              <input
                type="password"
                name="password"
                id=""
                placeholder="Enter your password"
                className="input_password"
                value={formValue.password}
                onChange={handleChange}
              ></input>
              <button className="btn_dangnhap">ĐĂNG NHẬP</button>
              <br></br>
              <a href="google.com" className="quenmatkhau">
                Quên Mật Khẩu
              </a>
              <a href="google.com"> Đăng Ký </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
