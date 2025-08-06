
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    tables:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
});

const restaurantModel = mongoose.model("Restaurant",restaurantSchema);
module.exports=restaurantModel;