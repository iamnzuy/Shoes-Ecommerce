import React, { useState } from "react";
import { Link } from "react-router";
import { isEmail } from "../../utils/email";
import useAuthStore from "../../store/authStore";
import { useNavigate } from "react-router";
import { EyeClose, EyeOpen } from "../../components/Eye";

export default function RegisterPage() {
  const { registerUser } = useAuthStore();
  const navigate = useNavigate();
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = {};

    if (form.username.trim().length === 0) {
      newError.username = "Username must not be empty";
    }
    if (form.email.trim().length === 0) {
      newError.email = "Email must not be empty";
    } else if (isEmail(form.email)) {
      newError.email = "Invalid email format";
    }
    if (form.password.trim().length === 0) {
      newError.password = "Password must not be empty";
    } else if (form.password.length < 5 || form.password.length > 20) {
      newError.password =
        "Password must have at least 5 characters and no more than 20 characters";
    }
    if (form.password !== form.confirmpassword) {
      newError.confirmpassword = "Passwords do not match";
    } else if (form.confirmpassword.trim().length === 0) {
      newError.confirmpassword = "Confirm Password must not be empty";
    }

    setError({ ...newError });

    if (Object.keys(newError).length === 0) {
      registerUser(
        {
          username: form.username,
          email: form.email,
          password: form.password,
        },
        navigate
      );
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
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password here"
            id="password"
            className="w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOpen/> : <EyeClose/>}
          </button>
        </div>
        {error.password && (
          <p className="text-red-500 text-sm mb-2">{error.password}</p>
        )}

        <label htmlFor="confirmpassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your password again"
            id="confirmpassword"
            className="w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showConfirmPassword ? <EyeOpen/> : <EyeClose/>}
          </button>
        </div>
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
