import React from 'react'
import './NavbarStyles.css';

const Navbar = () => {
  return (
    <div className='nav'>
        <div className='nav1'>ToDo-List </div>
        <div className='nav2'>
           <a href='/register'> <button>Sing-Up</button></a>
           <a href='/login'> <button>Login</button></a>
        </div>
        
    </div>
  )
}

export default Navbar