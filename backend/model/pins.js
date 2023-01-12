const mongoose = require( 'mongoose' )
const geocoder = require( "../utils/Mapping" )
const PinSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         require: true,
      },
      name:{
         type:String,
         // require:true
      },
      userId:{
         type:String,
         // require:true
      },
      address:
      {
         type: String,
         require: true
      },
      location: {
         type: {
            type: String,
            enum: ["Point"]
         },
         coordinate: {
            type: [Number],
            index: "2dsphere"
         },
         Address: String
      },

      des: {
         type: String,
         require: true
      },
      locationfee: {
         type: Number,
         // max:3,
         require: true
      },
      imagesd: {
         image: [String]
      },
   }, { timestamps: true }
)




PinSchema.pre( "save", async function ( next ) {
   const loc = await geocoder.geocode( this.address )
   this.location = {
      type: "Point",
      coordinate: [loc[0].longitude, loc[0].latitude],
      Address: loc[0].formattedAddress
   }
} )


const Locations = mongoose.model( "Locations", PinSchema )

module.exports = Locations