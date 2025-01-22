import React, { useState } from "react";
import {Link, useNavigate} from 'react-router'
import {isEmail} from '../../utils/email'
import useAuthStore from "../../store/authStore";
export default function LoginPage()
{
    let {loginUser}=useAuthStore()
    let navigate=useNavigate()
    const [form, setForm] = useState({
            email: '',
            password:'',    
        });
    
    const [error,setError] = useState({
            email:'',
            password:'',
            
    });
    const handleChange=(event)=>
    {
            setForm({...form,[event.target.id]:event.target.value});
    };
    const handleSubmit = async (event) =>
        {
            event.preventDefault();
            const newError ={};
            if (form.email.length === 0 )
            {
                newError.email="email must not be empty";
            }
            else if (isEmail(form.email))
            {
                newError.email="it must be an email";
            }
           
    
            if (form.password.length === 0 )
            {
                
                    newError.password="Password must not be empty";
            }
            else if ( form.password.length > 20 || form.password.length < 5 )
            {
                    newError.password="Password must not have over 20 characters and at least 5 characters";
                    
            }
            
            setError({ ...newError });
            if (!Object.keys(newError).length) {
                loginUser(form,navigate)
            } 
        }

        const showPassword =() =>
        {
            if ( document.getElementById('password').type === "password")
            {
                document.getElementById('password').type = "text";
            }
            else{
                document.getElementById('password').type = "password";
            }
        }
    return(
        <div className="main flex justify-center items-center min-h-screen bg-gray-100">
        <form
            className=" w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-semibold text-center mb-6">Đăng Nhập</h2>
    
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
        </label>
            <input
                id="email"
                type="text"
                placeholder="Enter your email here"
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
                id="password"
                type="text"
                placeholder="Enter your password here"
                className="mb-4 w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" onClick={showPassword}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>

            {error.password && (
                <p className="text-red-500 text-sm mb-2">{error.password}</p>
            )}
    
          
            <button
                type="submit"
                className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
                Đăng nhập
            </button>
    
            
            <p className="text-sm text-gray-600 mt-4 text-center">
                Bạn chưa có tài khoản?
                <Link to="/register" className="text-blue-500 hover:underline">
                    Đăng ký ngay
                </Link>
            </p>
        </form>
       
    </div>
    
    );
        
}

