const Auth=require("../models/authSchema");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

//==========SignUp==========
const signUp=async(req,res)=>{
    const data=req.body;
    const{name,email,password}=data;

    //=== Regex  and validation==
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!name ||!email||!password){
        return res.status(400).send({message:"All Field is required"});
    }else{
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid email format" });
        }
      
        if (!strongPasswordRegex.test(password)) {
          return res.status(400).json({ message: "Pls Provide Strong Password" });
        }
    }

    try {
        const existAdmin=await Auth.findOne({email});
        if(existAdmin){
            return res.Status(400).send({message:"User Already Exists"})
        }
          //===hash Password===
        const hashPassword= await  bcrypt.hash(password,10);
        const savedData=await Auth.create({name,email,password:hashPassword});
        res.status(201).send({message:"Successfully SignUp",savedData})
    } catch (error) {
        console.log("Error:",error);
        res.status(500).send({message:"Internal Server Error",error})
    }
}


//==========SignIn=============

const signIn=async(req,res)=>{
    const data=req.body;
    const {email,password}=data;
    if(!email||!password){
        return res.status(400).send({message:"All field is Required"});
    }
      
    const existAdmin=await Auth.findOne({email});
    if(!existAdmin){
        return res.status(404).send({message:"Admin not found"})
    }

    try {
        const isPasswordValid=await bcrypt.compare(password,existAdmin.password)
        if(!isPasswordValid){
            return res.status(401).send({message:"Invalid password"});    
        }
        //token
        const token= await jwt.sign({adminId:existAdmin._id},process.env.JWT_SECRET||"secrete-key",{expiresIn:"2d"});
        res.setHeader("Authorization",token);
        res.status(201).send({message:"successfully Token Created",admin:{
            _id:existAdmin._id,
            name:existAdmin.name,
            password:existAdmin.password,
        }});
        
    } catch (error) {
        console.error("error:",error);
        res.status(500).send({message:"Internal server Error",error});
    }
}

//========== update Password =========
const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body; 

    // Validation
    if (!email) {
        return res.status(400).json({ message: 'Please provide an email.' });
    }
    if (!oldPassword) {
        return res.status(400).json({ message: 'Please provide the old password.' });
    }
    if (!newPassword) {
        return res.status(400).json({ message: 'Please provide a new password.' });
    }

    try {
        const existAdmin = await Auth.findOne({ email });

        if (!existAdmin) {
            return res.status(404).send({ message: "Admin not found" });
        }

        // Check if the old password matches
        const isPasswordValid = await bcrypt.compare(oldPassword, existAdmin.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        existAdmin.password = hashedPassword;

        // Save the updated admin document
        await existAdmin.save();

        res.status(200).send({ message: "Successfully updated password",existAdmin });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ message: "Internal server error", error });
    }
};

module.exports={signUp,signIn,updatePassword};