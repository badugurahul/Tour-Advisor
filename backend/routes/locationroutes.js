const express = require( "express" )
// const Locations = require( "../model/Addlocation" )
const router = express.Router()


const {
   getallLocations,
   getLocations,
   createLocations,
   editLocations,
   deleteLocations
} = require( "../controller/LocationController" )


router.get( "/:id", getLocations )
router.get( "/", getallLocations )
router.post( "/", createLocations )
router.patch( "/:id", editLocations )
router.delete( "/:id", deleteLocations )


module.exports = router