const ReviewRating = require( "../model/review" )
const Locations = require( "../model/pins" )




const createReview = async ( req, res ) => {
   try {
      const locations = await Locations.findById( req.params.id )
      if ( !locations ) {
         return res.status( 401 ).json( {
            message: "no Tour is found"
         } )
      }

      const token = req.headers.authorization
      const tokenId = JSON.parse( Buffer.from( token.split( "." )[1], "base64" ).toString() )
      const responsereview = await ReviewRating.create(
         {
            locationreview: "" + req.params.id + tokenId._id,
            user: tokenId._id,
            locationid: req.params.id,
            name: tokenId.name,
            review: req.body.review,
            rating: req.body.rating
         }
      )
      res.status( 200 ).json( responsereview )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}


const getallreview = async ( req, res ) => {
   try {
      const getallreviewdata = await ReviewRating.find()
      res.status( 200 ).json( getallreviewdata )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}

const getreviewbyid = async ( req, res ) => {
   try {
      const id = await req.params.id
      const reviewdata = await ReviewRating.findById(
         { _id: id }
      )
      res.status( 200 ).json( reviewdata )
   } catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }

}


const deletereview = async ( req, res ) => {
   try {
      const id = await req.params.id;
      const deleterreviewdata = await ReviewRating.findByIdAndDelete( { _id: id } )
      res.status( 200 ).json( deleterreviewdata )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )

   }
}



const editreview = async ( req, res ) => {
   try {

      const editreviewdata = await ReviewRating.findByIdAndUpdate( req.params.id, req.body, { new: true } )
      res.status( 200 ).json( editreviewdata )
   }
   catch ( err ) {


      res.status( 400 ).json( { error: err.message } )
      

   }
}



module.exports = {

   createReview, getallreview, deletereview, getreviewbyid, editreview
}