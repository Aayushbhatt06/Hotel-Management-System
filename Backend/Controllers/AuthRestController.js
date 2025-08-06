const restaurantModel = require("/Programs/Projects/Hotel_Management/Backend/Models/Restaurant.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try{
        const {name , email, contact, address, tables , password} = req.body;
        const user = await restaurantModel.findOne({email})
        if(user){
            return res.status(409).json({
            message: "User Already Exists, Please Login",
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
        res.status(500).json({
            message: err.message,
            success:false
        });
    }
}

const login = async (req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await restaurantModel.findOne({email})
        if(!user){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }
        
        const isPasswordEqual = await bcrypt.compare(password,user.password)
        if(!isPasswordEqual){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }

        const jwtToken = jwt.sign(
            {email:user.email,_id : user._id},
            "SECRET-123",
            {expiresIn:'24h'}
        )
        res.status(200).json({
            message: "Login Successful",
            success:true,
            jwtToken,
            email,
            name:user.name
        });
    }catch(err){
        res.status(500).json({
            message: "Server side error",
            success:false
        });
    }
}


module.exports={
    signup,
    login
}