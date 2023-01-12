require( "dotenv" ).config();
const fileUpload = require( "express-fileupload" )
// creating a server
const express = require( "express" )
const cloud = require( "./utils/cloudinary" );

const app = express()
// port enviroment 
const port = process.env.port || 5000
require( "./db/database" )

// addlocationroute
const Location = require( "./routes/locationroutes" )
// review

const review = require( "./routes/reviewroutes" )
app.use( express.json())
const cors = require( 'cors' )

const userrouterdetails = require( "./routes/userRoutes" );

app.use( cors() )
cloud()
app.use( fileUpload( { useTempFiles: true } ) )

app.use( '/api/user', userrouterdetails )
app.use( '/api/location', Location )
app.use( "/api/review", review )
app.get( '/', ( req, res ) => {
   res.send( "server has created! " )
} )
app.listen( port, () => {
   console.log( "please run on PORT:", port )
} )

