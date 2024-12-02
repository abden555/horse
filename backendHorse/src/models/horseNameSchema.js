const mongoose=require("mongoose");
const horseSchema=new mongoose.Schema({
    horseName:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model("horse",horseSchema)