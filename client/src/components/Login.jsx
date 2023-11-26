
import React, { useState } from 'react'
import './RegisterStyles.css';

import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const Navigate = useNavigate()
const [email, setEmail]=useState("")
const [pass, setPass]=useState("")



const handleSubmit = async () => {
    const payload = {
      email,
      pass,
    };
    try {
      const response = await fetch("https://busy-gray-chipmunk-wear.cyclic.app/users/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      });
     
            if (!response.ok) {
      
        toast("Login failed");
        throw new Error(`Server error: ${response.statusText}`);
       
      }
      
      const data = await response.json();
      
      toast("Login successful");
      Navigate("/allnotes")
      localStorage.setItem("token", data.token);
    } catch (error) {
      
      console.error("Error during login:", error);
      toast("Login failed");
    }
  };


  return (


<div className='container'>
<div className='header'>
    <div className='text'>Login </div>
    <div className='underline'></div>
</div>
<div className='inputs'>
  

<div className='input'>
    <img src={email_icon} alt=''/>
    <input type= 'email' placeholder="Email ID" value={email} onChange={(e)=>setEmail(e.target.value)} />
</div>

<div className='input'>
    <img src={password_icon} alt=''/>
    <input type= 'password' placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
</div>



</div>
<div className='forgot-password'>Forgot-password ? <span>Click hear!</span></div>
<div className='submit-container'>
 <div className='submit' onClick={handleSubmit}>Login</div> 
   
</div>

</div>


  )
}

export default Login