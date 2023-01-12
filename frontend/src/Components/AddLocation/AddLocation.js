import React, { useEffect, useState } from 'react'
import './AddLocation.css'
import { Link } from "react-router-dom"
import close from "../../Images/1000_F_530932571_oVMX77OagcravakFNRUIlO5Z5bMZ17ty.jpg"
import "./AddLocation.css"
import axios from "axios"
import Viewdata from './viewdata'
import { useNavigate } from 'react-router-dom'

const Locationcards = () => {
   const navigate = useNavigate()
   const [title, setTitle] = useState( "" )
   const [address, setAddress] = useState( "" )
   const [des, setDes] = useState( "" )
   const [image, setImage] = useState( [] )
   const [locationfee, setlocationfee] = useState( "" )
   // location are from backend 
   const [load, setLoad] = useState( false )
   const [tour, setTour] = useState( [] )
   const [pop, setPopup] = useState( false )
   // viemore data

   // const [locationReview,setLocationReview] = useState([])

   // console.log(locationReview)

   const url = "http://localhost:5000/api/location"
   async function Fet () {
      try {
         const res = await axios( url )
         const data = res.data
         setTour( data )
      } catch ( error ) {
         console.log( error )
      }
   }


   const handclickeopen = ( e ) => {
      const userToken = JSON.parse( localStorage.getItem( "exists" ) )
      if ( userToken === null ) {
         alert( "Please Login" )
         navigate( "/login" )
      }
      e.preventDefault()
      setPopup( !pop )
   }
   const handleclose = () => {
      setPopup( false )
   }


   const formdata = new FormData()
   const uploadFile = ( e ) => {
      const file = e.target.files
      setImage( file )
      // formdata.append( 'image', file )
   }

   const submitForm = async ( e ) => {
      const userToken = JSON.parse( localStorage.getItem( "exists" ) )
      e.preventDefault();
      for ( let index = 0; index < image.length; index++ ) {
         formdata.append( "image", image[index] )
      }
      formdata.append( 'title', title )
      formdata.append( 'address', address )
      formdata.append( "des", des )
      formdata.append( "locationfee", locationfee )

      try {
         const { data } = await axios.post( url, formdata, {
            headers: {
               "Authorization": `Bearer${userToken.token}`
            }
         } )
         if ( data.success === true ) {

            setTitle( " " )
            setAddress( " " )
            setDes( " " )
            setImage( " " )
         }
         setPopup( !pop )
         setLoad( true )
         alert( "You location added successfully.." )


      } catch ( error ) {
         console.log( error );
         console.log( error.message )
      }
   }


   useEffect( () => {
      Fet()
   }, [load] )

   return (
      <>
         <div className='maincontainer'>
            <div className='addlocationcontainer'>
               <div className='addlocationbtn'>
                  <button onClick={handclickeopen}>Add Location</button>
               </div>
               <div className='main'>
                  {pop ?
                     <div className='totalForm'>
                        <div className='headingcontainer'>
                           <h1>Add Locations</h1>
                           <img onClick={handleclose} src={close} alt="close" />
                        </div>
                        <form className='addLocation' onSubmit={submitForm}>
                           <div>
                              <label>Title</label><br />
                              <input type="text" onChange={( e ) => setTitle( e.target.value )} name="title" value={title} />
                           </div>
                           <div className='Location'>
                              <div>
                                 <label>Location</label><br />
                                 <input type="text" onChange={( e ) => setAddress( e.target.value )} name=
                                    "location" placeholder='Search for Location' value={address} />
                              </div>
                              <div>
                                 <label>Location Price</label><br />
                                 <input type="number" name="locationfee" onChange={( e ) => setlocationfee( e.target.value )} value={locationfee} />
                              </div>
                           </div>
                           <div>
                              <label>Description</label><br />

                              <input type="text" onChange={( e ) => setDes( e.target.value )} value={des} />
                           </div>
                           <div>
                              <input type="file" name="image" onChange={uploadFile} multiple />
                           </div>
                           <div className='addlocationbtn2'>

                              <button type="submit">Add Location</button>

                           </div>

                           <div className='forget'>
                              <Link to='/locations'><u>view all locations</u></Link>
                           </div>
                        </form>
                     </div> : ""}
               </div>

            </div>
         </div>

         {/* update form  */}


         <div className='locationcard'>
            <div className='locationcardcontainer'>
               {
                  tour.map( ( item, i ) => {
                     return (
                        <Viewdata key={i} {...item} setld={setLoad} />
                     )
                  } )
               }

            </div>
         </div>


      </>

   )
}

export default Locationcards




