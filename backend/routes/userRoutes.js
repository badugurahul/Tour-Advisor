const express = require( "express" )
// importin router data from the controller 

const {loginUser,registerUser} = require("../controller/usercontroller")
const router = express.Router()
// login
router.post( '/login', loginUser )
// register
router.post( "/register", registerUser )


module.exports =  router