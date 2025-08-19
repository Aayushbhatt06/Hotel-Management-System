const restaurantModel = require("../Models/Restaurant");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const signup = async (req,res)=>{
    try{
        const {name , email, contact, address, tables , password} = req.body;
        const rest = await restaurantModel.findOne({email})
        if(rest){
            console.log("rest already exist");
            return res.status(409).json({
            message: "restaurant Already Exists, Please Login",
            success:false
        });
        }
        const restaurant = new restaurantModel({name,email,contact,address,tables,password});
        restaurant.password = await bcrypt.hash(password,10);
        await restaurant.save();
        res.status(201).json({
            message: "Signup Successful",
            success:true
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: err.message,
            success:false
        });
    }
}
    
const login = async (req,res)=>{
    try{
        const {email , password} = req.body;
        const rest = await restaurantModel.findOne({email})
        if(!rest){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }
        
        const isPasswordEqual = await bcrypt.compare(password,rest.password)
        if(!isPasswordEqual){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }

        const jwtToken = jwt.sign(
            {name : rest.name,email:rest.email,contact:rest.contact,address:rest.address,tables: rest.tables,_id : rest._id},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
        res.status(200).json({
            message: "Login Successful",
            success:true,
            jwtToken,
            email,
            name:rest.name
        });
    }catch(err){
        res.status(500).json({
            message: "Server side error",
            success:false
        });
    }
}

const getAllSignups = async(req, res) => {
    try{
        const getSignups = await restaurantModel.find({});
        res.status(200).json({
            message: "fetched success",
            data: getSignups,
            success:true
        })
    }catch(err) {
        res.status(500).json({
            message: err.message,
            success:false
        });
    }
}


module.exports={
    signup,
    login,
    getAllSignups
}