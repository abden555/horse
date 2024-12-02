const mongoose=require("mongoose");
const classSchema=new mongoose.Schema({
    className:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

module.exports=mongoose.model("class",classSchema)