import React from 'react'
import { useNavigate } from 'react-router-dom'
import locs from "../../Images/684908.png"

const Viewdata = ( { _id, title, address, des, imagesd: { image } } ) => {
   const Navigate = useNavigate()
   const handleviewmore = () => {
      const userToken = JSON.parse( localStorage.getItem( "exists" ) )
      if ( userToken ) {
         localStorage.setItem( "loc", JSON.stringify( _id ) )
         Navigate( "/viewmore" )
      }
      if ( userToken === null ) {
         Navigate( "/login" )
      }
   }
   return (
      <div className='card'>
         <div className='cardimage'>            
            <img src={image[0]} alt="jj"/> 
         </div>
         <div className='carddatacontainer'>
            <div className='carddata'>
               <div className='title'>
                  <h2>{title.substring(0,15)}</h2>
                  <h4>{address.substring(0,20) }...</h4>
               </div>
               <p>{des.substring( 0, 40 )}...</p>
            </div>
            <div className='locationname'>
               <div className='locationimage'>
                  <img src={locs} alt="jj" />
               </div>
               <p>Hyderabad,Telangana</p>
            </div>
            <div className='locationviewbutton'>
               <button onClick={handleviewmore}>viewmore</button>
            </div>
         </div>
      </div>


   )
}

export default Viewdata
