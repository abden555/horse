const express = require('express');
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware")
const {createData, fetchedData, updateData, deleteData, searchData } = require('../controllers/rootController');
const {createHorse, fetchedHorse, updateHorse, deleteHorse}=require("../controllers/horseNameController");
const{createClass, fetchedClass, updateClass, deleteClass}=require("../controllers/classNameController");
const { signUp, signIn, updatePassword } = require('../controllers/authController');


//========Auth===========
router.post("/signUp",signUp);
router.post("/signIn",signIn);
router.put("/updatedPassword",updatePassword);

//====== Root============ 
router.post("/create",createData);
router.get('/fetched',fetchedData);
router.put("/update/:id",updateData);
router.delete("/delete/:id",deleteData);
router.get("/search",searchData);

//========class Name=========
router.post("/createClass",createClass);
router.get("/fetchedClass",fetchedClass);
router.put("/updateClass/:id",updateClass);
router.delete("/deleteClass/:id",deleteClass);


//=======Horse Name===========
router.post("/createHorse",createHorse);
router.get("/fetchedHorse",fetchedHorse);
router.put("/updateHorse/:id",updateHorse);
router.delete("/deleteHorse/:id",deleteHorse);     

module.exports=router;



