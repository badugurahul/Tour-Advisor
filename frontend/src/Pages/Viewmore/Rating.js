import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Rating } from "react-simple-star-rating"
import { DynamicStar } from "react-dynamic-star";
import "./Rating.css"
import Editform from './editform';



const Ratings = () => {
   
   const [edit, setEdit] = useState( false )
   const [helo, setHello] = useState( false )
   const [reviewstatus, setReview] = useState( {
      review: "",
      rating: ""
   } )

   const [rating, setRating] = useState( 0 )

 
   const [reviewdata, setReviewdata] = useState( [] )
  
   const handletext = ( e ) => {
      const { name, value } = e.target
      setReview( {
         ...reviewstatus,
         [name]: value
      } )
   }

   // create review and append 
   const locid = JSON.parse( localStorage.getItem( 'loc' ) )
   const userToken = JSON.parse( localStorage.getItem( "exists" ) )
   if ( userToken ) {
      var { id } = userToken
   }
   const newreview = new FormData()
   const Getdatafrombackend = async () => {
      const response = await fetch( `http://localhost:5000/api/location/${locid}` )
      const Data = await response.json()
      setReviewdata( Data.data )
      setHello( false )


      // setuserReview([Data.data])

   }



   const handleRating = ( rate ) => {
      setRating( rate )
   }

   const deleteReview = async ( _id ) => {
      const url = `http://localhost:5000/api/review/${_id}`
      await axios.delete( url )
      setHello( true )
   }








   const url = `http://localhost:5000/api/review/${locid}`
   const submitreview = async ( e ) => {
      e.preventDefault()
      newreview.append( "review", reviewstatus.review )
      newreview.append( "rating", rating )
      const res = await axios.post( url, newreview,
         {
            headers: {
               "Authorization": `Bearer${userToken.token}`
            }
         } )



      setReview( {
         review: "",
      } )
      if ( res ) {
         setHello( true )



         
      }
   }
   useEffect( () => {
      Getdatafrombackend()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [helo, edit] )





   return (
      <div className='review'>
         <div className='reviewcontainer'>
            <h2>Post Your Review :</h2>
            <div className='formdatareview'>
               <form onSubmit={submitreview}>
                  <textarea name="review" id=" " cols="56" rows="5" value={reviewstatus.review} onChange={handletext} placeholder="Add Review" style={{fontSize:"20px",padding:"10px"}}></textarea>
                  <h2>Rating:</h2>
                  <Rating ratingValue={reviewstatus.rating}
                     onClick={handleRating}
                  />
                  <button style={{backgroundColor:"#6e5193",padding:'10px 30px',border:"none",fontSize:'18px',cursor:'pointer',color:"white",borderRadius:'5px'}}>Add Review</button>
               </form>
            </div>
         </div>
         <h1>review</h1>
         {
            reviewdata.map( ( item, i ) => {
               const { _id, review, rating, name, user } = item
               return (

                  <div key={i} className="reviewdatady">
                     <p>{review}</p>
                     <div className='dynamicstar'>
                        <DynamicStar rating={rating} width='50' height='50' />
                     </div>
                     {
                        id === user ?
                           <div className='ratingbuttons'>
                              <div className='edit'>
                                 <div>
                                    <button onClick={() => setEdit( !edit )} >Edit</button>
                                    {
                                       edit ? <Editform rev={review} rat={rating} id={_id} setEdt={setEdit} /> : " "
                                    }
                                 </div>
                              </div>
                              <div className='delete'>
                                 <button onClick={() => deleteReview( _id )} className="delete">Delete</button>
                              </div>
                           </div>
                           : ""}
                     <p>review by {name}</p>
                  </div>
               )

            } )
         }
      </div>
   )
}

export default Ratings
