const itemsModel = require('../Models/Items');

const addItems = async(req,res)=>{
    try {
        const {name,image,price,quantity,desc,category} = req.body;

        if (!name || !price || !category) {
            return res.status(400).json({
                message: "Name, Price, and Category are required.",
                success: false
            });
        }

        const item = await itemsModel.findOne({name});
        if(item){
            return res.status(409).json({ 
                message: "Item already exists",
                success:false
            });
        }

        const newItem = new itemsModel({name,image,price,quantity,desc,category});
        await newItem.save();

        return res.status(201).json({
            message: "Item added successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

module.exports = addItems;
