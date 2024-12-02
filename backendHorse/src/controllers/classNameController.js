const Class=require("../models/classNameSchema")

//=========== create ==========
const createClass=async(req,res)=>{
    const data=req.body;
    const{className}=data;
    try {
        const savedData=await Class.create(data);
        res.status(201).send({message:"Successfully saved Data",savedData})
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error",error});
    }
}


//============= fetched ===========
const fetchedClass=async(req,res)=>{
    try {
        const getData=await Class.find();
        res.status(200).send({message:"Successfully fetched Data",getData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
//============= update ============
const updateClass=async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id)
        const updatedData=await Class.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).send({message:"Successfully Updated",updatedData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
//============= delete ==========
const deleteClass=async(req,res)=>{
    try {
        const {id}= req.params;
       
        const deletedData=await Class.findByIdAndDelete(id);
        res.status(200).send({message:"Successfully Deleted Data",deletedData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}

module.exports={createClass,fetchedClass,updateClass,deleteClass}
