import React, { useState } from 'react'
// import './AddLocation.css'
import { Link } from "react-router-dom"
import close from "../../Images/1000_F_530932571_oVMX77OagcravakFNRUIlO5Z5bMZ17ty.jpg"
import "../../Components/AddLocation/AddLocation.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const EditLocationdata = ( { editing } ) => {
   const navigate = useNavigate()
   const [title, setTitle] = useState( "" )
   const [address, setAddress] = useState( "" )
   const [des, setDes] = useState( "" )
   const [image, setImage] = useState( [] )
   const [locationfee, setlocationfee] = useState( "" )
   const [pop, setPopup] = useState( false )
   const handclickeopen = ( e ) => {
      const userToken = JSON.parse( localStorage.getItem( "exists" ) )
      if ( userToken === null ) {
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
   }
   const locid = JSON.parse( localStorage.getItem( "loc" ) )
   const urldata = `http://localhost:5000/api/location/${locid}`
   const submitForm = async ( e ) => {
      e.preventDefault();
      for ( let index = 0; index < image.length; index++ ) {
         formdata.append( "image", image[index] )
      }
      formdata.append( 'title', title )
      formdata.append( 'address', address )
      formdata.append( "des", des )
      formdata.append( "locationfee", locationfee )
      try {
         const data  = await axios.patch( urldata, formdata )
         editing( true )
         if ( data.success === true ) {
            setTitle( " " )
            setAddress( " " )
            setDes( " " )
            setImage( " " )
         }
         setPopup( !pop )
         console.log( "the data has been added" )
      } catch ( error ) {
         console.log( error );
         console.log( error.message )
      }
   }
   return (
      <>
         <div>
            <div className='maincontainer'>
               <div className='addlocationcontainer'>
                  <div className='uplocation'>
                     <button onClick={handclickeopen} style={{backgroundColor:"#6e5193",padding:"5px 30px",fontSize:'20px'}}>update Location</button>
                  </div>
                  <div className='main2'>
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
                                 <button type="submit" style={{backgroundColor:"red"}}>update Location</button>
                              </div>
                              <div className='forget'>
                                 <Link to='/locations'><u>view all locations</u></Link>
                              </div>
                           </form>
                        </div> : ""}
                  </div>
               </div>
            </div>
         </div>
      </>

   )
}

export default EditLocationdata




