const mongoose = require("mongoose")
mongoose.set("strictQuery",true)

mongoose.connect("mongodb://localhost:27017/Tourism")

.then(()=>{
   console.log("Data Base Connected")
})

.catch((err)=>{
   console.log({error:err.message})
})