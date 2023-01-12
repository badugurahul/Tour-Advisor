const mongoose = require( 'mongoose' )

const ReviewSchema = new mongoose.Schema( {

   locationreview: {
      type: String,
      unique: true
   },
   locationid: {
      type: String,
   },
   user: {
      type: String,
   },
   name: {
      type: String,
   },
   review: {
      type: String,
      require: true
   },
   rating: {
      type: Number,
      require: true
   }

} ,{timestamps:true})


const ReviewRating = new mongoose.model( "reviewrating", ReviewSchema )

module.exports = ReviewRating