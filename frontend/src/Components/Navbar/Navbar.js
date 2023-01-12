import React from 'react'
import { useLogout } from '../../Hooks/useLogout'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { useAuthContext } from '../../Hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const Navigate = useNavigate()
  const {user}  = useAuthContext()
  const {logout} = useLogout()
  const handleclick = ()=>{
    logout();
    Navigate("/")
  }



  return (
    <>
    <div className='Navbar'>
      <div className='logo'>
        <Link to="/"><h1>Tourism <span>Advisor</span></h1></Link>
      </div>
      <div className='menulist'>
        <Link to='/'>Home</Link>
        <Link to='/locations'>Locations</Link>
        {
          !user &&(
            <div className='menulist'>
          <Link to='/login'>Login</Link>
          <Link to='/register'><button>Register</button></Link>
          </div>)
        }
        
      </div>
{
  user&&(
  <div className='logout'>
  <h2 style={{color:'blue',padding:'5px',letterSpacing:'5px'}}> <u>{user.Nickname}</u></h2>
<button onClick={handleclick}>Logout</button>
      </div>)
}
      
      

    </div>
    </>
  )
}

export default Navbar
