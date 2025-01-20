import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { isEmail } from "../../utils/email";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";
export default function RegisterPage() {
  let {registerUser}=useAuthStore()
  let navigate=useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = {};
    if (form.username.length === 0) {
      newError.username = "email must not be empty";
    }
    if (form.email.length === 0) {
      newError.email = "email must not be empty";
    }  else if (
     isEmail(form.email)
    ) {
      newError.email = "it must be an email";
    } 

    if (form.password.length === 0) {
      newError.password = "Password must not be empty";
    } else if (form.password.length > 20 || form.password.length < 5) {
      newError.password =
        "Password must not have over 20 characters and at least 5 characters";
    } 
    if (form.password !== form.confirmpassword) {
      console.log(form.confirmpassword);

      newError.confirmpassword = "Password is not match!";
    } else if (form.confirmpassword.length === 0) {
      newError.confirmpassword = "Confirm password must not be empty";
    } else if (
      form.confirmpassword.length > 20 ||
      form.confirmpassword.length < 5
    ) {
      newError.confirmpassword =
        "Confirm password must not have over 20 characters and at least 5 characters";
    } 
    setError({ ...newError });
    if (!Object.keys(newError).length) {
        registerUser({username: form.username,email: form.email,password: form.password},navigate)
    } 
  };

  return (
    <div className="main flex justify-center items-center min-h-screen bg-gray-100">
    <form
        className="form w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
    >
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng Ký</h2>

        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
        </label>
        <input
            type="text"
            placeholder="Enter your username"
            id="username"
            className="mb-4 w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
        />
        {error.username && (
            <p className="text-red-500 text-sm mb-2">{error.username}</p>
        )}

        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
        </label>
        <input
            type="email"
            placeholder="Enter your email here"
            id="email"
            className="mb-4 w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
        />
        {error.email && (
            <p className="text-red-500 text-sm mb-2">{error.email}</p>
        )}

        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
        </label>
        <input
            type="text"
            placeholder="Enter your password here"
            id="password"
            className="mb-4 w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
        />
        {error.password && (
            <p className="text-red-500 text-sm mb-2">{error.password}</p>
        )}

        <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
        </label>
        <input
            type="text"
            placeholder="Enter your password again"
            id="confirmpassword"
            className="mb-4 w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
        />
        {error.confirmpassword && (
            <p className="text-red-500 text-sm mb-2">{error.confirmpassword}</p>
        )}

        <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
            Đăng ký
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
            Bạn đã có tài khoản?
            <Link to="/login" className="text-blue-500 hover:underline">
                Đăng nhập ngay
            </Link>
        </p>
    </form>
</div>

  );
}
