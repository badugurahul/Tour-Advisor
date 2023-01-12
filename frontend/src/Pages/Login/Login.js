import React, { useState } from 'react'
import { Link } from "react-router-dom"
import "./Login.css"
import loginimage from "../../Images/accountloginaccountlogin_generated.jpg"
import { useLogin } from '../../Hooks/useLogin'

const Login = () => {

  const [email, setEmail] = useState( "" )
  const [password, setPassword] = useState( "" )
  const { Login, error } = useLogin()

  const handlesubmit = async( e ) => {
    e.preventDefault();
    await Login( email, password )
    setEmail( "" )
    setPassword( "" )
    
  }



  return (
    <div className='login'>
      <div className='logincontainer'>
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <div className='email'>
            <label htmlFor=''>Email</label>
            <input type='text' placeholder='Enter your email id' name='email' onChange={( e ) => setEmail( e.target.value )} value={email} />
          </div>

          <div className='password'>
            <label htmlFor=''>Password</label>
            <input type='password' placeholder='Enter your password' name="password" onChange={( e ) => setPassword( e.target.value )} value={password} />
          </div>
          <div className='forget'>
            <Link to='/'><u>Forgot password</u></Link>
          </div>

          <div className='loginbtn'>
            <button>Login</button>
          </div>
          <p style={{color:"red",fontSize:"20px"}}>{error}</p>
        </form>

      </div>
      <div className='loginimg'>
        <div className='image'>
          <img src={loginimage} alt="login" />
        </div>
      </div>
    </div>
  )
}

export default Login
