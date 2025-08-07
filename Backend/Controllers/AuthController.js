const UserModel = require('../Models/Manager');
const { hash, compare } = require('bcrypt');
const sign = require('jsonwebtoken');


const signup = async (req,res)=>{
    try{
        const {name , email , password} = req.body;
        const user = await UserModel.findOne({email})
        if(user){
            return res.status(409).json({
            message: "User Already Exists, Please Login",
            success:false
        });
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await hash(password,10);
        await userModel.save();
        res.status(201).json({
            message: "Signup Successful",
            success:true
        });
    }catch(err){
        res.status(500).json({
            message: "Server side error",
            success:false
        });
    }
}

const login = async (req,res)=>{
    try{
        const {email , password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }
        
        const isPasswordEqual = await compare(password,user.password)
        if(!isPasswordEqual){
            return res.status(403).json({
            message: "Auth email or password is worng",
            success:false
        });
        }

        const jwtToken = sign(
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


module.exports = {
  signup,
  login
}
