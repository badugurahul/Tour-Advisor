import React, { useState } from 'react'
import axios from 'axios'
import { Rating } from "react-simple-star-rating"

const Editform = ( { rev, rat, id, setEdt } ) => {
   const [reviewstatus, setReview] = useState( {
      review: rev,
      rating: rat
   } )


   const [rating, setRating] = useState( 0 )


   const userToken = JSON.parse( localStorage.getItem( "exists" ) )


   const newreview = new FormData()

   const handletext = ( e ) => {
      const { name, value } = e.target
      setReview( {
         ...reviewstatus,
         [name]: value
      } )
   }

   const handleRating = ( rate ) => {
      setRating( rate )
   }

   

   const url = `http://localhost:5000/api/review/${id}`
   const submitreview = async ( e ) => {
      e.preventDefault()
      newreview.append( "review", reviewstatus.review )
      newreview.append( "rating", rating )
      // console.log( reviewstatus.review, rating )
      const res = await axios.patch( url, newreview,
         {
            headers: {
               "Authorization": `Bearer${userToken.token}`
            }
         } )
      setReview( {
         review: "",
      } )
      if ( res ) {
         setEdt( false )

      }

   }


   return (

      <div className='helo'>
         <form onSubmit={submitreview}>
            <textarea name="review" id=" " cols="40" rows="5" value={reviewstatus.review} onChange={handletext} placeholder="Add Review"></textarea>
            <p>Rating:</p>
            <Rating ratingValue={reviewstatus.rating}
               onClick={handleRating}
            />
            <button >Update Review</button>
         </form>
      </div>
   )
}

export default Editform
