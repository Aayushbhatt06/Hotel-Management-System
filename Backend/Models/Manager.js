
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

const managerModel = mongoose.model("user",managerSchema);
module.exports=managerModel;