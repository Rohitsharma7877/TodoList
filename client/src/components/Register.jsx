import React, { useState } from 'react'
import './RegisterStyles.css';
import user_icon from "./Assets/person.png"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const notify = (msg) => toast(msg);

    
    const navigate = useNavigate()
     
const [name, setName]=useState("")
const [email, setEmail]=useState("")
const [pass, setPass]=useState("")
const [age, setAge]=useState("")

const handleSubmit=()=>{

 const payload={
    name,
    email,
    pass,
    age
 }

//  console.log(payload)

    fetch("https://busy-gray-chipmunk-wear.cyclic.app/users/register",{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
            "Content-type":"application/json"
        }

    }).then(res=>{
        notify("Register succesfull")
        navigate("/login")} )
    .catch(err=>{notify("Registration failed")})
}

  return (


    <div className='container'>
        <div className='header'>
            <div className='text'>Register</div>
            <div className='underline'></div>
        </div>
        <div className='inputs'>
          <div className='input'>
            <img src={user_icon} alt=''/>
            <input type= 'text' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='input'>
            <img src={email_icon} alt=''/>
            <input type= 'email' placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='input'>
            <img src={password_icon} alt=''/>
            <input type= 'password' placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
        </div>

        <div className='input'>
            <img src={user_icon} alt=''/>
            <input type= 'text' placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>
        </div>

        </div>
        <div className='forgot-password'>Forgot-password ? <span>Click hear!</span></div>
        <div className='submit-container'>
         <div className='submit' onClick={handleSubmit}>Signup</div>
            
        </div>
        
    </div>

  )
}

export default Register