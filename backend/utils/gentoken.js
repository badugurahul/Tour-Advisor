const jwt = require( "jsonwebtoken" )

const createToken = ( _id,name ) => {
  return jwt.sign( { _id,name },"mysecret",{ expiresIn: "5d" } )
}


module.exports = createToken