const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const { calculateTime } = require('./controllers/calculateController');
const route=require("./routes/route");
const PORT=process.env.PORT||4000;
app.use(express.json());


app.use(cors());
mongoose.connect(process.env.MongoURL||"mongodb+srv://dileepkm:L3cuCdGwQQWTF3Hs@cluster0.iqkms8u.mongodb.net/horseSpeed")
.then(()=>{
   console.log("Database Connection is successfully")
})
.catch((error)=>{
    console.log("Database connection failed",error)
})



// Route handler
app.post('/calculate', async (req, res) => {
    const { jockeyWeight, horseWeights, distance } = req.body;
  
   
  
    try {
      if (typeof distance !== 'number' || isNaN(distance)) {
        return res.status(400).json({ error: 'Invalid distance value. Expected a number.' });
      }
  
      const time = await calculateTime(distance, jockeyWeight, horseWeights);
      res.json({ time });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.use("/",route);
app.listen(PORT,()=>{
    console.log("Successfully connected port:",PORT)
})
