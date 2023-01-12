import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <div className='Homesection'>
      <div className='homecontainer'>
        <div className='welcomemessage'>
          <h1>Welcome to <span>Tourism Advisor</span></h1>
          <p>We Plan best Trips for you budget</p>
          <span></span>
        </div>
        <div className='locationbutton'>
          <button><Link to='/locations'>View Locations</Link></button>
        </div>
      </div>
      
    </div>
  )
}

export default Home
