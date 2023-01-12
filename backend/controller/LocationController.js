
const Locations = require( "../model/pins" )
const cloudinary = require( 'cloudinary' ).v2
const ReviewRating = require( "../model/review" )
const geocoder = require( "../utils/Mapping" )
const getLocations = async ( req, res ) => {
   try {
      const id = req.params.id
      const locationiddata = await ReviewRating.aggregate( [
         { "$match": { "locationid": `${id}` } }
      ] )
      const Locationsdata = await Locations.findById( { _id: id } )
      res.status( 200 ).json( { data: locationiddata, Locationsdata } )
   } catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}


const getallLocations = async ( req, res ) => {
   try {
      const Locationsdata = await Locations.find()
      res.status( 200 ).json( Locationsdata )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}


const createLocations = async ( req, res ) => {
   try {
      const token = req.headers.authorization
      const tokenId = JSON.parse( Buffer.from( token.split( "." )[1], "base64" ).toString() )
      console.log( tokenId )
      console.log( tokenId.name )


      let imageData = []
      const images = req.files.image
      for ( let index = 0; index < images.length; index++ ) {

         const Imageurl = await cloudinary.uploader.upload( images[index].tempFilePath, {
            use_filename: true,
            folder: "uploadimage"
         } )
         imageData.push( Imageurl.secure_url )
      }

      const tour = await Locations.create( {
         userId: tokenId._id,
         name: tokenId.name,
         title: req.body.title,
         address: req.body.address,
         des: req.body.des,
         locationfee: req.body.locationfee,
         imagesd: {
            image: imageData
         },
      } )

      res.status( 201 ).json( tour )
   }

   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}


// update 

const editLocations = async ( req, res ) => {
   try {
      let imageData = []
      const images = req.files.image
      for ( let index = 0; index < images.length; index++ ) {
         const Imageurl = await cloudinary.uploader.upload( images[index].tempFilePath, {
            use_filename: true,
            folder: "uploadimage"
         } )

         imageData.push( Imageurl.secure_url )
      }

      const loc = await geocoder.geocode( req.body.address )
      const location = {
         type: "Point",
         coordinate: [loc[0].longitude, loc[0].latitude],
         Address: loc[0].formattedAddress
      }
      const tour = await Locations.findByIdAndUpdate( req.params.id, {
         title: req.body.title,
         address: req.body.address,
         location: {
            coordinate: location.coordinate,
            Address: location.Address
         },
         des: req.body.des,
         locationfee: req.body.locationfee,
         imagesd: {
            image: imageData
         },
      }, { new: true } )
      res.status( 201 ).json( tour )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}


const deleteLocations = async ( req, res ) => {
   try {
      const id = req.params.id;
      const Locationsdata = await Locations.findByIdAndDelete( { _id: id } )
      res.status( 200 ).json( Locationsdata )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}



module.exports = {
   getallLocations,
   getLocations,
   createLocations,
   editLocations,
   deleteLocations
}

