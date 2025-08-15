
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const itemsSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        default:0
    },
    desc:{
        type:String,
    },
    category: {
    type: String,
    enum: ["sweet", "beverage", "starter", "main-course", "dessert"], // expand as needed
    required: true
    },
    restaurantId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    }
});

const itemsModel = mongoose.model("Items",itemsSchema);
module.exports=itemsModel;