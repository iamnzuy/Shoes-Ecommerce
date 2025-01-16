import React, { useState } from "react";
import "./Login.css"
import RegisterPage from "../Register/Register";

export default function LoginPage()
{
    const [form, setForm] = useState({
            username:'',
            password:'',
            
        });
    
    const [error,setError] = useState({
            username:'',
            password:'',
            
    });
    const handleChange=(event)=>
    {
            setForm({...form,[event.target.id]:event.target.value});
    };
    const handleSubmit = (event) =>
        {
            event.preventDefault();
            const newError ={};
            if (form.username.length === 0 )
            {
                newError.username="Username must not be empty";
            }
            else if ( form.username.length > 20 )
            {
                newError.username="Username must not have over 20 characters";
            }
            else if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(form.username))
            {
                newError.username="Username must be an email";
            }
            else{
                newError.username="";
            }
    
            if (form.password.length === 0 )
            {
                
                    newError.password="Password must not be empty";
            }
            else if ( form.password.length > 20 || form.password.length < 5 )
            {
                    newError.password="Password must not have over 20 characters and at least 5 characters";
                    
            }
            else{
                newError.password="";
            }
    
            if ( Object.keys(newError).length >  0)
            {
                    
                    setError({ ...newError });
            }
            else{
                alert("Đăng nhập thành công!");
            }
        }

       

    return(
        <div className="main">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="mb-4">Đăng Nhập</h2>
                    <input type="email" placeholder="Enter your email here" className="mb-4 w-100 h-25 p-2 border-3 border-warning-subtle rounded-3" onChange={handleChange}></input>
                    {error.username && (<p className="error">{error.username}</p>)}
                    <br></br>
                    <input type="password" placeholder="Enter your password here" className="mb-4 p-2 w-100 h-50 border-3 border-warning rounded-3" onChange={handleChange}></input>
                    {error.password && (<p className="error">{error.password}</p>)}
                    <br></br>
                    <button type="submit" className="mb-4 w-100 h-25 border-3 rounded-3 p-2">Đăng nhập</button>
                    <p>Bạn chưa có tài khoản?<a href="#" >Đăng ký ngay</a></p>
                </form>
        </div>
    );
        
}

