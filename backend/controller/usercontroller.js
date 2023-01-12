const User = require( "../model/usermodel" )
const createToken = require( "../utils/gentoken" )
// const webtoken = require( "jsonwebtoken" )




// login user
const loginUser = async ( req, res ) => {
   const { email, password } = req.body;
   try {
      const user = await User.login( email, password )
      const name = await User.findById( user._id )
      const Nickname = name.name
      const token = createToken( user._id, user.name )
      res.status( 200 ).json( { id: user._id, email, token, Nickname } )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }

}

// registerUser
const registerUser = async ( req, res ) => {
   const { _id, name, email, password } = req.body;
   try {
      await User.register( name, email, password )
      // createToken
      const token = createToken( _id, name )
      res.status( 200 ).json( { _id, name, email, password, token } )
   }
   catch ( err ) {
      res.status( 400 ).json( { error: err.message } )
   }
}



const verifyToken = ( req, res, next ) => {
   let token;
   if ( req.headers.authorization && req.headers.authorization.startsWith( "Bearer" ) ) {
      token = req.headers.authorization.split( " " )[1]
   } else {
      return res.status( 400 ).send( "please login or Register" )
   }
   // webtoken.verify( token, createToken, ( err ) => {
   //    if ( err ) {
   //       return res.status( 400 ).send(
   //          "invalid token"
   //       )
   //    }
   //    next()
   // } )

   next()

}




module.exports = {
   loginUser, registerUser, verifyToken
};










