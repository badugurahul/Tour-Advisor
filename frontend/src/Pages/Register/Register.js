import React, { useState } from 'react'
import "./Register.css"
import { useRegister } from "../../Hooks/useRegister"
// import { useNavigate } from 'react-router-dom'
const Register = () => {
  // const Navigate = useNavigate()
  const [name, setName] = useState( "" )
  const [email, setEmail] = useState( "" )
  const [password, setPassword] = useState( "" )
  const { register, error } = useRegister()
  const handlesubmit = ( e ) => {
    e.preventDefault();
    register(name,email,password);
    setName( "" )
    setEmail( "" )
    setPassword( "" )
  }
  return (
    <div className='register'>
      <div className='registercontainer'>
        <h1>Register</h1>
        <form onSubmit={handlesubmit}>
          <div className='email'>
            <label htmlFor=''>Name</label>
            <input type='text' placeholder='Enter your Name' name='name' onChange={( e ) => setName( e.target.value )} value={name} required/>
          </div>
          <div className='email'>
            <label htmlFor=''>Email</label>
            <input type='text' placeholder='Enter your email id' name='email' onChange={( e ) => setEmail( e.target.value )} value={email} required />
          </div>

          <div className='password'>
            <label htmlFor=''>Password</label>
            <input type='password' placeholder='Enter your password' name='password' onChange={( e ) => setPassword( e.target.value )} value={password} required />
          </div>
          <div className='Registerbtn'>
            <button type='submit'>Register</button>
          </div>
          <p style={{color:"red",fontSize:"20px"}}>{error}</p>
        </form>

      </div>
    </div>
  )
}

export default Register
