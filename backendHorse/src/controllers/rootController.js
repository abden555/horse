const Root = require("../models/Schema");

//=========== create ===============
const createData = async (req, res) => {
    const {horseWeights, distance, time, className, horseName,date } = req.body;

    try {
        // Validate 
        if (!horseWeights || !distance || !time || !className || !horseName || !date) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        // Parse and validate date
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).send({ message: "Invalid date format" });
        }

        const savedData = await Root.create({ 
         horseWeights, distance, time, className, horseName,createdAt: parsedDate
        });

        res.status(201).send({ message: "Successfully saved Data", savedData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ message: "Internal Server Error", error });
    }
};


//============= fetched ===========
const fetchedData = async (req, res) => {
    try {
        const getData = await Root.find()
            .populate({ path: "horseName", select: "horseName -_id", options: { lean: true } })
            .populate({ path: "className", select: "className -_id", options: { lean: true } })
            .lean();

        res.status(200).send({ message: "Successfully fetched Data", getData });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send({ message: "Internal Server Error:", error });
    }
}



//============= update ============
const updateData=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedData=await Root.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).send({message:"Successfully Updated",updatedData});
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}
//============= delete ==========
const deleteData=async(req,res)=>{
    try {
        const {id}= req.params;
        const deletedData=await Root.findByIdAndDelete(id);
        res.status(200).send({message:"Successfully Deleted Data",deletedData});
    } catch (error) {
        //console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error:",error});
    }
}

 //============search by date  if date not select search current date automatically =============
 const searchData = async (req, res) => {
    try {
        let { createdAt} = req.query;
        if (!createdAt) {
            const today = new Date();
            createdAt = today.toISOString().split('T')[0]; // Format  "YYYY-MM-DD"
        }
       const startOfDay = new Date(createdAt);
        startOfDay.setUTCHours(0, 0, 0, 0);
        const endOfDay = new Date(createdAt);
        endOfDay.setUTCHours(23, 59, 59, 999);
  
        const data = await Root.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
              },
            }
          },
          {
            $project: {
              _id: 1,
              horseWeights: 1,
              distance:1,
              time: 1,
              className:1,
              horseName:1,
              createdAt: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
              }
            }
          }
        ]);
  
        res.status(200).json({ message: "Data successfully fetched", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
  };
module.exports = { createData,fetchedData,updateData,deleteData,searchData};
