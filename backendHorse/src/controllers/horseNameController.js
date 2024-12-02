const Horse=require("../models/horseNameSchema")

const createHorse=async(req,res)=>{
    const data=req.body;
    const{horseName}=data;
    try {
        const savedData=await Horse.create(data);
        res.status(201).send({message:"Successfully saved Data",savedData})
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error",error});
    }
}

//============= fetched ===========
const fetchedHorse=async(req,res)=>{
    try {
        const getData=await Horse.find();
        res.status(200).send({message:"Successfully fetched Data",getData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
//============= update ============
const updateHorse=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedData=await Horse.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).send({message:"Successfully Updated",updatedData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
//============= delete ==========
const deleteHorse=async(req,res)=>{
    try {
        const {id}= req.params;
        const deletedData=await Horse.findByIdAndDelete(id);
        res.status(200).send({message:"Successfully Deleted Data",deletedData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
module.exports = { createHorse,fetchedHorse,updateHorse,deleteHorse};


