const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
// structure schema
const userdetails = mongoose.Schema({
   name:{
      type:String,
      required:true,
   },
   email:{
      type:String,
      required:true,
      unquie:true
   },
   password:{
      type:String,
      required:true
   }
},{timestamp:true})


// static register function


userdetails.statics.register = async(name,email,password)=>{
    const exists = await User.findOne({email})
  
    if(exists){
   throw Error("Email Already Exists !");
    }

   
   //  salt 
   const salt = await bcrypt.genSalt(10)
   const hash = await bcrypt.hash(password,salt)
   const user = await User.create({name,email,password:hash})
return user

}


userdetails.statics.login = async(email,password)=>{
   const exists = await User.findOne({email})
   if(!exists){
  throw Error("Invalid Email!")
   }
   

   const match = await bcrypt.compare(password,exists.password)
   if(!match){
      throw Error("Incorrect Password")
   }
return exists
}


// created model


const User = mongoose.model("User",userdetails)


module.exports = User